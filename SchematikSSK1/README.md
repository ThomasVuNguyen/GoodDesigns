# Schematik · Starter Kit (SSK1) waitlist

A local capture of Schematik's Starter Kit waitlist page for design study.

- **Reference:** https://www.schematik.io/ssk1
- **Page title:** Schematik Hardware Starter Kit | Join the Waitlist
- **Captured:** 2026-11-16
- **Run:** from the repository root, `python3 -m http.server 4302 --directory SchematikSSK1/dist`, then open `http://127.0.0.1:4302/`.
- **Rebuild:** `python3 SchematikSSK1/tools/capture.py` fetches the live page again and rewrites `dist/` and `assets-manifest.json`. Set `CAPTURE_CACHE=<dir>` to reuse downloads between runs.
- **Sister capture:** the homepage is a separate site in `Schematik/`. The two folders use the same `capture.py` and `shim.js`. `tools/page.txt` selects the route.

## How it is built

The page is a route of schematik.io's Next.js (App Router, webpack) site. The capture keeps the server HTML and flight data, the original CSS and fonts, the webpack runtime with every chunk it can load, and the box textures. The page's own React code runs from local files and draws the box, the scroll-driven opening, the circuit line and the waitlist form. The page is served at `/` locally, so `usePathname()` is pinned to `/ssk1`. The marketing layout uses the pathname to hide the site header and banner on this route.

- `dist/index.html`: the server-rendered page, with `shim.js` loaded first.
- `dist/_next/static/`:
  - `css/436ac13962d45005.css` is this page's stylesheet.
  - `chunks/app/(marketing)/ssk1/page-*.js` is the page component.
  - Universal Sans is in `media/`.
- `dist/ssk1/<colour>/`: the box faces (`front.svg`, `back.svg`, `wall_exterior.svg`, `lid_exterior.webp`). The page uses `black` on its default white theme and `white` once the success state turns the page green. `light-green` and `light-orange` are the dark-theme variants the same code can choose, and they are kept so no request can fail.
- `assets-manifest.json`: maps each saved file to its source URL.
- `tools/`: `capture.py`, `shim.js`, `page.txt` (`/ssk1`) and `extra-assets.txt`. The last lists the runtime-requested files, recorded from the live page at four widths and extended with the colour variants.

### Reusable parts

- **3D box:** an isometric box rendered in SVG. Its faces are masked `<image>` elements, and the opening is driven by `yaw`, `elevation`, `roll`, `zoom` and `opening`. The texture colour comes from the `<html>` classes `dark`, `green` and `orange`.
- **Glyph chips:** S / C / R / O / L / K / 1 set in a diamond, square, circle or bar. They spell SCROLL and SSK1, and each marks a node on the circuit line.
- **Scattered type:** "you don't need to know anything, just open it / go for it", with each word placed on its own baseline.
- **Waitlist form:** a borderless email field and a "notify me" text button. It shows a green success state with a schematic illustration of the kit's parts.
- **Tokens:** these are shared with the homepage (`fa3b40f2a4535f82.css`). The page itself is pure black on white, with grey (`#e5e5e5`-ish) circuit lines and huge Universal Sans display type.

## Interactions

- Scrolling opens and turns the box.
- The SCROLL / SSK1 glyph chips and the circuit line run down the page through the three copy blocks.
- The form validates the email. Submitting it shows "you're on the list. we'll email you when the kit is ready to order." on the green kit illustration, as it does live.

## What the capture script changes

- **Pathname:** `usePathname()` is pinned to `/ssk1` (see above).
- **Waitlist POST:** `shim.js` answers `POST /api/ssk1/waitlist` with `{}` (200). Submitting shows the success state, but no address is sent anywhere.
- **Auth calls:** the logged-out auth calls are answered locally, and requests to other hosts are answered locally too.
- **Analytics:** PostHog is never initialised.
- **Images:** next/image is set to unoptimized, and `?dpl=` queries are stripped.
- **Phase:** the Starter Kit phase is frozen at "pre-launch", the phase it was captured in. The live code flips to "live" on 2026-11-18.
- **Links:** links to other routes open on the live site.

## Checks (2026-11-16)

These ran at 1280×900 and 390×844, from `/` and from a gallery-style `/sites/schematik-ssk1/` copy.

- **Page height:** matches live (4,710 px desktop, 3,235 px mobile).
- **Side-by-side review:** no difference beyond the LED-matrix animation frame.
- **Health checks:**
  - 0 console errors
  - 0 failed requests
  - 0 broken images
  - 0 requests to another host
  - no horizontal overflow
- **Scroll states:** compared against live mid-scroll, where the box is open and turned. They match.
- **Waitlist success state:** compared against live, with the live POST stubbed so no address was submitted. It matches.

## Licensing

The Schematik name, the SSK1 box artwork, the parts illustration and the Universal Sans typeface belong to their owners. This capture is for private design study. Before any public or commercial reuse, replace the brand artwork and the licensed font.
