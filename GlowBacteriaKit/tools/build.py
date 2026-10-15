"""Build the web edition of the ODIN "Glow-in-the-Dark Bacteria Engineering Kit" PDF.

Usage: python3 -I GlowBacteriaKit/tools/build.py <path/to/kit.pdf>

Nothing on the page is redrawn by hand. For every PDF page this script writes
dist/pages/pNN.svg with the page's own vectors and images (exported by MuPDF), and
dist/index.html with a transparent, selectable text layer placed at the PDF's
per-character positions, plus checkboxes, links and the notes field laid over the
exact rectangles the PDF draws for them.

Two things are swapped for lighter equivalents, both drawn from the PDF's own data:
  * The background grid (a tiled 18 px image MuPDF unrolls into ~1,100 masks per page)
    is redrawn as one SVG pattern: 13.5 pt cells, 0.75 pt lines on the right and
    bottom edge, horizontal gradient #c629f1 -> #02d862 (stops 22.6% / 79.3%) at 6%.
  * The ODIN cube logo (~13,500 tiny paths) is embedded as a 12x raster of itself.
"""
import base64
import hashlib
import html
import io
import json
import re
import sys
import xml.etree.ElementTree as ET
from pathlib import Path

import pymupdf
from PIL import Image

SRC = Path(sys.argv[1])
ROOT = Path(__file__).resolve().parent.parent
DIST = ROOT / "dist"
PAGES = DIST / "pages"
PAGES.mkdir(parents=True, exist_ok=True)

SVG_NS = "http://www.w3.org/2000/svg"
XLINK_NS = "http://www.w3.org/1999/xlink"
ET.register_namespace("", SVG_NS)
ET.register_namespace("xlink", XLINK_NS)
ET.register_namespace("inkscape", "http://www.inkscape.org/namespaces/inkscape")

SHEET_AND_GRID = re.compile(
    rb"q\n[^\n]+ cm\n1\.000000 1\.000000 1\.000000 scn\n0\.000000 522\.0000\d+ m\n.*?\nf\nn\nQ\nq\n/E1 gs\n/X1 Do\nQ\n",
    re.S,
)

# Logo bounding boxes (top-left origin, points), rasterised instead of exported as paths.
LOGOS = {0: (18.0, 18.0, 46.6, 50.0), 17: (166.0, 68.0, 212.6, 119.6)}
LOGO_ZOOM = 12

# The hidden text layer's Type3 encoding maps a few characters oddly.
CHAR_FIX = {"\x13": "–", "˝": "“", "˛": "”", "€": "", "‡": "₂", "!": "C"}

PAGE_TITLES = [
    "Cover", "What You'll Do", "Safety Notes", "How It Works", "What's in the Kit",
    "Perishables", "Timeline at a Glance", "Before You Start", "Step 1: Make Agar Plates",
    "Step 1, continued", "Step 2: Prepare the Bacteria", "Streaking and warnings",
    "Step 3: Transformation", "Steps 3.3 to 3.5", "Step 3.6: Plate the Bacteria",
    "Step 4: Check Your Results", "Record Your Results Here", "This Is Just the Beginning",
]

# Links laid over the regions the PDF prints them in (points, top-left origin).
LINKS = {
    7: [("https://www.youtube.com/watch?v=46vy4GylcNY", (18.75, 182.2, 192.8, 328.2),
         "Watch the 60-second video: How to Make Agar Plates")],
    17: [("https://www.the-odin.com", (144.4, 216.0, 234.4, 306.0), "the-odin.com"),
         ("https://www.the-odin.com", (226.0, 193.0, 285.0, 206.0), "the-odin.com"),
         ("mailto:odin@the-odin.com", (179.0, 488.5, 265.0, 502.0), "Email odin@the-odin.com")],
}

# "Record Your Results Here" card: 21 rules every 15 pt from y=94.4, inset 7.5 pt.
NOTES = (16, (25.5, 80.6, 352.5, 395.6))


def fmt(v):
    return ("%.3f" % v).rstrip("0").rstrip(".")


def clean_document(doc):
    """Remove the white sheet and the tiled grid; everything else is left untouched."""
    for page in doc:
        xrefs = list(page.get_contents()) + [x[0] for x in page.get_xobjects() if x[2] == 0]
        for xref in xrefs:
            stream = doc.xref_stream(xref)
            cleaned = SHEET_AND_GRID.sub(b"", stream, count=1)
            if cleaned != stream:
                doc.update_stream(xref, cleaned)
                break


