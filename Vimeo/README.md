# Vimeo · Homepage

A local capture of the Vimeo homepage for design study.

- **Reference:** https://vimeo.com/
- **Page title:** Vimeo - All-in-One Video Platform
- **Captured:** 2026-11-14
- **Run:** from the repository root, `python3 -m http.server 4190 --directory Vimeo/dist`, then open `http://127.0.0.1:4190/`.
- **Rebuild:** `python3 Vimeo/tools/capture.py` fetches the live page again and rewrites `dist/` and `assets-manifest.json`. It needs `yt-dlp` on the PATH for the hero film. Set `CAPTURE_CACHE=<dir>` to reuse downloads between runs.

## How it is built

vimeo.com is a server-rendered Next.js (App Router) page. It is styled with Tailwind and styled-components, and its content comes from Builder.io. The capture keeps all of this from the live site and runs the page's own code from local files. Nothing is reimplemented:

- the server HTML
- the Next.js flight data that the page hydrates from
- the original stylesheets
- the webpack runtime with every chunk it can load
- the fonts
- every image, Lottie file and video the page or its data references

The same HTML is served to desktop and mobile browsers. One responsive page covers both.

- `dist/index.html`: the server-rendered page. The flight data is re-emitted as a single `self.__next_f` push after its URLs are rewritten.
- `dist/cms/_next/static/`: the original CSS, the webpack runtime, the page and layout chunks, every lazy chunk the runtime lists (240 chunk files in all), and the fonts. The fonts are ABC Repro, ABC Repro Mono, ABC Repro Screen and Inter Tight.
- `dist/fonts/`: Fragment Mono from Google Fonts. It sets the "YOUR COMPLETE VIDEO PLATFORM" eyebrow.
- `dist/bynder/`: images, SVG icons and Lottie JSON from Vimeo's Bynder DAM. Each `transform` size or crop is its own file, with a hash of its query in the name.
- `dist/i/`: images from `i.vimeocdn.com` (265 files), including card images, video posters, customer avatars and Staff Picks posters. The CMS data names every size, so some are used only at other breakpoints or inside the menus.
- `dist/icons/`: the SVG sprites the Icon component loads by name (`icons/<name>.svg#<name>`).
- `dist/video/`: the hero background loop and the "See why millions love Vimeo" film, at 720p.
- `dist/player/`: `<id>.html` is a local page that plays that film, and `api.js` is a small stand-in for Vimeo's Player API (see below).
- `dist/shim.js`: answers the page's session and logging calls locally (see below).
- `assets-manifest.json`: maps each saved file to its source URL.
- `tools/`: `capture.py` (the capture and every patch listed below), plus `shim.js`, `player.html` and `player-api.js`, which it copies into `dist/`.

### Reusable parts

The design system is Vimeo's "Chroma". Its tokens and components live in the source CSS, `cms/_next/static/css/104b9a099eb51c11.css`.

- **Color tokens:** about 1,200 custom properties named `--colors-chroma-*`. Raw palette values are RGB triplets, for example `--colors-chroma-blue-500: 23,213,255` (CTA cyan), `--colors-chroma-neutral-50: 250,252,253` (page) and `--colors-chroma-neutral-900: 20,26,32` (dark bands). Semantic tokens point at them, for example `--colors-chroma-background-body` and `--colors-chroma-button-close-modal-primary`. The homepage adds a `lohp-*` set (`bg-lohp-container-background`, `lohp-btn-*`, `lohp-container-card`).
- **Type scale:** `.text-display-1` to `.text-display-8`, with `.text-display-mobile-*` counterparts (for example `.text-display-8`: 1.5rem/1.1, -0.06rem, weight 500), and `.text-body-*`. Fonts are set through `--font-ABCRepro`, `--font-ABCReproMono` and `--font-InterTight` (`efc6d7ac74b805c3.css`, `ae34698ad98c79d0.css`).
- **Components:** class names follow Tailwind utilities with `chroma-` and `lohp-` tokens:
  - `.chroma-container`: section wrapper
  - `bg-chroma-button-cta-primary`, `.btn-label`: buttons
  - `.button-modal-close`: modal close
  - `nav-parent-dropdown-container`: mega-menu items
  - `data-testid="cta-row"`: button rows

## What the capture script changes

- **Removed:** Transcend's consent manager (`airgap.js`) and its inline consent and Google Tag Manager bootstrap, the Elfsight widget loader, and the Cloudflare bot-detection script. Their Script elements are also removed from the flight data, so hydration doesn't load them again.
- **`shim.js` network calls:**
  - `/me/info` answers as for a logged-out US visitor.
  - `/_next/gtm` answers with a logged-out data layer.
  - `/wh/log`, `/flarepoint/…`, `/ablincoln/…` and `/cdn-cgi/…` answer `{}`.
  - Beacons are dropped.
  - Scripts from other hosts (Google Tag Manager, Datadog, Pardot, Singular, LinkedIn, Bing, Google Cast) never load.
- **Consent stand-in:** `shim.js` defines a stand-in `airgap` that reports the US (CPRA) privacy regime. That makes the footer show "Your Privacy Choices", as it does live for US visitors. The button opens nothing.
- **Asset paths:**
  - The webpack public path, the flight data's asset prefix (`"p"`) and every CDN URL point at local files, relative to the page. The folder works at `/` and under the gallery's `/sites/vimeo/`.
  - URLs inside a CSS custom property (the `--mask-image` Vimeo logo behind "Built for how you work") are written relative to the stylesheet that uses them.
