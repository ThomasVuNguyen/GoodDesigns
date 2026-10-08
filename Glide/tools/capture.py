#!/usr/bin/env python3
"""Rebuild Glide/dist from https://www.glideapps.com/.

Saves the server-rendered Next.js page, its stylesheets, every JS chunk (found by scanning the page and
each chunk for /_next/static paths), fonts and images. Internal page links keep their public destination
via a small click interceptor added to the page. Run from anywhere: python3 Glide/tools/capture.py
"""
import os, re, json, urllib.request
BASE = 'https://www.glideapps.com'
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
# Videos hosted on Google Cloud Storage are saved locally and every reference is rewritten
GCS = 'https://storage.googleapis.com/'
def vid(u):
    name = urllib.parse.unquote(u[len(GCS):]).split('/', 1)[1]
    return '/media/' + re.sub(r'[^A-Za-z0-9._/-]+', '-', name).lower()
GCS_RE = re.compile(r'https:(?:\\?/\\?/|//)storage\.googleapis\.com/[^"\'`\s\\<>]+?\.(?:mp4|webm|png|jpe?g|webp)')
def localise_gcs(text):
    for raw in sorted(set(GCS_RE.findall(text))):
        u = raw.replace('\\/', '/')
        if vid(u) not in manifest:
            try: save(vid(u), get(u.replace(' ', '%20')))
            except Exception as e: print('skip', u, e); continue
        text = text.replace(raw, vid(u))
    return text
def patch_js(text):
    text = localise(text)
    text = localise_gcs(text)
    # next/image: serve the original files instead of the /_next/image optimizer (not available statically)
    text = text.replace('dangerouslyAllowSVG:!0,unoptimized:!1', 'dangerouslyAllowSVG:!0,unoptimized:!0')
    # no analytics, ad pixels, tag manager, chat widget or live status calls
    text = text.replace("https://www.googletagmanager.com/gtm.js?id=", "data:text/javascript,//?id=")
    text = text.replace('"https://widget.intercom.io/widget/"', '"data:text/javascript,//"')
    text = text.replace('let n=encodeURIComponent(e);return`/_next/image?url=${n}&w=${t??1080}&q=${o??75}`', 'return e')
    text = text.replace('https://ug-webapp-public-production.s3.amazonaws.com/api/js/wv-ug-teFeU63BXwtLKshH.js', 'data:text/javascript,')
    # the capture is served from another pathname than /classic; pathname-dependent UI (brand logo, nav) must still match
    text = re.sub(r'return \w\.useDynamicRouteParams\?\.\("usePathname\(\)"\),\(0,\w\.useContext\)\(\w\.PathnameContext\)', 'return"/"', text)
    text = re.sub(r'\b\w\.allowsTracking\(\)', '!1', text)
    text = text.replace('https://cdn.mgln.ai/pixel.min.js', 'data:text/javascript,')
    text = re.sub(r'f="phc_[A-Za-z0-9]+"', 'f=""', text)
    text = text.replace('https://statuspal.io/api/v1/status_pages/${e}/status', '/api/status/${e}.json')
    text = text.replace('"/_vercel/insights/script.js"', '"data:text/javascript,"')
    # Vercel Web Analytics / Speed Insights: no script source, so nothing is requested
    text = re.sub(r'"scriptSrc":"[a-f0-9]{16}/script\.js"', '"scriptSrc":""', text)
    return text

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
        data = patch_js(data.decode('utf8', 'ignore')).encode()
    save(p, data)

for m in set(re.findall(r'''["'`(=](%s)''' % PATH, html)): crawl(m)
for m in ('/favicon.ico',): crawl(m)

html = localise_gcs(html)
html = html.replace('https://d2mvefebd70kbz.cloudfront.net/scripts/01a0cebe-97a8-7cc6-93d8-2fccd75a872d.js', 'data:text/javascript,')
# Responsive variants (-<width>.avif, videos) are chosen by runtime code, so the crawl cannot see them.
# tools/extra-assets.txt lists the ones observed at 390-1920px / 1-3x; try every name x width per folder, skipping misses.
extra = [l.strip() for l in open(os.path.join(os.path.dirname(__file__), 'extra-assets.txt')) if l.strip()]
combos = set(extra)
for d in {e.rsplit('/', 1)[0] for e in extra}:
    names = {re.sub(r'-\d+\.avif$|\.av1\.mp4$|\.mp4$|\.webp$', '', e.rsplit('/', 1)[1]) for e in extra if e.startswith(d + '/')}
    widths = {m.group(1) for e in extra if e.startswith(d + '/') for m in [re.search(r'-(\d+)\.avif$', e)] if m}
    for n in names:
        for w in widths: combos.add('%s/%s-%s.avif' % (d, n, w))
for e in sorted(combos):
    if e not in manifest:
        try: save(e, get(BASE + e))
        except Exception: pass
# internal page routes are not part of the capture: send those clicks to the public site
INTERCEPT = ('<script>document.addEventListener("click",function(e){var a=e.target.closest&&e.target.closest("a[href]");'
             'if(!a)return;var h=a.getAttribute("href");if(h&&h.charAt(0)==="/"&&h.charAt(1)!=="/"&&!/^\\/(_next|logo|favicon)/.test(h))'
             '{e.preventDefault();e.stopPropagation();window.open("%s"+h,"_blank","noopener")}},true)</script>' % BASE)
# Next.js prefetches internal routes (?_rsc=); answer those with an empty 200 so nothing 404s.
SHIM = ('<script>(function(){var f=window.fetch;window.fetch=function(u,o){var s=String(u&&(u.url||u.href)||u);'
        'if(s.indexOf("_rsc=")>-1)return Promise.resolve(new Response("",{status:200,headers:{"content-type":"text/x-component"}}));'
        'return f.apply(this,arguments)}})()</script>')
html = html.replace('<head>', '<head>' + SHIM, 1)
# video poster images referenced by the page are 404 on the live site too; serve a transparent pixel so nothing 404s locally
PIXEL = bytes.fromhex('89504e470d0a1a0a0000000d49484452000000010000000108060000001f15c4890000000d49444154789c6360000002000001e221bc330000000049454e44ae426082')
for m in set(re.findall(r'/images/homepage-2025/(?:pillars|)/?[A-Za-z0-9_-]*poster[A-Za-z0-9_-]*\.(?:png|jpe?g)', html)):
    if m not in manifest:
        save(m, PIXEL); manifest[m] = '(transparent placeholder: the live site 404s on this poster)'
html = html.replace('</body>', INTERCEPT + '</body>', 1)
# Vercel analytics beacon script is not captured; serve an empty stub so nothing 404s and no data is sent
save('/_vercel/insights/script.js', b'')
manifest['/_vercel/insights/script.js'] = '(empty stub for analytics script)'
for sub in ('glideapps', 'glideapps-com'):
    save('/api/status/%s.json' % sub, get('https://statuspal.io/api/v1/status_pages/%s/status' % sub))
save('/index.html', html.encode())
json.dump(manifest, open(os.path.join(os.path.dirname(OUT), 'assets-manifest.json'), 'w'), indent=1)
print(len(manifest), 'files saved to', OUT)
