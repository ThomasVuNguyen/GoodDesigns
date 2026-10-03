#!/usr/bin/env python3
"""Rebuild HeyPCB/dist from https://heypcb.ai/.

Saves the server-rendered Next.js page, its stylesheets, every JS chunk (found by scanning the page and
each chunk for /_next/static paths), fonts and images. Internal page links keep their public destination
via a small click interceptor added to the page. Run from anywhere: python3 HeyPCB/tools/capture.py
"""
import os, re, json, urllib.request
BASE = 'https://heypcb.ai'
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
IMG = 'https://img.heypcb.ai/api/world/asset/'
def localise(text):
    # world renders hosted on img.heypcb.ai -> /img/<id>.png
    return re.sub(r'https://img\.heypcb\.ai/api/world/asset/([0-9a-f]+)/render\.png', r'/img/\1.png', text)
for i in set(re.findall(r'img\.heypcb\.ai/api/world/asset/([0-9a-f]+)/render\.png', html)):
    save('/img/%s.png' % i, get(IMG + i + '/render.png'))
html = localise(html)
EXT = r'(?:css|js|woff2?|otf|ttf|png|jpe?g|webp|svg|avif|gif|ico|mp4|webm|json|webmanifest|glb|gltf|wasm|bin|hdr|ktx2)'
PATH = r'/(?:_next/static/[^"\'`\s\\)?]+|[A-Za-z0-9_./-]+\.%s)' % EXT
seen = set()
def crawl(p):
    p = p.split('?')[0]
    if p in seen or p.startswith('//') or p in manifest: return
    seen.add(p)
    try: data = get(BASE + p)
    except Exception as e:
        print('skip', p, e); return
    if p.endswith(('.js', '.css')):
        text = data.decode('utf8', 'ignore')
        for m in set(re.findall(r'''["'`(](%s)''' % PATH, text)): crawl(m)
        # turbopack runtime references chunks as "static/chunks/x.js" (relative to /_next/)
        for m in set(re.findall(r'''["'`](static/(?:chunks|media)/[^"'`\s\\)?]+\.(?:js|css|woff2?|png|svg))''', text)): crawl('/_next/' + m)
    if p.endswith('.js'):
        text = localise(data.decode('utf8', 'ignore'))
        # analytics: keep posthog from initialising (it is opt-out by default and would only hit /ingest)
        text = text.replace('e.__loaded||e.init(h,{api_host:"/ingest"', 'e.__loaded||0&&e.init(h,{api_host:"/ingest"')
        data = text.encode()
    save(p, data)

for m in set(re.findall(r'''["'`(=](%s)''' % PATH, html)): crawl(m)
for m in ('/draco/draco_wasm_wrapper.js', '/draco/draco_decoder.wasm', '/draco/draco_decoder.js', '/logo.png', '/apple-touch-icon.png', '/favicon.ico', '/manifest.webmanifest'): crawl(m)

# internal page routes are not part of the capture: send those clicks to the public site
INTERCEPT = ('<script>document.addEventListener("click",function(e){var a=e.target.closest&&e.target.closest("a[href]");'
             'if(!a)return;var h=a.getAttribute("href");if(h&&h.charAt(0)==="/"&&h.charAt(1)!=="/"&&!/^\\/(_next|logo|favicon)/.test(h))'
             '{e.preventDefault();e.stopPropagation();window.open("%s"+h,"_blank","noopener")}},true)</script>' % BASE)
html = html.replace('</body>', INTERCEPT + '</body>', 1)
save('/index.html', html.encode())
json.dump(manifest, open(os.path.join(os.path.dirname(OUT), 'assets-manifest.json'), 'w'), indent=1)
print(len(manifest), 'files saved to', OUT)
