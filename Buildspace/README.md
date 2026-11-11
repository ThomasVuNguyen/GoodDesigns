# buildspace

Six pages of [buildspace.so](https://buildspace.so/) kept as they were after the school shut down: the homepage, the final letter, the season 5 spectator page, the FAQs, the 2023 recap and the s4 demo day.

| Gallery card | Route | Reference | Title |
| --- | --- | --- | --- |
| `buildspace` | `/` | https://buildspace.so/ | buildspace |
| `buildspace-letter` | `/letter` | https://buildspace.so/letter | a letter to you. |
| `buildspace-spectate-s5` | `/nw` | https://buildspace.so/nw | spectate s5 |
| `buildspace-faq` | `/faq` | https://buildspace.so/faq | frequently asked questions \| buildspace |
| `buildspace-2023-recap` | `/hyper` | https://buildspace.so/hyper | hyper honest. |
| `buildspace-s4-demoday` | `/s4/demoday` | https://buildspace.so/s4/demoday | s4 demo day \| buildspace |

Captured 2026-11-10 from the live Framer build (`script_main.N6QPR2NJ.mjs`).

**In the gallery this is six cards, not one.** Each page has its own entry in `gallery/sites.json` (`buildspace`, `buildspace-letter`, `buildspace-spectate-s5`, `buildspace-faq`, `buildspace-2023-recap`, `buildspace-s4-demoday`) and its own thumbnail. All six share the `Buildspace` folder and point at their own route through `"entry"`, so the capture stays one build while every page is directly reachable. The pages also still navigate to each other in place.

## Run locally

```bash
python3 Buildspace/tools/serve.py 4187
```

Then open http://localhost:4187/.

The server exists because the pages keep their live extensionless routes. Framer resolves its own links against the current route's directory — `/nw` + `./faq` is `/faq`, while `/nw/` + `./faq` would be `/nw/faq` — so `/faq` has to be served from `faq.html`. Firebase Hosting does the same thing through `cleanUrls`, which is why the deployed gallery needs no equivalent step.

## Structure

```
Buildspace/
  README.md
  source/                   captured HTML, one file per page (provenance for tools/build.py)
  tools/
    build.py                rewrites source/ into dist/: localises assets, strips analytics
    serve.py                static server with Firebase-style clean URLs
    check.mjs               browser health check at both viewports; --prune trims unused assets
  dist/
    index.html              /            (hero, one viewport tall)
    letter.html             /letter
    nw.html                 /nw
    faq.html                /faq
    hyper.html              /hyper
    s4/demoday.html         /s4/demoday  (28 MB of server-rendered cards)
    assets/                 1,566 files: 1,050 YouTube thumbnails, 483 Framer images,
                            285 woff2, 17 mp4, 3 Framer CMS payloads, 1 mp3
      manifest.json         every local file -> role, size and source URL
    vendor/framer/          352 Framer modules (React, motion, every route and component)
  reference/                desktop 1280x900 and mobile 390x844 captures of the live pages
```

## What `tools/build.py` does

Rebuild with `python3 Buildspace/tools/build.py` (needs network for anything missing; raw modules are cached in `source/modules/`).

1. Walks the Framer module graph reachable from all six pages and downloads it to `vendor/framer/`.
2. Collects every `framerusercontent.com`, `fonts.gstatic.com` and `i.ytimg.com` URL from the HTML and the modules and saves it under `assets/`.
3. Folds Framer's runtime `new URL("assets/512/x.png", "<module>").href` image references into plain absolute URLs before rewriting, so those variants resolve locally too.
4. Points the YouTube thumbnail templates inside the Framer YouTube component at `assets/yt-<video id>.webp`. Without this the cards look right but the video modal asks `i.ytimg.com` again.
5. Removes PostHog, Google Ads/Analytics, the TikTok pixel, the Framer events script and the Framer editor bar.
6. Rewrites every asset and module reference to a root-absolute path (`/assets/…`, `/vendor/framer/…`). The gallery build prefixes those with `/sites/buildspace/`; the pages are at different depths, so root-absolute is the only shared form that works for both.
7. Leaves the six local routes alone and points every other captured route (`./sf1`, `./home`, `./demoday/<project>`) at buildspace.so. A small inline script does the same after hydration, because Framer's router re-renders the original hrefs from component props.

`node Buildspace/tools/check.mjs` re-runs the browser checks and rewrites `reference/local-*.png`.

## Pages

### Homepage (`/`)

One viewport tall, split on desktop: a black panel with the buildspace arrow mark, "hi. this was buildspace.", the "we were the biggest school in the world for people who wanted to work on their own ideas — ty for the memories. love you." paragraph and two buttons ("read final letter" → `/letter` in a new tab, "watch final video" → YouTube). The right half is a looping muted mp4 of the s4 space. On mobile the video sits above a centred text block.

### Final letter (`/letter`)

A white long-form letter by farza ("[hi play above track as you read this] by: farza. published: aug 23, 2024.") with an audio track, 70 photographs and 7 videos arranged in the same staggered grids as the original, ending with the letter's closing photo set. 15,127 px tall on desktop, 19,852 px on mobile.

### Spectate s5 (`/nw`)

Fixed header (logo, "login to sage") and footer (our story, faqs, join us, contact us, s4 demos, X, Instagram) around: the hero "season 5 has begun but u can still come thru." with "spectate s5" and "faqs" buttons and three columns of looping testimonial videos; "it all begins online. on nights and weekends." with the a16z and Y Combinator logos; "work on ideas that excite you."; "this is not a bootcamp."; "got a day job? np."; "every week, we have 1 lecture, 1 talk and 1 weekly update." over a horizontal marquee of week cards and videos; "also, for the first time, we have a new place for you." over Sage screenshots and a phone mockup; "and at the end, we meet irl." with the San Francisco and Dubai cards and a photo grid; and "our sf campus" over a video.

### FAQs (`/faq`)

Dotted-grid dark page: "not sure? take a look at the faqs." then three question groups — *sage related questions*, *nights & weekends relation questions*, *tech support / troubleshooting* — each a three-column grid of question/answer pairs with inline links to Sage, the acceptance pack, the recordings and mailto addresses.

### 2023 recap (`/hyper`)

The "2023 recap." article by farza majeed (feb 4, 2024) with a full-bleed video cover: intro, TL;DR list ("we killed a $1.5m biz.", "in 2023 we got huge.", "saying \"no\" to a $2m gov deal.", …), body sections with 18 photographs and 9 videos, and the closing photo set.

### s4 demo day (`/s4/demoday`)

"check out the demos from s4." over a note that the page is huge, a category bar (all / ai/ml / web3 / software / content / d2c / other) and a search button, then 1,051 project cards in a three-column grid (one column on mobile): YouTube thumbnail, play button, name, one-line description, cohort tag (spectreseek, gaudmire, alterok, erevald), category tag and an arrow to the project page. 154,710 px tall on desktop and 430,947 px on mobile.

## Interactions

| Behaviour | Where |
| --- | --- |
| Category chips filter the grid client-side (ai/ml leaves 338 cards) | `/s4/demoday`, Framer variant component |
| The magnifier opens a search field that filters the same collection | `/s4/demoday` |
| Clicking a card plays its YouTube video in a modal (`youtube.com/embed/<id>`); the thumbnail comes from `assets/yt-<id>.webp` | `/s4/demoday` |
| Vertical testimonial marquees, horizontal week marquee, autoplaying muted videos | `/nw`, `/hyper`, `/letter`, `/` |
| Scroll-triggered appears, hover states and the sticky header/footer come from the Framer runtime | all pages |
| Six local routes navigate through Framer's own router; other routes go to buildspace.so | `inline route guard` in each page |

## Tokens, fonts and breakpoints

- Colours: `#000` page, `#111`/`rgb(34,34,34)` card borders, `rgb(51,51,51)` dashed borders, `rgb(255,255,255)` text, `rgba(255,255,255,.5)` body text, plus the cohort accents `rgb(255,199,0)`, `rgb(0,255,26)`, `rgb(0,119,255)` and `rgb(122,122,122)`.
- Type: Manrope (headings, 800, `-0.04em`, lowercase), Inter and Inter Display (body), IBM Plex Mono (labels), Instrument Sans/Serif, Syne, Apple II Pro and Mario Kart DS for the decorative bits. Every face is a local `@font-face` in the page's inline stylesheet.
- Radii are mostly `0`; the design is a dashed-hairline grid rather than rounded cards.
- Breakpoints, straight from the Framer CSS: 389/390, 809/810, 1199/1200, 1439/1440 px. Framer ships one `<div class="ssr-variant hidden-…">` per breakpoint, so the responsive variants are in the markup, not in hand-written media queries.

## Verification (2026-11-10)

`node Buildspace/tools/check.mjs` at 1280×900 and 390×844:

- **Heights** match the live pages exactly on all twelve page/viewport pairs (listed above).
- **Health:** 0 broken images, no horizontal overflow, 0 failed requests.
- **Console:** 0 errors everywhere except one React #426 warning on `/nw` desktop, which the live page also logs.
- **Visual diff:** with animations and videos frozen, `/` and `/faq` are pixel-identical to the live capture at both viewports; `/letter`, `/nw` and `/hyper` differ only in video frames and marquee phase (≤ 2.4 % of pixels). `/s4/demoday` is pixel-identical at four scroll offsets on both viewports.

## Known differences

- Analytics and the Framer editor bar are removed, so no request leaves the page except to YouTube when you play a video and to buildspace.so when you follow a link to a page that was not captured.
- Routes outside the six captured pages (`/sf1`, `/home`, `/demoday/<project>`, the Sage login) open the live site. Reloading one of them locally 404s by design.
- 178 project videos have been deleted from YouTube. The live page paints YouTube's 120×90 "unavailable" image, which arrives with a 404 status but a valid body; those exact bytes are saved locally, so the cards look the same.
- The demo day page is 28 MB of server-rendered HTML, the same as the original, because all 1,051 cards (four breakpoint variants each) are in the document.
- `dist/assets` was trimmed from 3,149 to 1,566 files: anything no page or interaction requested was removed. `tools/build.py` restores the full set, and `check.mjs --prune` trims it again.
- The six gallery cards share one folder, so `/sites/buildspace-letter/` and friends do not exist: those cards open `/sites/buildspace/letter`, `/sites/buildspace/faq`, and so on.

## Licensing

buildspace is shut down. Its name, arrow mark, photographs, videos, letter and FAQ copy belong to buildspace and the people who appear in them; the YouTube thumbnails belong to their creators. This folder is a design study. Replace the marks, media and copy with material you have the rights to before publishing anything derived from it.
