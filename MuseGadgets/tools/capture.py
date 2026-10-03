#!/usr/bin/env python3
"""Rebuild MuseGadgets/dist from https://gadgets.muse.ai/.

Saves the server-rendered Next.js page, its stylesheets, every JS chunk (found by scanning the page and
each chunk for /_next/static paths), fonts and images. Internal page links keep their public destination
via a small click interceptor added to the page. Run from anywhere: python3 MuseGadgets/tools/capture.py
"""
import os, re, json, urllib.request
BASE = 'https://gadgets.muse.ai'
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
import urllib.parse
def localise(text):
    # next/image optimizer URLs -> the original file; ?dpl= deployment tokens dropped
    def img(m):
        return urllib.parse.unquote(re.search(r'url=([^&\\"]+)', m.group(0)).group(1))
    text = re.sub(r'/_next/image\?url=[^"\'\s\\]*?(?:&amp;|&)w=\d+(?:&amp;|&)q=\d+(?:(?:&amp;|&)dpl=[A-Za-z0-9_]+)?', img, text)
    return re.sub(r'\?dpl=[A-Za-z0-9_]+', '', text)
# keep ?dpl= tokens in the HTML: the RSC payload carries length-prefixed rows, so editing it breaks hydration
_dpl = re.compile(r'\?dpl=[A-Za-z0-9_]+')
html = re.sub(r'/_next/image\?url=[^"\'\s\\\\]*?(?:&amp;|&)w=\d+(?:&amp;|&)q=\d+(?:(?:&amp;|&)dpl=[A-Za-z0-9_]+)?', lambda m: urllib.parse.unquote(re.search(r'url=([^&\\\\"]+)', m.group(0)).group(1)), html)
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
        for m in set(re.findall(r'''["'`](static/(?:chunks|media|immutable/chunks|immutable/media)/[^"'`\s\\)?]+\.(?:js|css|woff2?|png|svg))''', text)): crawl('/_next/' + m)
    if p.endswith('.js'):
        text = localise(data.decode('utf8', 'ignore'))
        # Vercel Web Analytics: point its injector at an empty script so nothing is requested from /_vercel
        text = text.replace('"/_vercel/insights/script.js"', '"data:text/javascript,"')
        data = text.encode()
    save(p, data)

for m in set(re.findall(r'''["'`(=](%s)''' % PATH, html)): crawl(m)
# the "Explore Home Link" iframe is a separate static widget (HTML + CSS + ES modules + a JSON mesh); mirror it recursively
W = '/gadgets/home-link-widget/'
wseen = set()
def widget(rel):
    if rel in wseen: return
    wseen.add(rel)
    try: data = get(BASE + W + rel)
    except Exception as e:
        print('skip widget', rel, e); return
    save(W + rel, data)
    if rel.endswith(('.js', '.css', '.html')):
        base = os.path.dirname(rel)
        for m in set(re.findall(r"""(?:from\s+|url\(|href=|src=|new URL\()["']?\.\/([A-Za-z0-9_./-]+)""", data.decode('utf8', 'ignore'))):
            widget(os.path.normpath(os.path.join(base, m)))
widget('index.html')
widget('home-link-3d/model.json')

pass

# internal page routes are not part of the capture: send those clicks to the public site
INTERCEPT = ('<script>document.addEventListener("click",function(e){var a=e.target.closest&&e.target.closest("a[href]");'
             'if(!a)return;var h=a.getAttribute("href");if(h&&h.charAt(0)==="/"&&h.charAt(1)!=="/"&&!/^\\/(_next|logo|favicon)/.test(h))'
             '{e.preventDefault();e.stopPropagation();window.open("%s"+h,"_blank","noopener")}},true)</script>' % BASE)
# the page calls two tiny JSON endpoints (signed-out session, preorder status); serve their signed-out answers statically.
# Next.js also prefetches internal routes (?_rsc=); answer those with an empty 200 so nothing 404s.
save('/api/auth/session', b'{"signedIn":false,"sdkTokens":false}')
save('/api/preorder/status', b'{"joined":false}')
SHIM = ('<script>(function(){var f=window.fetch;window.fetch=function(u,o){var s=String(u&&(u.url||u.href)||u);'
        'if(s.indexOf("_rsc=")>-1)return Promise.resolve(new Response("",{status:200,headers:{"content-type":"text/x-component"}}));'
        'return f.apply(this,arguments)}})()</script>')
html = html.replace('<head>', '<head>' + SHIM, 1)
html = html.replace('</body>', INTERCEPT + '</body>', 1)
# Vercel analytics beacon script is not captured; serve an empty stub so nothing 404s and no data is sent
save('/_vercel/insights/script.js', b'')
manifest['/_vercel/insights/script.js'] = '(empty stub for analytics script)'
save('/index.html', html.encode())
json.dump(manifest, open(os.path.join(os.path.dirname(OUT), 'assets-manifest.json'), 'w'), indent=1)
print(len(manifest), 'files saved to', OUT)
