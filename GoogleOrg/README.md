# Google.org homepage

A local capture of the Google.org homepage. The page is the server-rendered markup as delivered, with Tag Manager and the cookie bar removed. Its stylesheet, the Glue runtime, fonts, images, and video are saved under `dist/`.

- **Reference:** https://www.google.org/ (serves the `intl/en_us` page)
- **Page title:** Google.org: Google's philanthropy
- **Captured:** 2026-10-19
- **Run:** from the repository root, `npx http-server GoogleOrg/dist -p 8790 -c-1`, then open `http://localhost:8790/`. Use a server that answers range requests: `python3 -m http.server` doesn't, so the video can't seek and Chrome may show a different frame.
- **Rebuild:** `python3 GoogleOrg/tools/build.py [saved.html]`. Without an argument it fetches the live page.
- **Reviewed at:** 1280 × 900 and 390 × 844.

## Structure

```
dist/index.html                        captured page, third-party scripts removed, assets pointed locally
dist/assets/glue/styles/default/       All.min.css (every page style) and All.min.js (the Glue runtime)
dist/assets/glue/*.js                  all 62 webpack chunks the runtime can load
dist/assets/fonts/                     Google Sans, Google Sans Text, Google Sans Display, Product Sans (latin, latin-ext) and fonts.css
dist/assets/images/                    carousel, focus-card, and resources images at each size the page's srcsets use, plus the logo and favicons
dist/assets/video/ambient.mp4          the looping montage
tools/build.py                         rebuilds dist/ from the page
assets-manifest.json                   source URL and role of each saved file
```

The runtime finds its chunks relative to its own URL (`../../` above `styles/default/`). That is why the published folder layout is kept.

## Sections and interactions

In order: header, hero headline with project carousel, mission statement, ambient video, “Our focus” with three cards, “Our resources, research, and innovation”, footer link columns, and the global footer.

All behavior comes from Google's own runtime, running from local files:

| Behavior | Notes |
| --- | --- |
| Project carousel | Embla carousel with eight looping slides. The arrows move one slide and the centered slide becomes active. |
| Story modal | The round button on the active slide opens a modal with the project's story and an outbound link. Escape and the close button close it. As on the reference, clicking the backdrop does not. |
| Ambient video | Plays muted on a loop. The corner button pauses and resumes it and shows a tooltip on hover. |
| Mobile drawer | Below 1024px the hamburger opens the navigation drawer. The backdrop closes it. |
| Footer columns | On mobile each column header expands and collapses its links. |
| Language select | Choosing an option goes to that google.org locale. |

## Breakpoints, tokens, and reusable pieces

Glue's breakpoints are 600px, 1024px, and 1440px. The styles are compiled Glue classes in `All.min.css`, not CSS variables:

- **Grid:** `glue-page`, `glue-grid`, `glue-grid__col--span-N[-sm|-md|-lg|-xl]`
- **Type:** `glue-headline--headline-1…6`, `glue-label`, `glue-cta`
- **Spacing:** `glue-spacer-N-top` and `glue-spacer-N-bottom`
- **Components:** `glue-header`, `embla__*` (the carousel), `glue-modal`, `glue-ambient-video`, `glue-card`, `page-promo-a` and `page-promo-b`, `glue-footer`

Icons are the `<symbol>` sprite at the top of `index.html`, used through `<use xlink:href="#name">`.

## Checks

At both viewports, local full-page screenshots match the reference everywhere except the ambient video. Each capture catches the video at a different moment. The video file is byte-identical to Google's, and a paused frame at the same timestamp matches exactly. Page height is 4,647px on desktop and 4,541px on mobile, the same as the reference. The two pages showed no pixel difference with the carousel advanced or with the modal open, beyond the video, or in hover, drawer, and footer-accordion states. No images are broken, nothing overflows horizontally, and the console has no errors. With every request outside localhost blocked, the page makes none.

## Intentional differences

- Nav, card, footer, and modal links still go to google.org and other Google sites. The logos return to this page.
- Tag Manager, Google Analytics, and the cookie notification bar are removed. So is the footer's “Cookies management controls” button, which only opened that bar.
- Only the latin and latin-ext font subsets are saved.
- The reference serves the same video from two URLs. Only the first is kept, since a browser never plays the second.
- Like the reference, the video keeps playing under `prefers-reduced-motion`. It can be paused with its button.

Google.org's name, logo, photographs, video, copy, fonts, and Glue code belong to Google. Replace them with licensed material before publishing a derivative.
