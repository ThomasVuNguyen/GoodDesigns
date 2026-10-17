#!/usr/bin/env python3
"""Rebuild Periodic/dist from the live article page.

The page is a published Framer site. This saves the rendered HTML, the module
graph that runs its menus and interactive figures, and the fonts, images, and
videos those files reference.
"""

from concurrent.futures import ThreadPoolExecutor, as_completed
from hashlib import sha256
from html import unescape
from pathlib import Path
from urllib.parse import urlparse
from urllib.request import Request, urlopen
import json
import re

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "dist"
ASSETS = DIST / "assets"
MODULES = DIST / "vendor" / "framer"
PAGE = "https://periodic.com/news/nature-is-our-learning-environment"
SITE_PREFIX = "https://framerusercontent.com/sites/73YfDO5JS309dnip0eycRH/"
DOMAINS = {"framerusercontent.com", "fonts.gstatic.com"}
ASSET_SUFFIXES = {
    ".woff2", ".woff", ".ttf", ".otf", ".jpg", ".jpeg", ".png", ".webp",
    ".svg", ".json", ".css", ".avif", ".gif", ".mp4", ".webm", ".ico",
}
# Semicolons stay in the match so HTML entities such as &amp; are not cut off.
URL_RE = re.compile(r"https?://[^\s\"'<>\\)`,]+")
IMPORT_RE = re.compile(r"""['"`](\./[^'"`]+\.mjs)['"`]""")
UA = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/131 Safari/537.36"}


def urls_in(text):
    found = set()
    for match in URL_RE.finditer(text):
        url = unescape(match.group(0))
        if urlparse(url).netloc in DOMAINS and Path(urlparse(url).path).suffix.lower() in ASSET_SUFFIXES | {".mjs"}:
            found.add(url)
    return found


def fetch(url):
    request = Request(url, headers=UA)
    with urlopen(request, timeout=90) as response:
        return response.read()


def module_name(url):
    return Path(urlparse(url).path).name


def asset_name(url):
    path = urlparse(url).path
    suffix = Path(path).suffix.lower()
    stem = Path(path).stem[:36]
    digest = sha256(url.encode()).hexdigest()[:10]
    return f"{stem}-{digest}{suffix}"


def replace_urls(text, mjs_prefix, asset_prefix):
    def replace(match):
        url = unescape(match.group(0))
        if urlparse(url).netloc not in DOMAINS:
            return match.group(0)
        suffix = Path(urlparse(url).path).suffix.lower()
        if suffix == ".mjs" and url.startswith(SITE_PREFIX):
            return mjs_prefix + module_name(url)
        if suffix in ASSET_SUFFIXES:
            return asset_prefix + asset_name(url)
        return match.group(0)

    return URL_RE.sub(replace, text)


def main():
    ASSETS.mkdir(parents=True, exist_ok=True)
    MODULES.mkdir(parents=True, exist_ok=True)
    html = fetch(PAGE).decode("utf-8")

    module_urls = {url for url in urls_in(html) if url.startswith(SITE_PREFIX) and urlparse(url).path.endswith(".mjs")}
    pending = set(module_urls)
    modules = {}
    while pending:
        batch = pending
        pending = set()
        with ThreadPoolExecutor(max_workers=12) as pool:
            futures = {pool.submit(fetch, url): url for url in batch}
            for future in as_completed(futures):
                url = futures[future]
                modules[url] = future.result().decode("utf-8")
        for url in batch:
            for relative in IMPORT_RE.findall(modules[url]):
                dependency = SITE_PREFIX + relative.removeprefix("./")
                if dependency not in modules:
                    pending.add(dependency)
            for absolute in urls_in(modules[url]):
                if absolute.startswith(SITE_PREFIX) and absolute.endswith(".mjs") and absolute not in modules:
                    pending.add(absolute)

    asset_urls = set()
    for text in [html, *modules.values()]:
        asset_urls.update(url for url in urls_in(text) if not urlparse(url).path.endswith(".mjs"))

    with ThreadPoolExecutor(max_workers=16) as pool:
        futures = {pool.submit(fetch, url): url for url in asset_urls}
        for future in as_completed(futures):
            url = futures[future]
            (ASSETS / asset_name(url)).write_bytes(future.result())

    for url, body in modules.items():
        # Modules import siblings by filename. Media URLs are assigned onto the
        # document, so they stay relative to dist/index.html.
        text = replace_urls(body, "./", "./assets/")
        # Framer lazy-loads from the modulepreload href. Resolve that href against
        # the page so a document-relative path still imports from inside vendor/framer.
        text = text.replace(
            "r&&ct(i,()=>import(n),n)",
            "r&&ct(i,()=>import(new URL(n,document.baseURI).href),n)",
            1,
        )
        (MODULES / module_name(url)).write_text(text)

    html = re.sub(r"<script>\(function\(w,d,s,l,i\).*?</script>", "", html, flags=re.S)
    html = re.sub(r'<script async src="https://events\.framer\.com/[^>]*></script>', "", html)
    html = re.sub(
        r'<script>try\{if\(localStorage\.getItem\("__framer_force_showing_editorbar_since"\).*?</script>',
        "",
        html,
        flags=re.S,
    )
    html = re.sub(r'<link[^>]+href="https://framer\.com/edit/init\.mjs"[^>]*>', "", html)
    html = re.sub(r'<link href="https://fonts\.gstatic\.com"[^>]*>', "", html)
    html = replace_urls(html, "./vendor/framer/", "./assets/")
    # This capture is the article only. Other Periodic routes stay on the public site.
    html = html.replace('href="https://periodic.com/"', 'href="./"')
    html = re.sub(r'href="/(?!assets/|vendor/)([^"]*)"', r'href="https://periodic.com/\1"', html)
    (DIST / "index.html").write_text(html)
    manifest = {
        "reference": PAGE,
        "assets": {f"assets/{asset_name(url)}": url for url in sorted(asset_urls)},
        "framer_modules": sorted(module_name(url) for url in modules),
    }
    (ROOT / "assets-manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")
    print(f"Saved {len(asset_urls)} assets and {len(modules)} Framer modules")


if __name__ == "__main__":
    main()
