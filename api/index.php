<?php
declare(strict_types=1);

// Read-only KnowledgeBank REST API; PHP 7.4+, no dependencies.
ini_set('display_errors', '0');
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-cache');

function reply(int $code, array $data): void {
    http_response_code($code);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_THROW_ON_ERROR);
    exit;
}
function validId(string $id): bool {
    return preg_match('~\A[a-z0-9][a-z0-9-]{0,127}\z~', $id) === 1;
}
function validPath(string $path): bool {
    if ($path === '' || strlen($path) > 1024 || substr_count($path, '/') >= 20) return false;
    foreach (explode('/', $path) as $id) if (!validId($id)) return false;
    return true;
}
function readNode(string $root, string $path): ?array {
    if (!validPath($path)) return null;
    $dir = $root;
    foreach (explode('/', $path) as $id) {
        $dir .= '/' . $id;
        if (is_link($dir) || !is_dir($dir)) return null;
    }
    $file = $dir . '/index.json';
    if (is_link($file) || !is_file($file) || !is_readable($file)) return null;
    $raw = file_get_contents($file);
    if ($raw === false) throw new RuntimeException('Read failure');
    $data = json_decode($raw, true, 512, JSON_THROW_ON_ERROR);
    if (!is_array($data) || substr(ltrim($raw), 0, 1) !== '{') throw new RuntimeException('Invalid node');
    return $data;
}
function childIds(array $data): array {
    if (array_key_exists('children', $data)) {
        $ids = $data['children'];
    } elseif (array_key_exists('courses', $data)) {
        if (!is_array($data['courses'])) throw new RuntimeException('Invalid catalogue');
        $ids = [];
        foreach ($data['courses'] as $course) $ids[] = $course['id'] ?? null;
    } else {
        $ids = [];
    }
    if (!is_array($ids)) throw new RuntimeException('Invalid children');
    $seen = [];
    foreach ($ids as $id) {
        if (!is_string($id) || !validId($id) || isset($seen[$id])) throw new RuntimeException('Invalid child');
        $seen[$id] = true;
    }
    return $ids;
}
const PUBLIC_BASE = 'https://aigm.fi/kb';

function sourceUrl(string $path): string {
    return PUBLIC_BASE . '/bank/' . $path . '/index.json';
}
function apiUrl(string $path): string {
    return PUBLIC_BASE . '/api/node/' . $path;
}
function sitemapNode(string $root, string $path, array $data, int &$count): array {
    if (++$count > 10000) throw new RuntimeException('Sitemap limit exceeded');
    $node = ['path'=>$path, 'source'=>sourceUrl($path), 'api'=>apiUrl($path), 'children'=>[]];
    foreach (['title','description','status'] as $key) {
        if (array_key_exists($key, $data)) $node[$key] = $data[$key];
    }
    foreach (childIds($data) as $id) {
        $child = $path . '/' . $id;
        $value = readNode($root, $child);
        if ($value === null) throw new RuntimeException('Missing child');
        $node['children'][] = sitemapNode($root, $child, $value, $count);
    }
    return $node;
}
// Resolve only nodes reachable from a published category catalogue.
function publishedNode(string $root, string $path): ?array {
    if (!validPath($path)) return null;
    $parts = explode('/', $path);
    $current = array_shift($parts);
    $data = readNode($root, $current);
    foreach ($parts as $id) {
        if ($data === null || !in_array($id, childIds($data), true)) return null;
        $current .= '/' . $id;
        $data = readNode($root, $current);
    }
    return $data;
}


