# F13 homepage recreation

A local capture of the F13 landing page for design study.

- **Reference:** https://www.f13.com/
- **Page title:** F13
- **Captured:** 2026-10-02 (America/New_York)
- **Run:** from this folder, `python3 -m http.server 8793 --directory dist`, then open `http://localhost:8793/`.
- **Review sizes:** 1280 × 900 desktop and 390 × 844 mobile. Page height matches the reference at both (3603 px / 3955 px).

## Structure and reuse

- `dist/index.html` — the server-rendered Next.js (Turbopack) page with its RSC payload, so the original React app hydrates locally.
- `dist/_next/static/` — stylesheet, JS chunks and the Saans font files.
- `dist/hero/`, `dist/capabilities/`, `dist/solutions/` — the SVG illustrations and images the page uses. `next/image` optimizer URLs were rewritten to the original files.
- `assets-manifest.json` — maps every saved file to its source URL.
- `tools/capture.py` — rebuilds `dist/` from the live site (`python3 F13/tools/capture.py`). The live site redeploys and changes chunk hashes, so re-run the script rather than patching files.

## Sections and interactions

Hero with the rotating generated-graphic carousel and waitlist form, capabilities sections, footer, and the cookie banner, all on the original client code.

## Known differences

- The hero carousel is animated, so stills can differ by frame (desktop top strip differs by ~4% for this reason).
- Internal routes (`/blog`, `/jobs`, `/privacy`, …) are not captured; a small click interceptor opens them on the public site. Next.js prefetches to those routes return 404 locally.

F13 names, marks, copy and artwork belong to their owners. Replace them with licensed material before publishing a derivative or using it commercially.
