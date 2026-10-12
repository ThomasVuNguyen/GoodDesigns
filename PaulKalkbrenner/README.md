# Paul Kalkbrenner — homepage design study

- **Reference:** https://www.paulkalkbrenner.net/
- **Captured:** 2026-10-04
- **Scope:** one responsive homepage, measured at 1280×900 and 390×844
- **Run:** `python3 -m http.server 4174 --directory dist`, then open http://localhost:4174/

This is an independent, unofficial visual study. It preserves the observed section order, typography scale, spacing, grid, and responsive behavior while using original generated imagery, a neutral equalizer mark, a system font, and original study copy. It is not affiliated with the artist or rights holders.

## Page and interactions

The page includes the navigation and hero, animated type grid, streaming links, studio portrait, recording tabs, tour list, live image, gallery controls, video archive, life-work section, newsletter form, and footer. The source layout and responsive styles are in `dist/assets/site.css`; localized overrides are in `dist/assets/local.css`; page structure is in `dist/index.html`; interactions are in `dist/assets/local.js` and the included local animation runtime.

The menu, recording tabs, gallery controls, and archive selection are wired locally. The Sound control generates a quiet two-note tone only after a user click. Featured video stills are original generated images; clicking the featured image opens the corresponding public YouTube page in a new tab. The newsletter fields are visual only and never submit or retain contact details. Tour information is the listing captured on the reference date and may change.

## Assets and publication

`dist/assets/manifest.json` maps the local generated and authored media. The original artist photography, album artwork, streaming marks, proprietary font, and embedded players are not included. The remaining links to the artist's public music, ticket, legal, store, and social pages open externally.
