# Reservoir

A local capture of the Reservoir site (cell preservation, "built by the team behind Cellino"): the intro card, the "Dear future me" letters wall, its cards and timeline views, and the long Meet Reservoir story overlay.

- **Reference:** https://withreservoir.com/
- **Page title:** Reservoir · Built by the team behind Cellino
- **Captured:** 2026-10-15 (America/New_York)
- **Run:** from the repository root, `python3 Reservoir/tools/serve.py 8864`, then open `http://localhost:8864/`. This server maps clean URLs (`/nodes` → `nodes.html`), as Firebase Hosting does. A plain `python3 -m http.server` serves `/` only.
- **Rebuild from the live site:** `python3 Reservoir/tools/capture.py`

## Routes

The live site serves one document at `/`, `/nodes`, `/cards`, `/timeline` and `/meet`, and its script chooses the view from the path. The capture writes that same document to `index.html`, `nodes.html`, `cards.html`, `timeline.html` and `meet.html`.

| Path | What shows |
| --- | --- |
| `/` | Intro card (spinning emblem, wordmark). It hands over to the wall at `/nodes` and then opens Meet Reservoir. Click, Enter, Space or Escape skips to the end. |
| `/nodes` | The pannable, zoomable wall of letters, with the toolbar (view switcher, clock, Meet Reservoir, zoom slider, Book your draw, Join the list) |
| `/cards` | The same letters as a readable card list |
| `/timeline` | The letters on a timeline rail |
| `/meet` | The Meet Reservoir overlay over the wall: hero, the four process steps, why now, the six sticky notes, the service map with ZIP check, founders, team, advisors, investors, letters, FAQ, and the final call to action |

## Verification (2026-10-15)

Desktop is 1280 × 900 and mobile is 390 × 844 @2x. The reference and the local copy were captured at every route, and the Meet overlay was captured screen by screen as it scrolled.

- The intro, cards, timeline and Meet screens are pixel-identical apart from the toolbar clock. The Meet overlay is 9,852 px tall on desktop and 12,680 px on mobile, the same as the reference.
- Any remaining differences of 0.3–2% come from animations caught at different moments: the map's city journey, letters dropping in, and the wall's auto-tour. The wall itself differs by 1.3%.
- At both viewports and on every route there are 0 console errors, 0 broken images, no horizontal overflow and 0 requests to other hosts.
- Interactions tested under `/sites/reservoir/` (the gallery path): intro → wall → Meet overlay sequence, closing the overlay, the toolbar view switcher (wall/cards/timeline), the Meet Reservoir button and the ZIP form.

## Structure and reuse

- `dist/index.html` (and its four route copies): the original hand-written page. Inline CSS holds the layout and every component; inline scripts handle the intro, router, wall rendering, cards, timeline, Meet overlay and ZIP check.
- `dist/brand/tokens.css`: the design tokens (Birch, Heartwood, Oat, Sage and the other brand colours; the `--text-*` type scale; tracking; radius; focus colour).
- `dist/fonts/stacksans/`: Stack Sans Text variable font (200–700), the site's only typeface.
- `dist/wall-shapes.js`: the blob/"ink" shape generator behind the letter bubbles and the pill buttons.
- `dist/meet-assets/journey.js` and `us-map.svg`: the animated city journey on the service map (served from `/meet/` on the live site; renamed so the folder does not collide with the `/meet` route).
- `dist/api/letters.json`: a snapshot of `/api/letters?limit=60`, the visitor letters shown alongside the seed letters.
- `dist/images/`: photography, wordmark/headline renders, sticker, paper texture, partner and investor marks. All 12 `pick-NN.jpg` illustrations are included, because the page picks them by hash.
- `assets-manifest.json`: maps every saved file to its source URL.
- `tools/capture.py`: rebuilds `dist/`. `tools/serve.py`: local clean-URL server.

## What the capture script changes

- Every root-absolute path is made relative, and the router reads the last path segment instead of the full pathname, so the page works from any folder.
- `/api/letters` becomes the static `api/letters.json` snapshot.
- Uncaptured pages (`/start`, `/earlyaccess`, `/privacy`, `/terms`, `/policies`) link to the public withreservoir.com URLs. That includes "Book your draw", "Join the list" and a click on the wall.

## Known differences

- **ZIP check:** the live page posts to `book.withreservoir.com`, but only on withreservoir.com hosts. Elsewhere the page's own code shows its "We couldn't check your ZIP right now" state, and the copy keeps that behaviour.
- **Letters:** the wall shows the letters in the snapshot from the capture date, not the ones posted since.

Reservoir and Cellino names, marks, photography, team and advisor portraits, investor logos and copy belong to their owners. Replace them with licensed material before publishing a derivative or using it commercially.
