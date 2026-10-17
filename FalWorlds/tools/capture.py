#!/usr/bin/env python3
"""Rebuild FalWorlds/dist from https://fal.ai/worlds.

Saves the server-rendered Next.js (App Router, Turbopack) page with its RSC payload, so the original React app
hydrates locally, plus its stylesheets, every JS chunk (found by scanning the page and each chunk for
/_next/static paths), fonts and icons. Analytics and the consent manager are replaced with empty stubs.
Internal page links keep their public destination via a small click interceptor.
Run from anywhere: python3 FalWorlds/tools/capture.py
"""
import os, re, json, shutil, urllib.request, urllib.error, urllib.parse

BASE = 'https://fal.ai'
PAGE = BASE + '/worlds'
UA = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/130.0 Safari/537.36'}
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
OUT = os.path.join(ROOT, 'dist')
STUB = '/stub.js'
manifest = {}


def get(url):
    return urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=120).read()


def save(path, data, source):
    p = os.path.join(OUT, path.lstrip('/'))
    os.makedirs(os.path.dirname(p), exist_ok=True)
    with open(p, 'wb') as f:
        f.write(data)
    manifest[path] = source


def must_sub(pattern, repl, text):
    out, n = re.subn(pattern, repl, text)
    if not n:
        raise SystemExit(f'pattern not found: {pattern}')
    return out


shutil.rmtree(OUT, ignore_errors=True)
os.makedirs(OUT)
html = get(PAGE).decode()

EXT = r'(?:css|js|woff2?|otf|ttf|png|jpe?g|webp|svg|avif|gif|ico|mp4|webm|json|webmanifest|glb|gltf|wasm|bin|hdr|ktx2)'
PATH = r'/(?:_next/static/[^"\'`\s\\)?]+|[A-Za-z0-9_./-]+\.%s)' % EXT
seen = set()


THIRD_PARTY = r'https://(?:api\.consentjs\.datagrail\.io|pixel-cdn\.default\.com)[^"\\]*'


def patch_js(text):
    # Vercel Web Analytics and the consent manager load an empty script instead.
    text = text.replace('"/_vercel/insights/script.js"', '"data:text/javascript,"')
    # usePathname() reports the page's route (/worlds) rather than the URL it is served from. The header renders
    # differently elsewhere, so without this the page fails to hydrate at /, /index.html or /sites/<slug>/.
    text = re.sub(r'pathname:\(0,[\w$]+\.hasBasePath\)\([\w$]+\.pathname\)\?\(0,[\w$]+\.removeBasePath\)\([\w$]+\.pathname\):[\w$]+\.pathname\}',
                  'pathname:"/worlds"}', text)
    return re.sub(THIRD_PARTY, STUB, text)


def crawl(p, required=False):
    p = p.split('?')[0]
    if p in seen or p.startswith('//'):
        return
    seen.add(p)
    try:
        data = get(BASE + p)
    except urllib.error.HTTPError as e:
        # Strings found inside scripts are only candidates; a few are prefixes or other routes.
        if required:
            raise
        print('skip', p, e.code)
        return
    if p.endswith(('.js', '.css')):
        text = data.decode('utf8', 'ignore')
        # Only build files: other root paths in the bundle belong to other routes (and include analytics scripts).
        for m in set(re.findall(r'''["'`(](/_next/static/[^"'`\s\\)?]+)''', text)):
            crawl(m)
        # Turbopack references chunks as "static/chunks/x.js", relative to /_next/.
        for m in set(re.findall(r'''["'`](static/(?:chunks|media)/[^"'`\s\\)?]+\.(?:js|css|woff2?|png|svg))''', text)):
            crawl('/_next/' + m)
        if p.endswith('.css'):
            for ref in set(re.findall(r'url\(\s*["\']?([^"\')]+)["\']?\s*\)', text)):
                if not ref.startswith(('data:', '#', 'http')):
                    crawl(urllib.parse.urljoin(p, ref))
        if p.endswith('.js'):
            data = patch_js(text).encode()
    save(p, data, BASE + p)


for m in set(re.findall(r'''(?:src|href)="(/_next/static/[^"?]+)''', html)):
    crawl(m, required=True)
for m in set(re.findall(r'''["'`(=](%s)''' % PATH, html)):
    crawl(m)
for m in ('/favicon.png', '/apple-touch-icon.png', '/manifest.webmanifest'):
    crawl(m, required=True)

# Third-party scripts the page names in its markup and RSC payload (consent manager, ad pixel) point at an
# empty local stub. Their URLs sit in :HL and element rows, not in length-prefixed text rows, so the payload
# stays valid.
for url in sorted(set(re.findall(THIRD_PARTY, html))):
    html = html.replace(url, STUB)
save(STUB, b'', '(empty stub for third-party scripts)')
html = re.sub(r'<link rel="preconnect" href="https://[^"]+"/>', '', html)

# PostHog (proxied through /relay-fal and /relay-e) never initialises: the shim answers its requests with
# nothing, before any app code runs. RSC prefetches of other routes, which are not captured, never settle.
SHIM = ('<script>(function(){var block=/\\/relay-(fal|e)(\\/|$|\\?)/;var f=window.fetch;'
        'window.fetch=function(u){var s=String(u&&u.url||u);if(block.test(s))return Promise.resolve(new Response("{}",{status:200,headers:{"content-type":"application/json"}}));'
        'if(/[?&]_rsc=/.test(s)&&new URL(s,location.href).pathname!==location.pathname)return new Promise(function(){});'
        'return f.apply(this,arguments)};'
        'var o=XMLHttpRequest.prototype.open;XMLHttpRequest.prototype.open=function(m,u){if(block.test(String(u)))arguments[1]="data:application/json,{}";return o.apply(this,arguments)};'
        'var sb=navigator.sendBeacon&&navigator.sendBeacon.bind(navigator);if(sb)navigator.sendBeacon=function(u){return block.test(String(u))?true:sb.apply(null,arguments)};'
        'var d=Object.getOwnPropertyDescriptor(HTMLScriptElement.prototype,"src");Object.defineProperty(HTMLScriptElement.prototype,"src",{get:d.get,set:function(v){d.set.call(this,block.test(String(v))?"%s":v)},configurable:true})})()</script>' % STUB)
html = must_sub(r'(<head[^>]*>)', lambda m: m.group(1) + SHIM, html)

# Internal routes are not captured: clicks on them open the public site, and the router never prefetches them.
INTERCEPT = ('<script>document.addEventListener("click",function(e){var a=e.target.closest&&e.target.closest("a[href]");'
             'if(!a)return;var h=a.getAttribute("href");if(h&&h.charAt(0)==="/"&&h.charAt(1)!=="/")'
             '{e.preventDefault();e.stopPropagation();window.open("%s"+h,"_blank","noopener")}},true)</script>' % BASE)
html = must_sub(r'</body>', lambda m: INTERCEPT + '</body>', html)
save('/index.html', html.encode(), PAGE)

leftover = sorted(set(re.findall(r'(?:src|href)="(https?://[^"]*(?:fal\.ai|datagrail)[^"]*)"', html)) - {PAGE})
if leftover:
    print('absolute references left:', leftover)
with open(os.path.join(ROOT, 'assets-manifest.json'), 'w') as f:
    json.dump(manifest, f, indent=1, sort_keys=True)
print(len(manifest), 'files saved to', OUT)
