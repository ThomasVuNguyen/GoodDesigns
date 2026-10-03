# Town homepage recreation

A static, runnable recreation of the Town homepage, built for local design study.

- **Reference:** https://www.town.com/ (page title "Town | The AI Assistant That Does the Work")
- **Captured:** 2026-09-29
- **Run:** `python3 -m http.server 8000 --directory dist` from this folder, then open `http://localhost:8000`.
- **Reviewed at:** 1280 × 900 (desktop) and 390 × 844 (mobile). The layout switches at the reference's `md` breakpoint (768px).
- **Needs a network connection:** images, logos and fonts load from Town's CDN (see below).

## Structure

```
dist/
  index.html            server-rendered page markup (scripts, analytics and framework preloads removed)
  app.js                interactions that the original client runtime provided
  overrides.css         styles for the pieces authored here (dropdown, mobile menu, prompt bar, profile card)
  assets/css/*.css      the reference stylesheets, unchanged apart from font URLs
tools/
  fetch-source.sh       downloads the reference HTML + CSS into $TOWN_SRC (default /tmp/town)
  build.py              regenerates dist/index.html and dist/assets/css from those inputs
```

Rebuild with `tools/fetch-source.sh && python3 tools/build.py`. The build is idempotent.

## Sections and interactions

All sections are present, in the reference order: announcement banner, sticky header, hero, "Everyone gets a Townie", Profile, To-do Lists, testimonials, Routines, Suggestions, Town Teams, integrations grid, security, "Meet your Townie", closing call to action, footer.

| Behaviour | Implementation |
| --- | --- |
| Scroll-in reveals (fade / blur / scale) | `IntersectionObserver` in `app.js`; skipped under `prefers-reduced-motion` |
| Hero portrait cycles inside the headline | `app.js`, 2.6s interval, cross-fade |
| Header **Features** / **Solutions** dropdowns | `app.js` + `.tn-menu` (click, outside-click and Esc dismiss, `aria-expanded`) |
| Mobile menu (**Open menu** button) | `app.js` + `.tn-mobile`; full-screen panel, Esc / link tap closes, hidden ≥ 768px |
| Persona tabs (Business Owner / Recruiting / Sales) | swaps the tagline lines and the profile card |
| Routine chips (All / Inbox / Calendar / …) | filters the horizontal card strip by category, desktop and mobile copies |
| Integration chips (All / Messaging / …) | filters the grid using a category table in `app.js` |
| Floating "Ask … anything" bar | typewriter prompts; the name follows the showcase section in view; hides over the footer |

## Design tokens and reusable pieces

- **Tokens:** the reference defines colour, spacing, type and grid tokens as CSS custom properties in `dist/assets/css/2kvw3o347e-ya.css` (theme scopes via `data-brand-theme`) and `36_r7cbc5d038.css` (component utilities, all prefixed `brand:`).
- **Components:** header/nav pill, pill buttons and chips (`aria-pressed` styling), showcase card + sidebar, routine and integration cards, security cards, footer columns. They are plain class-based markup in `index.html`.
- **Fonts:** the reference's own faces (`sans`, `slab`, `handwriting`, `diatype`, `townieHandwritingFont`) are declared in the reference CSS and loaded from the CDN.

## Assets

Images, logos and fonts are **linked** from `https://www.town.com` (its CDN sends `access-control-allow-origin: *`), not copied into this repository. As a result the page makes runtime requests to the reference domain and shows no imagery or original type when offline. If Town moves or renames an asset the link will break; re-run the build after refreshing the source files.

## Intentional differences

- **Copy:** long descriptive copy (routine and integration descriptions, testimonials, security cards, some mock-UI lines) and the testimonial attributions are replaced with original stand-in wording; headings, labels and short UI text follow the reference. The structure of those blocks is unchanged.
- **Client-rendered widgets:** the profile card body and the floating prompt bar are not present in the server-rendered HTML, so they are authored here with original placeholder content (fictional people).
- **Removed:** analytics/GTM, notification toaster and framework scripts. Header/footer links go to the public `town.com` destinations.
- **Not reproduced:** the reference's client-only animation states inside the demo cards (typing, cross-referencing, live carousels beyond the routine strip).
- Page height differs by about 50px on desktop (12016 vs 12068) because of the substituted copy.

## Licensing

This is a local study copy. Town's name, marks, imagery, type and page design belong to their owners. Before publishing or reusing anything, replace the linked third-party assets and the reference stylesheets with materials you are licensed to use.
