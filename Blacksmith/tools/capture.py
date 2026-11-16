#!/usr/bin/env python3
"""Rebuild Blacksmith/dist/ from https://www.blacksmith.sh/.

blacksmith.sh is a Webflow design served by Next.js (App Router, Turbopack). The server HTML holds the Webflow markup;
after hydration a client component loads Webflow's own runtime (jQuery, the Webflow/IX2 bundle, GSAP, forms.js,
site.js and the page script home.js) and Finsweet's marquee and cookie-consent components. The script keeps all of it:

- the server HTML with its flight data, the original stylesheets and fonts
- the Turbopack runtime and every chunk it lists
- the Webflow scripts, images, fonts and background videos the page uses
- Finsweet's components (pinned versions from jsDelivr) under vendor/finsweet/

What it changes:
- Links to other routes open on the live site, so the Next.js router does not prefetch routes the capture lacks.
- Analytics never load: the Google Tag Manager, Plausible, RB2B and HubSpot <Script> entries are removed from the
  flight data with their preload hints, and the PostHog key is blanked so PostHog never initialises.
- Finsweet's loaders point at local copies. shim.js answers Finsweet's licence check and blocks other hosts.
- The YouTube films behind the two play buttons stay YouTube embeds; home.js loads YouTube's API only on click.

Run from anywhere: python3 Blacksmith/tools/capture.py   (CAPTURE_CACHE=<dir> reuses downloads between runs)
"""
import hashlib, json, os, re, shutil, time, urllib.parse, urllib.request

BASE = 'https://www.blacksmith.sh'
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
OUT = os.path.join(ROOT, 'dist')
CACHE = os.environ.get('CAPTURE_CACHE')
UA = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0 Safari/537.36'}
# Finsweet, pinned to the versions jsDelivr resolved on the capture date.
FS_COMPONENTS = ('https://cdn.jsdelivr.net/npm/@finsweet/fs-components@2/fs-components.js',
                 'https://cdn.jsdelivr.net/npm/@finsweet/fs-components@2.3.59/', '/vendor/finsweet/fs-components/')
FS_CC = ('https://cdn.jsdelivr.net/npm/@finsweet/cookie-consent@1/fs-cc.js',
         'https://cdn.jsdelivr.net/npm/@finsweet/cookie-consent@1.15.0/fs-cc.js', '/vendor/finsweet/cookie-consent/fs-cc.js')
WF_CHECKBOX = ('https://d3e54v103j8qbb.cloudfront.net/static/custom-checkbox-checkmark.589d534424.svg',
               '/vendor/webflow/custom-checkbox-checkmark.svg')
manifest = {}


def get(url):
    f = CACHE and os.path.join(CACHE, hashlib.sha1(url.encode()).hexdigest())
    if f and os.path.exists(f):
        return open(f, 'rb').read()
    for attempt in range(4):
        try:
            data = urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=120).read()
            break
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


# Other routes open on the live site; assets (anything with a file extension) and in-page anchors stay local.
ROUTE = r'/(?!_next/)(?![^"\\?#]*\.[a-z0-9]{2,12}(?:[?#"\\]|$))[^"\\]*'


def absolutize_links(text):
    text = re.sub(r'(<a\b[^>]*?\bhref=")(' + ROUTE + ')"', lambda m: m.group(1) + BASE + m.group(2) + '"', text)
    text = re.sub(r'(\\"href\\":\\")(' + ROUTE + r')\\"', lambda m: m.group(1) + BASE + m.group(2) + '\\"', text)
    return text


def patch_js(path, text):
    # No analytics: PostHog's helpers check the key's length before they initialise.
    text = re.sub(r'let (\w+)="phc_\w+";', r'let \1="";', text)
    text = text.replace(FS_CC[0], FS_CC[2])
    # fs-components finds its own <script> by comparing the src attribute with import.meta.url, so the src must be absolute.
    text = text.replace(f'"{FS_COMPONENTS[0]}"', f'new URL("{FS_COMPONENTS[2]}fs-components.js",location.href).href')
    # Hard-coded route links in client components open on the live site.
    text = re.sub(r'(\bhref:")(' + ROUTE + ')"', lambda m: m.group(1) + BASE + m.group(2) + '"', text)
    return text


