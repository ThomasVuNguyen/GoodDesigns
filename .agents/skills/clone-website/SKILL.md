---
name: clone-website
description: >-
  Reconstruct a reference website as a visually faithful, reusable,
  self-contained static project. Use when the user provides a website URL
  they want recreated locally — whether for design study, a gallery entry,
  or a portable archive. Covers browser inspection, asset collection,
  implementation (captured markup or rebuild), a visual convergence loop
  with screenshot comparisons, behavioral verification, and publishing to
  the GoodDesigns gallery. Don't use for building original websites from
  scratch or for simple one-page prototypes that don't reference an
  existing live site.
---

# Clone a Website Faithfully

Reconstruct a reference website as a visually faithful, reusable,
self-contained localhost project. The reference page and supplied screenshots
are the **sole source of truth** — never invent copy, sections, or flourishes.

> [!IMPORTANT]
> This is a measurement-and-verification task. A page-shaped approximation is
> not done. A single screenshot used as the page is not reusable and is not
> done. "Perfect" is a visual claim — make it only after fresh desktop and
> mobile screenshots have been compared.

---

## Inputs

Resolve these before writing any code:

| Input | Default |
|---|---|
| Reference URL | *(required)* |
| Destination folder | `<WebsiteName>/` at repository root |
| Pages in scope | The single URL provided — don't guess at unrequested routes |
| Target viewports | Desktop `1280×900`, Mobile `390×844` |
| User-supplied screenshots or corrections | *(if any)* |

If a missing choice would materially change the result, ask **one** concise
question. Otherwise inspect the source and proceed.

---

## Definition of Done

The clone is complete **only** when every item is true:

- [ ] At each tested viewport, no obvious visual difference from the reference
      in a side-by-side screenshot review.
- [ ] Every visible section is present, in the same order, with matching copy,
      hierarchy, spacing, typography, color, imagery, borders, and radii.
- [ ] Navigation, menus, tabs, carousels, accordions, hover states, and other
      visible interactions behave like the reference.
- [ ] Both desktop and mobile layouts are intentionally implemented.
- [ ] All fonts and media load locally — the page makes **zero** runtime
      requests to the reference domain.
- [ ] Browser checks: zero broken images, zero horizontal overflow, zero
      console errors.
- [ ] The folder contains a README with run instructions and notes on reusable
      structure, tokens, and components.
- [ ] The site folder (including `dist/`) is committed and pushed to `main`.

---

## Phase 1 — Establish a Clean Baseline

1. Inspect repo status and existing folders. Preserve unrelated user work.
2. Create `<WebsiteName>/dist/` for the static output.
3. Start a local server early and keep one stable localhost URL throughout.
4. Record the exact reference URL, page title, and capture time in the README
   because live websites change.

**Done when:** destination is isolated, unrelated work is untouched, and the
empty baseline opens in a browser.

---

## Phase 2 — Inspect the Reference Before Coding

Open the live page in a real browser. Inspect **both** desktop and mobile
before choosing markup or breakpoints.

### 2a. Capture the page

- Take full-page screenshots at both target viewports.
- Take focused screenshots of dense or interactive areas (header, dropdowns,
  hero, card grids, footer).
- Scroll through the entire page once on each viewport so lazy-loaded content
  appears.

### 2b. Build a page inventory

Write down, in order:

- Header structure and sticky behavior
- Every content section
- Repeated card or logo patterns
- Calls to action
- Footer columns and legal row
- Desktop-only and mobile-only elements

For each section record:

- Exact visible text and link labels
- Container width and alignment
- Background, border, radius, and shadow
- Heading/body font family, size, weight, line height, letter spacing
- Major horizontal and vertical gaps
- Image/video source, intrinsic dimensions, crop behavior, alt text

### 2c. Build an interaction inventory

Exercise every visible control and record:

- Closed and open states
- Hover and focus states
- Selected / active state
- Transition duration and direction
- Keyboard or outside-click dismissal
- Mobile-menu behavior

Use **computed styles and element bounds** — never estimate by eye when the
browser exposes them.

**Done when:** every visible section, asset, breakpoint behavior, and
interactive state has an observed counterpart. No major design decision is based
on memory alone.

---

## Phase 3 — Collect Assets & Choose the Implementation Path

### 3a. Choose the path

