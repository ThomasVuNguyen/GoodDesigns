#!/usr/bin/env python3
"""Rebuild OpenAIDevelopers/dist from https://developers.openai.com/.

Saves the server-rendered Astro page, its four stylesheets, the island/module scripts (and their imports),
images, SVGs and fonts (including those hosted on cdn.openai.com / i.ytimg.com), strips analytics and the
ChatKit/ClientRouter scripts, and rewrites every reference to a local path.
Run from anywhere: python3 OpenAIDevelopers/tools/capture.py
"""
import os, re, json, urllib.request, urllib.parse
BASE = 'https://developers.openai.com'
UA = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/124.0 Safari/537.36'}
OUT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'dist'))
manifest = {}
EXTERNAL = {'https://cdn.openai.com/': '/cdn/', 'https://i.ytimg.com/': '/ytimg/'}

def get(url):
    return urllib.request.urlopen(urllib.request.Request(url, headers=UA)).read()

def local(url):
    """Map an absolute or root-relative URL to a local path (no query)."""
    url = url.split('#')[0]
    for ext, pre in EXTERNAL.items():
        if url.startswith(ext): return pre + url[len(ext):].split('?')[0]
    return urllib.parse.urlsplit(url).path

def src_of(path):
    for ext, pre in EXTERNAL.items():
        if path.startswith(pre): return ext + path[len(pre):]
    return BASE + path

def save(path, data):
    p = os.path.join(OUT, path.lstrip('/'))
    os.makedirs(os.path.dirname(p), exist_ok=True)
    open(p, 'wb').write(data)
    manifest[path] = src_of(path)

html = get(BASE + '/').decode()

# --- strip analytics / third-party widgets / router
html = re.sub(r'<script[^>]+src="https://cdn\.platform\.openai\.com[^"]*"[^>]*></script>', '', html)
html = re.sub(r'<script[^>]+src="/_astro/(Analytics|ClientRouter)\.[^"]*"[^>]*></script>', '', html)
html = re.sub(r'<script type="module">var e=\(\)=>\{window\.si\|\|.*?</script>', '', html, flags=re.S)
html = re.sub(r'<link rel="preconnect" href="https://cdn\.openai\.com"[^>]*>', '', html)
html = re.sub(r'<link rel="preload" href="https://cdn\.openai\.com[^>]*>', '', html)

# --- collect asset URLs from html
ASSET = r'(?:/|https://(?:cdn\.openai\.com|i\.ytimg\.com)/)[^"\'\s)\\`,]+?\.(?:css|js|woff2?|ttf|png|jpe?g|webp|svg|avif|gif|ico|mp4|webm|json)(?:\?[^"\'\s)\\`,]*)?'
refs = set(re.findall(r'''(?:href|src|srcset|poster|component-url|renderer-url|data-[a-z-]+)=["'](%s)["']''' % ASSET, html))
refs |= set(re.findall(r'''url\(\s*['"]?(%s)['"]?\s*\)''' % ASSET, html))
refs |= {'/favicon.png', '/open-graph.png'} | {f'/images/devday/agent-eyes-{n}.svg' for n in ('designing', 'thinking', 'building')}

seen = set()
def crawl(u):
    p = local(u)
    if p in seen or p.startswith('//') or '${' in p: return
    seen.add(p)
    try: data = get(src_of(p))
    except Exception as e:
        print('skip', p, e); return
    text = None
    if p.endswith('.css'):
        text = data.decode('utf8')
        for m in set(re.findall(r'url\(\s*["\']?((?:/|https://cdn\.openai\.com/)[^)"\']+?)["\']?\s*\)', text)):
            crawl(m)
            text = text.replace(m, local(m))
        data = text.encode()
    elif p.endswith('.js'):
        text = re.sub(r'\?dpl=[A-Za-z0-9_]+', '', data.decode('utf8', 'ignore'))
        d = os.path.dirname(p)
        for m in set(re.findall(r'''["'`]((?:\.{1,2}/|/_astro/)[^"'`\s]+?\.js)["'`]''', text)):
            crawl(os.path.normpath(os.path.join(d, m)) if m.startswith('.') else m)
        for m in set(re.findall(r'''["'`](/(?:images|js|fonts)/[^"'`\s?$]+\.(?:png|jpe?g|webp|svg|avif|gif|woff2?|js))["'`]''', text)):
            crawl(m)
        data = text.encode()
    save(p, data)

for r in sorted(refs): crawl(r)

# --- rewrite html: drop ?dpl queries, localise cdn / ytimg hosts
for ext, pre in EXTERNAL.items():
    html = html.replace(ext, pre)
html = re.sub(r'\?dpl=[A-Za-z0-9_]+', '', html)
# internal page links keep their public destination; asset paths stay local
ASSET_DIRS = tuple(d + '/' for d in ('_astro', 'images', 'js', 'fonts', 'cdn', 'ytimg'))
html = re.sub(r'(<a\b[^>]*?\shref=")/(?!/)([^"]*)',
              lambda m: m.group(0) if m.group(2).startswith(ASSET_DIRS) else m.group(1) + BASE + '/' + m.group(2), html)
save('/index.html', html.encode())
json.dump(manifest, open(os.path.join(os.path.dirname(OUT), 'assets-manifest.json'), 'w'), indent=1)
print(len(manifest), 'files saved to', OUT)
