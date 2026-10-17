# Nature Is Our Learning Environment

A local capture of Periodic Labs' research article. It keeps the published Framer page, its fonts and figures, the disclosure sections, and the article runtime.

- **Reference:** https://periodic.com/news/nature-is-our-learning-environment
- **Page title:** Nature Is Our Learning Environment – Periodic Labs
- **Captured:** 2026-10-17 (America/New_York)
- **Run:** from the repository root, `python3 -m http.server 8891 --directory Periodic/dist`, then open `http://localhost:8891/`.
- **Rebuild from the live site:** `python3 Periodic/tools/capture.py`

## Verification (2026-10-17)

Desktop is 1280 × 900 and mobile is 390 × 844.

- **Height:** 8,572 px on desktop and 9,478 px on mobile, the same as the reference.
- **Health:** 0 broken images, no horizontal overflow, and 0 console errors after the page is traversed.
- **Interactions:** the five disclosure sections open. News, Careers, and contact links stay on the public Periodic site. The logo returns to this local article.

## Structure and reuse

- `dist/index.html`: the server-rendered article, including its inline type styles.
- `dist/vendor/framer/`: the Framer module graph (React, motion, the article route, and `EditorialVisuals`, which builds the captioned figures and disclosures).
- `dist/assets/`: fonts, images, and the two hero videos. `assets-manifest.json` maps each file to its source URL.
- Fonts in use: GT Standard, Formular Mono, Fragment Mono, and Inter.
- Breakpoints from the page: 810 px and 1200 px.

## What the capture script changes

- Framer analytics and the editor bar are removed.
- Asset URLs, including `srcset` queries, are saved locally. Modules keep importing one another by filename.
- Framer's lazy module loader resolves the `modulepreload` href against the page, so it still finds `Video` from inside `vendor/framer/`.
- Links to other Periodic routes go to periodic.com.

## Known differences

- The interactive XRD iframe is present at the same size as the reference. In this browser it stayed empty on the live page as well.
- Other Periodic pages are not part of this capture.

Periodic Labs names, marks, figures, and copy belong to their owners. Replace them with licensed material before publishing a derivative.
