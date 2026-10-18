# Sunday homepage

A local capture of the Sunday Robotics homepage. The page is the server-rendered markup and styles, with analytics removed and media saved under `dist/`.

- **Reference:** https://www.sunday.ai/
- **Page title:** Sunday Robotics | The helpful robotics company
- **Captured:** 2026-10-18 (UTC)
- **Run:** from the repository root, `python3 -m http.server 8765 --directory Sunday/dist`, then open `http://localhost:8765/`.
- **Reviewed at:** 1280 × 900 and 390 × 844.

## Structure

```
dist/index.html          captured page, scripts removed, assets pointed locally
dist/app.js              menu, contents, FAQ, video, hat poll, newsletter, weather line
dist/overrides.css       interaction styles layered on the captured CSS
dist/_next/static/       the page stylesheets and Basel / Styrene font files
dist/assets/images/      posters and photographs
dist/assets/video/       the thirteen Mux clips, saved as H.264
tools/build.py           rebuilds dist/index.html from /tmp/sunday.html
assets-manifest.json     source URL for each saved image
```

## Sections and interactions

In order: sticky header, hero (“Say hello to Memo”), introduction, “Mundane made magic”, kitchen / homes / learning service blocks, “From imitation to intuition”, design cards, hat poll, FAQ, founding-families band, newsletter, footer, and the yellow closing band.

| Behaviour | Implementation |
| --- | --- |
| Header menu | `app.js` opens the pill to its content height. Escape, the scrim, and the button close it. |
| Contents rail | Appears after scrolling on viewports 640px and wider. Click expands the section list. |
| FAQ | Each question toggles its panel height and `aria-expanded`. |
| Videos | Local muted files play while in view. Click pauses. Posters hide once a clip is playing. |
| Hat poll | “Cast your vote now” opens the four hat cards. Choosing one and continuing confirms on the page. |
| Newsletter | Subscribe opens an email field and confirms locally. It does not post to Sunday. |
| Closing band | Date is formatted in `America/Los_Angeles`. The line switches between the captured day and night copy. Place and temperature stay at the capture snapshot: Redwood City, CA, 71°F, clear. |
| Design cards | Horizontal position follows scroll on desktop. On smaller screens the row scrolls sideways. |

## Tokens and reusable pieces

Color, type, and spacing live as CSS variables in `dist/_next/static/css/2f63e98cd5da8c43.css` (`--color-off-black`, `--color-yellow`, `--color-warm-grey`, `--font-sans`, `--font-mono`, the display scale). Repeated pieces are the header pill, round buttons, service cards, design articles, and the footer columns. They use the captured class names.

Fonts are Basel (the `sans` family, weights 500 and 700) and Styrene (`mono`, weight 500), saved as local `@font-face` files.

## Checks

Desktop height was 14,799px against 14,751px on the reference. Mobile height was 11,998px against 12,358px. No horizontal overflow at either viewport. After images finish loading, none are broken. The only console 404 before the favicon was added was `/favicon.ico`.

## Intentional differences

- Other routes (Technology, Company, Careers, Blog, Beta, legal) stay on https://www.sunday.ai. The logo returns to this page.
- Analytics, the OpenWeather request, and the Sanity live connection are removed.
- Videos are local H.264 files instead of Mux HLS.
- The design tabs labeled Features, 360°, and Anatomy are not in the server HTML, so this page shows the feature cards only.
- The Skill Library tooltip body is not in the server HTML.
- The hat poll and newsletter confirmation are local stand-ins for the client overlays.
- Word-by-word scroll spacing for “Mundane made magic” is simplified. On small screens each word has extra space below it.

Sunday’s name, marks, photographs, video, and copy belong to their owners. Replace them with licensed material before publishing a derivative.
