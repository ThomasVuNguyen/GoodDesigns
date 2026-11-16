# Blacksmith · Homepage

A local capture of the Blacksmith homepage for design study.

- **Reference:** https://www.blacksmith.sh/
- **Page title:** The Fastest Way to Run GitHub Actions | Blacksmith
- **Captured:** 2026-11-16
- **Run:** from the repository root, `python3 -m http.server 4310 --directory Blacksmith/dist`, then open `http://127.0.0.1:4310/`.
- **Rebuild:** `python3 Blacksmith/tools/capture.py` fetches the live page again and rewrites `dist/` and `assets-manifest.json`. Set `CAPTURE_CACHE=<dir>` to reuse downloads between runs.

## How it is built

blacksmith.sh is a Webflow design that Next.js serves. It uses the App Router and is built with Turbopack. The server HTML contains the Webflow markup and classes. After hydration, a `WebflowRuntime` client component sets `data-wf-page` / `data-wf-site` and loads Webflow's own scripts in order:

1. jQuery 3.5.1
2. the Webflow + IX2 bundle (`project-nighthawk.*`)
3. GSAP and Draggable
4. `forms.js`
5. `site.js`
6. the page script `pages/home.js`

It also loads Finsweet's Components (the marquee) and Finsweet Cookie Consent.

The capture keeps all of this and runs it from local files. Nothing is reimplemented. Desktop and mobile get the same HTML, and one responsive page covers both.

