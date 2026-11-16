# Granola

A local capture of granola.ai, made for design study. It covers the homepage and every other page on the site.

- **Reference:** https://www.granola.ai/ and every page it links to: the sitemap's 365 URLs plus the 23 pages they link to (job posts, `/contact/sales`, `/download`, `/third-party-licenses`).
- **Captured:** 2026-11-16
- **Run:** from the repository root, `node Granola/tools/serve.mjs 4330`, then open `http://127.0.0.1:4330/`.
  - Use this server and not `python3 -m http.server`. Python's server redirects `/pricing` to `/pricing/`, and some pages fail to hydrate with a trailing slash the live site never has (React error #418). `serve.mjs` serves `pricing/index.html` at `/pricing`, as Firebase Hosting does in the gallery.
- **Rebuild:** `python3 Granola/tools/capture.py` crawls the live site again and rewrites `dist/` and `assets-manifest.json`.
  - Set `CAPTURE_CACHE=<dir>` to reuse downloads between runs.
  - It needs `curl` and, for two large videos, `ffmpeg`.

## Pages

There are 388 pages, each saved as `dist/<route>/index.html`:

| Section | Pages |
| --- | --- |
| Homepage and top-level pages | 25: `/`, `/pricing`, `/enterprise`, `/chat`, `/mcp`, `/voice-typing`, `/security`, `/transparency`, `/policies`, `/jobs`, `/blog`, `/updates`, `/customers`, `/integrations`, `/authors`, `/events`, `/explore`, `/startups`, `/students`, `/nonprofits`, `/ai-note-taker`, `/ai-meeting-assistant`, `/download`, `/contact`, `/third-party-licenses` |
| `/blog/…` | 289 posts and the 2 category pages |
| `/jobs/…` | 20 job posts |
| `/updates/…` | 17 release notes |
| `/authors/…` | 15 author pages |
| `/integrations/…` | 15 integration pages |
| `/customers/…` | 4 customer stories |
| `/use-cases/…` | sales, product |
| `/contact/sales` | the sales form |

`/jo` is a broken link on the live site (404) and is not captured. `/download` redirects to `notes.granola.ai/download`, the live app, as it does on the reference.

## How it is built

granola.ai is a Next.js App Router site built with webpack. Each page is server-rendered: the HTML carries the markup and the React Server Components flight data (`self.__next_f`), and the client chunks hydrate it. The capture keeps the original app and runs it from local files. Nothing is reimplemented.

- `dist/<route>/index.html`: the server-rendered pages, with `<script src="/shim.js">` added first in `<head>`.
- `dist/_next/static/`: the webpack runtime, the CSS, the Next-hosted fonts and every client chunk. The chunk list is read from the runtime's chunk map, so lazily loaded chunks are included.
- `dist/homepageAssets/`, `dist/blogImages/`, `dist/updatesImages/`, `dist/team/`, `dist/jobsPage/`, `dist/lifestyle-images/` and the other top-level folders: the site's public files, at the paths the pages use.
- `dist/_ext/`: files from other hosts, renamed by a hash of their URL:
  - Airtable attachments and generated `/api/og` cards that the pages show through the image optimizer
  - Luma event covers
  - two release-note videos from Granola's S3 bucket
- `dist/api-snapshots/images.json`: the `/api/images` answer that fills the `/jobs` photo wall.
- `dist/shim.js`: handles network calls locally (see below).
- `assets-manifest.json`: maps each saved file to its source URL.
- `tools/`:
  - `capture.py` makes the capture.
  - `shim.js` is copied into `dist/`.
  - `serve.mjs` is the local server.
  - `api/` holds the recorded API answers.
  - `extra-assets.txt` lists files the code builds at runtime from template strings. These are the 15 homepage call videos at two sizes with their posters, and the six footer photos.

### Images

next/image is switched to `unoptimized`. The `/_next/image` optimizer does not exist on a static host.

Each image the pages sent through the optimizer is saved as the optimizer's own rendition, at the widest width any page asks for, capped at 2048 px. The file goes under the image's original path, so the pages load files the same size as the live site's. This matters for the Airtable attachments: their originals run up to 40 MB and their URLs are signed and expire.

Images the pages reference directly, such as blog post bodies, are the original files.

### Reusable parts

- **Type:**
  - Melange (five weights), for display and serif headings
  - Quadrant, for body text and UI
  - Both are self-hosted by Next under `_next/static/media/`.
- **Colour tokens:** the `--oats-*` and `--color-*` custom properties in `_next/static/css/`:
  - the oat neutrals (`--color-oats-neutral-*`)
  - the green accent (`--color-accent: #94f27f`, `--color-accent-strong: #79d65e`, `--color-accent-text: #0d7916`)
  - fills, borders and content colours
- **Components:** the client chunks contain the navbar with its Features mega-menu, the mobile menu, the download dialog with the QR code, the FAQ accordions, the pricing tooltips and the react-tweet embeds. Page modules are under `_next/static/chunks/app/(main)/…/page-*.js`.

## What the capture changes

