"""Cut the artwork out of the ODIN "Glow-in-the-Dark Bacteria Engineering Kit" PDF.

Usage: python3 -I GlowBacteriaKit/tools/extract.py <path/to/kit.pdf>

Every page of the PDF is one form XObject that paints a white sheet, the
gradient grid, the artwork and the text (as outlines). This script deletes the
white sheet and the grid, renders each page at 4x (288 dpi) with a transparent
background, and crops the illustrations listed below into dist/assets/img/*.webp.
All coordinates are PDF points (378 x 522 page, origin top-left).
"""
import io
import re
import sys
from pathlib import Path

import pymupdf
from PIL import Image

SRC = Path(sys.argv[1])
OUT = Path(__file__).resolve().parent.parent / "dist" / "assets" / "img"
OUT.mkdir(parents=True, exist_ok=True)
DPI = 288
S = DPI / 72

SHEET_AND_GRID = re.compile(
    rb"q\n[^\n]+ cm\n1\.000000 1\.000000 1\.000000 scn\n0\.000000 522\.0000\d+ m\n.*?\nf\nn\nQ\nq\n/E1 gs\n/X1 Do\nQ\n",
    re.S,
)

doc = pymupdf.open(SRC)
for page in doc:
    xrefs = list(page.get_contents()) + [x[0] for x in page.get_xobjects() if x[2] == 0]
    for xref in xrefs:
        stream = doc.xref_stream(xref)
        cleaned = SHEET_AND_GRID.sub(b"", stream, count=1)
        if cleaned != stream:
            doc.update_stream(xref, cleaned)
            break

renders = {}


def page_image(n):
    if n not in renders:
        pix = doc[n].get_pixmap(dpi=DPI, alpha=True)
        renders[n] = Image.open(io.BytesIO(pix.tobytes("png"))).convert("RGBA")
    return renders[n]


def crop(name, n, x0, y0, x1, y1, lossless=False):
    box = tuple(round(v * S) for v in (x0, y0, x1, y1))
    img = page_image(n).crop(box)
    if lossless:
        img.save(OUT / f"{name}.webp", lossless=True, quality=100, method=6)
    else:
        img.save(OUT / f"{name}.webp", quality=88, method=6)


# Cover: logo and the half-glowing petri dish (the dish runs off the bottom of the sheet).
crop("odin-logo", 0, 18.0, 18.0, 46.5, 50.0, lossless=True)
crop("cover-dish", 0, 0, 236, 378, 522)

# 02 Safety notes: 19.5pt icon tiles, one per row.
safety_rows = [85.0, 118.0, 148.0, 181.0, 217.0]
for i, y in enumerate(safety_rows, 1):
    crop(f"safety-{i}", 2, 24.4, y - 0.3, 44.5, y + 19.8, lossless=True)

# 03 How it works diagram (card interior above the captions).
crop("how-it-works", 3, 18.8, 267.7, 359.3, 346.0)

# 04/05 Kit cells: picture area above the label, including the purple "Nx" count.
def kit_cells(page, rows, cols, top_pad, bottom, prefix):
    k = 1
    for (y0, label_y) in rows:
        for c in cols:
            crop(f"{prefix}-{k}", page, c, y0, c + 113.5, label_y - 2.0)
            k += 1


COLS = [18.8, 132.3, 245.8]
kit_cells(4, [(101.2, 163.2)], COLS, 0, 0, "equip-a")
kit_cells(4, [(191.2, 253.2)], COLS, 0, 0, "equip-b")
kit_cells(4, [(281.2, 343.2)], COLS, 0, 0, "equip-c")
kit_cells(5, [(86.0, 147.9)], COLS, 0, 0, "fridge-a")
crop("fridge-b-1", 5, 18.8, 176.0, 132.3, 228.0)
crop("freezer-1", 5, 18.8, 342.5, 132.3, 394.0)
crop("freezer-2", 5, 132.3, 342.5, 245.8, 394.0)
# Little thermometer / snowflake glyphs next to the "Perishables" headings.
crop("icon-fridge", 5, 129.0, 40.0, 140.0, 60.0, lossless=True)
crop("icon-freezer", 5, 129.0, 296.0, 143.0, 316.0, lossless=True)

# 06 Timeline octagon (purple, pixel-stepped).
crop("timeline-node", 6, 26.6, 89.6, 42.4, 105.4, lossless=True)

# 07 QR code tile.
crop("qr-video", 7, 30.8, 194.2, 120.8, 284.2, lossless=True)

