#!/usr/bin/env python3
"""Rebuild Mailchimp/dist from https://mailchimp.com/.

Saves the server-rendered homepage, its stylesheets, the three web fonts (Means, Graphik, Tally), every image it
references (each Contentful size/format variant as its own file) and the first-party webpack bundle with all of its
lazy chunks, so the page's own JavaScript (menus, carousels, pricing card, personalization) runs from local files.
Tracking, consent, bot-detection, chat and sign-in scripts are removed.
Run from anywhere: python3 Mailchimp/tools/capture.py
"""
import hashlib, html, json, os, re, urllib.parse, urllib.request

BASE = 'https://mailchimp.com'
UA = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36'}
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
OUT = os.path.join(ROOT, 'dist')
CACHE = os.environ.get('CAPTURE_CACHE')  # optional download cache directory for repeated runs
manifest = {}
cache = {}


def get(url):
    if url not in cache:
        f = CACHE and os.path.join(CACHE, hashlib.sha1(url.encode()).hexdigest())
        if f and os.path.exists(f):
            cache[url] = open(f, 'rb').read()
        else:
            cache[url] = urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60).read()
            if f and url != BASE + '/':
                os.makedirs(CACHE, exist_ok=True)
                open(f, 'wb').write(cache[url])
    return cache[url]


def save(path, data, source):
    p = os.path.join(OUT, path)
    os.makedirs(os.path.dirname(p), exist_ok=True)
    with open(p, 'wb') as f:
        f.write(data)
    manifest[path] = source


# ---------------------------------------------------------------- images and other media

def local_media(url):
    """Map an absolute media URL to a dist-relative path, downloading it once. Returns None to leave it alone."""
    u = urllib.parse.urlsplit(url)
    if u.netloc == 'mailchimp.com' and u.path.startswith('/ctf/'):
        stem, ext = os.path.splitext(u.path.lstrip('/'))
        q = urllib.parse.parse_qs(u.query)
        if q.get('fm'):
            ext = '.' + q['fm'][0]
        tag = '-'.join(f'{k}{v[0]}' for k, v in sorted(q.items()) if k != 'fm')
        # percent-escapes in Contentful file names become plain underscores on disk
        path = re.sub(r'%[0-9A-Fa-f]{2}', '_', f'{stem}{"." + tag if tag else ""}{ext}')
    elif u.netloc == 'digitalasset.intuit.com':
        path = 'assets/intuit/' + os.path.basename(u.path)
    elif u.netloc == 'mailchimp.com' and u.path.startswith(('/release/', '/cdn/product/fonts/')):
        path = u.path.lstrip('/')
    else:
        return None
    if path not in manifest:
        try:
            save(path, get(url), url)
        except Exception as e:
            print('skip', url, e)
            return None
    return path


MEDIA = r'https:(?:\\?/){2}(?:mailchimp\.com(?:\\?/)(?:ctf|release|cdn(?:\\?/)product(?:\\?/)fonts)|digitalasset\.intuit\.com)(?:\\?/)[^"\'\s,)<>]+'


def localize(text):
    """Point every Mailchimp/Intuit media URL in text (plain, HTML-escaped or JSON-escaped) at its local copy."""
    def repl(m):
        raw = m.group(0)
        esc = '\\/' in raw
        url = html.unescape(raw.replace('\\/', '/'))
        path = local_media(url)  # srcset descriptors and url() parens stay outside the match
        if not path:
            return raw
        return path.replace('/', '\\/') if esc else path
    return re.sub(MEDIA, repl, text)


# ---------------------------------------------------------------- HTML

DROP_SCRIPT = [
    'googletagmanager', 'gtag(', 'optimizely', 'cookie-preferences-manager', 'accounts.google.com', 'OptanonWrapper',
    '_fs_', 'beschema', '__live-person', 'go-mpulse', 'BOOMR', 'ECzXl8oSh3De', "window.tr.pushEvent('ga4",
    "'gtm.start'",  # Google Tag Manager, proxied through /metrics/
]


def patch_html(s):
    # third-party and bot-detection scripts (inline or external)
    def drop(m):
        return '' if any(k in m.group(0) for k in DROP_SCRIPT) else m.group(0)
    s = re.sub(r'<script\b[^>]*>.*?</script>', drop, s, flags=re.S)
    # mPulse's loader is an anonymous IIFE that only configures Akamai RUM
    s = re.sub(r'<script>\s*!function\(\)\{function o\(n,i\)\{if\(n&&i\).*?</script>', '', s, flags=re.S)
    # without a config, index.js falls back to its no-op error reporter (patched in patch_js to open no sessions)
    s = re.sub(r'\n\s*window\.bugsnagConfig = \{.*?\};', '', s)
    s = re.sub(r'<noscript>\s*<iframe[^>]*googletagmanager.*?</noscript>', '', s, flags=re.S)
    s = re.sub(r'<link rel="(?:preconnect|dns-prefetch)"[^>]*>', '', s)
    s = re.sub(r'<link rel="preload" href="https://cdn\.cookielaw\.org[^>]*>', '', s)
    s = re.sub(r'<link rel="preload"[^>]*cookie-preferences-manager[^>]*>', '', s)
    s = re.sub(r'<div[^>]*data-behavior="googleOneTapModal"[^>]*>\s*</div>', '', s)
    s = re.sub(r'<script[^>]*data-behavior="googleOneTapModal"[^>]*>\s*</script>', '', s)
    s = localize(s)
    # first-party files referenced root-relative: keep them local, relative to the page
    s = re.sub(r'(href|src)="/(release/plums/[^"]+|ex\.js)"', lambda m: f'{m[1]}="{fetch_local(m[2])}"', s)
    # every other root-relative link goes to the live site
    s = re.sub(r'(href|action)="/(?!/)', rf'\1="{BASE}/', s)
    return s


