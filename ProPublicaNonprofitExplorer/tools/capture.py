#!/usr/bin/env python3
"""Rebuild ProPublicaNonprofitExplorer/dist from the live Nonprofit Explorer organization page.

Saves the server-rendered Rails page, its two stylesheets, the web fonts they declare (Feature Headline, Brut
Grotesque, Tiempos Text, Graphik and StateFace), and the first-party scripts, including the Svelte bundle that
hydrates the header, search, Subscribe button, summary charts and footer. Ads, analytics, the newsletter roadblock
and A/B testing are removed. A small fetch shim (assets/js/local-shim.js) answers the three JSON endpoints the
Svelte components call, so the page makes no request to propublica.org at runtime.
Run from anywhere: python3 ProPublicaNonprofitExplorer/tools/capture.py
"""
import hashlib, json, os, re, urllib.parse, urllib.request

PAGE = 'https://projects.propublica.org/nonprofits/organizations/521115801'
ORIGIN = 'https://projects.propublica.org'
UA = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36'}
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
OUT = os.path.join(ROOT, 'dist')
CACHE = os.environ.get('CAPTURE_CACHE')  # optional download cache directory for repeated runs
manifest = {}


def get(url):
    f = CACHE and os.path.join(CACHE, hashlib.sha1(url.encode()).hexdigest())
    if f and os.path.exists(f):
        return open(f, 'rb').read()
    data = urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60).read()
    if f:
        os.makedirs(CACHE, exist_ok=True)
        open(f, 'wb').write(data)
    return data


def save(path, data, source):
    p = os.path.join(OUT, path)
    os.makedirs(os.path.dirname(p), exist_ok=True)
    with open(p, 'wb') as fh:
        fh.write(data if isinstance(data, bytes) else data.encode())
    manifest[path] = source


def local(url, folder):
    """Download url once into assets/<folder>/ and return its dist-relative path."""
    name = os.path.basename(urllib.parse.urlsplit(url).path)
    path = f'assets/{folder}/{name}'
    if path not in manifest:
        save(path, get(url), url)
    return path


# ---------------------------------------------------------------- stylesheets

FONT = r'url\(\s*["\']?(https://(?:assets\.propublica\.org|static\.propublica\.org)/[^"\')?#]+)([?#][^"\')]*)?["\']?\s*\)'


def patch_css(css):
    def font(m):
        return f'url("../fonts/{os.path.basename(local(m[1], "fonts"))}{m[2] or ""}")'
    return re.sub(FONT, font, css)


# ---------------------------------------------------------------- scripts

SERIES_IMAGES = r'https://www\.propublica\.org/wp-content/uploads/[^"]+'


def patch_bundle(js):
    # The menu's three featured-series cards: their images are saved locally (relative to the page).
    def img(m):
        url = m[0]
        stem, ext = os.path.splitext(os.path.basename(urllib.parse.urlsplit(url).path))
        path = f'assets/img/{stem[:60]}{ext.lower()}'
        if path not in manifest:
            save(path, get(url), url)
        return path
    js = re.sub(SERIES_IMAGES, img, js)
    # NewsletterModal's defaults point at the roadblock script; the component is not rendered locally, but keep
    # the bundle free of propublica.org script URLs so nothing can load them.
    js = js.replace('<script src="https://www.google.com/recaptcha/api.js?onload=grecaptchaLoaded&amp;render=6LcC1roqAAAAAK9equRCqsCagWPYzf79SKrxGFGY" async=""><\\/script> <script src="https://assets.propublica.org/static/prod/v5/js/deploy/utils.js" async=""><\\/script> <script src="https://assets.propublica.org/static/prod/v5/js/deploy/user-funnel.js" async=""><\\/script> <script src="https://assets.propublica.org/static/prod/v5/js/deploy/recaptcha-init.js" async=""><\\/script>', '<!---->')
    return js