function sitemapRoots(string $root, int &$count): array {
    $nodes = [];
    $dirs = scandir($root);
    if ($dirs === false) throw new RuntimeException('Bank unavailable');
    foreach ($dirs as $id) {
        $data = readNode($root, $id);
        if ($data !== null) $nodes[] = sitemapNode($root, $id, $data, $count);
    }
    return $nodes;
}
function flattenNodes(array $nodes): array {
    $flat = [];
    foreach ($nodes as $node) {
        $flat[] = $node;
        foreach (flattenNodes($node['children']) as $child) $flat[] = $child;
    }
    return $flat;
}
function xmlEscape(string $value): string {
    return htmlspecialchars($value, ENT_QUOTES | ENT_XML1, 'UTF-8');
}
function htmlEscape(string $value): string {
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}
function crawlerSitemap(string $root, bool $html): void {
    $count = 0;
    $nodes = flattenNodes(sitemapRoots($root, $count));
    if ($html) {
        $out = '<!doctype html><html lang="en"><head><meta charset="utf-8"><title>AIGM KnowledgeBank — Content index</title><link rel="stylesheet" href="/site.css"></head><body><main class="shell"><h1>AIGM KnowledgeBank — Content index</h1><p>Live link directory generated from the authoritative bank JSON hierarchy. Select a topic and retrieve its JSON via the REST API. Outline entries are not finished lessons.</p><p><a href="'.PUBLIC_BASE.'/">KnowledgeBank</a> · <a href="'.PUBLIC_BASE.'/llms.txt">LLM instructions</a> · <a href="'.PUBLIC_BASE.'/api/sitemap">JSON sitemap</a> · <a href="'.PUBLIC_BASE.'/sitemap.xml">XML sitemap</a></p><ul>';
        foreach ($nodes as $node) {
            $title = $node['title'] ?? [];
            $label = is_array($title) ? ($title['en'] ?? $title['fi'] ?? $node['path']) : $title;
            $out .= '<li><a href="'.htmlEscape($node['api']).'">'.htmlEscape((string)$label).'</a> — '.htmlEscape($node['path']).' ['.htmlEscape((string)($node['status'] ?? 'catalogue')).']</li>';
        }
        $out .= '</ul></main></body></html>';
        header('Content-Type: text/html; charset=utf-8');
        echo $out;
        exit;
    }
    $urls = [PUBLIC_BASE.'/', PUBLIC_BASE.'/llms.txt', PUBLIC_BASE.'/sitemap.html'];
    foreach ($nodes as $node) {
        if (!in_array($node['status'] ?? '', ['outline','draft'], true)) $urls[] = $node['api'];
    }
    $out = '<?xml version="1.0" encoding="UTF-8"?>'."\n".'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'."\n";
    foreach (array_unique($urls) as $url) $out .= '  <url><loc>'.xmlEscape($url).'</loc></url>'."\n";
    $out .= '</urlset>'."\n";
    header('Content-Type: application/xml; charset=utf-8');
    echo $out;
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'GET') {
    header('Allow: GET');
    reply(405, ['error'=>'method_not_allowed']);
}
try {
    $root = realpath(__DIR__ . '/../bank');
    if ($root === false || !is_dir($root)) throw new RuntimeException('Bank unavailable');
    $requestPath = parse_url($_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH);
    if ($requestPath === '/kb/sitemap.xml' || $requestPath === '/kb/sitemap.html') {
        crawlerSitemap($root, $requestPath === '/kb/sitemap.html');
    }
    // PATH_INFO supports direct index.php routes; Apache rewrite supports clean URLs.
    $route = $_SERVER['PATH_INFO'] ?? '';
    if ($route === '') {
        $uri = parse_url($_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH);
        if (is_string($uri) && strpos($uri, '/kb/api/') === 0) {
            $route = substr($uri, strlen('/kb/api/'));
            if ($route === 'index.php') $route = '';
            elseif (strpos($route, 'index.php/') === 0) $route = substr($route, 10);
        }
    }
    $route = trim($route, '/');
    if ($route === '') {
        reply(200, ['version'=>1, 'sitemap'=>PUBLIC_BASE . '/api/sitemap', 'node'=>PUBLIC_BASE . '/api/node/{path}', 'sitemap_xml'=>PUBLIC_BASE . '/sitemap.xml', 'sitemap_html'=>PUBLIC_BASE . '/sitemap.html', 'llms'=>PUBLIC_BASE . '/llms.txt']);
    }
    $parts = explode('/', $route, 2);
    $kind = $parts[0];
    $path = $parts[1] ?? '';
    if (!in_array($kind, ['sitemap','node'], true)) reply(404, ['error'=>'route_not_found']);
    if ($path !== '' && !validPath($path)) reply(400, ['error'=>'invalid_path']);
    if ($kind === 'node') {
        if ($path === '') reply(400, ['error'=>'path_required']);
        $data = publishedNode($root, $path);
        if ($data === null) reply(404, ['error'=>'node_not_found']);
        reply(200, ['path'=>$path,'source'=>sourceUrl($path),'data'=>$data]);
    }
    $count = 0;
    $nodes = [];
    if ($path !== '') {
        $data = publishedNode($root, $path);
        if ($data === null) reply(404, ['error'=>'node_not_found']);
        $nodes[] = sitemapNode($root, $path, $data, $count);
    } else {
        $nodes = sitemapRoots($root, $count);
    }
    reply(200, ['version'=>1,'root'=>PUBLIC_BASE . '/bank/','count'=>$count,'nodes'=>$nodes]);
} catch (Throwable $e) {
    error_log('KnowledgeBank API: ' . $e->getMessage());
    reply(500, ['error'=>'content_unavailable']);
}
