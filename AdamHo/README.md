# Adam Ho, I.S.P. — homepage clone

- **Reference:** https://www.adamho.com/ (homepage only)
- **Page title:** Adam Ho, I.S.P. — Independent Studio Practice
- **Captured:** 2026-10-29 (Webflow "Last Published: Sat Jun 20 2026")
- **Viewports checked:** desktop 1280×900, mobile 390×844
- **Run:** `python3 -m http.server 4182 --directory AdamHo/dist`, then open http://localhost:4182/

This is a rendered-page capture. The Webflow markup, stylesheet and IX2 runtime are kept, every asset is served from `dist/assets/`, and the page makes no runtime requests to adamho.com, Webflow CDNs, github.io, unpkg, cdnjs or Vimeo. All paths are relative (`assets/...`), so the page works under the gallery's `/sites/<slug>/` prefix.

## Structure

```
AdamHo/
  README.md
  dist/
    index.html                 Webflow page markup (analytics removed, URLs localised)
    assets/
      css/adamho.css           Webflow site stylesheet (fonts localised, unused @font-face + backgrounds removed)
      css/local.css            local overrides: sizing for the Vimeo replacement videos
      js/                      Webflow runtime, jQuery 3.5.1, p5.js 1.9.0, Adam Ho's scripts (see below)
      fonts/                   Herbik, ABC Oracle Plus Variable, AS Thermal, Input Cipher
      img/                     project images, posters, favicon, share image
      video/                   case-study background loops + Vimeo replacements (H.264, muted)
      manifest.json            every local file -> source URL and role
```

## Sections (top to bottom)

