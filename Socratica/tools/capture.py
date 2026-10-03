#!/usr/bin/env python3
"""Rebuild Socratica/dist from https://socratica.info/.

Saves the rendered Astro page, its stylesheet, and every image, font and script it references
(including srcset variants and CSS url() assets). Internal page links keep their public destination.
Run from anywhere: python3 Socratica/tools/capture.py
"""
import os, re, json, urllib.request, urllib.parse
BASE = 'https://socratica.info'
UA = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/124.0 Safari/537.36'}
OUT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'dist'))
manifest = {}

def get(url):
    return urllib.request.urlopen(urllib.request.Request(url, headers=UA)).read()

def save(path, data):
    p = os.path.join(OUT, path.lstrip('/'))
    os.makedirs(os.path.dirname(p), exist_ok=True)
    open(p, 'wb').write(data)
    manifest[path] = BASE + path

html = get(BASE + '/').decode()
# Cloudflare analytics beacon
html = re.sub(r'<script[^>]+src="https://static\.cloudflareinsights\.com[^"]*"[^>]*></script>', '', html)
EXT = r'(?:css|js|woff2?|otf|ttf|png|jpe?g|webp|svg|avif|gif|ico|mp4|webm)'
refs = set(re.findall(r'''(?:href|src|poster|component-url|renderer-url)=["'](/[^"'\s?#]+\.%s)["']''' % EXT, html))
for ss in re.findall(r'srcset="([^"]+)"', html):
    refs |= {c.split()[0] for c in ss.split(',') if c.strip().startswith('/')}
refs |= set(re.findall(r'url\((/[^)"\']+)\)', html))
refs |= {'/ogimage.png', '/favicon.ico', '/favicon.svg'}

seen = set()
def crawl(p):
    if p in seen: return
    seen.add(p)
    try: data = get(BASE + p)
    except Exception as e:
        print('skip', p, e); return
    if p.endswith('.css'):
        for m in set(re.findall(r'url\(["\']?(/[^)"\']+?)["\']?\)', data.decode())): crawl(m)
    elif p.endswith('.js'):
        d = os.path.dirname(p)
        for m in set(re.findall(r'''["'](\./[^"']+\.js)["']''', data.decode('utf8', 'ignore'))):
            crawl(os.path.normpath(os.path.join(d, m)))
        for m in set(re.findall(r'''["'`](/_astro/[^"'`\s]+\.(?:png|jpe?g|webp|svg|avif|gif))["'`]''', data.decode('utf8', 'ignore'))):
            crawl(m)
    save(p, data)
for r in sorted(refs): crawl(r)

# internal page links keep their public destination; assets stay local
html = re.sub(r'(<a\b[^>]*?\shref=")/(?!/)(?!_astro/)([^"]*)', lambda m: m.group(1) + BASE + '/' + m.group(2), html)
save('/index.html', html.encode())
json.dump(manifest, open(os.path.join(os.path.dirname(OUT), 'assets-manifest.json'), 'w'), indent=1)
print(len(manifest), 'files saved to', OUT)