- **Links:** links to captured routes stay local. Anything else (the app at `notes.granola.ai`, docs, other hosts) opens the live site.
- **Navigation:** the Next.js router fetches RSC payloads (`?_rsc=…`) for client-side navigation. A static capture has none, so `shim.js` answers those requests with plain text, and Next.js falls back to a full page load of the same route. The browser's Back button works.
- **Analytics:** none of it loads.
  - `shim.js` blocks scripts, iframes and preload links from other hosts. That covers:
    - Google Tag Manager and everything it adds
    - iubenda
    - Plausible
    - Amplitude
    - Facebook, LinkedIn and Bing
    - Tally
  - It answers the site's own analytics routes with `{}`: Vercel Insights, the Dub proxy, AppsFlyer and `/api/monitoring`.
  - It drops beacons.
  - The capture strips the preload hints for those scripts from the HTML.
  - Sentry's DSN is blanked. Sentry sends through a native `fetch` taken from a hidden iframe, which goes past the shim.
  - Vercel BotID's client and the analytics scripts are not saved.
- **Clone canaries:** granola.ai carries two clone-detection beacons on every page. Despite the file names, neither has anything to do with payments.
  - **Script:** an effect in the root layout's `GoogleTagManagerInit` component runs on any HTTPS host other than granola.ai. It loads `https://api.granola.ai/v1/static-assets/payments.js?l=<page URL>&r=<referrer>&h=<host>&p=<path>`. The capture removes that code from the chunk (`CANARY_JS` in `capture.py`), so the effect is empty.
  - **Stylesheet:** the global stylesheet has a `background: url(https://api.granola.ai/v1/static-assets/payments.gif?source=css-integrity…)` rule. The capture replaces that `url()` with `none`.
  - **Check:** after a rebuild, `capture.py` scans every saved HTML, JS and CSS file and stops with an error if any trace of either remains. Pages loaded with `shim.js` switched off make no request to `api.granola.ai`. The shim's blocking of other hosts is a second layer.
- **Forms:**
  - Forms post to `/api/sendEmail`. `shim.js` answers 503, so nothing is sent, and the form shows its own error.
  - The "Send link" field in the mobile download dialog behaves the same way.
- **Gallery prefix:**
  - The gallery serves the capture under `/sites/granola/`, and its build prefixes route literals in the JS (`"/mcp"` becomes `"/sites/granola/mcp"`).
  - `usePathname()` is patched so that only the site root (`/sites/granola` or `/sites/granola/`) answers `/`. The footer CTA picks its text by path, and this keeps it hydrating as it does live.
  - Outside the gallery the hook is unchanged.
- **Videos:** the two release-note screen recordings on S3 are 4K and 1080p at 60 fps, 188 MB and 56 MB. They are re-encoded to at most 1920 px wide H.264 (CRF 24), 15 MB together. The larger one would have exceeded GitHub's 100 MB file limit.

## Checks

The capture date's checks are listed below. Gallery-prefix runs used the gallery's path rewrite, served without trailing-slash redirects.

- **Page sweep:** every captured page was loaded at 1280×900 and 390×844 (776 loads) and scrolled to the bottom. Results:
  - no missing local files and no broken images
  - no hydration errors, chunk-load errors or page errors from the capture
  - console errors come only from embedded YouTube and Vimeo players and from a Radix accessibility warning about a dialog title
  - horizontal overflow at 390 px only on `/blog/gainsight-ai-notetaker-integration-automating-health-scores-outcome-tracking` (561 px) and `/third-party-licenses` (841 px), the same widths the live pages have
- **Visual comparison:** these 14 pages were screenshotted full-page against the live site at both widths:
  - `/`, `/pricing`, `/blog`, `/blog/series-c`, `/enterprise`, `/customers/brex`, `/integrations/slack`, `/jobs`, `/updates`, `/updates/say-hello-to-team-folders`, `/chat`, `/events`, `/authors/jo`, `/security`
  - Page heights match, apart from `/enterprise` (2 px) and `/jobs` at 390 px.
  - What differs:
    - the homepage's randomly picked call videos
    - the `/jobs` photo stack and photo-wall tilts, which are randomized on each load
    - frames of animated sections
    - slight resampling in small thumbnails, where the local copy downscales a wider rendition
- **Interactions:** these behave as they do live:
  - the Features mega-menu
  - the before / in / after meeting tabs
  - the mobile download dialog with its QR code
  - the pricing FAQ accordion and the plan-feature tooltips
  - the mobile menu
  - navigation between pages, including Back
- **Off-host requests:** the only ones are the YouTube, Vimeo and X (tweet media) embeds inside page content, and Cloudflare Turnstile on `/blog/announcement`.

## Known differences

- In-site navigation does full page loads, not client-side transitions.
- The forms (sales contact, "Send link") do not submit.
- The embedded YouTube and Vimeo videos and the tweets' X media load from their hosts.
- Signing in, downloading, and other links into the app open the live site.
- The `/jobs` photo wall shows the 20 photos `/api/images` returned on the capture date.

## Licensing

Everything on these pages belongs to Granola, Inc. or the respective rights holders. That includes the copy, the blog posts, the brand, the Melange and Quadrant typefaces, the photography and illustrations, the customer logos and the app code. The capture is for private design study. Before publishing anything built from it, replace the copy, logos, fonts, images and posts with material you are allowed to use.
