# HeyPCB homepage recreation

A local capture of the HeyPCB landing page for design study.

- **Reference:** https://heypcb.ai/
- **Page title:** heypcb — AI PCB Designer | Describe it. Get a board.
- **Captured:** 2026-10-02 (America/New_York)
- **Run:** from this folder, `python3 -m http.server 8792 --directory dist`, then open `http://localhost:8792/`.
- **Review sizes:** 1280 × 900 desktop and 390 × 844 mobile.

## Structure and reuse

- `dist/index.html` — the server-rendered Next.js (Turbopack) page, including its RSC payload so the original React app hydrates locally.
- `dist/_next/static/` — the two stylesheets, every JS chunk (found by scanning the page and each chunk, including lazily loaded ones) and the Geist / Geist Mono fonts.
- `dist/img/` — the PCB "world" render images, originally served from `img.heypcb.ai`.
- `dist/logo.png`, icons and manifest at the root.
- `assets-manifest.json` — maps every saved file to its source URL.
- `tools/capture.py` — rebuilds `dist/` from the live site (`python3 HeyPCB/tools/capture.py`). The live site redeploys, so chunk hashes change; re-run the script rather than patching files.

## Sections and interactions

The landing page sections (product, world, pricing and footer) with the original client-side interactions, including the 3D board viewer (glTF models, Draco decoder) which renders locally. Anything needing the HeyPCB backend (`/api/*`, login, dashboard) is not part of the capture.

## Known differences

- Internal routes (`/login`, `/challenge`, `/privacy`, …) are not captured; a small click interceptor appended to `index.html` opens them on the public site instead. Next.js link prefetches to those routes return 404 locally.
- Backend calls such as `/api/auth/me` return 404 locally, so signed-in state never appears.
- PostHog analytics is disabled in the saved chunk, so no analytics requests are made.
- The 3D viewer loads its models after the page, so a screenshot taken early can show the “assembling” state on either copy.

HeyPCB names, marks, copy and artwork belong to their owners. Replace them with licensed material before publishing a derivative or using it commercially.
