# Glide homepage recreation

A local capture of the Glide (GlideOS) landing page for design study. Sibling of [GlideClassic](../GlideClassic/).

- **Reference:** https://www.glideapps.com/
- **Page title:** Glide | Turn spreadsheets into apps & agents
- **Captured:** 2026-10-08 (America/New_York)
- **Run:** from the repository root, `python3 -m http.server 8833 --directory Glide/dist`, then open `http://localhost:8833/`.
- **Review sizes:** 1280 × 900 desktop and 390 × 844 mobile. Full-page height matches the reference at both (9,006 px / 8,229 px). Remaining pixel differences are the auto-rotating hero scene tabs, the hero/section videos and the logo marquee, which are in different animation states in any two renders.

## Structure and reuse

- `dist/index.html` — the server-rendered Next.js (Turbopack) page with its RSC payload, so the original React app hydrates locally.
- `dist/_next/static/` — stylesheets, JS chunks and fonts.
- `dist/images/` — logos, hero-showcase scenes and panels (every responsive AVIF width), spreadsheet-flow stills.
- `dist/media/` and `dist/images/new/**/*.mp4` — homepage videos (Google Cloud Storage and first-party).
- `dist/api/status/` — static copies of the status-page JSON answers the footer reads.
- `assets-manifest.json` — maps each saved file to its source URL.
- `tools/capture.py` — rebuilds `dist/` from the live site (`python3 Glide/tools/capture.py`); `tools/extra-assets.txt` lists responsive variants chosen at runtime that a static crawl cannot see.

## What the capture script changes

Same as GlideClassic: `next/image` unoptimized, `usePathname()` pinned to `/`, third-party analytics/ad/chat scripts neutralised, `?_rsc=` prefetches answered with an empty 200, internal page links opening the public site.

## Known differences

- Internal routes (pricing, enterprise, customers, …) are not captured; links open the public site.
- Animated scenes, videos and marquees run on their own timeline.

Glide names, marks, customer logos, photography, videos and copy belong to their owners. Replace them with licensed material before publishing a derivative or using it commercially.