- `dist/index.html`: the server-rendered page, with a `<script src="/shim.js">` added first in `<head>`.
- `dist/_next/static/immutable/`: the Turbopack runtime, every JS chunk, the CSS (`chunks/*.css`) and the Next-hosted IBM Plex fonts (`media/`).
- `dist/webflow/js/`: the Webflow runtime scripts listed above, plus `finsweetcomponentsconfig-1.0.9.js`. That file holds the marquee settings.
- `dist/webflow/assets/`:
  - the images, logos and icons
  - the two background loops (`vide_sec-transcode.mp4`, the hero's dot-grid animation, and `loop_video-transcode.mp4`, the Chroma customer card) with their posters
- `dist/webflow/fonts/`: IBM Plex Sans and IBM Plex Mono, as Webflow declares them.
- `dist/images/`: the customer logos that are not Webflow assets.
- `dist/vendor/finsweet/`: `fs-components@2.3.59` (its entry and the `dist/` module graph) and `cookie-consent@1.15.0` (`fs-cc.js`). These are the versions jsDelivr resolved for `@2` and `@1` on the capture date.
- `dist/vendor/webflow/custom-checkbox-checkmark.svg`: Webflow's checkbox tick. The source is Webflow's CDN, and the stylesheet points at this copy.
- `dist/shim.js`: answers the page's network calls locally (see below).
- `assets-manifest.json`: maps each saved file to its source URL.
- `tools/`:
  - `capture.py` makes the capture and applies every patch below.
  - `shim.js` is copied into `dist/`.
  - `extra-assets.txt` lists the same-host files the page requests at runtime. It was recorded from the live page at 1280 and 390 px, with a full scroll at each width.

### Reusable parts

- **Tokens:** `_next/static/immutable/chunks/0cxflohzk2v5z.css` is the Webflow site stylesheet. Its `:root` holds the design tokens:
  - colours: `--color--yellow: #f0fb29` (hero, CTA band, footer, buttons) and `--color--dark: #202020`. The announcement bar and the code/stat highlights are a pale blue.
  - type: `--fixed-heading--*` (heading-01 to heading-07, for example heading-03 at 40/46 px, −2.5 px), `--body--*` and `--utility--*` (mono labels and code, for example label-01 at 14/16 px, 0.5 px)
  - spacing: `--spacing--spacing-00` to `--spacing--spacing-96`
  - fonts: `--ibm-plex-sans` and `--ibm-plex-mono`
- **Page CSS:**
  - `0v71pgyxighv4.css` holds the reveal-on-scroll (`[data-reveal]`) and the comparison-bar wipe.
  - `3wzqp0ya2pgg6.css` holds the home badge flip and the wordmark.
  - `0muxsukte-xtc.css` holds the Webflow `@font-face` rules.
- **Components:** the Webflow class names carry the components:
  - `.section-title` + `.label-01`: the "/ CONSOLE ■" rule
  - `.dotted`, `.gradient_dotted`: dot-grid surfaces
  - `.is_yellow`: yellow fill
  - `.social_block-2`: the footer social tiles
  - `.comparison-metric` / `.metric_item` / `.cm_inner`: the tech selector and its bars
  - `.row-title`: the comparison rows and accordions
  - `.fs-cc_*`: the cookie banner and preferences
  - `.video-overlay-click` / `.icon-play-light`: the video triggers

## What the capture script changes

- **Analytics:** the root layout renders four `afterInteractive` scripts: Google Tag Manager, Plausible, RB2B and HubSpot. Their row in the flight data is emptied, and their `<link rel="preload">` hints are removed. The PostHog key is blanked, so PostHog never initialises and never loads its relay scripts.
- **Finsweet:**
  - The cookie-consent loader and the components loader point at `vendor/finsweet/`.
  - fs-components finds its own `<script>` by comparing `src` with `import.meta.url`, so the loader writes an absolute URL built from `location.href`.
  - `shim.js` answers Finsweet's licence check (`accounts.finsweet.com/v1/components/verify`) with `{"valid":true}`, which is what the live site gets.
- **`shim.js` network calls:** other calls to other hosts answer `{}`, beacons are dropped, and scripts from other hosts never load. The one exception is YouTube (see below).
- **Newsletter form:** the form posts to `/api/newsletter`, which a static capture does not have. `shim.js` answers that call with a 503, so nothing is sent. The form then shows its own "Oops! Something went wrong while submitting the form." block. Live, the same form shows "Thanks for subscribing!".
- **Links:** root-relative route links (`/pricing`, `/customers`, `/blog`, the logo's `/` and so on) are made absolute in the HTML, the flight data and the client chunks. Clicks open the live site, and the Next.js router does not prefetch routes the capture lacks.
- **Paths:** assets keep their root-absolute paths (`/_next/…`, `/webflow/…`). The gallery build prefixes them with `/sites/blacksmith`. That includes the Turbopack chunk base `"/_next/"` and the Webflow script list. The capture was checked at `/` and under `/sites/blacksmith/` with the same rewrite.

### Videos

- The two background loops play from local files.
- Each play button opens Webflow's video popup. `home.js` loads YouTube's iframe API on the first click and plays the film (`IMBgEIdtID0` for the product film, `KBe4HKkkiQk` for the Chroma customer story) in a YouTube embed. Those films are hosted by YouTube and stay third-party. Nothing loads from YouTube until a play button is clicked.

## Sections and interactions

In order:

1. **Announcement bar:** "Announcing our Series C led by Sequoia at a $1B valuation. Read more".
2. **Header:**
   - the logo, Pricing, Customers, a Resources dropdown and Support
   - Log in
   - The Resources dropdown opens on hover and lists Documentation, Blog, Security, Self-hosting, Guides, About and Careers.
   - Below 992 px a MENU button opens a full-screen list and turns into CLOSE.
3. **Hero:**
   - the pixel BLACKSMITH wordmark (stacked on mobile)
   - the AICPA SOC 2 badge, which flips on hover
   - the headline
   - the `- runs-on: ubuntu-latest` / `+ runs-on: blacksmith-4vcpu-ubuntu-2404` diff, with a typing cursor
   - Try for free and Contact our team
   - "Trusted by 12,000+ world-class teams" logo row
4. **Cookie banner:** "We use cookies for performance and analytics…". Accept closes it and sets the `fs-cc` cookie. Settings opens the preferences panel.
5. **Speed claims:** 2x faster hardware, 4x faster cache downloads, 40x faster Docker builds.
6. **Product film:** a dot-grid background loop and a yellow play button that opens the YouTube popup.
7. **/ Console:** "GitHub Actions, but actually observable" and three feature cards: failing jobs, flaky tests and PR comments.
8. **Stats marquee:** 12,000+ / 120M+ / 200K+ scroll right to left (Finsweet marquee).
9. **Customers grid:**
   - the Chroma video card
   - the Ashby, mintlify and VEED stories
   - Meet our customers
10. **/ Tool:**
    - "Blacksmith cuts the time it takes to merge code in half"
    - three numbered points
    - the tech selector card: six workloads, each with its own bar values. The bars wipe in on scroll and again on every change.
11. **/ Compare:**
    - the Blacksmith / GitHub / Self-hosted table, with Performance and Cost groups
    - the USA and globe region marks at the foot of the left column (desktop only)
    - On mobile both groups are accordions.
12. **/ By the numbers:**
    - the investors (Sequoia, Peak XV, GV, Y Combinator)
    - Meet the team
    - the 120M+ / 200K+ / 12,000+ tiles
13. **CTA band:** "Start with 3,000 free minutes per month…", with the USA and globe marks, Try for free and Contact our team.
14. **Footer:**
    - the newsletter email field
    - the Product, Resources and Company columns (Status is marked with ■)
    - the X, LinkedIn and YouTube tiles
    - © 2026 Blacksmith Software Inc

**Breakpoints:** Webflow's 991 / 767 / 479 px. The header collapses below 992 px (`data-collapse="medium"`), and the marquee speed changes below 992 px.

## Checks (2026-11-16)

These were run against live at 1280×900 and 390×844, in Chrome via Playwright:

- **Document heights:** 8,724 px and 12,369 px on both.
- **Full-page pixel diff:** the only band that differs is the hero's looping video, which is at a different frame. Everything else matches.
- **Console:** 0 errors.
- **Network:** no requests leave the page's own host until a play button is clicked. No broken images, and no horizontal overflow.
- **Interactions with the same results on live and local:**
  - the typing cursor
  - Resources on hover, and its links
  - the marquee movement
  - the tech selector: Android [GitHub Actions] gives 3m / $0.012
  - the video popup and its YouTube embed
  - cookie Accept
  - the mobile menu
  - the mobile Performance accordion, which takes the page from 12,281 to 13,006 px and back
- **Gallery path:** the same checks pass under `/sites/blacksmith/` with the gallery's path rewrite.

## Known differences

- The newsletter form shows its failure block instead of "Thanks for subscribing!", because nothing is sent.
- No analytics, ad pixels or PostHog surveys load.
- The background video's frame and the marquee's position at any moment depend on load time.

## Licensing

Everything here belongs to Blacksmith Software Inc. or the respective owners: the copy, the BLACKSMITH wordmark, the illustrations, the videos, and the customer and investor logos. IBM Plex is under the SIL Open Font License. Finsweet's libraries, jQuery and GSAP are under their own licences.

This capture is for private design study. For anything published, replace the brand, copy, logos, images and video with material you are allowed to use. Keep the Webflow layout classes and the tokens listed above as the reusable structure.
