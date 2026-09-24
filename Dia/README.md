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
