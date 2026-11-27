#!/usr/bin/env python3
"""KnowledgeBank release checks, Python standard library only."""
import argparse
import json
import re
import subprocess
import sys
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BASE = 'https://aigm.fi/kb'
ID = re.compile(r'[a-z0-9][a-z0-9-]{0,127}\Z')
LANGS = ('fi', 'en')


def require(condition, message):
    if not condition:
        raise ValueError(message)


def validate(root):
    bank = root / 'bank'
    docs = {p: json.loads(p.read_text(encoding='utf-8'))
            for p in sorted(bank.rglob('index.json'))}
    seen, images = set(), set()
    blocks = 0
    def visit(path):
        nonlocal blocks
        require(path in docs and path not in seen, f'Missing or repeated node: {path}')
        seen.add(path)
        d = docs[path]
        if 'courses' in d:
            children = [item['id'] for item in d['courses']]
        else:
            require(d['status'] == 'complete', f'Incomplete node: {path}')
            require(all(d['title'].get(l) for l in LANGS), f'Missing title: {path}')
            children = d['children']
            require(isinstance(children, list), f'Invalid children: {path}')
            a, b = (d['content'][l] for l in LANGS)
            require(isinstance(a, list) and isinstance(b, list) and len(a) == len(b) > 0,
                    f'Language count mismatch: {path}')
            blocks += len(a)
            for lang in LANGS:
                for block in d['content'][lang]:
                    require(bool(block['title']) and isinstance(block['paragraphs'], list)
                            and block['paragraphs'] and all(isinstance(p, str) and p.strip() for p in block['paragraphs']),
                            f'Empty block: {path} ({lang})')
                    image = block.get('image')
                    if image is None:
                        continue
                    rel = Path(image['src'])
                    require(not rel.is_absolute() and '..' not in rel.parts and rel.suffix == '.svg', f'Invalid image: {rel}')
                    p = path.parent / rel
                    require(p.is_file() and not p.is_symlink(), f'Missing image: {p}')
                    require(image.get('alt') and image.get('caption'), f'Missing image metadata: {p}')
                    images.add(p)
        require(len(children) == len(set(children)), f'Duplicate children: {path}')
        for child in children:
            require(isinstance(child, str) and ID.fullmatch(child), f'Invalid child: {child}')
            visit(path.parent / child / 'index.json')
    for path in sorted(bank.glob('*/index.json')):
        visit(path)
    require(seen == set(docs), f'Orphan JSON: {set(docs) - seen}')
    svgs = set(bank.rglob('*.svg'))
    for p in sorted(svgs):
        svg = ET.parse(p).getroot()
        require(svg.tag == '{http://www.w3.org/2000/svg}svg', f'Not SVG: {p}')
        require(svg.find('{http://www.w3.org/2000/svg}title') is not None, f'Missing SVG title: {p}')
        for e in svg.iter():
            require(e.tag.rsplit('}', 1)[-1] not in ('script', 'foreignObject'), f'Active SVG content: {p}')
            for k, v in e.attrib.items():
                k = k.rsplit('}', 1)[-1]
                require(not k.lower().startswith('on'), f'SVG event handler: {p}')
                if k == 'href':
                    require(v.startswith('#'), f'External SVG link: {p}')
    require(images == svgs, f'Unused SVGs: {sorted(svgs - images)}')
    print(f'PASS structure: {len(docs)} JSON, {blocks} bilingual blocks, {len(svgs)} SVG files')
    return docs


class Links(HTMLParser):
    def __init__(self):
        super().__init__()
        self.urls = set()
    def handle_starttag(self, tag, attrs):
        if tag == 'a':
            self.urls.add(dict(attrs).get('href'))


def test_api(root, docs):
    api = root / 'api/index.php'
    subprocess.run(['php', '-l', str(api)], check=True)
    snippet = "$_SERVER['REQUEST_URI']=$argv[2]; $_SERVER['REQUEST_METHOD']=$argv[3]; register_shutdown_function(function(){fwrite(STDERR, '\\nKB_STATUS='.(http_response_code()?:200));}); require $argv[1];"
    def call(path, status=200, method='GET'):
        r = subprocess.run(['php', '-r', snippet, str(api), path, method], capture_output=True, text=True, timeout=20)
        require(r.returncode == 0 and f'KB_STATUS={status}' in r.stderr, f'API {path}: {r.stderr} {r.stdout[:300]}')
        return r.stdout
    def data(path, status=200, method='GET'):
        return json.loads(call(path, status, method))
    paths = {p.relative_to(root / 'bank').parent.as_posix(): d for p, d in docs.items()}
    discovery = data('/kb/api/')
    require(discovery['sitemap'] == BASE + '/api/sitemap', 'Discovery URL')
    site = data('/kb/api/sitemap')
    flat = {}
    def walk(nodes):
        for n in nodes:
            key = n['path']
            require(key in paths and key not in flat, f'Invalid sitemap path: {key}')
            flat[key] = n
            d = paths[key]
            children = d.get('children', [i['id'] for i in d.get('courses', [])])
            require([c['path'] for c in n['children']] == [key + '/' + c for c in children], f'Sitemap order: {key}')
            require(n['api'] == BASE + '/api/node/' + key and n['source'] == BASE + '/bank/' + key + '/index.json', f'URL: {key}')
            walk(n['children'])
    walk(site['nodes'])
    require(set(flat) == set(paths) and site['count'] == len(paths), 'Sitemap coverage')
    for key, doc in paths.items():
        node = data('/kb/api/node/' + key)
        require(node['data'] == doc and node['path'] == key and node['source'] == flat[key]['source'], f'Node mismatch: {key}')
    subtree = data('/kb/api/sitemap/courses/localfirst')
    require(subtree['count'] == sum(k == 'courses/localfirst' or k.startswith('courses/localfirst/') for k in paths), 'Subtree count')
    xml = ET.fromstring(call('/kb/sitemap.xml'))
    urls = {e.text for e in xml.findall('{http://www.sitemaps.org/schemas/sitemap/0.9}url/{http://www.sitemaps.org/schemas/sitemap/0.9}loc')}
    expected = {n['api'] for n in flat.values()} | {BASE + '/', BASE + '/llms.txt', BASE + '/sitemap.html'}
    require(urls == expected, 'XML sitemap coverage')
    html = Links(); html.feed(call('/kb/sitemap.html'))
    require({n['api'] for n in flat.values()} <= html.urls, 'HTML sitemap coverage')
    for path, status, method in [('/kb/api/node', 400, 'GET'), ('/kb/api/node/courses/../secret', 400, 'GET'), ('/kb/api/node/courses/%2e%2e', 400, 'GET'), ('/kb/api/node/courses/not-found', 404, 'GET'), ('/kb/api/unknown', 404, 'GET'), ('/kb/api/sitemap', 405, 'POST')]:
        require('error' in data(path, status, method), f'No error response: {path}')
    print(f'PASS PHP CLI: {len(paths)} nodes, JSON/XML/HTML sitemaps, 6 negative cases')


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--root', type=Path, default=ROOT)
    parser.add_argument('--api', action='store_true', help='Also exercise PHP routes via CLI (not Apache)')
    args = parser.parse_args()
    try:
        docs = validate(args.root.resolve())
        if args.api:
            test_api(args.root.resolve(), docs)
    except (ValueError, KeyError, TypeError, OSError, ET.ParseError, subprocess.SubprocessError) as exc:
        print(f'FAIL: {exc}', file=sys.stderr)
        sys.exit(1)