def logo_data_uri(page, box):
    # Rendered on the original page: the logo uses blend modes that need the real sheet behind it.
    pix = page.get_pixmap(matrix=pymupdf.Matrix(LOGO_ZOOM, LOGO_ZOOM), clip=pymupdf.Rect(box), alpha=False)
    img = Image.open(io.BytesIO(pix.tobytes("png"))).convert("RGBA")
    buf = io.BytesIO()
    img.save(buf, "WEBP", lossless=True, quality=100, method=6)
    return "data:image/webp;base64," + base64.b64encode(buf.getvalue()).decode()


MATRIX = re.compile(r"matrix\(([^)]*)\)")
FIRST_POINT = re.compile(r"[Mm]\s*(-?[\d.]+)[\s,]*(-?[\d.]+)")


def first_point(el):
    m = FIRST_POINT.search(el.get("d", ""))
    if not m:
        return None
    x, y = float(m.group(1)), float(m.group(2))
    t = MATRIX.search(el.get("transform", ""))
    if t:
        a, b, c, d, e, f = (float(v) for v in re.split(r"[\s,]+", t.group(1).strip()))
        x, y = a * x + c * y + e, b * x + d * y + f
    return x, y


def grid_layer(width, height):
    return f"""<g id="sheet">
<defs>
<linearGradient id="grid-tint" gradientUnits="userSpaceOnUse" x1="-0.014" y1="0" x2="377.986" y2="0">
<stop offset="0.225962" stop-color="#c629f1"/><stop offset="0.793269" stop-color="#02d862"/>
</linearGradient>
<pattern id="grid-cell" patternUnits="userSpaceOnUse" x="-0.014" y="0" width="13.5" height="13.5">
<rect x="12.75" y="0" width="0.75" height="13.5" fill="#fff"/><rect x="0" y="12.75" width="12.75" height="0.75" fill="#fff"/>
</pattern>
<mask id="grid-lines" maskUnits="userSpaceOnUse" x="0" y="0" width="{fmt(width)}" height="{fmt(height)}">
<rect width="{fmt(width)}" height="{fmt(height)}" fill="url(#grid-cell)"/>
</mask>
</defs>
<rect width="{fmt(width)}" height="{fmt(height)}" fill="#fff"/>
<rect width="{fmt(width)}" height="{fmt(height)}" fill="url(#grid-tint)" fill-opacity="0.06" mask="url(#grid-lines)"/>
</g>"""


def page_svg(doc, original, n):
    page = doc[n]
    root = ET.fromstring(page.get_svg_image(text_as_path=True))
    parents = {c: p for p in root.iter() for c in p}

    def inside_defs(el):
        while el in parents:
            el = parents[el]
            if el.tag in (f"{{{SVG_NS}}}defs", f"{{{SVG_NS}}}clipPath", f"{{{SVG_NS}}}mask"):
                return True
            if el.get("id", "").startswith("mask_"):
                return True
        return False

    removed = 0
    for el in list(root.iter()):
        # Glyphs of the PDF's invisible Type3 text layer (they draw nothing).
        if el.get("data-text") is not None or el.get("id", "").startswith("font_"):
            parents[el].remove(el)
            removed += 1
    if n in LOGOS:
        x0, y0, x1, y1 = LOGOS[n]
        for el in list(root.iter(f"{{{SVG_NS}}}path")):
            if el not in parents or inside_defs(el):
                continue
            pt = first_point(el)
            if pt and x0 <= pt[0] <= x1 and y0 <= pt[1] <= y1:
                parents[el].remove(el)
        img = ET.SubElement(root, f"{{{SVG_NS}}}image")
        img.set("x", fmt(x0))
        img.set("y", fmt(y0))
        img.set("width", fmt(x1 - x0))
        img.set("height", fmt(y1 - y0))
        img.set(f"{{{XLINK_NS}}}href", logo_data_uri(original[n], (x0, y0, x1, y1)))

    width, height = page.rect.width, page.rect.height
    # Re-encode embedded images as lossless WebP: identical decoded pixels, smaller files,
    # and no long JPEG base64 runs (one tripped GitHub's secret scanner as a "token").
    for el in root.iter(f"{{{SVG_NS}}}image"):
        href = el.get(f"{{{XLINK_NS}}}href", "")
        m = re.match(r"data:image/(png|jpeg);base64,(.*)", href, re.S)
        if not m:
            continue
        img = Image.open(io.BytesIO(base64.b64decode(re.sub(r"\s+", "", m.group(2)))))
        img.load()
        if img.mode not in ("RGB", "RGBA", "L", "LA"):
            img = img.convert("RGBA" if "A" in img.mode else "RGB")
        buf = io.BytesIO()
        img.save(buf, "WEBP", lossless=True, quality=100, method=6)
        el.set(f"{{{XLINK_NS}}}href", "data:image/webp;base64," + base64.b64encode(buf.getvalue()).decode())
    # Pages are snapped to whole-pixel heights; pin the art to the top instead of centring it.
    root.set("preserveAspectRatio", "xMidYMin meet")
    body = ET.tostring(root, encoding="unicode")
    open_tag_end = body.index(">") + 1
    body = body[:open_tag_end] + "\n" + grid_layer(width, height) + body[open_tag_end:]
    body = re.sub(r"-?\d+\.\d+", lambda m: fmt(float(m.group())), body)
    return body


