#!/usr/bin/env python3
"""Rebuild ArcInstitute/dist from https://arcinstitute.org/tools.

Saves the server-rendered Next.js (pages router) document, its stylesheets and every JS chunk the page loads,
the Tiempos and IBM Plex fonts, and the page's images. The navbar and announcement banner are fetched from
Sanity at runtime, so their two query responses are saved under dist/data/ and a small shim in the page
answers those requests locally. Run from anywhere: python3 ArcInstitute/tools/capture.py
"""
import os, re, json, shutil, urllib.request, urllib.error, urllib.parse

BASE = 'https://arcinstitute.org'
PAGE = BASE + '/tools'
UA = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/130.0 Safari/537.36'}
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
OUT = os.path.join(ROOT, 'dist')
# The exact queries the navbar component sends (recorded from the live page).
QUERIES = json.load(open(os.path.join(os.path.dirname(__file__), 'sanity-queries.json')))
manifest = {}


def get(url):
    return urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=120).read()


def write(rel, data, source):
    p = os.path.join(OUT, rel.lstrip('/'))
    os.makedirs(os.path.dirname(p), exist_ok=True)
    with open(p, 'wb') as f:
        f.write(data)
    manifest[rel] = source


def must_sub(pattern, repl, text, count=0):
    out, n = re.subn(pattern, repl, text, count=count)
    if not n:
        raise SystemExit(f'pattern not found: {pattern}')
    return out


def must_replace(text, old, new):
    if old not in text:
        raise SystemExit(f'text not found: {old}')
    return text.replace(old, new)


shutil.rmtree(OUT, ignore_errors=True)
os.makedirs(OUT)
html = get(PAGE).decode()

# --- JS chunks and stylesheets ---
seen = set()


def patch_js(path, text):
    if '/pages/_app-' in path:
        # Google Analytics (react-ga4) and Vercel Web Analytics never load.
        # (it ends a comma expression, so it becomes void 0 rather than nothing)
        text = must_sub(r'[A-Za-z_$][\w$]*\.Ay\.initialize\("G-[A-Z0-9]+"\)', 'void 0', text)
        text = must_replace(text, '"/_vercel/insights/script.js"', '"data:text/javascript,"')
        text = must_replace(text, 'src:"https://static.cloudflareinsights.com/beacon.min.js"', 'src:"data:text/javascript,"')
    if '/chunks/main-' in path:
        # usePathname() reports the page's route (/tools) rather than the URL it is served from, so the layout
        # renders as it did on the server whether the copy sits at /, /index.html or /sites/<slug>/.
        text = must_replace(text, 'return e.pathname},[r.asPath', 'return r.pathname},[r.asPath')
    if 'imageSizes:[16,32,48' in text:
        # next/image serves the original files: there is no image optimizer on a static host.
        text = text.replace('loader:"default",dangerouslyAllowSVG:!1,unoptimized:!1', 'loader:"default",dangerouslyAllowSVG:!1,unoptimized:!0')
    return text


def crawl(path, required=True):
    path = path.split('?')[0].split('#')[0]
    if path in seen:
        return
    seen.add(path)
    try:
        data = get(BASE + path)
    except urllib.error.HTTPError as e:
        # Strings found inside scripts are only candidates; a few are prefixes, not files.
        if required:
            raise
        print('skip', path, e.code)
        return
    if path.endswith('.css'):
        css = data.decode()
        for ref in set(re.findall(r'url\(\s*["\']?(/[^"\')]+)["\']?\s*\)', css)):
            crawl(ref)
    if path.endswith('.js'):
        text = patch_js(path, data.decode())
        for ref in set(re.findall(r'''["'`](/_next/static/[^"'`\s\\)?]+)''', text)):
            crawl(ref, required=False)
        data = text.encode()
    write(path, data, BASE + path)


for ref in set(re.findall(r'(?:src|href)="(/_next/static/[^"]+)"', html)):
    crawl(ref)
crawl('/favicon.ico')

# Chunks loaded on demand (r.e(id)) by the saved scripts, resolved to file names the way the webpack runtime does.
# The runtime knows every lazy chunk of the whole site; only the ones this page's code can request are saved.
runtime = next(p for p in manifest if '/chunks/webpack-' in p)
rt = open(os.path.join(OUT, runtime.lstrip('/')), encoding='utf-8').read()
files = dict(re.findall(r'(\d+)===e\?"(static/chunks/[\w.-]+\.js)"', rt))
m = re.search(r'"static/chunks/"\+\(?\(?(\{[^}]*\})\)?\[e\]\|\|e\)?\+"\."\+\(?(\{[^}]*\})\)?\[e\]\+"\.js"', rt)
names = dict(re.findall(r'(\d+):"([\w-]+)"', m.group(1)))
for cid, h in re.findall(r'(\d+):"([0-9a-f]+)"', m.group(2)):
    files.setdefault(cid, f'static/chunks/{names.get(cid, cid)}.{h}.js')
