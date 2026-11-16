#!/usr/bin/env python3
"""Rebuild Mastra/dist/ from https://mastra.ai/.

mastra.ai is a Next.js App Router site built with Turbopack. The server HTML is the whole page, and the React app
hydrates it: the nav menus, the framework and observability tab panels, the WebGL shaders, the customer-story videos,
the FAQ accordion, the copy-prompt button and the footer status all run from the original client chunks. The script keeps:

- the server HTML with its flight data, the original stylesheets and fonts
- the Turbopack runtime and every chunk the page loads (found by scanning the HTML and each chunk)
- the images, sprites, logo animation, shader fallbacks and case-study videos the page uses

What it changes:
- Analytics never load. The consent manager's script list (Google Tag Manager, Google Analytics, PostHog, HubSpot,
  Reo.dev) is emptied, and Vercel Web Analytics' injector returns before it adds its script. GTM is what loaded the
  LinkedIn, X, Meta, Google Ads, Warmly and Swan tags, so those go with it.
- shim.js answers the consent manager's /init call, /api/auth/hint and /api/status locally and blocks other hosts.
- next/image is switched to unoptimized, so images load from their original files instead of /_next/image.
- Links to other routes (and llms.txt) open on the live site, so the Next.js router does not prefetch routes the
  capture lacks.

Run from anywhere: python3 Mastra/tools/capture.py   (CAPTURE_CACHE=<dir> reuses downloads between runs)
"""
import hashlib, json, os, re, shutil, time, urllib.parse, urllib.request

BASE = 'https://mastra.ai'
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
OUT = os.path.join(ROOT, 'dist')
CACHE = os.environ.get('CAPTURE_CACHE')
UA = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0 Safari/537.36'}
manifest = {}


def get(url):
    f = CACHE and os.path.join(CACHE, hashlib.sha1(url.encode()).hexdigest())
    if f and os.path.exists(f):
        return open(f, 'rb').read()
    for attempt in range(4):
        try:
            data = urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=120).read()
            break
        except urllib.error.HTTPError:
            raise
        except Exception:
            if attempt == 3:
                raise
            time.sleep(3)
    if f:
        os.makedirs(CACHE, exist_ok=True)
        open(f, 'wb').write(data)
    return data


def save(path, data, source):
    p = os.path.join(OUT, path.lstrip('/'))
    os.makedirs(os.path.dirname(p), exist_ok=True)
    open(p, 'wb').write(data)
    manifest[path] = source


ASSET = r'(?:css|js|woff2?|otf|ttf|png|jpe?g|webp|svg|avif|gif|ico|mp4|webm|json|webmanifest|lottie|riv|glb|hdr|ktx2|wasm)'
PATHS = re.compile(r'''(?:["'`(=,]|\s)(/(?!/)(?!_vercel/)[A-Za-z0-9_./%@-]+?\.ASSET)(?=[?"'`\s\\),#])'''.replace('ASSET', ASSET))
seen = set()
EXTRA = [l.strip() for l in open(os.path.join(ROOT, 'tools', 'extra-assets.txt')) if l.strip()]


# Other routes open on the live site; assets (anything with a file extension) and in-page anchors stay local.
ROUTE = r'/(?!_next/)(?![^"\\?#]*\.[a-z0-9]{2,12}(?:[?#"\\]|$))[^"\\]*'
LLMS = r'/llms(?:-full)?\.txt'


def absolutize_links(text):
    for route in (ROUTE, LLMS):
        text = re.sub(r'(<a\b[^>]*?\bhref=")(' + route + ')"', lambda m: m.group(1) + BASE + m.group(2) + '"', text)
        text = re.sub(r'(\\"href\\":\\")(' + route + r')\\"', lambda m: m.group(1) + BASE + m.group(2) + '\\"', text)
    return text


def unwrap_next_image(text):
    """/_next/image?url=<enc>&w=..&q=.. -> the original file."""
    return re.sub(r'/_next/image\?url=([^&"\'\s\\]+)(?:(?:&amp;|&|\\u0026)(?:w|q)=\d+)+',
                  lambda m: urllib.parse.unquote(m.group(1)), text)


def patch_js(path, text):
    # The consent manager's script list: GTM, GA4, PostHog, HubSpot and Reo.dev, built as one push(...) chain.
    text, n = re.subn(r'=\(\((\w+)=\[\]\)\.push\(function\(\{id:\w+,updateEventName:.*?GTM-.*?reo\.dev.*?\),\1\),',
                      '=[],', text, flags=re.S)
    assert n <= 1
    if n:
        print('analytics list emptied in', path)
    # Vercel Web Analytics: return before the script tag is created.
    text = text.replace('let n=e.scriptSrc?e.scriptSrc:s()?"https://va.vercel-scripts.com',
                        'return;let n=e.scriptSrc?e.scriptSrc:s()?"https://va.vercel-scripts.com')
    # No image optimizer on a static host.
    text = text.replace('path:"/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!1',
                        'path:"/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!0')
    # Hard-coded route links in client components open on the live site.
    # Also a component's default href (href:t="/docs") and the header's "Get Demo" link, kept in a constant.
    for route in (ROUTE, LLMS):
        text = re.sub(r'(\bhref:(?:\w+=)?")(' + route + ')"', lambda m: m.group(1) + BASE + m.group(2) + '"', text)
    text = re.sub(r'("Get Demo",\w+=")(/contact)"', lambda m: m.group(1) + BASE + m.group(2) + '"', text)
    return text


def crawl(p):
    p = urllib.parse.unquote(p.split('?')[0].split('#')[0])
    if p in seen or p.startswith('//') or not p.startswith('/'):
        return
    seen.add(p)
    try:
        data = get(BASE + urllib.parse.quote(p))
    except Exception as e:
        print('skip', p, e)
        return
    if p.endswith(('.js', '.css')):
        text = data.decode('utf8', 'ignore')
        if p.endswith('.css'):
            for m in set(re.findall(r'url\((?:"|\')?(\.\./[^)"\'?#]+)', text)):
                crawl(os.path.normpath(os.path.join(os.path.dirname(p), m)))
        for m in set(PATHS.findall(text)):
            crawl(m)
        for m in set(re.findall(r'''["'`](static/immutable/[^"'`\s\\)?]+\.(?:js|css|woff2?|png|jpe?g|svg|webp|mp4))''', text)):
            crawl('/_next/' + m)
        if p.endswith('.js'):
            text = patch_js(p, text)
        data = text.encode()
    save(p, data, BASE + p)


def main():
    if os.path.isdir(OUT):
        shutil.rmtree(OUT)
    html = get(BASE + '/').decode()
    html = absolutize_links(unwrap_next_image(html))
    for m in set(PATHS.findall(html)):
        crawl(m)
    for p in EXTRA:
        crawl(p)
    shim = open(os.path.join(ROOT, 'tools', 'shim.js')).read()
    consent = open(os.path.join(ROOT, 'tools', 'consent-init.json')).read().strip()
    save('/shim.js', shim.replace("'__CONSENT_INIT__'", json.dumps(consent)).encode(), 'local: tools/shim.js')
    html = html.replace('<head>', '<head><script src="/shim.js"></script>', 1)
    save('/index.html', html.encode(), BASE + '/')
    with open(os.path.join(ROOT, 'assets-manifest.json'), 'w') as f:
        json.dump(dict(sorted(manifest.items())), f, indent=1)
    print(len(manifest), 'files saved to', OUT)


if __name__ == '__main__':
    main()
