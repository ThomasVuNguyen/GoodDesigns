#!/usr/bin/env python3
"""Rebuild StripePress/dist from the live Stripe Press homepage.

The homepage is server-rendered. Scripts, styles, fonts, and media are mirrored
under dist/cdn so the bundle's relative imports keep working. Book, film, and
podcast routes beyond this page stay on press.stripe.com.
"""

from concurrent.futures import ThreadPoolExecutor, as_completed
from hashlib import sha256
from html import unescape
from pathlib import Path
from urllib.parse import unquote, urljoin, urlparse
from urllib.request import Request, urlopen
import json
import os
import re

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "dist"
PAGE = "https://press.stripe.com/"
HOSTS = {
    "b.stripecdn.com",
    "images.stripeassets.com",
    "assets.stripeassets.com",
    "videos.stripeassets.com",
}
DROP_CONTROLLERS = {
    "Sentry",
    "ScrollDepthTracker",
    "MonitorWebVitals",
    "UniversalChatInitializer",
    "EnforceSameSiteLaxOnCookies",
    "LoaderScript",
}
SCAN_SUFFIXES = {".js", ".mjs", ".css", ".json", ".svg", ".html"}
URL_RE = re.compile(
    r"https?://(?:b\.stripecdn\.com|images\.stripeassets\.com|"
    r"assets\.stripeassets\.com|videos\.stripeassets\.com)/[^\s\"'<>\\)`,]+"
)
CSS_URL_RE = re.compile(r"url\(\s*(['\"]?)([^)'\"]+)\1\s*\)")
JS_REL_RE = re.compile(r"""['"](\./[^'"]+\.js)['"]""")
UA = {
    "User-Agent": (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
        "AppleWebKit/537.36 Chrome/131 Safari/537.36"
    )
}


def clean_url(raw):
    url = unescape(raw.split("\\")[0]).rstrip(".,);")
    parsed = urlparse(url)
    if parsed.netloc not in HOSTS or not Path(unquote(parsed.path)).suffix:
        return None
    return url


def local_rel(url):
    parsed = urlparse(url)
    path = unquote(parsed.path).lstrip("/")
    if parsed.query:
        stem = Path(path)
        digest = sha256(parsed.query.encode()).hexdigest()[:8]
        path = str(stem.with_name(f"{stem.stem}.{digest}{stem.suffix}"))
    return f"cdn/{parsed.netloc}/{path}"


def fetch(url):
    request = Request(url, headers=UA)
    with urlopen(request, timeout=120) as response:
        return response.read()


def extract(text, base_url):
    found = set()
    for match in URL_RE.finditer(text):
        url = clean_url(match.group(0))
        if url:
            found.add(url)
    if Path(urlparse(base_url).path).suffix.lower() in {".css", ".svg"} or base_url == PAGE:
        for _, raw in CSS_URL_RE.findall(text):
            if raw.startswith(("data:", "#")):
                continue
            url = clean_url(urljoin(base_url, raw))
            if url:
                found.add(url)
    if Path(urlparse(base_url).path).suffix.lower() in {".js", ".mjs"}:
        for relative in JS_REL_RE.findall(text):
            url = clean_url(urljoin(base_url, relative))
            if url:
                found.add(url)
    return found


def rewrite(text, resolver):
    def replace(match):
        url = clean_url(match.group(0))
        if url and url in resolver:
            return resolver[url]
        return match.group(0)

    return URL_RE.sub(replace, text)


def file_resolver(file_rel, mapping):
    """CSS and SVG urls resolve against the file. Other text resolves against the page."""
    suffix = Path(file_rel).suffix.lower()
    if suffix in {".css", ".svg"}:
        return {
            url: Path(os.path.relpath(rel, Path(file_rel).parent)).as_posix()
            for url, rel in mapping.items()
        }
    return {url: "./" + rel for url, rel in mapping.items()}


