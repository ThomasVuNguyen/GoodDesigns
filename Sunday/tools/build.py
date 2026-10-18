#!/usr/bin/env python3
"""Turn a captured sunday.ai homepage into Sunday/dist.

Reads /tmp/sunday.html (the server-rendered page). Writes localized HTML, CSS,
fonts, and images. Video files are produced separately into dist/assets/video.
"""

from __future__ import annotations

import json
import re
import shutil
from concurrent.futures import ThreadPoolExecutor, as_completed
from html import unescape
from pathlib import Path
from urllib.parse import parse_qs, unquote, urlparse
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "dist"
SOURCE = Path("/tmp/sunday.html")
CSS_DIR = Path("/tmp/sunday-css")
UA = {"User-Agent": "Mozilla/5.0 (compatible; GoodDesigns/1.0)"}
ORIGIN = "https://www.sunday.ai"

HATS = {
    "a03dddcb2acf8300785038332f514d1d2829c070-1280x1280.jpg": "hat-bucket.jpg",
    "80b9210779122ad721e355b5cd966b1d9d122e13-1280x1280.jpg": "hat-headset.jpg",
    "f6ef28dc5da0808de3b30bb67111d58aed8bdf41-1280x1280.jpg": "hat-terrace.jpg",
    "7278b7593d112f3ba4eb6c59865d28f35131e69f-1280x1280.jpg": "hat-study.jpg",
}


def fetch(url: str) -> tuple[bytes, str]:
    request = Request(url, headers=UA)
    with urlopen(request, timeout=90) as response:
        data = response.read()
        ctype = response.headers.get("content-type", "")
    return data, ctype


def upstream(raw: str) -> str | None:
    raw = unescape(raw)
    if raw.startswith("/_next/image"):
        query = parse_qs(urlparse(raw).query)
        target = query.get("url", [None])[0]
        return unquote(target) if target else None
    if raw.startswith("https://cdn.sanity.io/") or raw.startswith("https://image.mux.com/"):
        return raw.split("?")[0]
    return None


def asset_name(url: str) -> str:
    if "image.mux.com/" in url:
        playback = url.split("image.mux.com/")[1].split("/")[0]
        return f"mux-{playback}.webp"
    name = Path(urlparse(url).path).name
    if name in HATS:
        return HATS[name]
    stem = Path(name).stem
    return f"sanity-{stem}.webp"


def download_url(url: str, name: str) -> str:
    if name.startswith("mux-"):
        playback = name.removeprefix("mux-").removesuffix(".webp")
        return f"https://image.mux.com/{playback}/thumbnail.webp?time=0&width=1600"
    if name.startswith("hat-"):
        return url
    return url + "?w=2000&h=2000&fit=max&auto=format&q=75"


def collect_images(html: str) -> dict[str, str]:
    found: dict[str, str] = {}
    for raw in re.findall(r'(?:src|srcSet|imageSrcSet)="([^"]+)"', html):
        # srcSet can hold several candidates.
        for part in raw.split(","):
            token = part.strip().split(" ")[0]
            if not token:
                continue
            source = upstream(token)
            if source:
                found[source] = asset_name(source)
    for filename in HATS:
        url = f"https://cdn.sanity.io/images/1omys9i3/production/{filename}"
        found[url] = HATS[filename]
    return found


def sniffed_name(name: str, data: bytes) -> str:
    if data.startswith(b"\xff\xd8"):
        ext = ".jpg"
    elif data.startswith(b"\x89PNG"):
        ext = ".png"
    elif data[:4] == b"RIFF" and data[8:12] == b"WEBP":
        ext = ".webp"
    else:
        ext = Path(name).suffix
    return str(Path(name).with_suffix(ext))