1. Header: name mark, "Independent Studio Practice of Adam Ho", Partners word cloud (Input_005), vertical rotated project list with colour swatches and tags (Input_004 Project List).
2. Serial-number intro overlay (50 coloured numbers) over the first screen.
3. Featured Work (Input_011/013/012/014…): Valhalla, fal, ENS, Paradigm, Jasper, Archetype, Succinct case studies. Each row has a title/tag line, description, year, and a horizontally scrolling strip of images, an Overview column and Webflow background videos.
4. Statement: profile paragraph with numbered highlighted phrases.
5. Projects (Input_003): 50-card masonry grid (shuffled on every load) with tags, descriptions, images, GIFs and looping videos.
6. Profile / Particulars / Prospect (Input_006/001/007).
7. Full Partner List (Input_008), four columns.
8. Press (Input_009): 14 linked press entries with dates.
9. Balancer: full-width colour block with pixel marks (random colours per load).
10. End (Input_010): Links (Inquiries, 2022 Archive, Liquidities) and Social (Twitter, Threads, LinkedIn, Instagram).
11. Fixed level widget, bottom right: p5 dither canvas (#bellissimo), Level, class, XP bar.

## Interactions (all run locally)

| Behaviour | Source file |
| --- | --- |
| Serial numbers fade in rhythmically, fade out on scroll or click; the `R` key replays them | `js/preview-stack-serials-xp.js` |
| XP / level system: +6 XP every 4 s, card and image clicks award XP, level-ups flash the screen, ArrowDown removes XP, progress persists in `localStorage` (`playerXP`, `clickedItems`) | `js/preview-stack-serials-xp.js` |
| Desktop (≥991px): clicking a project image stacks a preview at bottom left (up to 5 shrinking thumbnails, fades after 3 s) | `js/preview-stack-serials-xp.js` |
| Random spacer heights between cards (desktop ≥767px) | `js/preview-stack-serials-xp.js` |
| Desktop (>991px) drag and drop reordering of project cards with a blue outline | `js/drag-reorder.js` |
| Swatches (`._2up`, `.oracle-collaborator`) change colour on hover and in bursts on a timer | `js/color-cycle.js` |
| jQuery shuffle of the project grid, partner list, press list and other CMS lists on each load | `js/shuffle.js` |
| Random accent colour for titles and balancer blocks; staggered card fade-in | `js/random-colors.js` |
| Custom cursor with a fading trail of coloured dots | `js/cursor-trail.js` |
| Click ripple and the p5.js 40×40 dither sketch in the level widget, which flashes a colour when an image is clicked | `js/folio-script.js` + `js/p5-1.9.0.min.js` |
| Grey placeholder that fades out to reveal each featured/case-study image | `js/pixelizer.js` |
| Webflow IX2: intro and serial block visibility, balancer, hover states | `js/adam-ho-portfolio-3.*.js` + `js/jquery-3.5.1.min.js` |

The six `js/*.js` behaviour files above (other than folio-script/pixelizer) are the page's inline `<script>` blocks, extracted unchanged into named files and loaded in their original order.

### Scripts in the original page and what happened to them

- `adamho91.github.io/.../folio-script.js` and `pixelizer.js`: vendored. folio-script's fallback p5 loader now points to the local p5 file. Its loader for `vizceral.min.js` (cdnjs) was removed because nothing on the page uses Vizceral.
- `p5.js 1.9.0` (cdnjs): vendored as the minified build of the same version.
- `react@17`, `react-dom@17`, `@babel/standalone` (unpkg): removed. The page loads them but has no `text/babel` script and nothing calls React.
- jQuery 3.5.1 and the three Webflow chunks: vendored unchanged.
- jQuery UI theme CSS (code.jquery.com): removed. No jQuery UI widgets are on the page.
- Google Analytics / gtag, the first-party GTM proxy scripts and the Cloudflare Turnstile challenge: removed.

## Tokens and reusable parts

- **Colour tokens:** Webflow `:root` custom properties at the top of `assets/css/adamho.css`. The accent palette used by the scripts is `#c7f3c6 #eaff00 #f5320b #948eff #dbff00 #fdceeb #0095ff #cde0f5 #e362d3 #01a451`. The base is white and near-black `#212122` / `#272727`, with grey `#666` and `#ebe6e3` swatches.
- **Type:** ABC Oracle Plus Variable (body and press), Herbik Regular (serif captions), AS Thermal (uppercase pixel-mono captions), Input Cipher (tags and serial labels). Other families named in the stylesheet are never loaded by the live page either, so they fall back to system fonts there too.
- **Breakpoints:** Webflow defaults are `max-width: 991px`, `767px` and `479px`. The scripts gate desktop-only behaviour at 991px, 767px and 479px.
- **Components:** `.col-list-item` (project card: `.metadata-section` + `.info-card` + `.card-meta-data-section`), `.statement-block.fw-hero` (featured case-study row with `.featured-preview-span` horizontal scroller), `.my-xp-system` (level widget), `.serial-block` (serial number grid), `.balancer-container` (footer colour block).

## Assets and media

`dist/assets/manifest.json` maps every local file to its source URL and role. Local file names keep the Webflow asset hash, so each one can be traced back to its source.

Size reductions (total `dist/` is about 35 MB, down from about 118 MB of referenced source assets):

- Responsive `srcset` sets are collapsed to one file per image: the smallest variant at least 1080px wide, or the largest available.
- Animated GIFs over 250 KB are re-encoded as animated WebP at up to 1000px. Three noisy, dithered GIFs stay as GIFs because WebP made them larger.
- Webflow background videos keep only the MP4 (the WebM duplicates are dropped) and are re-encoded as H.264 at up to 960px, CRF 30, with no audio.
- The live page's Vimeo iframes (muted, looping, no controls) are replaced with local `<video autoplay loop muted playsinline>` files: H.264 at up to 720px, taken from Vimeo's HLS rendition. Hidden conditional-visibility iframes (the 195 `w-condition-invisible` copies, mostly with an empty video ID) are removed.
- CSS background images and `@font-face` families whose selectors never match this page (AH Silhouette, sticker/teaser GIFs) are removed from the stylesheet.

## Intentional differences

- **Randomness:** the original reshuffles lists and picks random colours on every load, and so does the clone. Two loads, whether of the original or the clone, never match pixel for pixel. Side-by-side checks therefore compare layout, section order, type and imagery, not card order or accent colours.
- **`_blue-compression` card:** its Vimeo video (760406342) returned Vimeo's "couldn't verify the security of your connection" page every time during capture. The card keeps its empty video box, which is also how it rendered on the live page in the headless reference capture.
- **No analytics, no Turnstile, no React/Babel:** see the scripts list above.
- The original does not honour `prefers-reduced-motion`. The clone keeps the original behaviour.

## Verification (2026-10-29, headless Playwright Chromium)

- Desktop 1280×900 and mobile 390×844 full-page captures were compared side by side with the live page. Page heights: desktop 13,925px locally vs 13,852–13,962px live (random spacers); mobile 19,863px vs 19,868px.
- With every non-localhost request blocked: 0 broken images (after scrolling the page and every horizontal strip), no horizontal overflow (`scrollWidth == innerWidth`), 0 console errors and 0 failed requests at both viewports.
- Tested interactions: serial intro, scroll and click fade-out, the `R` replay, the p5 canvas, XP gain, the click ripple, the cursor trail, the preview stack, drag reordering, and that all 10 visible videos play.

## Licensing

All of the copy, project imagery, video and brand marks belong to Adam Ho and his clients (Cash App, fal, ENS, Paradigm, Jasper, Archetype, Succinct, Valhalla, Medium, Nike and others). The fonts are commercial typefaces: ABC Oracle (Dinamo), Herbik, AS Thermal and Input (DJR). Adam Ho's scripts, the Webflow runtime and the page markup are his and Webflow's. This folder is a private design-study reference only. Before any public or commercial reuse, replace the imagery, video, copy, client logos and fonts with material you are licensed to publish, and keep only the layout patterns and the behaviour ideas. jQuery and p5.js are MIT and LGPL-2.1 licensed respectively.