# Glitches in the PDF's hidden text layer, corrected so copied text reads as printed.
# Each removes the matched characters (and their positions) from a line.
DROP = [
    r"(?<=–) (?=\d)",          # "20– 30" -> "20–30"
    r"(?<=upside-) (?=down)",
    r"(?<=ev) (?=enly)",
    r"\+ (?=\+ PEG)",           # "CaCl₂ + + PEG"
    r"DH(?= DH5a)",             # "E. coliDH DH5a"
    r"(?<=”\.) \.$",            # trailing duplicate period
]
# A line that starts with a word's stray last letters: move them back to the line above.
CARRY = [("60 Second Video Protocol", "s "), ("Petri plate columns with label", "s: ")]
# Words whose first capital is missing from the hidden layer.
INSERT = [("acteria", "B"), ("etri plate", "P")]


def text_lines(page):
    lines = []
    for block in page.get_text("rawdict")["blocks"]:
        if block["type"] != 0:
            continue
        for line in block["lines"]:
            glyphs, size, base = [], None, None
            for span in line["spans"]:
                for c in span["chars"]:
                    ch = CHAR_FIX.get(c["c"], c["c"])
                    if not ch or ch == "\n":
                        continue
                    glyphs.append([ch, c["origin"][0]])
                    size = size or span["size"]
                    base = base or c["origin"][1]
            if "".join(g[0] for g in glyphs).strip():
                lines.append({"glyphs": glyphs, "y": base, "size": size})

    def text(ln):
        return "".join(g[0] for g in ln["glyphs"])

    for ln in lines:
        for pattern in DROP:
            m = re.search(pattern, text(ln))
            if m:
                del ln["glyphs"][m.start():m.end()]
        for word, letter in INSERT:
            if text(ln).lstrip().startswith(word):
                i = len(text(ln)) - len(text(ln).lstrip())
                x = ln["glyphs"][i][1] - 0.667 * ln["size"]
                ln["glyphs"].insert(i, [letter, x])
    for prev, nxt in zip(lines, lines[1:]):
        for head, tail in CARRY:
            if text(prev).rstrip() == head and text(nxt).startswith(tail):
                step = prev["glyphs"][-1][1] - prev["glyphs"][-2][1]
                x = prev["glyphs"][-1][1] + step
                for k, ch in enumerate(tail.strip()):
                    prev["glyphs"].append([ch, x + k * step])
                del nxt["glyphs"][:len(tail)]
    out = []
    for ln in lines:
        while ln["glyphs"] and ln["glyphs"][-1][0].isspace():
            ln["glyphs"].pop()
        while ln["glyphs"] and ln["glyphs"][0][0].isspace():
            ln["glyphs"].pop(0)
        if not ln["glyphs"]:
            continue
        # A trailing space keeps words apart when several lines are copied together.
        last = ln["glyphs"][-1][1] + 0.3 * ln["size"]
        ln["glyphs"].append([" ", last])
        out.append({"text": text(ln), "xs": [g[1] for g in ln["glyphs"]], "y": ln["y"], "size": ln["size"]})
    return out


