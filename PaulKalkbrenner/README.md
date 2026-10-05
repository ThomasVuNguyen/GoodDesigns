# Paul Kalkbrenner — homepage design study

- **Reference:** https://www.paulkalkbrenner.net/
- **Captured:** 2026-10-04
- **Local page:** `dist/index.html`
- **Run:** `python3 -m http.server 4173 --directory dist`, then open http://localhost:4173/

This is an independent, responsive study of the reference homepage, not an official artist site. It recreates the single homepage in its observed section order: navigation and hero, typographic grid, music services, studio image, recordings, tour dates, live image, photo gallery, video archive, life-works image, newsletter and footer.

## Interactions

- The mobile menu opens and closes from the circular button.
- The recording year tabs change the album copy.
- Previous and Next cycle through the eight gallery positions.
- Selecting a video thumbnail changes the featured still and title; Watch film opens the official video in a new tab.
- The Sound control toggles a quiet generated tone after an explicit click.
- The newsletter form validates locally and never submits contact information to a service.
- Internal navigation links scroll to sections. Ticket, streaming, store, legal and social links open their public destinations.

## Reuse notes

- Shared styles and color values live in `dist/assets/styles.css`.
- The page structure and content live in `dist/index.html`; interactions are in `dist/assets/app.js`.
- The responsive breakpoint is 700px. The desktop and mobile layouts were observed at 1280×900 and 390×844.
- `contact-sheet.jpg` is a nine-frame original image sheet used by the gallery, film stills and image strip. `studio.jpg` and `live-stage.jpg` are original generated replacements. All runtime assets are local.
- The reference uses a proprietary ABC Diatype Plus typeface. This study uses the system Arial/Helvetica stack instead of redistributing that font.

## Publication and differences

This public design study is not affiliated with Paul Kalkbrenner. Original generated imagery replaces the source photography; the proprietary typeface, official logos, and embedded music/video players are not copied. The page links out to public artist, event, streaming and store destinations, while its interactions and newsletter form are local-only. Tour listings reflect the reference page at capture time and can change.
