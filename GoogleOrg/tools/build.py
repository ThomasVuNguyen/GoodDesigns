#!/usr/bin/env python3
"""Turn the google.org homepage into GoogleOrg/dist.

Usage: python3 GoogleOrg/tools/build.py [saved.html]

Without an argument the live page is fetched. The server-rendered markup is
kept as delivered. Tag Manager and the cookie bar are removed, and the page
stylesheet, the Glue runtime with all of its webpack chunks, fonts, images,
and the ambient video are saved under dist/assets/ and pointed to locally.
"""

from __future__ import annotations

import json
import re
import sys
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "dist"
ASSETS = DIST / "assets"
PAGE = "https://www.google.org/"
GLUE = "https://www.gstatic.com/marketing-cms/reviewed-scripts/prod/google-org-1.2.5/"
UA = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36"
}
FONT_SUBSETS = {"latin", "latin-ext"}

manifest: dict[str, dict[str, str]] = {}


def fetch(url: str) -> bytes:
    with urlopen(Request(url, headers=UA), timeout=120) as response:
        return response.read()


def save(url: str, rel: str, role: str) -> str:
    """Download url to dist/<rel> once and return rel."""
    path = DIST / rel
    if not path.exists() or path.stat().st_size == 0:
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_bytes(fetch(url))
    manifest[rel] = {"role": role, "source": url}
    return rel


def save_glue() -> None:
    """The stylesheet, the runtime, and every chunk the runtime can request.

    The runtime derives its public path from its own src ("../../" above
    styles/default/), so the files keep their published layout.
    """
    save(GLUE + "styles/default/All.min.css", "assets/glue/styles/default/All.min.css", "page stylesheet")
    runtime = save(GLUE + "styles/default/All.min.js", "assets/glue/styles/default/All.min.js", "Glue runtime")
    source = (DIST / runtime).read_text()
    table = re.search(r"i\.u=function\(e\)\{return e\+\"\.\"\+\{([^}]+)\}", source).group(1)
    chunks = [f"{cid}.{digest}.js" for cid, digest in re.findall(r'(\d+):"([0-9a-f]+)"', table)]
    with ThreadPoolExecutor(8) as pool:
        list(pool.map(lambda name: save(GLUE + name, f"assets/glue/{name}", "runtime chunk"), chunks))


def save_fonts(html: str) -> str:
    href = re.search(r'<link href="(https://fonts\.googleapis\.com/css\?[^"]+)" rel="stylesheet"[^>]*>', html).group(1)
    css = fetch(href.replace("&amp;", "&")).decode()
    kept = []
    for subset, block in re.findall(r"/\* ([\w-]+) \*/\s*(@font-face \{.*?\})", css, re.S):
        if subset not in FONT_SUBSETS:
            continue
        url = re.search(r"url\((https://[^)]+)\)", block).group(1)
        family = re.search(r"font-family: '([^']+)'", block).group(1).lower().replace(" ", "-")
        name = f"{family}-{Path(url).stem}.woff2"
        save(url, f"assets/fonts/{name}", f"{family} ({subset})")
        kept.append(f"/* {subset} */\n" + block.replace(url, name))
    (ASSETS / "fonts" / "fonts.css").write_text("\n".join(kept) + "\n")
    return html


def image_name(url: str) -> str:
    """greenlight.png=n-w840-h472-fcrop64=1,00000eb3fffff111-rw -> greenlight-840x472.webp"""
    base, _, params = url.partition("=")
    stem = Path(base).stem
    if not params:
        return Path(base).name
    size = re.search(r"n-w(\d+)-h(\d+)", params)
    if size:
        return f"{stem}-{size.group(1)}x{size.group(2)}.webp"
    scale = re.match(r"s(\d+)", params)
    return f"{stem}-{scale.group(1)}.png"