done = set()
while True:
    ids = set()
    for p in [p for p in manifest if p.endswith('.js')]:
        ids |= set(re.findall(r'\b[a-z]\.e\((\d+)\)', open(os.path.join(OUT, p.lstrip('/')), encoding='utf-8').read()))
    ids -= done
    if not ids:
        break
    for cid in ids:
        crawl('/_next/' + files[cid])
    done |= ids

# --- Google Fonts: IBM Plex Sans and Mono, saved locally ---
gf = re.search(r'href="(https://fonts\.googleapis\.com/css2\?[^"]+)"', html).group(1).replace('&amp;', '&')
css = get(gf).decode()
for url in sorted(set(re.findall(r'url\((https://fonts\.gstatic\.com/[^)]+)\)', css))):
    rel = '/fonts/plex/' + url.rsplit('/', 2)[-2] + '-' + url.rsplit('/', 1)[-1]
    write(rel, get(url), url)
    css = css.replace(url, rel)
write('/fonts/plex/plex.css', css.encode(), gf)

# --- Images ---
# next/image optimizer URLs in the server-rendered markup become the original files.
for src in set(re.findall(r'/_next/image\?url=([^&"]+)', html)):
    crawl(urllib.parse.unquote(src))
html = re.sub(r'/_next/image\?url=([^&"]+)(?:&amp;|&)w=\d+(?:&amp;|&)q=\d+', lambda m: urllib.parse.unquote(m.group(1)), html)

# --- Sanity: the banner and navbar responses, with their dropdown photos saved at display size ---
for key, url in QUERIES.items():
    body = get(url).decode()
    for img in sorted(set(re.findall(r'https://cdn\.sanity\.io/images/[^"?]+', body))):
        name = img.rsplit('/', 1)[-1]
        rel = '/images/' + name.rsplit('.', 1)[0] + '.jpg'
        if rel not in manifest:
            write(rel, get(img + '?w=1600&fm=jpg&q=80'), img + '?w=1600&fm=jpg&q=80')
        body = body.replace(img, rel)
    write(f'/data/sanity-{key}.json', body.encode(), url)

SHIM = '''<script>(function(){var map={%s};var open=XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open=function(method,url){var u=String(url);if(u.indexOf("api.sanity.io")>-1){for(var k in map){if(u.indexOf(encodeURIComponent('"'+k+'"'))>-1||u.indexOf('%%22'+k+'%%22')>-1){arguments[1]=map[k];break}}}return open.apply(this,arguments)}})()</script>''' % ','.join(f'"{k}":"/data/sanity-{k}.json"' for k in QUERIES)

# --- Rewrite the document ---
# Cloudflare email obfuscation: restore the mailto link the React tree renders.
html = must_sub(r'<a href="/cdn-cgi/l/email-protection#[0-9a-f]+"([^>]*)><span class="__cf_email__" data-cfemail="[0-9a-f]+">\[email&#160;protected\]</span></a>',
                r'<a href="mailto:tools@arcinstitute.org"\1>tools@arcinstitute.org</a>', html)
html = must_sub(r'<script data-cfasync="false" src="/cdn-cgi/[^"]+"></script>', '', html)
html = re.sub(r'<script[^>]*cloudflareinsights[^>]*></script>', '', html)
# Google Fonts come from the local copy.
html = must_sub(r'<link rel="preconnect" href="https://fonts\.g[^"]+"[^>]*/>', '', html)
html = must_sub(r'<link href="https://fonts\.googleapis\.com/css2\?[^"]+" rel="stylesheet"/>', '<link href="/fonts/plex/plex.css" rel="stylesheet"/>', html)
html = must_replace(html, '<head>', '<head>' + SHIM)
# Other site pages are not captured: links open the public site, and Next.js never prefetches them.
INTERCEPT = ('<script>document.addEventListener("click",function(e){var a=e.target.closest&&e.target.closest("a[href]");'
             'if(!a)return;var h=a.getAttribute("href");if(h&&h.charAt(0)==="/"&&h.charAt(1)!=="/")'
             '{e.preventDefault();e.stopPropagation();window.open("%s"+h,"_blank","noopener")}},true);'
             '(function w(){var r=window.next&&window.next.router;if(r){r.prefetch=function(){return Promise.resolve()}}else{setTimeout(w,0)}})()</script>' % BASE)
html = must_replace(html, '</body>', INTERCEPT + '</body>')
write('/index.html', html.encode(), PAGE)

leftover = sorted(set(re.findall(r'(?:src|href)="(https?://(?:www\.)?(?:arcinstitute\.org|fonts\.g)[^"]*)"', html)))
if leftover:
    raise SystemExit(f'reference-domain assets left: {leftover}')
with open(os.path.join(ROOT, 'assets-manifest.json'), 'w') as f:
    json.dump(manifest, f, indent=1, sort_keys=True)
print(len(manifest), 'files saved to', OUT)
