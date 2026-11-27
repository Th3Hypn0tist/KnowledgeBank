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
function sourceUrl(string $path): string {
    return '/kb/bank/' . $path . '/index.json';
}
function apiUrl(string $path): string {
    return '/kb/api/node/' . $path;
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

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'GET') {
    header('Allow: GET');
    reply(405, ['error'=>'method_not_allowed']);
}
try {
    $root = realpath(__DIR__ . '/../bank');
    if ($root === false || !is_dir($root)) throw new RuntimeException('Bank unavailable');
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
        reply(200, ['version'=>1, 'sitemap'=>'/kb/api/sitemap', 'node'=>'/kb/api/node/{path}']);
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
        $dirs = scandir($root);
        if ($dirs === false) throw new RuntimeException('Bank unavailable');
        foreach ($dirs as $id) {
            $data = readNode($root, $id);
            if ($data !== null) $nodes[] = sitemapNode($root, $id, $data, $count);
        }
    }
    reply(200, ['version'=>1,'root'=>'/kb/bank/','count'=>$count,'nodes'=>$nodes]);
} catch (Throwable $e) {
    error_log('KnowledgeBank API: ' . $e->getMessage());
    reply(500, ['error'=>'content_unavailable']);
}
