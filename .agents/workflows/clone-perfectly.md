---
description: Reconstruct a reference website as a visually faithful, reusable, self-contained localhost project
---

# Clone a website faithfully

Use this workflow when the user provides a website they love and wants it recreated inside this repository. This is a measurement-and-verification task. The reference page and supplied screenshots are the source of truth.

## Inputs

Resolve these before editing:

- Reference URL
- Destination folder, normally `<WebsiteName>/`
- Pages in scope; when the request names one URL, reproduce that complete page rather than guessing at unrequested routes
- Required viewports, defaulting to desktop `1280x900` and mobile `390x844`
- User-supplied screenshots or corrections

If a missing choice would materially change the result, ask one concise question. Otherwise inspect the source and proceed.

## Definition of done

The result is complete only when all of these are true:

- At each tested viewport, the local page has no obvious visual difference from the reference during a side-by-side review.
- Every visible section is present, in the same order, with matching copy, hierarchy, spacing, typography, color, imagery, borders, and radii.
- Navigation, menus, tabs, carousels, accordions, hover states, and other visible interactions behave like the reference.
- The desktop and mobile layouts are both intentionally implemented.
- All required fonts and media load locally; the page makes no runtime request to the reference domain.
- Browser checks report zero broken images, zero unintended horizontal overflow, and zero console errors.
- The folder contains run instructions and notes identifying reusable structure, tokens, and components.

A page-shaped approximation is not done. A single screenshot used as the page is not reusable and is not done.

## 1. Establish a clean baseline

1. Inspect the repository status and existing folders. Preserve unrelated user work.
2. Create `<WebsiteName>/dist/` for the runnable static output unless the repository already establishes another structure.
3. Start a local server early and keep one stable localhost URL throughout the work.
4. Record the exact reference URL, page title, and capture time in the project README because live websites change.

Completion criterion: the destination is isolated, unrelated work is untouched, and the empty/local baseline can be opened in a browser.

## 2. Inspect the reference before coding

Open the live page in a real browser. Inspect both desktop and mobile before choosing markup or breakpoints.

### Capture the page

- Take full-page screenshots at the target desktop and mobile viewports.
- Take focused screenshots of dense or interactive areas such as the header, dropdowns, hero, card grids, and footer.
- Scroll through the entire page once on each viewport so lazy-loaded content appears.

### Build a page inventory

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
- Heading/body font family, size, weight, line height, and letter spacing
- Major horizontal and vertical gaps
- Image or video source, intrinsic dimensions, crop behavior, and alt text

### Build an interaction inventory

Exercise every visible control and record:

- Closed and open states
- Hover and focus states
- Selected/active state
- Transition duration and direction
- Keyboard or outside-click dismissal where applicable
- Mobile-menu behavior

Use computed styles and element bounds instead of estimating by eye whenever the browser exposes them.

Completion criterion: every visible section, asset, breakpoint behavior, and interactive state has an observed counterpart in the inventory. No major design decision is based only on memory.

## 3. Collect assets deliberately

1. Save only the assets used by the scoped page into `dist/assets/`.
2. Give authored assets meaningful names when practical. If source hashes must be retained, add `assets/manifest.json` mapping each file to its role and source URL.
3. Download the actual font files and define local `@font-face` rules when licensing permits.
4. Preserve image aspect ratios. Match the reference's `object-fit`, crop, and focal point in CSS.
5. Prefer inline SVG for small geometric icons whose exact stroke and bounds matter.

For public or commercial reuse, replace third-party trademarks, customer logos, photos, copy, and other protected assets with materials the user is allowed to publish. Document that boundary in the README.

Completion criterion: every local asset opens successfully, its purpose is known, and disabling network access to the reference domain does not change the page.

## 4. Build from large geometry to fine detail

Implement in this order:

1. Semantic page skeleton and section order
2. Global tokens: colors, type scale, spacing, radii, shadows, container widths, and breakpoints
3. Header and footer
4. Major section layout and responsive changes
5. Exact typography and assets
6. Repeated components
7. Interactions and motion
8. Decorative details

