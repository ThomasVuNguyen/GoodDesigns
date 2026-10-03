#!/usr/bin/env python3
"""Rebuild Sandbox/dist from https://sandbox.cloudflare.com/.

Saves the rendered Astro page, its stylesheet, the island scripts (and their imports), Inter, and IBM Plex Mono,
then rewrites the Google Fonts link to a local @font-face. Run from anywhere: python3 Sandbox/tools/capture.py
"""
import os, re, json, urllib.request, urllib.parse
BASE = 'https://sandbox.cloudflare.com'
UA = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/124.0 Safari/537.36'}
OUT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'dist'))
manifest = {}

def get(url):
    return urllib.request.urlopen(urllib.request.Request(url, headers=UA)).read()

def save(path, data, src):
    p = os.path.join(OUT, path.lstrip('/'))
    os.makedirs(os.path.dirname(p), exist_ok=True)
    open(p, 'wb').write(data)
    manifest[path] = src

def fetch(path):
    save(path, get(BASE + path), BASE + path)
    return get(BASE + path)

html = get(BASE + '/').decode()
# analytics / unrelated third-party scripts: none observed, but strip any external script tags defensively
html = re.sub(r'<script[^>]+src="https?://[^"]+"[^>]*></script>', '', html)

# Google Fonts -> local IBM Plex Mono
css_url = 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400&display=swap'
gcss = get(css_url).decode()
for i, u in enumerate(re.findall(r'url\((https://fonts\.gstatic\.com/[^)]+)\)', gcss)):
    name = f'/fonts/ibm-plex-mono/{i}.woff2'
    save(name, get(u), u)
    gcss = gcss.replace(u, name)
save('/fonts/ibm-plex-mono/ibm-plex-mono.css', gcss.encode(), css_url)
html = re.sub(r'<link rel="preconnect" href="https://fonts\.[^>]*>', '', html)
html = html.replace(css_url, '/fonts/ibm-plex-mono/ibm-plex-mono.css')

paths = set(re.findall(r'(?:href|src|component-url|renderer-url)="(/[^"#]+\.(?:css|js|woff2|ico|png|svg))"', html))
paths |= {'/og.png'}
seen = {'/fonts/ibm-plex-mono/ibm-plex-mono.css'}
def crawl(p):
    if p in seen: return
    seen.add(p)
    try: data = fetch(p)
    except Exception as e: print('skip', p, e); return
    if p.endswith('.js'):
        d = os.path.dirname(p)
        for m in re.findall(r'''(?:from|import)\s*\(?\s*["'](\./[^"']+\.js)["']''', data.decode('utf8', 'ignore')):
            crawl(os.path.normpath(os.path.join(d, m)))
for p in sorted(paths): crawl(p)
for m in re.findall(r'url\((/[^)]+)\)', open(os.path.join(OUT, '_astro', os.path.basename([p for p in paths if p.endswith('.css') and '_astro' in p][0]))).read()):
    crawl(m)

save('/index.html', html.encode(), BASE + '/')
open(os.path.join(os.path.dirname(OUT), 'assets-manifest.json'), 'w').write(json.dumps(manifest, indent=1))
print(len(manifest), 'files saved to', OUT)