def save_images(mapping: dict[str, str]) -> dict[str, str]:
    dest = DIST / "assets" / "images"
    dest.mkdir(parents=True, exist_ok=True)
    manifest = {}

    def one(item):
        url, name = item
        data = None
        # Reuse a file already saved under any extension.
        stem = Path(name).stem
        existing = list(dest.glob(stem + ".*"))
        if existing and existing[0].stat().st_size > 1000:
            path = existing[0]
        else:
            data, _ = fetch(download_url(url, name))
            name = sniffed_name(name, data)
            path = dest / name
            path.write_bytes(data)
        return url, f"/assets/images/{path.name}", path.stat().st_size

    with ThreadPoolExecutor(max_workers=8) as pool:
        futures = [pool.submit(one, item) for item in mapping.items()]
        for future in as_completed(futures):
            url, local, size = future.result()
            manifest[url] = {"file": local, "bytes": size}
            print(f"image {size:8d} {local}")
    return manifest


def rewrite_images(html: str, local_by_source: dict[str, str]) -> str:

    def local_for(token: str) -> str | None:
        source = upstream(unescape(token.strip().split(" ")[0]))
        return local_by_source.get(source) if source else None

    def img_tag(match: re.Match) -> str:
        tag = match.group(0)
        src = re.search(r'\ssrc="([^"]+)"', tag)
        if not src:
            return tag
        local = local_for(src.group(1))
        if not local:
            return tag
        tag = re.sub(r'\ssrcSet="[^"]*"', "", tag)
        tag = re.sub(r'\ssrc="[^"]*"', f' src="{local}"', tag, count=1)
        if 'slot="poster"' not in tag and re.search(r"<video\b", html[match.end() : match.end() + 400]):
            tag = tag.replace("<img ", '<img slot="poster" ', 1)
        return tag

    html = re.sub(r"<img\b[^>]*>", img_tag, html)
    html = re.sub(r'<link rel="preload" as="image"[^>]*>', "", html)
    return html


def attach_videos(html: str) -> str:
    def repl(match: re.Match) -> str:
        tag = match.group(0)
        if " src=" in tag:
            return tag
        window = html[max(0, match.start() - 3000) : match.start()]
        ids = re.findall(r"image\.mux\.com(?:%2F|/)([A-Za-z0-9]{20,})", window)
        if not ids:
            return tag
        return tag.replace("<video ", f'<video src="/assets/video/{ids[-1]}.mp4" ', 1)

    return re.sub(r"<video\b[^>]*>", repl, html)


def rewrite_links(html: str) -> str:
    def anchor(match: re.Match) -> str:
        tag = match.group(0)
        href = re.search(r'\shref="([^"]*)"', tag)
        if not href:
            return tag
        value = href.group(1)
        if value.startswith(("#", "http", "mailto", "tel")):
            return tag
        if value == "/":
            replacement = "./"
        elif value.startswith("/"):
            replacement = ORIGIN + value
        else:
            return tag
        return tag.replace(f'href="{value}"', f'href="{replacement}"', 1)

    return re.sub(r"<a\b[^>]*>", anchor, html)


def strip_runtime(html: str) -> str:
    html = re.sub(r"<script\b[^>]*>[\s\S]*?</script>", "", html)
    html = re.sub(r'<link[^>]+rel="preload"[^>]+as="script"[^>]*>', "", html)
    html = re.sub(r'<link[^>]+as="script"[^>]*>', "", html)
    html = re.sub(r"<link[^>]+rel=\"modulepreload\"[^>]*>", "", html)
    return html