def prepare_html(html):
    html = re.sub(r'<template id="source-attribution-loader">.*?</template>', "", html, flags=re.S)
    html = re.sub(
        r'(<script type="application/json" id="AnalyticsConfigurationJSON"\s*>).*?(</script>)',
        r'\1{}\2',
        html,
        flags=re.S,
    )
    html = re.sub(r'<link rel="(?:preconnect|dns-prefetch)" href="https://q\.stripe\.com"[^>]*>\n?', "", html)
    html = re.sub(
        r'<iframe[^>]+src="https://support-conversations\.stripe\.com[^"]*"[^>]*>\s*</iframe>',
        "",
        html,
    )
    match = re.search(
        r'(<script type="application/json" data-js-script-registry>)(.*?)(</script>)',
        html,
        re.S,
    )
    if not match:
        return html
    kept = []
    for entry in json.loads(match.group(2)):
        name = Path(urlparse(entry["path"]).path).name
        if any(name.startswith(f"v1-{controller}-") for controller in DROP_CONTROLLERS):
            continue
        kept.append(entry)
    return html[: match.start(2)] + json.dumps(kept, separators=(",", ":")) + html[match.end(2) :]


def main():
    DIST.mkdir(parents=True, exist_ok=True)
    html = prepare_html(fetch(PAGE).decode("utf-8"))
    saved = {}
    failed = []
    pending = extract(html, PAGE)

    while pending:
        batch = [url for url in pending if url not in saved]
        pending = set()

        def download(url):
            try:
                return url, fetch(url), None
            except Exception as exc:
                return url, None, exc

        with ThreadPoolExecutor(max_workers=12) as pool:
            futures = [pool.submit(download, url) for url in batch]
            for future in as_completed(futures):
                url, data, error = future.result()
                if error:
                    failed.append(f"{url} ({error})")
                    saved[url] = None
                    continue
                rel = local_rel(url)
                target = DIST / rel
                target.parent.mkdir(parents=True, exist_ok=True)
                target.write_bytes(data)
                text = data.decode("utf-8", "replace") if Path(rel).suffix.lower() in SCAN_SUFFIXES else None
                saved[url] = (rel, text)
                if text is not None:
                    pending.update(extract(text, url))
        pending = {url for url in pending if url not in saved}

    mapping = {url: rel for url, payload in saved.items() if payload and (DIST / payload[0]).exists() for rel, _ in [payload]}
    local_import = (
        'function n(r){let e=new URL(r,document.baseURI);if(e.origin===location.origin)return!0;'
        'return o.some(t=>e.hostname===t||e.hostname.endsWith(`.${t}`))}'
        'function i(r){try{let e=new URL(r,document.baseURI).href;if(n(e))return import(e);'
    )
    remote_import = (
        'function n(r){let{hostname:e}=new URL(r);return o.some(t=>e===t||e.endsWith(`.${t}`))}'
        'function i(r){try{if(n(r))return import(r);'
    )
    for url, (rel, text) in ((url, payload) for url, payload in saved.items() if payload and payload[1] is not None):
        text = rewrite(text, file_resolver(rel, mapping))
        # The bundle only dynamic-imports https://*.stripecdn.com. Resolve local copies
        # against the page and allow this origin.
        text = text.replace(remote_import, local_import)
        (DIST / rel).write_text(text)

    html = rewrite(html, {url: "./" + rel for url, rel in mapping.items()})
    html = re.sub(r'href="https://press\.stripe\.com/?"', 'href="./"', html)
    (DIST / "index.html").write_text(html)
    manifest = {
        "reference": PAGE,
        "assets": {rel: url for url, rel in sorted(mapping.items(), key=lambda item: item[1])},
    }
    (ROOT / "assets-manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")
    print(f"Saved {len(mapping)} assets")
    if failed:
        print(f"{len(failed)} downloads failed")
        for line in failed:
            print(" ", line)


if __name__ == "__main__":
    main()