def localize_images(html: str) -> str:
    pattern = re.compile(r"https://www\.gstatic\.com/marketing-cms/assets/images/[0-9a-f/]+/[^\s\"'=]+(?:=[^\s\"']*?(?:-rw|s\d+))?(?=[\s\"',])")
    urls = sorted(set(pattern.findall(html)))
    names: dict[str, str] = {}
    for url in urls:
        name = image_name(url)
        if name.startswith("google-org-full-color-logo"):
            name = "google-org-logo.svg"
        if name.startswith("logo-google-search-round"):
            name = name.replace("logo-google-search-round-color-1x-web-64dp", "favicon")
        assert name not in names.values(), f"two sources map to {name}"
        names[url] = name

    def one(url: str) -> None:
        role = "favicon" if names[url].startswith("favicon") else "image"
        save(url, f"assets/images/{names[url]}", role)

    with ThreadPoolExecutor(8) as pool:
        list(pool.map(one, urls))
    # Longest first so no URL is replaced inside a longer one.
    for url in sorted(names, key=len, reverse=True):
        html = html.replace(url, f"assets/images/{names[url]}")
    return html


def localize_video(html: str) -> str:
    sources = re.findall(r'<source src="(https://www\.gstatic\.com/marketing-cms/[^"]+\.mp4)" type="video/mp4">', html)
    # Both sources are the same 7 MB file; the browser only ever plays the first.
    save(sources[0], "assets/video/ambient.mp4", "ambient video")
    html = html.replace(f'<source src="{sources[0]}"', '<source src="assets/video/ambient.mp4"')
    for extra in sources[1:]:
        html = html.replace(f'<source src="{extra}" type="video/mp4">', "")
    return html


def strip_third_party(html: str) -> str:
    html = re.sub(r"<!-- Google Tag Manager -->.*?<!-- End Google Tag Manager -->", "", html, flags=re.S)
    html = re.sub(r"<!-- Google Tag Manager \(noscript\) -->.*?<!-- End Google Tag Manager \(noscript\) -->", "", html, flags=re.S)
    html = re.sub(r'<link rel="preconnect"[^>]*>', "", html)
    html = re.sub(r'<link rel="preload" href="https://fonts\.googleapis\.com[^>]*>', "", html)
    html = re.sub(r'<link href="https://fonts\.googleapis\.com/css\?[^>]*>', '<link href="assets/fonts/fonts.css" rel="stylesheet">', html)
    html = re.sub(r'<link href="https://www\.gstatic\.com/glue/cookienotificationbar/[^>]*>', "", html)
    html = re.sub(r'<script src="https://www\.gstatic\.com/glue/cookienotificationbar/[^>]*>\s*</script>', "", html)
    # Without the cookie bar its footer control has nothing to open.
    html = re.sub(r'<li class="glue-footer__global-links-list-item">\s*<button class="glue-footer__link glue-cookie-notification-bar-control"[^>]*>.*?</button>\s*</li>', "", html, flags=re.S)
    html = re.sub(r'\s+nonce="[^"]*"', "", html)
    return html


def localize_glue(html: str) -> str:
    html = html.replace(GLUE + "styles/default/All.min.css", "assets/glue/styles/default/All.min.css")
    html = html.replace(GLUE + "styles/default/All.min.js", "assets/glue/styles/default/All.min.js")
    return html


def localize_links(html: str) -> str:
    # The logos point at the site root; here that is this page.
    return html.replace('href="/"', 'href="./"')


def main() -> None:
    html = Path(sys.argv[1]).read_text() if len(sys.argv) > 1 else fetch(PAGE).decode()
    DIST.mkdir(exist_ok=True)
    save_glue()
    html = save_fonts(html)
    html = strip_third_party(html)
    html = localize_glue(html)
    html = localize_images(html)
    html = localize_video(html)
    html = localize_links(html)
    leftovers = sorted(set(re.findall(r'(?:src|srcset|href)="(https://www\.gstatic\.com[^"]*|https://fonts[^"]*)', html)))
    assert not leftovers, leftovers
    (DIST / "index.html").write_text(html)
    (ROOT / "assets-manifest.json").write_text(json.dumps(dict(sorted(manifest.items())), indent=2) + "\n")
    print(f"wrote dist/index.html, {len(manifest)} assets")


if __name__ == "__main__":
    main()