- **Links:** root-relative site links (`/join`, `/features/…`) are made absolute, so clicks open the live site.
- **"Join free" button:** live, a layout effect replaces the hero's "See plans / Start for free" pair and the "See our plans" button with one "Join free" button. It only does this when the URL matches `vimeo.com`. The capture tests the live homepage URL instead, so it shows the same buttons. The cloned button's `/join` link is made absolute.
- **Player URLs:** `useVimeoPlayerAudioTrack` builds the player URL with `new URL(src)`, which fails on a page-relative URL. It is patched to resolve relative URLs and return them relative, so server and client markup still match.
- **Icons:** the Icon component's `"/icons/"` path is made page-relative.

### Videos

- **The hero background loop** plays from `video/1069021926-720p.mp4`.
- **Other background loops:** on the capture date every other background video on the page returned 403 from Vimeo's progressive endpoint on the live site too. That includes the mega-menu animations, the six feature cards and the Staff Picks tiles. Live, those blocks show their posters, and they show the same posters here. Their `src` is an empty `data:` URL, so nothing fails in the console.
- **"See why millions love Vimeo"** opens a modal. Live, the modal holds a Vimeo player iframe. Here the iframe loads `player/1070507470.html`, the same 71-second film from a local 720p file in the browser's own player. The page's modal code drives it through `player/api.js`, a small stand-in for `player.vimeo.com/api/player.js`: the film plays when the modal opens and pauses when it closes.
- **Other modal films** stay official Vimeo embeds, loaded from `player.vimeo.com` only when their modal is opened:
  - Vimeo's own clips, which are DRM-protected: "See how businesses grow with Vimeo" and the Cole Webley creator spotlight.
  - The ten Staff Picks films. These are third-party works and over two hours of video in total.

  `player/api.js` drives these embeds with Vimeo's postMessage protocol.

## Sections and interactions

**Desktop, in order:**
1. Header with four mega-menus (Features, Use cases, Enterprise, Learn), plus Pricing, What's new, Contact sales, Join and the upload, watch and account icons
2. Video hero, "Your videos, your way", with the "See why millions love Vimeo" film card
3. "Trusted by 287+ million" logo marquee
4. "Built for how you work" (Enterprise) over the Vimeo-mark mask
5. "The platform that powers your video strategy": six feature cards on dark
6. "A video solution perfect for everyone", with the Cole Webley creator card and the use-case list
7. "What customers are saying" quote marquee
8. "AI that takes your videos to the next level": a four-item accordion, each item with its own demo
9. "Enterprise security and scale" with the compliance badges
10. The "See how businesses grow with Vimeo" film card
11. The color stripe and "Join a thriving community of the world's greatest storytellers" Staff Picks wall
12. "Discover the latest from Vimeo"
13. The sticky lime announcement bar
14. Footer with "Get started for free", 24/7 support, link columns, social links, language select and legal row

**Mobile:** a top bar with Contact Sales and Login, and a bottom dock with Menu, Upload, Staff Picks, Watch and Join for free. The menu opens as a sheet that drills into each section. The Staff Picks wall becomes a carousel, and the footer link columns become accordions.

**Checked side by side against live:**
- The four mega-menus open on hover with the same content and layout.
- The AI accordion opens an item and swaps its demo.
- The announcement bar closes, and the page shrinks by 100px on both.
- The hero film modal opens, plays and pauses on close.
- A Staff Pick opens its film modal.
- The mobile menu opens and drills into Features.
- The mobile footer "Product" accordion opens.

**Breakpoints** come from the source CSS: `768px` (tablet, `md:`), `1024px` (the `desktop:` variant, where the bottom dock gives way to the full header), `1280px` and `1440px`.

## Verification

- **Viewports:** 1280 × 900 and 390 × 844, compared viewport by viewport against fresh screenshots of the live page.
- **Document heights match exactly:** 9,030px on desktop and 11,233px on mobile.
- **Browser health:** at both viewports, at `/` and under `/sites/vimeo/` with the gallery build's path rewrite applied:
  - 0 console errors
  - 0 failed requests (the browser aborting a video range request is not a failure)
  - 0 requests to any other host
  - no broken images
  - no horizontal overflow
- **Screenshots:** `screenshots/desktop.jpg` and `screenshots/mobile.jpg`, each a strip of viewport captures taken while scrolling. A full-page capture leaves the scroll-triggered sections faded out.

## Known differences

- **Cookie banner:** live shows Pardot's "Can we use cookies…" tracking opt-in. It isn't loaded here.
- **Hero film modal:** it uses the browser's video controls rather than Vimeo's player chrome, and it has no captions.
- **Modal embeds:** the films listed under Videos still need `player.vimeo.com` when their modal is opened.
- **Seeking:** `python3 -m http.server` doesn't answer range requests, so seeking in the local film works only on a server that does, such as Firebase Hosting.
- **Content:** it is as served on the capture date. Marquee and carousel positions depend on timing.
- **Other routes:** other vimeo.com pages are not captured, and their links open the live site.

Vimeo's name, logo, copy, photography, films, fonts (ABC Repro, ABC Repro Mono, ABC Repro Screen), customer logos, testimonials and the Staff Picks films belong to Vimeo and the respective companies, creators and people. They are kept here for private design study. Replace them with licensed material before publishing anything derived from this page.