def checkbox_rects(page):
    rects = []
    for d in page.get_drawings():
        r = d["rect"]
        if d.get("fill") and abs(r.width - 12) < 0.2 and abs(r.height - 12) < 0.2 and r.x0 > 340:
            rects.append((r.x0, r.y0, r.x1, r.y1))
    return sorted(set(rects), key=lambda r: r[1])


def main():
    original = pymupdf.open(SRC)
    doc = pymupdf.open(SRC)
    clean_document(doc)

    page_w, page_h = original[0].rect.width, original[0].rect.height
    sections = []
    step = 0
    report = []
    for n, page in enumerate(original):
        svg = page_svg(doc, original, n)
        (PAGES / f"p{n:02d}.svg").write_text(svg)

        pct = lambda v, total: f"{v / total * 100:.4f}%"
        parts = []
        lines = text_lines(page)
        texts = []
        for ln in lines:
            role = ""
            if ln["size"] >= 30:
                role = ' role="heading" aria-level="1"'
            elif ln["size"] >= 23:
                role = ' role="heading" aria-level="2"'
            elif ln["size"] >= 15:
                role = ' role="heading" aria-level="3"'
            xs = " ".join(fmt(x) for x in ln["xs"])
            texts.append(
                f'<text{role} x="{xs}" y="{fmt(ln["y"])}" font-size="{fmt(ln["size"])}">{html.escape(ln["text"])}</text>'
            )
        parts.append(
            f'<svg class="text-layer" viewBox="0 0 {fmt(page_w)} {fmt(page_h)}" aria-hidden="false">\n'
            + "\n".join(texts)
            + "\n</svg>"
        )
        for href, (x0, y0, x1, y1), label in LINKS.get(n, []):
            ext = ' target="_blank" rel="noopener"' if href.startswith("http") else ""
            parts.append(
                f'<a class="hit" href="{href}"{ext} aria-label="{html.escape(label)}" '
                f'style="left:{pct(x0, page_w)};top:{pct(y0, page_h)};width:{pct(x1 - x0, page_w)};height:{pct(y1 - y0, page_h)}"></a>'
            )
        for (x0, y0, x1, y1) in checkbox_rects(page):
            step += 1
            parts.append(
                f'<input class="check" type="checkbox" id="s{step}" aria-label="Step {step} done" '
                f'style="left:{pct(x0, page_w)};top:{pct(y0, page_h)};width:{pct(x1 - x0, page_w)};height:{pct(y1 - y0, page_h)}">'
            )
        if n == NOTES[0]:
            x0, y0, x1, y1 = NOTES[1]
            parts.append(
                f'<textarea id="record" class="notes" aria-label="Record your results here" spellcheck="true" '
                f'style="left:{pct(x0, page_w)};top:{pct(y0, page_h)};width:{pct(x1 - x0, page_w)};height:{pct(y1 - y0, page_h)}"></textarea>'
            )
        loading = "eager" if n < 2 else "lazy"
        sections.append(
            f'<section class="page" id="page-{n}" aria-label="{html.escape(PAGE_TITLES[n])}">\n'
            f'<img class="art" src="pages/p{n:02d}.svg" width="{round(page_w)}" height="{round(page_h)}" alt="" loading="{loading}" decoding="async">\n'
            + "\n".join(parts)
            + "\n</section>"
        )
        report.append((n, len(svg) // 1024, len(lines)))

    template = (Path(__file__).parent / "template.html").read_text()
    out = template.replace("{{PAGES}}", "\n\n".join(sections))
    out = out.replace("{{RATIO}}", f"{fmt(page_w)} / {fmt(page_h)}")
    # Content-hash every local asset URL so an update is never paired with a cached old file.
    def bust(m):
        digest = hashlib.sha256((DIST / m.group(2)).read_bytes()).hexdigest()[:10]
        return f'{m.group(1)}="{m.group(2)}?v={digest}"'
    out = re.sub(r'(href|src)="((?:assets|pages)/[^"?]+)"', bust, out)
    (DIST / "index.html").write_text(out)
    for n, kb, nl in report:
        print(f"page {n:02d}: {kb:5d} KB svg, {nl:3d} text lines")
    print(f"{step} checkboxes")


main()
