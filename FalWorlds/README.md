# fal Worlds

A local capture of the fal Worlds landing page: a giant "Worlds" wordmark over an endless scroll of generated objects. These are wire globes, ribbon spheres, pixel clouds, scribbles and dotted paths, each drawn live on its own canvas. Below the wordmark sit a typed tagline box and an "Explore fal worlds" button.

- **Reference:** https://fal.ai/worlds
- **Page title:** fal Worlds
- **Captured:** 2026-10-16 (America/New_York)
- **Run:** from this folder, `python3 -m http.server 8872 --directory dist`, then open `http://localhost:8872/`.
- **Rebuild from the live site:** `python3 FalWorlds/tools/capture.py`

## Structure and reuse

- `dist/index.html` — the server-rendered Next.js (App Router, Turbopack) page with its RSC payload, so the original React app hydrates locally. The `?dpl=` deployment tokens stay in the HTML because editing the payload's length-prefixed rows breaks hydration. The static server ignores them.
- `dist/_next/static/` — the stylesheets, JS chunks and the Focal and Public Sans (Rounded) fonts.
- `dist/assets/`, `blueprints/`, `serverless-about/`, icons — files the page's markup names (mostly for the nav and footer of the shared layout).
- `dist/stub.js` — an empty script that stands in for the consent manager (DataGrail) and the ad pixel.
- `assets-manifest.json` — maps every saved file to its source URL.
- `tools/capture.py` — rebuilds `dist/`. fal redeploys often and changes chunk names, so re-run the script rather than patching files.

The capture script changes the original code in these places:

- Vercel Web Analytics, the DataGrail consent manager and the ad pixel load an empty script instead.
- An inline shim at the top of `<head>` answers PostHog's `/relay-fal` and `/relay-e` requests with nothing. RSC prefetches of other routes never settle, so they never 404.
- `usePathname()` returns `/worlds` rather than the serving URL. The shared header renders differently on other paths, so without this change the page fails to hydrate at `/` or `/sites/<slug>/`.
- Internal links (`/`, `/pricing`, `/enterprise`, `/explore/worlds`, `/login`, …) open the public site in a new tab.

## Interactions

All of these run on the original code: the endless scroll that keeps adding objects, the canvas animations, the typed tagline, the Products and Resources dropdowns, and the mobile menu.

## Verification (2026-10-16)

Desktop is 1280 × 900 and mobile is 390 × 844 @2x.

- The objects are randomized on every load, and two loads of the live page differ by about 30% of pixels. So the comparison was made with the canvases hidden. With them hidden, the header, wordmark, tagline box and button line up with the reference at both sizes. The remaining differences are the randomized dotted frames and DOM-drawn objects.
- Scrolling 19 screens down shows the same stream of objects as the reference.
- The Products dropdown and the mobile menu match the reference.
- At both sizes there are 0 console errors, 0 broken images, no horizontal overflow and 0 requests to other hosts. The mobile page, like the reference, is one screen tall.

## Known differences

- The live site's "Your Privacy Choices" consent panel (DataGrail) is not included.
- Analytics and session recording (PostHog, Vercel) are off.

fal's name, marks, copy and artwork belong to fal. Focal is a commercial typeface. Replace them with licensed material before publishing a derivative or using it commercially.
