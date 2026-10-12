# Flexpa patient app page recreation

A self-contained static recreation of Flexpa's /app landing page.

## Reference

- URL: https://www.flexpa.com/app
- Page title: “Get your own health records fast | Flexpa”
- Reference captured: October 4, 2026, 11:57 p.m. EDT (America/New_York)
- Final desktop and mobile comparison: October 5, 2026, 12:00 a.m. EDT
- Page scope: the complete /app page, including navigation, FAQ, CTA, and footer.

## Run locally

From the GoodDesigns repository root:

    python3 -m http.server 4173 --directory Flexpa/dist

Open [http://localhost:4173/](http://localhost:4173/).

## Page and interactions

The page includes the announcement bar and responsive navigation, patient records hero, health-plan and provider logos, clipboard problem cards, records categories, trust and compliance cards, FAQ, final CTA, and footer.

- Desktop navigation buttons open Products, Solutions, and Resources panels. Click outside or press Escape to close them.
- The mobile menu opens from the header control and closes from the same control or Escape.
- FAQ rows behave as a single-open accordion.
- Page links point to their public Flexpa destinations. Patient verification and app-store links point to their original destinations.

## Reusable structure

- dist/index.html contains the server-rendered page structure and copy.
- dist/_next/static/css/346f41ddf842a107.css is the captured page stylesheet; the corresponding Maison Neue font files are under dist/_next/static/media/.
- dist/interactions.js implements the dropdown menus, mobile menu, and FAQ behavior without the original framework runtime.
- dist/clone-overrides.css styles the local navigation states and reduced-motion behavior.
- dist/assets-manifest.json maps each saved asset to its role, content type, and original source URL.
- dist/images/ contains the locally served illustrations, icons, logo files, and decorative CTA artwork.

The captured stylesheet supplies the original colors, spacing, typography, and responsive breakpoints. Its key visual colors include forest green, sage, and lime.

## Verification and known differences

Fresh reference and local screenshots were compared at 1280×900 and 390×844. Local layout height and width matched at both sizes after lazy-loaded images were loaded. Navigation menus, mobile menu, and FAQ states were checked. All visible images and fonts are served locally; the page only uses external links after a visitor follows one.

This is a static recreation of the /app route. It does not include Flexpa's Next.js runtime, analytics, or reCAPTCHA scripts. The captured copy and branded assets remain Flexpa's; replace them or obtain the needed rights before publishing this recreation publicly or commercially.
