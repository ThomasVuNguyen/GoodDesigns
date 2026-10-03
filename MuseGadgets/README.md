# Muse Gadgets homepage recreation

A local capture of the Muse Gadgets landing page for design study.

- **Reference:** https://gadgets.muse.ai/
- **Page title:** Muse Gadgets
- **Captured:** 2026-10-03 (America/New_York)
- **Run:** from this folder, `python3 -m http.server 8811 --directory dist`, then open `http://localhost:8811/`.
- **Review sizes:** 1280 × 900 desktop and 390 × 844 mobile. Full-page height matches the reference at both (1765 px / 3241 px); fresh full-page pixel diffs differ in under 0.04% of pixels (the animated ASCII hero and 3D viewer).

## Structure and reuse

- `dist/index.html` — the server-rendered Next.js (Turbopack) page with its RSC payload, so the original React app hydrates locally. The `?dpl=` deployment tokens stay in the HTML on purpose: editing the length-prefixed payload breaks hydration.
- `dist/_next/static/` — stylesheets, JS chunks and the Geist Mono font.
- `dist/gadgets/` — device photos and wireframes, icons, and the Optimistic AI / Optimistic Mono / Geist Pixel fonts.
- `dist/gadgets/home-link-widget/` — the "Explore Muse Home Link" iframe: static HTML, CSS, ES modules and a `model.json` mesh rendered with WebGL (Device / What's inside / Connection tabs).
- `dist/api/auth/session`, `dist/api/preorder/status` — static signed-out answers to the two JSON endpoints the page calls.
- `assets-manifest.json` — maps each saved page file to its source URL.
- `tools/capture.py` — rebuilds `dist/` from the live site (`python3 MuseGadgets/tools/capture.py`). The site redeploys and changes chunk hashes, so re-run the script rather than patching files.

## Known differences

- The ASCII hero art and the 3D viewer are animated, so they differ by a few pixels from any other render.
- Vercel analytics is replaced by an empty stub script; Next.js route prefetches (`?_rsc=`) get an empty 200.
- Internal routes (`/home-link`, login, …) are not captured; a click interceptor opens them on the public site. The login and preorder states are the signed-out defaults.

Muse and Meta names, marks, copy and artwork, and the third-party device photos, belong to their owners. Replace them with licensed material before publishing a derivative or using it commercially.