Keep content and presentation separable enough that the layout can be reused later. Use shared CSS variables and repeatable component classes rather than page-specific magic numbers scattered through the stylesheet.

Match the observed page. Do not invent marketing copy, extra sections, or decorative flourishes.

Completion criterion: the entire page exists locally, all controls work, and each observed reference section maps to a clear local implementation.

## 5. Run the visual convergence loop

Perform this loop independently at desktop and mobile widths:

1. Set the reference and localhost browsers to the exact same viewport.
2. Reset both pages to the top and the same interaction state.
3. Capture screenshots.
4. Compare them side by side and, when tooling permits, with a 50% opacity overlay or pixel diff.
5. Identify the single largest class of mismatch.
6. Fix that class without redesigning unrelated areas.
7. Capture fresh screenshots and repeat.

Fix mismatches in this priority order:

1. Page width, section height, and large positioning errors
2. Font family, font metrics, line wrapping, and heading scale
3. Spacing and alignment
4. Asset size, crop, and focal point
5. Colors, borders, radii, and shadows
6. Icons and one-pixel geometry
7. Motion timing and hover polish

Do not use screenshots from before the latest code change as evidence. Visual QA is a red/green loop: the current screenshot either matches closely enough or it exposes the next correction.

Completion criterion: a fresh side-by-side review reveals no obvious mismatch at either target viewport, and every remaining intentional difference is documented.

## 6. Verify behavior and browser health

Test all inventoried interactions on localhost. Then run these browser checks at desktop and mobile widths:

```js
const brokenImages = [...document.images]
  .filter((image) => !image.complete || image.naturalWidth === 0)
  .map((image) => image.currentSrc || image.src);

const horizontalOverflow =
  document.documentElement.scrollWidth > window.innerWidth;

({ brokenImages, horizontalOverflow });
```

Also verify:

- The browser console has no errors.
- Internal anchor links land correctly.
- Dropdowns and mobile menus open and close correctly.
- Keyboard focus remains visible.
- Animations do not prevent reading or interaction and respect `prefers-reduced-motion` where applicable.
- A hard refresh loads the same result.
- The page still works with requests to the reference domain blocked.

Completion criterion: `brokenImages` is empty, `horizontalOverflow` is false, console errors are zero, and every interaction in the inventory passes in its relevant viewport.

## 7. Handle screenshot feedback narrowly

When the user points to one mismatch, treat the supplied image as authoritative for that detail.

1. Locate the exact element in the reference and localhost render.
2. Measure its rendered bounds, alignment, stroke, spacing, and state behavior.
3. Change the smallest relevant HTML/CSS/JS surface.
4. Re-test the interaction as well as the appearance.
5. Capture a fresh screenshot proving the correction.

Example: a typographic arrow often has the wrong baseline and shape even when its font size looks close. Replace it with a measured inline SVG, align its explicit bounds, and verify both collapsed and expanded states.

Completion criterion: the reported detail matches geometrically and its related behavior still passes.

## 8. Make the result reusable

Add `<WebsiteName>/README.md` containing:

- Reference URL and capture date
- Exact local run command
- Folder structure
- Implemented sections and interactions
- Responsive breakpoints
- Design-token and reusable-component locations
- Asset manifest explanation
- Known intentional differences
- Licensing and replacement guidance for third-party assets

Prefer a self-contained static build when it can faithfully reproduce the page. Add a framework only when the observed behavior benefits from it; the reuse value should outweigh the dependency cost.

Completion criterion: another person can run the page, find its reusable parts, and understand its publication constraints without asking the original implementer.

## 9. Final evidence

Before reporting completion:

1. Re-run the local server from the documented command.
2. Re-run desktop and mobile screenshot comparisons.
3. Re-run broken-image, overflow, console, and interaction checks.
4. Inspect repository status and stage only this website's files.
5. Report the localhost URL, output folder, tested viewports, check results, and any intentional differences.

If any completion criterion is still false, continue the loop or state the specific blocker. Do not describe the clone as complete based only on successful file creation or an HTTP 200 response.