def fetch_local(path):
    if path not in manifest:
        data = get(f'{BASE}/{path}')
        if path.endswith('.css'):
            data = patch_css(data.decode()).encode()
        elif path.endswith('.js'):
            data = patch_js(data.decode()).encode()
        save(path, data, f'{BASE}/{path}')
    return path


def patch_css(s):
    s = localize(s)
    # url(cdn/...) inside release/plums/cxp/css/... must climb back to the site root
    def fix(m):
        url = m.group(2)
        if url.startswith(('cdn/', 'release/', 'ctf/', 'assets/')):
            return f'url({m.group(1)}/{url}{m.group(1)})'
        if url.startswith('/') and not url.startswith('//'):
            local_media(BASE + url)
        return m.group(0)
    return re.sub(r'url\((["\']?)([^)"\']+)\1\)', fix, s)


# ---------------------------------------------------------------- JS

def patch_js(s):
    s = localize(s)
    # Bugsnag: index.js falls back to a "noop" client when the page has no config. Keep that client (its React plugin
    # provides the error boundary every island renders inside) but stop it from opening sessions.
    s = s.replace('apiKey:"noop",releaseStage:"missing_config",notifyReleaseStages:["production"]',
                  'apiKey:"noop",releaseStage:"missing_config",notifyReleaseStages:["production"],autoCaptureSessions:!1')
    # Google Analytics user id lookup (a POST to the Mailchimp server) resolves empty
    s = re.sub(r'(?:\(0,\w+\.\w+\)|\b\w+)\("POST","/forms/gauid/"\)', 'Promise.resolve("{}")', s)
    # Personalization survey ("Make Mailchimp work for you"): live, it waits for OneTrust analytics consent, then shows
    # the "Customize my experience" button and opens the survey once. There is no consent banner locally, so treat
    # consent as given (button visible, as in the reference) but leave the survey closed until the button is clicked.
    s = re.sub(r'(key:"applyInitialState",value:function\(\)\{var \w=)\w\.Z\.isCategoryAllowed\(\w\.Z\.categories\.analytics\)&&!\(0,\w\.\w+\)\(\);',
               r'\1!0;', s)
    # Survey answers personalize the hero and card order through the pzn_survey_data cookie, which is only written
    # with analytics consent. Write it unconditionally.
    s = re.sub(r'(key:"setSurveyCookie",value:function\(\w\)\{if\()\w\.Z\.isCategoryAllowed\(this\.COOKIE_CATEGORY\)', r'\1!0', s)
    s = re.sub(r'\w\.Z\.set\(this\.COOKIE_CATEGORY,this\.COOKIE_NAME,(\w),\{maxAge:this\.COOKIE_MAX_AGE\}\)',
               r'document.cookie=this.COOKIE_NAME+"="+encodeURIComponent(\1)+";path=/;max-age="+this.COOKIE_MAX_AGE', s)
    s = re.sub(r'\(0,\w\.Z\)\(function\(\)\{return (\w)\.applyInitialState\(\)\}\)', r'\1.applyInitialState()', s)  # don't wait for OneTrust
    s = s.replace('(!this.savedData||0===Object.keys(this.savedData).length)&&e&&(this.open(!0)',
                  '(!this.savedData||0===Object.keys(this.savedData).length)&&!1&&(this.open(!0)')
    return s


def main():
    page = get(BASE + '/').decode()
    out = patch_html(page)

    # every lazy webpack chunk the runtime can request
    index = next(p for p in manifest if re.match(r'release/plums/cxp/js/index\.[0-9a-f]+\.1\.js$', p))
    runtime = open(os.path.join(OUT, index)).read()
    m = re.search(r'n\.u=function\(e\)\{return"chunks/js/"\+e\+"\."\+\(\{([^}]*)\}\)\[e\]\+"([^"]*)"', runtime)
    for cid, h in re.findall(r'(\d+):"([0-9a-f]+)"', m.group(1)):
        fetch_local(f'release/plums/chunks/js/{cid}.{h}{m.group(2)}')

    # fonts referenced by @font-face but not used on first paint
    for p in list(manifest):
        if p.endswith('.css'):
            for f in re.findall(r'url\(/?(cdn/product/fonts/[^)"\']+)\)', open(os.path.join(OUT, p)).read()):
                local_media(f'{BASE}/{f}')

    # The pricing card fetches /forms/pricing/?currency=USD; a static server answers it from forms/pricing/index.html
    save('forms/pricing/index.html', get(BASE + '/forms/pricing/?currency=USD'), BASE + '/forms/pricing/?currency=USD')

    # /ex.js is generated per visitor and assigns A/B variants. The reference screenshots were taken in variant 1 of
    # the homepage "GPS everywhere" test (the "Find the right plan" button under the hero CTA); pin it.
    save('ex.js', b'window.activatedExperiments = {"DT-3116-gps-everywhere-hp":"IXP2_T_1685989"};\n', BASE + '/ex.js')

    save('index.html', out.encode(), BASE + '/')
    with open(os.path.join(ROOT, 'assets-manifest.json'), 'w') as f:
        json.dump(dict(sorted(manifest.items())), f, indent=1)
    print(len(manifest), 'files saved to', OUT)


if __name__ == '__main__':
    main()
