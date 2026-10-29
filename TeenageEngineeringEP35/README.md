# teenage engineering EP–35 product page

A self-contained static clone of the teenage engineering EP–35 product page, made for the GoodDesigns gallery.

- **Reference:** https://teenage.engineering/products/ep-35
- **Page title:** `EP–35 - teenage engineering`
- **Captured:** 2026-10-29
- **Scope:** that one product page, top to bottom, at desktop 1280×900 and mobile 390×844. Every other teenage engineering route links to the original public URL.
- **Run:** `python3 -m http.server 4181 --directory TeenageEngineeringEP35/dist` from the repository root, then open http://localhost:4181/

## The page

The EP–35 page is a single joke, told by scrolling. A studio render of the speaker casts a shadow that runs about four screen widths down the page. Under the render sit the headline "LIFE IS FANTASTIC!", the price ($399) and an "agree!" button that goes to the store. Further down the shadow, a "hold on..." button sits over the shopper's complaint that the shadow is "unrealistically LONG". Pressing it types out a reply, then fades in an email field, a subscribe button and the privacy line one after another. Subscribing types out "life is fantastic!".

Sections, in order:

1. Desktop header: teenage engineering's single SVG navigation (products, store, latest, finder, Japanese mission text, logo). On mobile, a fixed header with a cart counter and a menu button.
2. Background: four 1:1 render tiles on desktop and six on mobile, stacked to make the long shadow.
3. Hero copy: the SVG headline, the price and the "agree!" button.
4. Hold-on section: the complaint text, the typed reply, the sign-up controls and the success line.
5. Footer. On desktop: a country selector, seven links and the copyright. On mobile: shipping and returns copy, a "join our newsletter" button, a list of eight links, the logo, the copyright, the Japanese mission text, the address and the country selector.

## Interactions

| Control | Behaviour |
| --- | --- |
| Desktop navigation | Hovering the navigation spins the pinwheel faster, up to a cap. Leaving it lets the pinwheel coast to a stop. The constants come from the reference bundle (acceleration 900°/s², kick 160, cap 820°/s, decay 1.55). Disabled under `prefers-reduced-motion`. |
| Desktop "search" (finder icon, "finder" and "search" labels) | Opens the search overlay. Typing lists matching store items, pages, apps and guides, which link to the original site. Escape or a click on the backdrop closes it. |
| "agree!" | On hover it fills `#F1F2F2` and its label turns black. It links to the original store page. |
| "hold on..." | Runs the page's own script: the reply types out over 2 s, then the email field, subscribe button and privacy line fade in, staggered. |
| Subscribe | An invalid email outlines the field in red. A valid email shows "life is fantastic!". **Nothing is sent.** The request is replaced by a local stub. |
| Mobile header | Hides while you scroll down and comes back when you scroll up. |
| Mobile menu (⋮) | A full-screen menu with search, the product lists, the newsletter button and footer links. The ✕ button or Escape closes it. |
| "join our newsletter" (mobile footer and menu) | Opens the newsletter modal. The ✕ button, the backdrop or Escape closes it. The email and age-consent checkbox are checked on submit. A valid form just closes the modal, and **nothing is sent**. |
| Country or region select | Updates the label in both footers. It does not reload prices. |

## Structure

```
TeenageEngineeringEP35/
  README.md
  dist/
    index.html                 captured server-rendered markup with scripts removed; menu, modal and search
                               overlays are kept as <template>s captured from the live page
    assets/
      css/*.css                the page's own stylesheets (root, layout, te013 page engine, components)
      css/local.css            local overrides: agree hover text colour, focus rings
      js/page.js               the page's two layout scripts (hold-on and sign-up) run with a small `$` shim
      js/site.js               site interactions re-implemented locally (pinwheel, mobile header, menu,
                               modal, search, country select)
      data/search-index.json   305 search labels and hrefs collected from the live search UI
      fonts/*.woff2            te-20, te-40, TechnoType and the other faces declared in root.css
      img/                     background tiles (512/1024/2048 webp), headline SVGs, favicon
      manifest.json            role, size and source URL for every asset
```

### How the page is built

The reference is a React Router app. Its server-rendered HTML already holds the whole visible page, so this clone keeps that markup. React, analytics and tracking scripts are removed (Google Tag Manager, Google Ads, the fonts.net/Monotype tracking loader and the `/_api/mw/track` pixel). The footers come from the hydrated DOM, because the server markup leaves out the country selects. The price token is filled with `$399`.

