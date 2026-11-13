# Dia homepage study

A self-contained local recreation of the Dia Browser homepage (`https://www.diabrowser.com/`) captured on September 24, 2026. The page uses its server-rendered section structure and generated stylesheet, with locally stored assets and a small interaction layer for the mobile menu, feature selector, and trailer preview.

## Run locally

From this folder:

```bash
python3 -m http.server 4173 --directory dist
```

Open `http://127.0.0.1:4173/`.

## Files

- `dist/index.html` — complete page markup and copy
- `dist/styles.css` — captured responsive styles and type declarations
- `dist/local-overrides.css` — restores client-revealed content without the source site's runtime
- `dist/script.js` — mobile menu, feature selector, and trailer preview interactions
- `dist/assets/` — local image, poster, icon, and WOFF2 files; `manifest.json` maps each file to its source URL

Internal links outside this captured homepage intentionally open the live Dia site. Media and type assets are kept here for private design study. Replace Dia branding, copy, and assets before publishing a derivative.

## Captured page and behavior

The local capture includes the hero, three feature stories, six work-pattern cards, the privacy section, final call to action, and footer. The mobile menu opens and closes; the three feature-story controls switch the selected description; and the trailer button opens a local poster preview.

## Verification and known differences

The page was checked at 1280×900 and 390×844. It has no broken images, horizontal overflow, console errors, or runtime asset requests to the reference domain. The measured document heights were 6558 px on desktop and 7368 px on mobile. Screenshots are in `screenshots/`.

The source page's autoplay videos are represented by locally stored still posters, and its trailer preview is poster-only. The “Download Dia for free” buttons remain visual controls; the platform download flow was not recreated. These differences are documented so the page is treated as a local visual study, not a downloadable Dia product page.

# The Dia Lately · Find your flow

A second page in this folder: the Dia release-notes issue `https://www.diabrowser.com/release-notes/1-57-find-your-flow` ("Find your flow"), captured on November 12, 2026. The live page is a Next.js app that fills in its images and video on the client, so the local page is the browser-rendered DOM saved after a full scroll, with the original generated stylesheet, every asset stored locally, and a small script in place of the framework runtime.

## Run locally

From this folder:

```bash
python3 -m http.server 4173 --directory dist
```

Open `http://127.0.0.1:4173/release-notes/1-57-find-your-flow.html`. In the gallery it is the `dia-lately-find-your-flow` card, served at `/sites/dia/release-notes/1-57-find-your-flow`. The homepage capture's three "What's New" links now open this page.

## Files

- `dist/release-notes/1-57-find-your-flow.html` — page markup and copy
- `dist/release-notes/lately.css` — the source site's generated stylesheet (Tailwind utilities, `@font-face` rules, the `lately-*` layout classes), with font and image URLs pointed at `dist/assets/`
- `dist/release-notes/lately-local.css` — transitions that the source drove from framer-motion, the reveal classes, and the trailer-poster dialog
- `dist/release-notes/lately.js` — every interaction (below)
- `dist/assets/lately/` — painting, video, poster, product images, avatars, signatures and past-issue cards; `manifest.json` there maps each file to its role and source URL, including the fonts this page added to `dist/assets/fonts/`

All page paths are relative (`../assets/...`), so the page works from the local server and from the gallery's `/sites/dia/` prefix without rewriting.

## Sections and interactions

Sections, in order: the tilted painting masthead ("Final Goodbye" by An Huynh), the issue eyebrow, "Find your flow" and its intro; "Nest your tab groups" with its looping video; "Dia can now design in Figma"; the two-up "Fill in the blanks" and "Read between the layers"; the permissions note; "What else is new" with four shipped-by rows; the changelog note; the "Past Issues" rail; and the footer.

`lately.js` implements:

- **Mobile menu** (below 800px): the pill grows to `calc(100svh - 20px)` over 0.4s, the links and buttons blur in with a 0.05s stagger, the plus turns into a close mark. Escape or a link closes it. "Watch the trailer video" opens the homepage capture's trailer poster in a dialog.
- **Download Dia pill** (800px and up): fades and scales in at the top right once `scrollY > innerHeight`, as on the source.
- **The Dia Lately / Changelog switcher**: fixed at the bottom, sliding away while the footer is on screen (the source's IntersectionObserver rule; the slide itself is in `lately.css`).
- **Past Issues arrows**: page the scroll-snap rail one card at a time, disabled at either end. The rail also swipes and scrolls natively.
- **Reveal**: the closing notes and footer fade in when they first enter the viewport. Reduced-motion users get no fade.
- **Video**: the tab-groups clip autoplays muted and loops, pausing while off screen.

Breakpoints come from the source stylesheet: 600px (rail arrows appear), 800px (desktop header, two-column features, wider type), 1000px and 1200px (grid refinements).

## Verification and known differences

Checked at 1280×900 and 390×844 against fresh screenshots of the live page. Document heights match exactly: 6805px desktop and 6142px mobile. A pixel diff shows no differences outside the playing video, apart from anti-aliasing in a few lines of text and the signature images. There are no failed requests, horizontal overflow, console errors, or requests to any non-local host. Off-screen Past Issues images are lazy, as on the source, and all load when the rail is scrolled. Screenshots are `screenshots/lately-desktop.jpg` and `screenshots/lately-mobile.jpg`.

Intentional differences:

- The video is the Mux 2160p rendition re-encoded to 1600px H.264 without audio (2.5 MB). The source streams HLS.
- Images come from Sanity's CDN at one size each (WebP), not the source's per-breakpoint `<source>` set.
- "Download Dia" opens `https://www.diabrowser.com/download` instead of starting the platform download. Links to other Dia pages (Apps, Security, Changelog, past issues, footer) open the live site.
- The trailer opens a poster, as in the homepage capture. The trailer video is not part of this page.

The painting, product screenshots, staff photos and signatures, copy, fonts and Dia branding belong to The Browser Company and the artist. They are kept here for private design study. Replace them before publishing anything derived from this page.
