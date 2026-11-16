# Schematik · Homepage

A local capture of the Schematik homepage for design study.

- **Reference:** https://www.schematik.io/
- **Page title:** Schematik: AI Hardware Builder for ESP32, Arduino and Pico
- **Captured:** 2026-11-16
- **Run:** from the repository root, `python3 -m http.server 4301 --directory Schematik/dist`, then open `http://127.0.0.1:4301/`.
- **Rebuild:** `python3 Schematik/tools/capture.py` fetches the live page again and rewrites `dist/` and `assets-manifest.json`. Set `CAPTURE_CACHE=<dir>` to reuse downloads between runs.
- **Sister capture:** the Starter Kit waitlist page (`/ssk1`) is a separate site in `SchematikSSK1/`. It uses the same tools and a different `tools/page.txt`.

## How it is built

schematik.io is a server-rendered Next.js (App Router, webpack) site styled with Tailwind v4. The capture keeps the live site's own code and runs it from local files. Nothing is reimplemented:

- the server HTML and its flight data
- the original stylesheets and fonts
- the webpack runtime and every chunk it can load
- the images, videos and the 3D board model that the page uses

Desktop and mobile get the same HTML, and one responsive page covers both.

- `dist/index.html`: the server-rendered page, with a `<script src="/shim.js">` added first in `<head>`.
- `dist/_next/static/`: the CSS (`css/*.css`), the JS chunks and the fonts (`media/*.woff2`). The fonts are Universal Sans for text, Vanity and Vanity Condensed for the stencil display type (BUILD / HARDWARE / WITH AI, step labels, MAKING HARDWARE LESS HARD), and DM Mono.
- `dist/guide-thumbnails/`, `dist/blog/`: images for the "Start from a template" carousel.
- `dist/about/social/`: "In the wild" posters, looping clips (`.webm`) and avatars.
- `dist/about/press/logos/wired.svg`: the WIRED mark in the stats strip.
- `dist/brand/`: the step-2 screenshot and the footer wordmark.
- `dist/step-3-breadboard.mp4`: the step-3 video.
- `dist/hero-arrow.png`: the hero's yellow arrow.
- `dist/models/2590-Metro-Mini-V2.stl`: the board drawn in outline at the hero's right edge. Live, it loads from Vercel Blob.
- `assets-manifest.json`: maps each saved file to its source URL.
- `tools/`:
  - `capture.py` makes the capture and applies every patch listed below.
  - `shim.js` is copied into `dist/`.
  - `page.txt` holds the route to capture.
  - `extra-assets.txt` lists the files the page requests at runtime. It was recorded from the live page at 1280, 390, 1920 and 768 px wide, with a full scroll at each width.

### Reusable parts

- **Tokens:** `_next/static/css/fa3b40f2a4535f82.css` is the Tailwind v4 theme. It holds the `--color-*`, `--font-*`, `--radius-*` and `--spacing` custom properties, with semantic ones such as `--color-border` and `--color-diagram`. The brand colours are:
  - cream page `#f0ede5`
  - signal orange (banner, send button)
  - lime `--color-lime-300: #c8e86a` (template band)
  - CTA yellow
  - deep green footer
- **Type:** `--font-universal-sans` for text, `--font-vanity` / `--font-vanity-condensed` for display labels, and `--font-dm-mono` for code.
- **Components:** these are shadcn-style, marked with `data-slot` / `data-variant` attributes:
  - `button` with variants `navCta`, `accent` and others
  - the dialog for the "Start building" sign-in
  - the template card button
  - the step card with its `Step n` + stencil label chip

## Sections and interactions

1. Announcement bar: "No parts? … Reserve yours" links to the live `/ssk1`. The × dismisses it and remembers that in localStorage.
2. Header: the logo; Community, Parts, Blog and About; the yellow "Try now" button. At mobile widths a menu button opens an inline link list.
3. Hero:
   - the BUILD / HARDWARE / WITH AI stencil blocks
   - the intro card with platform tags
   - the prompt box, which types example prompts, with an attach-photo button
   - the yellow arrow
   - the outline board drawn from the STL model
4. Stats strip: 250k+ users, 50M+ watching, and the WIRED headline.
5. "Start from a template": a horizontal carousel with ← / → buttons and a progress bar. Clicking a card opens the sign-in dialog, as it does live.
6. "From idea to hardware": three steps. Step 1 is an animated typing card. Step 3's video plays and pauses. The "resistor" button shows a tooltip.
7. "In the wild": an auto-scrolling marquee of social posts with looping clips.
8. Footer:
   - the breadboard illustration
   - the outline SCHEMATIK wordmark
   - four link columns
   - social icons
   - MAKING HARDWARE LESS HARD

"Try now", "Start building" and the template cards open the "Start building" sign-in dialog, as they do live.

## What the capture script changes

- **Images:** next/image is set to `unoptimized`, and `/_next/image?url=…` URLs in the HTML and JS are rewritten to the original files.
- **Links:** links to other routes (`href` in the HTML, the flight data and hard-coded `href:"/…"` in client chunks) point at `https://www.schematik.io/…`. Clicks open the live site, and Next.js does not prefetch routes the capture doesn't have.
- **Pathname:** `usePathname()` is pinned to `/`. The layout picks its header and banner from the pathname, and the capture is served from `/` locally and from `/sites/schematik/` in the gallery.
- **Starter Kit phase:** the Starter Kit banner switches from "pre-launch" (Reserve yours) to "live" (Get yours) on 2026-11-18. The capture keeps the pre-launch phase it was captured in. The `?ssk1_phase=` override still works.
- **Analytics:** PostHog is never initialised, because its project key is blanked.
- **`shim.js`:**
  - `/api/auth/get-session` answers `null` (logged out).
  - `/api/auth/providers` answers Google and GitHub.
  - Any other `/api/…` call answers `{}`.
  - Requests to other hosts answer `{}`.
  - Beacons are dropped.
- **3D model:** the hero's STL URL points at `/models/`.
- **Deployment query:** `?dpl=` deployment-id queries are stripped.

## Checks (2026-11-16)

These ran at 1280×900 and 390×844, from `/` and from a gallery-style `/sites/schematik/` copy with the gallery's path rewrite applied.

- **Page height:** matches live (3,622 px desktop, 4,433 px mobile).
- **Side-by-side review:** no visible difference beyond animation timing (the typing placeholder, marquee offset, LED dots).
- **Health checks:**
  - 0 console errors
  - 0 failed requests
  - 0 requests to another host
  - no horizontal overflow
- **Lazy images:** images in the off-screen carousel and marquee slides count as "incomplete" until they scroll into view, which is the same as live.
- **Interactions:** each matches live.
  - the banner dismiss
  - the template carousel arrows
  - the resistor tooltip
  - step-3 video play
  - the "Try now" and template-card sign-in dialog
  - the mobile menu

## Known differences

- Other routes (Community, Parts, Blog, compare pages, `/app`) are not captured. Their links open the live site.
- Signing in or creating an account does nothing.
- The prompt box can be typed in, but sending it goes nowhere.

## Licensing

The Schematik name and logo, the Vanity and Universal Sans typefaces, the product photos, the customers' social posts and avatars, and the WIRED mark belong to their owners. This capture is for private design study. Before any public or commercial reuse, replace the brand marks, photos, videos, social content and licensed fonts with material you have the rights to publish.
