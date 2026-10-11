# Whim homepage recreation

A local capture of the Whim consumer homepage (rent premium products from the brands that make them) for design study.

- **Reference:** https://www.whim.com/
- **Page title:** Whim
- **Captured:** 2026-10-10 (America/New_York)
- **Run:** from the repository root, `python3 -m http.server 8841 --directory Whim/dist`, then open `http://localhost:8841/`.
- **Review sizes:** 1280 × 900 desktop and 390 × 844 mobile. Full-page height matches the reference at both (9,421 px / 8,185 px). Remaining pixel differences are confined to the product-room and testimonial areas, which animate on their own timeline.
- **Checks (both viewports):** 0 failed requests, 0 console errors, no horizontal overflow, 0 requests to any external host. The few "incomplete" images are 64 px lazy blur placeholders that are equally incomplete on the live site.

## Structure and reuse

- `dist/index.html` — the server-rendered Next.js (Turbopack) page with its RSC payload, so the original React app hydrates locally.
- `dist/_next/static/` — stylesheets, JS chunks and ABC Diatype / es Build fonts.
- `dist/consumer-home/`, `dist/business-v2/`, `dist/partner-logos/`, `dist/images/` — product-room scenes, benefit icons, how-it-works tablets, brand imagery and partner logos.
- `dist/media/testimonials/` — the 28 testimonial videos, re-encoded to 540p (originals total ~355 MB); captions (`dist/business-v2/testimonials/*.vtt`) and word timings alongside.
- `assets-manifest.json` — maps each saved file to its source URL.
- `tools/capture.py` — rebuilds `dist/` from the live site (needs `ffmpeg`); `tools/extra-assets.txt` lists assets chosen at runtime that a static crawl cannot see.

## What the capture script changes

`next/image` is set to unoptimized so original files are served, PostHog is never loaded, the email waitlist posts to a local stub (`/api/email-list.json`), and testimonial video URLs point at `/media/testimonials/`.

## Known differences

- Internal routes (`/policies`, `/contact`, product pages, …) are not captured; links are left as on the live site.
- Testimonial videos are lower resolution than the originals.
- The waitlist form does not actually submit anywhere.

Whim names, marks, partner logos, product photography, testimonial footage and copy belong to their owners. Replace them with licensed material before publishing a derivative or using it commercially.