SHIM = """// Local stand-ins for the JSON endpoints the Svelte components fetch (added by tools/capture.py).
// Live, an anonymous visitor gets a CSRF token, a 403 from the subscription list (so Subscribe shows its email
// form), and a 200 when the verification email is sent. The same answers are given here without a network call.
(function () {
  var realFetch = window.fetch.bind(window);
  function json(body, status) {
    return Promise.resolve(new Response(JSON.stringify(body), { status: status || 200, headers: { 'Content-Type': 'application/json' } }));
  }
  window.fetch = function (input, init) {
    var url = new URL(typeof input === 'string' ? input : input.url, location.href);
    var p = url.pathname;
    if (/\\/csrf-token\\.json$/.test(p)) return json('local-csrf-token');
    if (/\\/nonprofits\\/subscriptions\\.json$/.test(p)) return json({ error: 'Not signed in' }, 403);
    if (/\\/nonprofits\\/send-verification-email$/.test(p)) return json({ ok: true });
    if (/\\/nonprofits\\/subscriptions(\\/\\d+)?$/.test(p)) return json({ ok: true });
    return realFetch(input, init);
  };
})();
"""


# ---------------------------------------------------------------- HTML

DROP_SCRIPT = ['window.dataLayer', 'beacons.js', 'buysellads', 'parsely.com', 'convertexperiments', '_conv_prevent_bodyhide']


def patch_html(s):
    def drop(m):
        return '' if any(k in m[0] for k in DROP_SCRIPT) else m[0]
    s = re.sub(r'<script\b[^>]*>.*?</script>', drop, s, flags=re.S)
    s = re.sub(r'\s*<meta name="(?:parsely-section|google-site-verification)"[^>]*>', '', s)
    # IE-only legacy stylesheet
    s = re.sub(r'\s*<!--\[if IE\]>.*?<!\[endif\]-->', '', s, flags=re.S)
    # The newsletter roadblock: a Svelte island whose config is followed by its (empty) display:contents host.
    s = re.sub(r'<script type="application/json" class="svelte-config">\s*\{"componentName":"NewsletterModal".*?</script>\s*<div[^>]*>\s*(?:<!--.*?-->\s*)*</div>', '', s, flags=re.S)

    # first-party stylesheets and scripts
    def asset(m):
        url = m[2]
        if url.endswith('.css'):
            path = f'assets/css/{os.path.basename(url)}'
            if path not in manifest:
                save(path, patch_css(get(url).decode()), url)
        else:
            path = f'assets/js/{os.path.basename(url)}'
            if path not in manifest:
                js = get(url).decode()
                if 'hydrate-svelte-components' in url:
                    js = patch_bundle(js)
                js = re.sub(r'\n?//# sourceMappingURL=\S+', '', js)
                save(path, js, url)
        return f'{m[1]}="{path}"'
    s = re.sub(r'(src|href)="(https://static\.propublica\.org/rails/assets/nonprofits/[^"]+\.(?:css|js))"', asset, s)
    # the fetch shim runs before every other script
    save('assets/js/local-shim.js', SHIM, 'authored')
    s = s.replace('<head>', '<head>\n    <script src="assets/js/local-shim.js"></script>', 1)

    # Svelte endpoints: the search form submits to the live site; the JSON endpoints stay root-relative so the
    # shim recognises them.
    s = s.replace('"orgEndpoint":"/nonprofits/search"', f'"orgEndpoint":"{ORIGIN}/nonprofits/search"')
    s = s.replace('"peopleEndpoint":"/nonprofits/name_search"', f'"peopleEndpoint":"{ORIGIN}/nonprofits/name_search"')
    s = s.replace('"fullTextEndpoint":"/nonprofits/full_text_search"', f'"fullTextEndpoint":"{ORIGIN}/nonprofits/full_text_search"')
    # every root-relative link (filings, schedules, PDFs, state page, contact) opens the live site
    s = re.sub(r'(href|action|data-href)="/(?!/)', rf'\1="{ORIGIN}/', s)
    return s


def main():
    html = get(PAGE).decode()
    save('index.html', patch_html(html), PAGE)
    # CSS fonts that are declared but never requested still resolve locally; nothing points at propublica.org.
    with open(os.path.join(ROOT, 'assets-manifest.json'), 'w') as fh:
        json.dump(dict(sorted(manifest.items())), fh, indent=1)
        fh.write('\n')
    print(len(manifest), 'files')


if __name__ == '__main__':
    main()