def patch_markup(html: str) -> str:
    html = html.replace(
        'class="absolute top-0 z-1000 flex h-[calc(100lvh+80px)] w-full cursor-progress',
        'hidden class="absolute top-0 z-1000 flex h-[calc(100lvh+80px)] w-full cursor-progress',
        1,
    )
    html = html.replace(
        'style="opacity:0;transform:translateY(20px)"',
        'style="opacity:1;transform:none"',
        1,
    )
    html = html.replace(
        'xl:px-26" style="opacity:0"',
        'xl:px-26" style="opacity:1"',
        1,
    )
    html = html.replace(
        "sticky top-[30vh] self-start max-lg:mx-auto lg:top-0",
        "word-stick sticky top-[30vh] self-start max-lg:mx-auto lg:top-0",
    )
    html = html.replace(
        'class="fixed top-0 right-0 left-0 z-40 hidden h-full w-full bg-transparent sm:block invisible opacity-0"',
        'id="menu-scrim" class="fixed top-0 right-0 left-0 z-40 hidden h-full w-full bg-black/40 sm:block invisible opacity-0"',
    )
    html = html.replace(
        'aria-label="Open menu"',
        'id="menu-button" aria-label="Open menu" aria-expanded="false"',
        1,
    )
    html = html.replace(
        'style="width:var(--toc-width-closed);height:20px;transform:translateX(200%)"',
        'id="toc-pill" style="width:var(--toc-width-closed);height:130px;transform:translateX(200%)"',
        1,
    )
    html = html.replace(
        '<span>Cast your vote now</span>',
        '<span id="vote-label">Cast your vote now</span>',
        1,
    )
    html = html.replace(
        '<span>Subscribe</span>',
        '<span id="subscribe-label">Subscribe</span>',
        1,
    )
    weather = (
        '<p class="label-1" id="weather-line">Time to power down and rest, Memo&#x27;s still on duty.</p>'
        '<div id="weather-pills" class="flex flex-wrap items-center justify-center gap-2"></div>'
    )
    html = html.replace('<p class="label-1">The dishes can wait.</p>', weather, 1)
    css_links = """<link rel="stylesheet" href="/_next/static/css/2f63e98cd5da8c43.css"/>
<link rel="stylesheet" href="/_next/static/css/13e7e6ab504d5b67.css"/>
<link rel="stylesheet" href="/_next/static/css/c3bda8d6a6251124.css"/>
<link rel="stylesheet" href="/_next/static/css/ea7d800c8a680295.css"/>
<link rel="stylesheet" href="/overrides.css"/>"""
    html = re.sub(
        r'<link rel="stylesheet" href="/_next/static/css/[^"]+"[^>]*>',
        "",
        html,
    )
    html = html.replace(
        "</head>",
        css_links + '\n<link rel="icon" href="/favicon.svg" type="image/svg+xml"/>\n</head>',
        1,
    )
    html = html.replace("</body>", '<script src="/app.js" defer></script></body>', 1)
    return html


def install_css() -> None:
    target = DIST / "_next" / "static" / "css"
    target.mkdir(parents=True, exist_ok=True)
    for path in CSS_DIR.glob("*.css"):
        shutil.copy(path, target / path.name)
    fonts = DIST / "_next" / "static" / "media"
    fonts.mkdir(parents=True, exist_ok=True)
    css = (CSS_DIR / "c3bda8d6a6251124.css").read_text()
    for name in re.findall(r"/_next/static/media/([^)]+\.woff2)", css):
        dest = fonts / name
        if not dest.exists():
            data, _ = fetch(ORIGIN + "/_next/static/media/" + name)
            dest.write_bytes(data)
            print("font", name, dest.stat().st_size)


def main() -> None:
    html = SOURCE.read_text(encoding="utf-8")
    mapping = collect_images(html)
    print(f"{len(mapping)} images")
    image_manifest = save_images(mapping)
    local_by_source = {url: meta["file"] for url, meta in image_manifest.items()}
    html = strip_runtime(html)
    html = attach_videos(html)
    html = rewrite_images(html, local_by_source)
    html = re.sub(
        r'(<img\b)(?![^>]*\sslot=)([^>]*>)\s*(<video\b)',
        r'\1 slot="poster"\2\3',
        html,
    )
    html = rewrite_links(html)
    html = patch_markup(html)
    DIST.mkdir(parents=True, exist_ok=True)
    (DIST / "index.html").write_text(html, encoding="utf-8")
    install_css()
    videos = sorted((DIST / "assets" / "video").glob("*.mp4")) if (DIST / "assets" / "video").exists() else []
    manifest = {
        "reference": ORIGIN + "/",
        "captured": "2026-10-18",
        "images": image_manifest,
        "videos": [f"/assets/video/{path.name}" for path in videos],
    }
    (ROOT / "assets-manifest.json").write_text(json.dumps(manifest, indent=2), encoding="utf-8")
    print("wrote", DIST / "index.html", "bytes", (DIST / "index.html").stat().st_size)


if __name__ == "__main__":
    main()