# Step badges: 17.5pt pixel octagon with the step number.
badges = {
    8: [(1, 242.5), (2, 271.0), (3, 299.5), (4, 328.0), (5, 356.5), (6, 394.0), (7, 422.5)],
    9: [(8, 43.7), (9, 72.2)],
    10: [],
    12: [],
    13: [(19, 66.2), (20, 209.5), (21, 248.0), (22, 389.5), (23, 418.0)],
    15: [(29, 127.0), (30, 155.5), (31, 184.0)],
}
# Pages whose badges were not listed explicitly: derive the top from the number's text bbox.
orig = pymupdf.open(SRC)
for n in (10, 12, 14):
    found = []
    for b in orig[n].get_text("dict")["blocks"]:
        for line in b.get("lines", []):
            for span in line["spans"]:
                t = span["text"].strip()
                if t.isdigit() and span["bbox"][0] < 40:
                    found.append((int(t), span["bbox"][1] - 2.7))
    badges[n] = sorted(found)
for n, items in badges.items():
    for num, y in items:
        crop(f"badge-{num:02d}", n, 20.1, y - 0.4, 38.4, y + 17.9, lossless=True)

# 08 step 1 illustrations + "Mark it DONE" sticker.
STRIP4 = [18.8, 103.7, 188.6, 273.6, 359.3]
for i in range(4):
    crop(f"step1-{i + 1}", 8, STRIP4[i], 165.3, STRIP4[i + 1], 234.5)
# The sticker overlaps step 7's checkbox; the checkbox is neutral near-black, the sticker
# outline is navy, so neutral dark pixels are dropped.
crop("sticker-done", 8, 315.0, 429.5, 353.5, 470.5, lossless=True)
sticker = Image.open(OUT / "sticker-done.webp").convert("RGBA")
sticker.putdata([
    (r, g, b, 0) if max(r, g, b) - min(r, g, b) < 18 and max(r, g, b) < 140 and a else (r, g, b, a)
    for r, g, b, a in sticker.get_flattened_data()
])
sticker.save(OUT / "sticker-done.webp", lossless=True, quality=100, method=6)

# 09 plates storage card.
# Before/after panels: left cell 18.7-173.6, arrow cell 173.6-203.6, right cell 203.6-359.2.
L, R = (18.7, 173.6), (203.6, 359.2)
crop("plates-stacked", 9, L[0], 103.5, L[1], 184.0)
crop("arrow", 9, 174.4, 140.0, 202.8, 172.0, lossless=True)
crop("plates-flipped", 9, R[0], 103.5, R[1], 184.0)

# 10 step 2 strip (5 cells).
STRIP5 = [18.7, 86.7, 154.6, 222.6, 290.5, 359.2]
for i in range(5):
    crop(f"step2-{i + 1}", 10, STRIP5[i], 131.2, STRIP5[i + 1], 201.0)

# 11 zigzag card and warning icons.
crop("zigzag", 11, 18.7, 42.0, 359.2, 165.0)
for i, y in enumerate([239.0, 275.0, 311.0], 1):
    crop(f"warning-{i}", 11, 24.5, y - 0.3, 44.6, y + 19.8, lossless=True)

# 12 step 3.1 strip.
for i in range(4):
    crop(f"step3-{i + 1}", 12, STRIP4[i], 198.7, STRIP4[i + 1], 268.5)

# 13 cold incubation + heat shock cards.
crop("cold-tube", 13, L[0], 97.5, L[1], 167.2)
crop("cold-fridge", 13, R[0], 97.5, R[1], 167.2)
crop("heat-tube", 13, L[0], 277.5, L[1], 347.2)
crop("heat-bath", 13, R[0], 277.5, R[1], 347.2)

# 14 plate the bacteria.
crop("plate-spread", 14, L[0], 211.5, L[1], 300.0)
crop("plate-flip", 14, R[0], 211.5, R[1], 300.0)

# 15 results card + success icons.
crop("result-white", 15, L[0], 215.2, L[1], 304.0)
crop("result-blue", 15, R[0], 215.2, R[1], 304.0)
for i, y in enumerate([381.2, 423.7, 472.7], 1):
    crop(f"success-{i}", 15, 24.5, y - 0.3, 44.6, y + 19.8, lossless=True)

# 17 back cover logo + QR.
crop("odin-cubes", 17, 166.0, 68.0, 212.5, 119.5, lossless=True)
crop("qr-shop", 17, 145.2, 216.8, 233.6, 305.2, lossless=True)

print(f"wrote {len(list(OUT.glob('*.webp')))} images to {OUT}")
