# Generalist GEN-1.5 research post

A local capture of Generalist AI's research post "GEN-1.5: Embodied Foundation Models are One-Shot Learners". It includes the three-column layout (site nav, metadata and table of contents, article), the animated three.js cover, the custom video player, interactive charts and footnotes.

- **Reference:** https://generalistai.com/blog/gen-1.5
- **Page title:** Generalist - GEN-1.5: Embodied Foundation Models are One-Shot Learners
- **Captured:** 2026-10-15 (America/New_York)
- **Run:** from the repository root, `python3 -m http.server 8866 --directory Generalist/dist`, then open `http://localhost:8866/`.
- **Rebuild from the live site:** `python3 Generalist/tools/capture.py`

## Verification (2026-10-15)

Desktop is 1280 × 900 and mobile is 390 × 844. Both pages were scrolled through, their videos were paused at frame 0, and full-page screenshots were compared.

- **Height:** the page is exactly as tall as the reference (14,788 px on desktop, 25,489 px on mobile).
- **Pixel diff:** outside the animated cover, which is random and moving, the whole page is pixel-identical. Including the cover, 0.4–0.5% of pixels differ.
- **Interactions:** behaviour matches the reference. The 7 prompt-pair tabs switch, the custom video player plays, and footnote links jump to the same scroll position.
- **Health:** 0 console errors, 0 broken images, no horizontal overflow and 0 failed requests. All 42 videos load.
- **External requests:** none except the embedded YouTube hero video.

## Structure and reuse

- `dist/index.html`: the server-rendered post. Analytics are removed.
- `dist/assets/css/styles.css`: the site-wide design system (layout grid, sidebar nav, type scale, pills/buttons, article styles, `@font-face`).
- `dist/assets/css/custom-video-player.css` and `assets/js/custom-video-player.js`: the `<video-player>` web component (title pill, controls, overlays). It can be reused on its own.
- `dist/assets/js/`: site-wide footnotes, scrollspy (table-of-contents highlight), heading anchors and scroll restore.
- `dist/assets/pages/blog/gen-1.5/assets/`: the post's own stylesheet, its `videos/` (42 MP4s), the cover frame, and its widgets:
  - `cover.js`: three.js cover
  - `results-chart.js`, `training-plot.js` and `checkpoint-map.js`: charts
  - `prompt-pair-switcher.js`: tabbed video pairs
- `dist/assets/fonts/`: FK Grotesk and FK Grotesk Neue (woff2/woff).
- `dist/assets/vendor/three/`: three.js 0.185.1, which the cover loads from jsDelivr on the live site.
- `assets-manifest.json`: maps every saved file to its source URL.
- `tools/capture.py`: rebuilds `dist/`.

## What the capture script changes

- Google Analytics and Leadfeeder are removed.
- `/assets/…` paths become relative, so the page works from any folder.
- The cover's three.js import points at the local copy.
- Links to other Generalist pages (index, blog, about, careers, contact, other posts) go to the public generalistai.com URLs.

## Known differences

- The hero video is a YouTube embed and still loads from YouTube.
- The cover's particle field is random each load, so it never matches frame for frame.
- The videos total about 213 MB. They are the original files, not recompressed.

Generalist AI names, marks, videos, figures and copy belong to their owners. Replace them with licensed material before publishing a derivative or using it commercially.
