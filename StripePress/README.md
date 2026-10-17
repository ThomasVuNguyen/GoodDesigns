# Stripe Press

A local capture of the Stripe Press homepage. The WebGL book stack, book and film detail views, podcast audio, and trailer all run from local files.

- **Reference:** https://press.stripe.com/
- **Page title:** Stripe Press — Ideas for progress
- **Captured:** 2026-10-17 (America/New_York)
- **Run:** from the repository root, `python3 -m http.server 8892 --directory StripePress/dist`, then open `http://localhost:8892/`.
- **Rebuild from the live site:** `python3 StripePress/tools/capture.py`

## Verification (2026-10-17)

Desktop is 1280 × 900 and mobile is 390 × 844. Compared after the homepage class `PressHomepage--isInitialized` was set.

- **Canvas:** the book stack canvas is 1280 × 900 on desktop and 390 × 844 on mobile, matching the reference. Opening a book shows the 3D cover and the essay.
- **Health:** 0 console errors and no horizontal overflow. The notification feed requests `/notifications`, which this capture does not include; that request 404s and is caught by the page.
- **Mobile:** the settled phone view matches the live page, including the same cropped book stack.

## Structure and reuse

- `dist/index.html`: the server-rendered homepage. Book, film, and podcast detail markup is in the page and opens in place.
- `dist/cdn/b.stripecdn.com/mkt-statics-srv/assets/`: the Stripe marketing bundles and styles. Relative imports between chunks are unchanged.
- `dist/cdn/images.stripeassets.com/`, `assets.stripeassets.com/`, and `videos.stripeassets.com/`: covers, zines, the Behind the Scenes episodes, and the film trailer.
- `assets-manifest.json`: maps every saved file to its source URL.
- Typefaces: Ivar Display, Ivar Headline, and Ivar Text, as local `@font-face` files.
- The reusable piece is the homepage canvas plus the detail panels (`PressHomepage`, `PressHomepageCanvas`, book, film, and podcast components).

## What the capture script changes

- Google Tag Manager, Sentry, web vitals, scroll tracking, the sales chat, and the source-attribution loader are removed.
- The script loader is patched so it can dynamic-import the local copies. The original only allowed `*.stripecdn.com`.
- The Stripe Press logo points at this homepage. Bookshop, Amazon, YouTube, and other outbound links stay external.
- Direct loads of a book path such as `/built-to-grow` are not separate pages. Open them from the homepage; the view updates the URL in place.

## Known differences

- Podcast audio and the film trailer are included and make this folder about 837 MB.
- `/notifications` is not mirrored.
- A hard refresh on a book URL 404s, because only the homepage was captured.

Stripe names, marks, book covers, audio, and copy belong to their owners. Replace them with licensed material before publishing a derivative.