The page body uses teenage engineering's "te013" layout engine. Every size is `calc(n * var(--client-width))`, with `--client-width: 100vw` in `root.css`, on a 980-unit design grid (`.ls-12-980-45-10-10`: 12 columns, 45-unit side margins, 10-unit gutters). Desktop and mobile are separate trees, `.cond.desktop` and `.cond.mobile`, switched at 768px.

## Tokens and reusable parts

- **Colour tokens:** `assets/css/root.css`, under `:root`. They include `--te-black #0f0e12`, `--te-white #f5f5f5`, `--te-grey-100…1000`, `--te-green #006837`, `--te-orange #f05a24`, `--te-blue #0071bb`, `--te-red #b81d13` and `--te-yellow #fab413`. The page theme is `--theme-body-bc: #000000`, and the page text is `#F1F2F2`.
- **Type scale:** `--fs-10…40` and `--lh-10…40` in `root.css`, all relative to `--client-width`, with a second set at `width >= 768px`. The faces are `te-20`/`te-40` (thin 100, light 300) for interface text and `TechnoType` for the page's uppercase display copy.
- **Spacing:** `--space-xs…xl` in `root.css`.
- **Breakpoints:** 768px switches `.desktop-only`/`.mobile-only` and `.cond.desktop`/`.cond.mobile`. 800/801px chooses between the image `srcset`s.
- **Reusable components:** the bordered te013 button (`.box.hbc.bxl` with `--border-*` and `--hover-bg-color`) in `te013.css`; the SVG navigation (`#header`) and the mobile header and menu in `layout.css`; the mobile footer link list (`._links_1iqct_33`); the newsletter modal (`._backdrop_cl1bg_46`); and the search overlay (`._backdrop_1t1dq_1`).
- **Hold-on sequence:** `assets/js/page.js` is generic. It needs elements with ids `hold-on-btn-btn`, `1st-text`, `2nd-text`, `3rd-text`, `sign-up`, `enter-email`, `sign-up-btn` and `privacy-policy` inside one container.

## Intentional differences

- **Newsletter sign-ups are not sent.** The hold-on subscribe uses a local stub that resolves successfully. The modal form only validates, then closes.
- **Search** lists text results from a static index collected on the capture date. The live overlay also shows store product thumbnails, which are left out to keep the bundle small. Its results come from a live index and will drift.
- **Images:** the 4096px webp renditions are left out (they are about 4.8 MB together). High-DPI desktop screens get the 2048px tiles instead. The og:image is also left out.
- **The `video-js` stylesheet is left out.** The page has no video.
- **The cart** is always empty (counter 0). The bag overlay stays hidden, as it does on the reference with an empty cart. The country select doesn't reprice anything.
- **Mobile header:** the reference's show/hide depends on when the cart data loads. Locally, the header also reappears once you reach the very top.
- The reference's per-box hover script for "agree!" (which refers to an undefined `text` variable) is replaced by one CSS rule with the same visible result.

## Verification (2026-10-29)

Headless Chromium (Playwright), with every request outside localhost blocked:

- Full-page screenshots compared with the reference: desktop 1280×5205 has 0% of pixels differing by more than 30. Mobile 390×3201 has 0.1%, all of it in the mobile header, which the reference had hidden after its capture scroll.
- The interaction states have no pixel differences: hold-on hover, hold-on mid-sequence, sign-up revealed, invalid email, agree hover, mobile menu open and newsletter modal open.
- Broken images: 0. Horizontal overflow: none. Console errors: 0. Requests to teenage.engineering or any third party: 0. These hold at both viewports.

## Licensing

This is an unofficial design study, not affiliated with teenage engineering. The product renders, headline artwork, logo, navigation artwork, copy and stylesheets belong to teenage engineering AB. The bundled fonts are proprietary or licensed typefaces. te-20/te-40 are declared as Univers TE faces, and the reference loads a fonts.net (Monotype) tracking script, which points to commercially licensed web fonts. They are included here only so the study renders faithfully.

Before any public or commercial reuse, replace the following:

- the images in `assets/img/`, using your own renders or tiles at the same 1:1 aspect ratio
- the headline SVGs
- the fonts, with licensed or open faces (for example a thin grotesk for `te-20` and a squared display face for `TechnoType`), by editing the `@font-face` rules in `assets/css/root.css`
- the copy in `index.html`

`assets/manifest.json` lists the source of every file.