Inspect the delivered page before rebuilding it.

| Path | When to use |
|---|---|
| **Rendered-page capture** | The server-rendered HTML already contains the complete visible page and the original styles and assets can be saved. This usually preserves geometry and copy better than rebuilding from a screenshot. |
| **Full rebuild** | The page is client-rendered, its styles depend on a runtime you can't reproduce locally, or the saved markup is incomplete. Rebuild in the project's existing stack. |

For a **rendered-page capture**:

1. Save the page markup and the stylesheets that actually style it.
2. Before removing any scripts, finish the interaction inventory and identify
   which controls depend on them. Preserve required runtime where it can run
   locally; otherwise re-implement each inventoried interaction in local code.
3. Remove analytics, tracking pixels, and unrelated third-party widgets. Keep
   essential page behavior.
4. Search markup, stylesheets, and inline styles for every `src`, `srcset`,
   `poster`, preload, icon, font, and CSS `url(…)`. Save the files under
   `dist/assets/` and rewrite references to local paths.
5. Inspect all assets after scripts are removed. Reveal content that was meant
   to animate into view but is left hidden by inline styles like `opacity: 0`;
   check menus, tabs, and other controls for dead states.
6. Choose deliberately for every internal link: local route, in-page anchor, or
   the original public destination.

### 3b. Download and organize assets

1. Save only the assets used by the scoped page into `dist/assets/`.
2. Give authored assets meaningful names. If source hashes must be retained, add
   `assets/manifest.json` mapping each file to its role and source URL.
3. Download actual font files and define local `@font-face` rules.
4. Preserve image aspect ratios. Match the reference's `object-fit`, crop, and
   focal point.
5. Prefer inline SVG for small geometric icons whose exact stroke and bounds
   matter.
6. Check CSS `url(…)` references as well as HTML image tags — backgrounds and
   font files are easy to miss. Confirm each saved asset returns successfully
   from localhost.

### 3c. Wayback Machine fallback

If the live site is down or paywalled, use the Internet Archive as the source:

```bash
# Retry helper — exponential backoff, up to 6 attempts
for i in 1 2 3 4 5 6; do
  c=$(curl -sL -m 90 \
    "https://web.archive.org/web/<YYYYMMDDHHMMSS>id_/<ORIGINAL_URL>" \
    -o "<LOCAL_PATH>" -w "%{http_code}" 2>/dev/null)
  [ "$c" = 200 ] && [ -s "<LOCAL_PATH>" ] && break
  [ "$c" = 404 ] && [ $i -ge 2 ] && break
  sleep $((i * 8))
done
```

Record the snapshot timestamp in `assets-manifest.json` and the README.

**Done when:** every local asset opens successfully, its purpose is known, the
page loads its entire visible design from local files, and disabling network
access to the reference domain changes nothing.

---

## Phase 4 — Build from Large Geometry to Fine Detail

Implement in this order:

1. Semantic page skeleton and section order
2. Global tokens: colors, type scale, spacing, radii, shadows, container
   widths, breakpoints
3. Header and footer
4. Major section layout and responsive changes
5. Exact typography and assets
6. Repeated components
7. Interactions and motion
8. Decorative details

Keep content and presentation separable — use shared CSS variables and
repeatable component classes, not page-specific magic numbers.

**Match the observed page.** Do not invent marketing copy, extra sections, or
decorative flourishes.

**Done when:** the entire page exists locally, all controls work, and each
observed reference section maps to a clear local implementation.

---

## Phase 5 — Visual Convergence Loop

This is the core QA cycle. Run it **independently** at desktop and mobile
widths:

1. Set reference and localhost browsers to the **exact same viewport**.
2. Reset both pages to the top and the same interaction state.
3. Capture screenshots.
4. Compare side by side — use a 50% opacity overlay or pixel diff when tooling
   permits.
5. Identify the **single largest class of mismatch**.
6. Fix that class without redesigning unrelated areas.
7. Capture **fresh** screenshots and repeat.

### Mismatch priority order

1. Page width, section height, large positioning errors
2. Font family, font metrics, line wrapping, heading scale
3. Spacing and alignment
4. Asset size, crop, focal point
5. Colors, borders, radii, shadows
6. Icons and one-pixel geometry
7. Motion timing and hover polish

