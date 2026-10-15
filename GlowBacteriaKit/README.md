# Glow-in-the-Dark Bacteria Engineering Kit (protocol PDF as a web page)

A web edition of The ODIN's printed protocol for the GFP bacterial transformation kit. The reference here is not a website. It is an 18-page PDF, rebuilt as one scrolling, responsive page with real text.

- **Reference:** `Glow-in-the-Dark_Bacteria_Engineering_Kit.pdf` (18 pages, 378 × 522 pt, modified 2026-10-09; exported through iLovePDF)
- **Captured:** 2026-10-14 (America/New_York)
- **Run:** from the repository root, `python3 -m http.server 8862 --directory GlowBacteriaKit/dist`, then open `http://localhost:8862/`.
- **Review sizes:** desktop 1280 × 900 and mobile 390 × 844. On desktop each PDF page is a section 1.8× its point size (680 px wide). Each section was screenshotted next to the PDF page rendered at the same scale, and headings, cards, step badges and checkboxes land within about 1 pt of the PDF.
- **Checks (both viewports):** 0 console errors, 0 broken images, no horizontal overflow, 0 requests to any other host.

## How it maps to the PDF

| PDF page | Section |
| --- | --- |
| cover | Logo, title, half-glowing petri dish |
| 01–03 | What You'll Do, Safety Notes, How It Works |
| 04–05 | What's in the Kit (equipment, fridge and freezer perishables) |
| 06–07 | Timeline at a Glance, 60-second video guides |
| 08–09 | Step 1: Make Agar Plates (steps 1–9) |
| 10–11 | Step 2: Prepare the Bacteria (steps 10–14), zigzag streak and warnings |
| 12–14 | Step 3: Transformation 3.1–3.6 (steps 15–28) |
| 15–16 | Step 4: Check Your Results (steps 29–31), success notes, results log |
| back | This Is Just the Beginning, shop QR and contact |

The page runs as one continuous sheet on the PDF's gradient grid. Page numbers stay in each section's corner, and the step 1 connector line runs across the 08/09 break as it does in print.

## Interactions

The print checkboxes became real ones. Ticked steps grey out, and the state is saved in the browser's `localStorage` (key `glow-kit-protocol:v1`). "Record Your Results Here" is a lined textarea saved the same way. Both QR codes are decoded and linked: the agar-plate video (`youtube.com/watch?v=46vy4GylcNY`) and `the-odin.com`. The email address is a `mailto:` link.

## Structure and reuse

- `dist/index.html`: all copy as HTML, one `<section class="sheet">` per PDF page. PDF line breaks are `<br class="b">`. They are kept on desktop and hidden on phones so text reflows there.
- `dist/assets/styles.css`: tokens at the top (`--u` px per PDF point, palette, type sizes). Every length is written as PDF points × `--u`, so spacing taken from the PDF is used as-is. Per-element vertical gaps come from the PDF and are set inline as `--mt` (points). Reusable parts are `.card`, `.icon-list`, `.cells` (kit grid and illustration strips), `.panels` (before → after), `.steps` (badge, text, checkbox, connector), `.timeline`, `.qr-card` and `.record`.
- `dist/assets/app.js`: saves checkbox and notes state.
- `dist/assets/img/`: 92 WebP crops of the PDF artwork (illustrations, icons, step badges, sticker, QR codes, cover dish).
- `dist/assets/fonts/`: Chakra Petch 500/600 woff2, the same files as the ODIN storefront capture in `TheOdin/`.
- `tools/extract.py`: regenerates every image from the PDF (`python3 -I GlowBacteriaKit/tools/extract.py path/to/kit.pdf`). It deletes each page's white sheet and grid layer, renders at 288 dpi with transparency, and crops at the PDF's exact cell rectangles. The crop list doubles as the asset manifest: each file is named after its page and role.

### Measured tokens

- Grid: 13.5 pt cells, 0.75 pt lines at 6% opacity, horizontal gradient `#c629f1` (0–22.6%) → `#02d862` (79.3–100%).
- Cards: `#f9f9f9` fill, `#ebebeb` 0.75 pt borders and dividers, ~4.5 pt radius.
- Type: Chakra Petch 500 at −0.05em for headings (33.75 / 24 / 18 pt), Chakra Petch 600 at −0.025em for the 9 pt green `STEP` labels and timeline labels, Helvetica Neue 10.5/12 pt body and 9/10 pt step text.
- Colours: ink `#1a1a1a`, text `#303030`, muted `#838383`, purple `#7f00ff`, green `#34c759`, orange `#e3901a`.

## Responsive behaviour

- ≥ 721 px: fixed 1.8 px per point. Every section matches its PDF page.
- 521–720 px: `--u` scales with the viewport.
- ≤ 520 px: `--u` is 1.22 px with larger minimum text sizes. PDF line breaks are dropped, kit and strip grids stay as columns that shrink, and before/after captions move below the pictures.

## Known differences

- The body face is Helvetica Neue from the visitor's system, falling back to Helvetica and Arial. It is not embedded for licensing reasons, so line wrapping can differ off macOS. Desktop line breaks are forced to match the PDF.
- The pixel-font step numbers, the `1×` kit counts and the "Mark it DONE" sticker are images cut from the PDF, not live text. Each badge's alt text carries its number.
- Sections take their content height instead of the PDF's fixed 522 pt page, so the empty space at the bottom of a printed page is not reproduced. The cover and back cover keep full page height on desktop.
- Checkboxes and the results textarea are interactive and save to the browser. The PDF's were for pen.

## Licensing

The protocol text, illustrations, ODIN logo and QR destinations belong to The ODIN. Chakra Petch is SIL Open Font License. This is a design study. Replace the ODIN copy, artwork and branding with your own before publishing anything derived from it.