ASSET = r'(?:css|js|woff2?|otf|ttf|png|jpe?g|webp|svg|avif|gif|ico|mp4|webm|json|webmanifest|lottie|riv)'
PATHS = re.compile(r'''(?:["'`(=,]|\s)((?:/_next/static/[^"'`\s\\?#]+?|/(?:webflow|images)/[A-Za-z0-9_./%@-]+?)\.ASSET)(?=[?"'`\s\\),#])'''.replace('ASSET', ASSET))
seen = set()
# Assets the page requests at runtime, recorded from the live page at 1280 and 390 px with a full scroll.
EXTRA = [l.strip() for l in open(os.path.join(ROOT, 'tools', 'extra-assets.txt')) if l.strip()]


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
            if WF_CHECKBOX[0] in text:
                save(WF_CHECKBOX[1], get(WF_CHECKBOX[0]), WF_CHECKBOX[0])
                text = text.replace(WF_CHECKBOX[0], WF_CHECKBOX[1])
        for m in set(PATHS.findall(text)):
            crawl(m)
        # Turbopack lists chunks relative to its base path ("/_next/").
        for m in set(re.findall(r'''["'`](static/immutable/[^"'`\s\\)?]+\.(?:js|css|woff2?|png|svg))''', text)):
            crawl('/_next/' + m)
        if p.endswith('.js'):
            text = patch_js(p, text)
        data = text.encode()
    save(p, data, BASE + p)


def vendor_finsweet():
    """fs-components.js imports its chunks relatively (./dist/...); save the module graph next to it."""
    src, local = FS_COMPONENTS[1], FS_COMPONENTS[2]
    todo, done = ['fs-components.js'], set()
    while todo:
        rel = todo.pop()
        if rel in done:
            continue
        done.add(rel)
        text = get(src + rel).decode()
        for m in re.findall(r'''(?:from\s*|import\s*\(?\s*)["'](\./[^"']+\.js)["']''', text):
            todo.append(os.path.normpath(os.path.join(os.path.dirname(rel), m)))
        save(local + rel, text.encode(), src + rel)
    save(FS_CC[2], get(FS_CC[1]), FS_CC[1])


def strip_analytics(html):
    # The root layout renders four afterInteractive <Script>s (GTM, Plausible, RB2B, HubSpot) as one array row.
    html, n = re.subn(r'(\\nb:\[)\[\[\\"\$\\",\\"\$L\w+\\",null,\{\\"id\\":\\"gtm-init\\".*?\\"hs-script-loader\\"[^\]]*\]\](,\[\\"\$\\",\\"\$L\w+\\",null,\{\}\]\])',
                      r'\1[]\2', html, count=1, flags=re.S)
    assert n == 1, 'analytics script row not found'
    html = re.sub(r'<link rel="preload" href="https://[^"]+" as="script"/>', '', html)
    return html


def main():
    if os.path.isdir(OUT):
        shutil.rmtree(OUT)
    html = get(BASE + '/').decode()
    html = strip_analytics(absolutize_links(html))
    for m in set(PATHS.findall(html)):
        crawl(m)
    for m in set(re.findall(r'href="(/(?:favicon|icon|apple-icon)[^"?]*)', html)):
        crawl(m)
    for p in EXTRA:
        crawl(p)
    vendor_finsweet()

    save('/shim.js', open(os.path.join(ROOT, 'tools', 'shim.js'), 'rb').read(), 'local')
    html = html.replace('<head>', '<head><script src="/shim.js"></script>', 1)
    save('/index.html', html.encode(), BASE + '/')
    with open(os.path.join(ROOT, 'assets-manifest.json'), 'w') as f:
        json.dump(dict(sorted(manifest.items())), f, indent=1)
    print(len(manifest), 'files saved to', OUT)


if __name__ == '__main__':
    main()