> [!WARNING]
> Do not use screenshots from before the latest code change as evidence. Visual
> QA is a red/green loop: the **current** screenshot either matches closely
> enough or it exposes the next correction.

Use the browser to capture both the live reference and localhost at the same
viewport and scroll position. DOM inspection, copied HTML, and an HTTP 200 are
useful evidence but **none substitute for seeing the rendered comparison**. If
browser capture is unavailable, keep the clone marked visually unverified.

**Done when:** a fresh side-by-side review reveals no obvious mismatch at either
viewport, and every remaining intentional difference is documented.

---

## Phase 6 — Verify Behavior & Browser Health

Test all inventoried interactions on localhost. Then run these browser checks at
both viewports:

```js
const brokenImages = [...document.images]
  .filter((img) => !img.complete || img.naturalWidth === 0)
  .map((img) => img.currentSrc || img.src);

const horizontalOverflow =
  document.documentElement.scrollWidth > window.innerWidth;

({ brokenImages, horizontalOverflow });
```

Also verify:

- [ ] Browser console has no errors
- [ ] Internal anchor links land correctly
- [ ] Dropdowns and mobile menus open and close correctly
- [ ] Keyboard focus remains visible
- [ ] Animations respect `prefers-reduced-motion` where applicable
- [ ] A hard refresh loads the same result
- [ ] The page still works with requests to the reference domain blocked

**Done when:** `brokenImages` is empty, `horizontalOverflow` is false, console
errors are zero, and every interaction passes in its relevant viewport.

---

## Phase 7 — Handle Screenshot Feedback

When the user points to one mismatch, treat the supplied image as authoritative
for that detail.

1. Locate the exact element in the reference and localhost renders.
2. Measure its rendered bounds, alignment, stroke, spacing, and state behavior.
3. Change the **smallest relevant** HTML/CSS/JS surface.
4. Re-test the interaction as well as the appearance.
5. Capture a fresh screenshot proving the correction.

> [!TIP]
> Typographic arrows often have the wrong baseline and shape even when font size
> looks close. Replace with a measured inline SVG, align its explicit bounds,
> and verify both collapsed and expanded states.

**Done when:** the reported detail matches geometrically and its related
behavior still passes.

---

## Phase 8 — Make the Result Reusable

Create `<WebsiteName>/README.md` containing:

- Reference URL and capture date
- Exact local run command
- Folder structure
- Implemented sections and interactions
- Responsive breakpoints
- Design-token and reusable-component locations
- Asset manifest explanation
- Known intentional differences
- Licensing and replacement guidance for third-party assets

Prefer a **self-contained static build**. Add a framework only when the
observed behavior benefits from it and the reuse value outweighs the dependency
cost.

**Done when:** another person can run the page, find its reusable parts, and
understand its publication constraints without asking the original implementer.

---

## Phase 9 — Final Evidence & Publish

Before reporting completion:

1. Re-run the local server from the documented command.
2. Re-run desktop and mobile screenshot comparisons.
3. Re-run broken-image, overflow, console, and interaction checks.
4. Commit the site folder (including `dist/`), plus `gallery/sites.json` entry
   and any new thumbnail. Push to `main`.
5. Report the localhost URL, output folder, tested viewports, check results, and
   any intentional differences.

> [!CAUTION]
> If any completion criterion is still false, continue the loop or state the
> specific blocker. Separate checks that passed from checks that could not be
> run. Do not describe the clone as perfect or complete based only on successful
> file creation, copied source markup, or an HTTP 200 response.

### GoodDesigns gallery publishing

A push to `main` is the release. GitHub Actions runs `build-gallery.mjs` and
deploys to https://gooddesigns.web.app.

To show the clone in the gallery:

1. Append an entry to `gallery/sites.json`:
   ```json
   {
     "slug": "<kebab-slug>",
     "name": "<Display Name>",
     "folder": "<WebsiteName>",
     "reference": "<original URL>",
     "tagline": "<one-line description>",
     "captured": "<YYYY-MM-DD>"
   }
   ```
2. Capture a thumbnail:
   ```bash
   npx -p playwright node scripts/capture-thumbs.mjs <slug>
   ```
3. Commit everything and push to `main`.

Do **not** run `node scripts/build-gallery.mjs` or `firebase deploy` locally.
`public/` is gitignored and is produced in CI.
