"""Capture the server-rendered fal.ai homepage and its visible assets.

The output is a static design study. The original application runtime and
tracking scripts are intentionally excluded; dist/interactions.js supplies
the small set of controls needed by the captured page.
"""

from __future__ import annotations

import json
import re
from pathlib import Path
from urllib.parse import urljoin, urlparse
from urllib.request import Request, urlopen

from lxml import html


ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "dist"
ASSETS = DIST / "assets"
REFERENCE = "https://fal.ai/"
manifest: dict[str, dict[str, str]] = {}
cache: dict[str, str] = {}


def fetch(url: str) -> bytes:
    request = Request(url, headers={"User-Agent": "Mozilla/5.0 (compatible; GoodDesigns/1.0)"})
    with urlopen(request, timeout=45) as response:
        return response.read()


def asset(url: str, role: str, name: str | None = None) -> str:
    url = urljoin(REFERENCE, url)
    if url in cache:
        return cache[url]
    if name is None:
        parsed = urlparse(url)
        if parsed.netloc == "fal.ai":
            name = parsed.path.lstrip("/")
        else:
            raise ValueError(f"Name needed for external asset: {url}")
    target = ASSETS / name
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_bytes(fetch(url))
    result = "assets/" + name
    cache[url] = result
    manifest[result] = {"role": role, "source": url}
    return result


def rewrite_style_urls(css: str, origin: str, stylesheet_name: str) -> str:
    def replace(match: re.Match[str]) -> str:
        raw = match.group(2).strip()
        if raw.startswith(("data:", "#", "blob:")):
            return match.group(0)
        source = urljoin(origin, raw)
        parsed = urlparse(source)
        if parsed.netloc == "fal.ai":
            local = asset(source, "CSS media or font")
        else:
            local = asset(source, "CSS media or font", f"external/{parsed.netloc}/{Path(parsed.path).name}")
        relative = Path("..") / Path(local).relative_to("assets")
        return f"url({match.group(1)}{relative.as_posix()}{match.group(1)})"

    return re.sub(r"url\(\s*(['\"]?)([^)'\"]+)\1\s*\)", replace, css)


def main() -> None:
    DIST.mkdir(parents=True, exist_ok=True)
    document = html.fromstring(fetch(REFERENCE))

    # The initial HTML contains the full page. Remove the Next.js runtime and
    # third-party scripts after preserving the rendered markup.
    for element in document.xpath("//script | //noscript"):
        element.drop_tree()
    for element in document.xpath("//link"):
        rel = (element.get("rel") or "").lower()
        if rel == "stylesheet":
            source = urljoin(REFERENCE, element.get("href"))
            name = Path(urlparse(source).path).name
            local = asset(source, "stylesheet", "css/" + name)
            css_path = DIST / local
            css_path.write_text(rewrite_style_urls(css_path.read_text(), source, name))
            element.set("href", local)
        elif rel in {"icon", "shortcut icon", "apple-touch-icon"} and element.get("href"):
            element.set("href", asset(element.get("href"), "site icon"))
        elif rel not in {"canonical"}:
            element.drop_tree()

    model_index = 0
    for element in document.xpath("//*[@src]"):
        source = element.get("src")
        if not source or source.startswith(("data:", "blob:")):
            continue
        parsed = urlparse(urljoin(REFERENCE, source))
        if parsed.netloc == "refinery.fal.media":
            model_index += 1
            # The server's src points to a 1920px file. A 640px variant is
            # ample for the observed 288px card and keeps the study compact.
            candidates = (element.get("srcset") or "").split(", ")
            selected = next((part.rsplit(" ", 1)[0] for part in candidates if part.endswith("640w")), source)
            source = selected
            local = asset(source, "model gallery image", f"models/model-{model_index}.webp")
        elif parsed.netloc == "fal.ai":
            local = asset(source, "page image")
        else:
            name = f"external/{parsed.netloc}/{Path(parsed.path).name}"
            local = asset(source, "page image", name)
        element.set("src", local)
        element.attrib.pop("srcset", None)
        element.attrib.pop("sizes", None)
        # Full-page screenshots and offline use should show all artwork even
        # before the reader scrolls it into the viewport.
        if element.tag.lower() == "img":
            element.attrib.pop("loading", None)

    for element in document.xpath("//*[@style]"):
        style = element.get("style") or ""
        if "url(" in style:
            def replace(match: re.Match[str]) -> str:
                raw = match.group(2)
                if raw.startswith(("data:", "#", "blob:")):
                    return match.group(0)
                local = asset(raw, "inline background")
                return f"url({match.group(1)}{local}{match.group(1)})"

            element.set("style", re.sub(r"url\(\s*(['\"]?)([^)'\"]+)\1\s*\)", replace, style))

    for element in document.xpath("//a[@href]"):
        href = element.get("href") or ""
        if href == "/":
            element.set("href", "./")
        elif href.startswith("/"):
            element.set("href", urljoin(REFERENCE, href))

    # This code example is filled only by React after hydration on the live
    # page. Preserve its final, observed content in the static markup.
    developer_headings = document.xpath("//h3[normalize-space()='Built for developers']")
    if developer_headings:
        card = developer_headings[0].getparent().getparent()
        demo = card[0][0]
        sample = html.Element("div", **{"class": "not-prose h-auto max-h-full w-full space-y-2"})
        frame = html.Element("div", **{"class": "group relative font-mono max-h-full rounded-sm text-sm mt-10 h-fit w-[700px] border-0 bg-transparent py-4 dark:bg-transparent"})
        pre = html.Element("pre", style="margin:0 auto;font-family:var(--font-mono);font-size:inherit;line-height:1rem;white-space:pre-wrap;scrollbar-width:none;background-color:transparent;padding:1rem;overflow-wrap:break-word;overflow:auto;max-height:100%")
        code = html.Element("code", **{"class": "bg-transparent leading-normal whitespace-pre-wrap"})
        code.text = '''import { fal } from "@fal-ai/client";

const result = await fal.subscribe("fal-ai/fast-sdxl", {
  input: {
    prompt: "photo of a cat wearing a kimono"
  },
  logs: true,
  onQueueUpdate: (update) => {
    if (update.status === "IN_PROGRESS") {
      update.logs.map((log) => log.message).forEach(console.log);
    }
  },
});'''
        pre.append(code)
        frame.append(pre)
        sample.append(frame)
        demo.append(sample)

    # Fal animates these four paired cards from 50% to their resting heights.
    # Capture the settled layout for both desktop and mobile readers.
    first_enterprise_card = document.xpath("//*[normalize-space(text())='SOC 2 & enterprise compliance']")
    if first_enterprise_card:
        grid = first_enterprise_card[0].getparent().getparent()
        for column, height in zip(grid, ("100%", "150%", "240%", "400%")):
            column[1].set("style", f"height:{height}")

    head = document.xpath("//head")[0]
    helper = html.Element("link", rel="stylesheet", href="overrides.css")
    head.append(helper)
    helper = html.Element("script", src="interactions.js", defer="")
    head.append(helper)

    output = html.tostring(document, encoding="unicode", method="html", doctype="<!doctype html>")
    (DIST / "index.html").write_text(output)
    (ASSETS / "manifest.json").write_text(json.dumps(manifest, indent=2, sort_keys=True) + "\n")
    print(f"Captured homepage with {len(manifest)} local assets")


if __name__ == "__main__":
    main()
