# Foglamp homepage recreation

A local capture of the Foglamp landing page for design study.

- **Reference:** https://www.foglamp.dev/
- **Page title:** Foglamp - Observability for AI agents
- **Captured:** 2026-10-02 (America/New_York)
- **Run:** from this folder, `python3 -m http.server 8794 --directory dist`, then open `http://localhost:8794/`.
- **Review sizes:** 1280 × 900 desktop and 390 × 844 mobile. Page height matches the reference at both (5711 px / 5956 px).

## Structure and reuse

- `dist/index.html` — the server-rendered Next.js (Turbopack) page with its RSC payload, so the original React app hydrates locally. The `?dpl=` deployment tokens are left in the HTML on purpose: the payload has length-prefixed rows and editing it breaks hydration.
- `dist/_next/static/` — stylesheets, JS chunks and the Inter fonts.
- `dist/*.png`, `avatar.jpg` — the dashboard screenshots and logos used by the page. `next/image` optimizer URLs were rewritten to the original files.
- `assets-manifest.json` — maps every saved file to its source URL.
- `tools/capture.py` — rebuilds `dist/` from the live site (`python3 Foglamp/tools/capture.py`). The live site redeploys and changes chunk hashes, so re-run the script rather than patching files.

## Known differences

- The hero dashboard image tilts with scroll/pointer, so the top desktop strip differs by a few percent from any other render.
- Vercel analytics is replaced by an empty stub script.
- Internal routes (`/pricing`, `/scan`, `/hud`, `/login`, …) are not captured; a click interceptor opens them on the public site. Next.js prefetches to those routes return 404 locally.

Foglamp names, marks, copy and artwork belong to their owners. Replace them with licensed material before publishing a derivative or using it commercially.
