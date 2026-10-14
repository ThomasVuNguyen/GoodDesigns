# The ODIN storefront recreation

A local capture of the whole Open Discovery Institute Shopify store (Horizon/Fabric theme) for design study: the homepage plus every subpage in the store's sitemap, running on the theme's own web components with the Shopify backend replaced by a small local emulator.

- **Reference:** https://the-odin.com/ (and every route in `tools/pages.txt`)
- **Page title:** The Open Discovery Institute | Biotechnology Kits & Genomics
- **Captured:** 2026-10-14 (America/New_York)
- **Run:** from the repository root, `python3 -m http.server 8861 --directory TheOdin/dist`, then open `http://localhost:8861/`.
- **Review sizes:** 1280 × 900 desktop and 390 × 844 mobile.

## Pages (44)

| Group | Routes |
| --- | --- |
| Home | `/` |
| Pages | `/pages/about-us`, `/pages/contact`, `/pages/privacy-policy`, `/pages/privacy-policy-for-wgs`, `/pages/shipping-return-policy` |
| Collections | `/collections/all`, `all-kits`, `prodcuts` (the store's own spelling), `services`, `start-here`, `genetic-engineering-kits`, `build-a-lab`, `bundle` |
| Products | all 10: `crispr-kit`, `gfp-bacteria`, `ge-yeast`, `plant-kit`, `bioluminescent-bacteria-culturing-kit`, `bioengineering-101-lab-kit-course`, `complete-genetic-engineering-lab-kit`, `engineer-across-life-bacteria-yeast-plants-bundle`, `whole-genome-sequencing-30x`, `gift-card` |
| Blog | `/blogs/blog`, `/blogs/blog/page-2/` (the live `?page=2`), and all 16 articles |
| Store | `/cart`, `/search` (also `/search?q=…`) |

Every page matches the reference at both sizes: identical full-page height, and at most 0.09% of pixels differ (marquee and animation frames). Every page loads with no console errors, no horizontal overflow and no request to an external host.

## What works

- Header menus, the mobile menu drawer, the search modal with **predictive search**, and the `/search?q=` results page.
- Product pages: **variant pickers** (all 29 variants, including both option groups of the genome-sequencing kit), media slideshow, accordions, quantity selector, related products, frozen Judge.me reviews.
- **Cart:** add to cart, cart drawer, quantity +/−, remove, the `/cart` page, header count bubble, Shop Pay / PayPal / Google Pay buttons and the Shop Pay installments line. The cart lives in `localStorage` (`odin-local-cart`), so it survives page loads.
- Collection **sorting** (every sort option) and the availability filter; the blog's **Load more**.

## How it is built

```
TheOdin/
├── dist/                    # the runnable site
│   ├── index.html, pages/, collections/, products/, blogs/, cart/, search/   # one index.html per route
│   ├── cdn/                 # mirrored theme CSS/JS, fonts, images (WebP), app assets (cdn/ext/<host>/…)
│   └── odin-local/          # hand-written + recorded local backend
│       ├── shim.js          # fetch emulator: section rendering, cart, search (loaded first on every page)
│       ├── overrides.css    # static stand-ins for Shopify runtime widgets
│       ├── replay/          # recorded section responses + index.json (request key → file)
│       ├── cart/            # cart drawer / cart page line templates for every variant
│       ├── data/products/   # product JSON
│       └── wallets/         # Shop Pay, PayPal, Google Pay logos
├── tools/
│   ├── pages.txt            # routes to capture
│   ├── snapshot.cjs         # Chrome pass over the live store: runtime assets, app CSS, rendered reviews
│   ├── record.cjs           # drives variants, sorting, filters, Load more, and search for the store vocabulary
│   ├── record_cart.py       # records cart sections for one line of every variant (throwaway session cart)
│   └── capture.py           # downloads, cleans and rewrites everything into dist/
└── assets-manifest.json     # every mirrored file → its source URL
```

Rebuild from the live store (needs Chrome and Playwright; the `.cache/` folder is git-ignored):

```bash
export PLAYWRIGHT=/path/to/node_modules/playwright
node TheOdin/tools/snapshot.cjs && node TheOdin/tools/record.cjs && python3 TheOdin/tools/record_cart.py
python3 TheOdin/tools/capture.py
```

### What capture.py changes

- Removes Shopify analytics, web pixels, Shop sign-in, checkout preloads, the privacy banner, Mailchimp, the Judge.me runtime and speculation rules. The theme's own modules (`cdn/shop/t/2/assets/*.js`) run unchanged.
- Images are saved as WebP at the widths the `srcset`s ask for, capped at 2560 px; images without a width are saved at 1920 px.
- Judge.me review widgets are frozen from the rendered live page (desktop and mobile renders, switched at 750 px) together with the stylesheets the app injects.
- Links to captured routes stay local; `/collections/<c>/products/<p>` becomes `/products/<p>`. Account, login, checkout and policy links go to the live store.

### How shim.js answers the theme

- `?section_id=…` requests come from `replay/` when recorded, otherwise the section is cut out of the matching local page.
- Search requests use the recording for the closest word in the store's vocabulary (285 terms from product titles, descriptions, tags and links) and put the typed text back into the markup.
- `/cart/add`, `/cart/change`, `/cart/update`, `/cart.js` are answered from `localStorage`; drawer and cart-page markup is assembled from the recorded per-variant line templates, with quantities, line prices and totals recomputed.

## Reusable parts

- Design tokens: the `:root` palette and type scale in the inline `<style data-shopify>` blocks of each page and `cdn/shop/t/2/assets/base.css` (Chakra Petch headings, `--color-*` scheme variables, grid background).
- Components: the Horizon web components in `cdn/shop/t/2/assets/` (header menu, drawers, slideshow, variant picker, product form, cart items, facets, predictive search).
- `odin-local/shim.js` is store-agnostic apart from three section ids at the top of the cart and search blocks; it can back other Horizon captures.

## Known differences

- Forms (contact, newsletter, discount code) and checkout are not functional; checkout and account links open the live store. The protocol PDFs (10–17 MB each) link to the live store.
- Search covers the recorded vocabulary; a query word outside it shows the "no results" state. Queries with several words show one word's results, reordered so items that match more of the words come first.
- Collection filters: sorting and availability are recorded; price-range filters fall back to the nearest recorded result.
- Express checkout buttons and the installments line are static look-alikes of Shopify's widgets.
- The Judge.me widgets are static: their sorting, pagination and "Write a review" do nothing.

The ODIN's name, logo, product photography, protocols, reviews and copy belong to their owners. Replace them with licensed material before publishing a derivative or using it commercially.
