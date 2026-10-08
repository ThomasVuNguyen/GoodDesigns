# Glide Classic homepage recreation

A local capture of the Glide Classic landing page for design study.

- **Reference:** https://www.glideapps.com/classic
- **Page title:** Glide Classic: No-code builder for business apps
- **Captured:** 2026-10-08 (America/New_York)
- **Run:** from the repository root, `python3 -m http.server 8830 --directory GlideClassic/dist`, then open `http://localhost:8830/`.
- **Review sizes:** 1280 × 900 desktop and 390 × 844 mobile. Full-page height matches the reference at both (11,299 px / 11,514 px). Remaining pixel differences sit in the autoplaying videos, the logo marquee and the auto-advancing tab panels, which are in different animation states in any two renders.

## Structure and reuse

- `dist/index.html` — the server-rendered Next.js (Turbopack) page with its RSC payload, so the original React app hydrates locally.
- `dist/_next/static/` — stylesheets, JS chunks and the Boot-on / Affairs fonts.
- `dist/images/` — logos, customer photos, use-case artwork, platform diagrams.
- `dist/media/` — the twelve homepage videos, saved from Glide's Google Cloud Storage bucket.
- `dist/api/status/` — static copies of the two status-page JSON answers the footer status dot reads.
- `assets-manifest.json` — maps each saved file to its source URL.
- `tools/capture.py` — rebuilds `dist/` from the live site (`python3 GlideClassic/tools/capture.py`). The site redeploys and changes chunk hashes, so re-run the script rather than patching files.

## What the capture script changes

- `next/image` is switched to unoptimized and the optimizer URL helper returns the original path, so images load from `dist/images/`.
- `usePathname()` returns `/classic`, so pathname-dependent UI (the "Glide Classic" brand, nav state) hydrates without a mismatch when the page is served from another path.
- Analytics, ad pixels, Google Tag Manager, Intercom, PostHog, UserGems and other third-party scripts are neutralised (`data:` stubs); no request leaves localhost.
- Next.js route prefetches (`?_rsc=`) get an empty 200 and internal page links open the public site in a new tab.

## Known differences

- Video poster images for the pillar cards 404 on the live site too; a transparent pixel is served so nothing 404s locally.
- Internal routes (pricing, customers, …) are not captured. Forms, sign-up and login point to the public site.
- Autoplay videos and marquees run on their own timeline, so screenshots differ by a few frames.

Glide names, marks, customer logos, photography, videos and copy belong to their owners. Replace them with licensed material before publishing a derivative or using it commercially.
