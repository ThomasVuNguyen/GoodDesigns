# Adopt AI homepage

A local capture of the Adopt AI homepage, made for the GoodDesigns gallery.

- **Reference:** https://www.adopt.ai/ (homepage only)
- **Page title:** `The AI Native Accounting & Bookkeeping software | Adopt AI`
- **Captured:** 2026-11-02 (Next.js App Router, Turbopack build)
- **Viewports checked:** desktop 1280×900, mobile 390×844
- **Run:** `python3 -m http.server 4191 --directory AdoptAI/dist` from the repository root, then open http://localhost:4191/

This is a rendered-page capture. The server HTML keeps its RSC payload, so the original React app hydrates locally, and every animation and control runs from Adopt's own client chunks. The page makes no runtime requests to adopt.ai, its Strapi media host, or any other host. Paths stay root-absolute (`/_next/...`, `/media/...`, `/images/...`). The gallery build prefixes them with `/sites/adopt-ai`.

## Structure

```
AdoptAI/
  README.md
  assets-manifest.json        every saved file -> its source URL
  tools/capture.py            rebuilds dist/ from the live site
  dist/
    index.html                server HTML + one re-emitted RSC payload push (see Rewrites)
    local.js                  local click handler: the logo scrolls to the top
    _next/static/chunks/      the Turbopack runtime, client chunks and the compiled Tailwind v4 stylesheet
    _next/static/media/       Inter and Hedvig Letters Serif (latin woff2)
    images/                   files from adopt.ai/images: logos, icons, section sparkles, platform cards
    media/                    the 55 Strapi files the page uses: engravings, logos, icons, 8 MP4s
```

The live site redeploys and changes chunk hashes, so re-run `python3 AdoptAI/tools/capture.py` rather than patching files by hand. `local.js` is not written by the script and survives a re-run. The script keeps already-saved MP4s, so re-encoded videos are not overwritten.

## Sections (top to bottom)

1. **Header:** Adopt logo, Solutions ▾ (For Finance Teams, For CPA Firms), Pricing, Resources ▾ (Blogs, Guides, Skills, Glossary), Security, About Us, and "Book a Demo". On mobile, a menu button opens a full-height drawer with the same items and a "Book a Demo" bar.
2. **Hero:** an "AI Native Accounting & Bookkeeping" chip, "Finance that executes itself, with YOU in control", the intro line, "Start for Free", and an animated line-and-sparkle diagram.
3. **Brand film:** "Nothing ships without your sign-off". The film autoplays muted, with a progress bar and a "Pause demo" button.
4. **Chapter 1 band (navy):** production copy, an engraved column, and a stat that rotates through "90% completed by agents", "100% traced to source" and "99.2% match accuracy".
5. **Customer logo marquee.**
6. **The problem:** "The tools aren't wrong. They just have ceilings." with four engraved-icon cards, then "Your business runs on its numbers."
7. **Ceilings chart:** "Every option works at some scale." A pixel-grid bar chart compares DIY, outsourced bookkeeping, hiring, and the AI CPA firm. Then the line "Keep QuickBooks… No rip-and-replace."
8. **What runs on Adopt:** four panels (Month End Close, AR Automation, AP Automation, Tax & Compliance). Each has a four-step accordion and a looping agent demo video.
9. **Proven · Governed · Grounded:** three cards, then the green certification band (GDPR, CCPA, HIPAA, SOC 2, ISO 27001), "Zero training on customer data" and "Visit our Trust Center".
10. **Proof:** "Teams that have done it", a horizontally scrolling testimonial row (UHY ×2, Automation Anywhere) beside an engraved cloudscape.
11. **How it works:** three steps (Pick a skill, Try it on sample files, Review and ship) with a product demo video per step. On desktop they are tabs with a progress rail. On mobile they are an accordion.
12. **Closing CTA:** "Stop doing your own books. Start approving them.", "Start for Free" and "Book a Demo" over an engraved farmland panorama.
13. **Footer:** link columns (Use Cases, Solutions, Resources, Free Tools, Company, Featured Articles, Featured Skills, Popular Integrations), contact block, social links, "Get AI Summaries" (Claude, ChatGPT, Google, Perplexity, Grok), and the legal row.

## Interactions

All of these come from the original client code and were exercised side by side with the live page:

| Behaviour | Checked |
| --- | --- |
| Solutions and Resources dropdowns open on hover, with engraved icon tiles | desktop |
| Menu drawer opens and closes | mobile |
| Brand film autoplays muted, with the progress bar and pause button | both |
| Chapter 1 stat rotates | both |
| Use-case accordions: clicking a step expands its copy. Panel videos play while in view. | desktop |
| How-it-works step switching changes the demo video | desktop |
| Lenis smooth scrolling, the hero line animation and the logo marquee | both |

**Links:** internal routes (`/pricing`, `/security`, `/about-us`, `/blog`, `/use-case/...`, `/free-tools/...`, …) point at https://www.adopt.ai. They are rewritten to absolute URLs, so Next.js neither prefetches nor client-routes them. The logo's `/` link becomes the public home too, and `local.js` turns a click on it into scroll-to-top. App, social, Trust Center, status and AI-summary links keep their original public destinations.

## Rewrites made by `tools/capture.py`

- **RSC payload:** the 69 `self.__next_f.push([1, …])` chunks are decoded, edited row by row, and re-emitted as one push. Text rows (`id:T<hex byte length>,…`) are copied byte for byte. They hold only JSON-LD here, and a root path inside one would be lengthened by the gallery's `/sites/<slug>` rewrite, which breaks the stream ("Connection closed").
- **Media:** `https://committed-crown-591b42a6a0.media.strapiapp.com/<file>` → `/media/<file>`, in the HTML, the payload's JSON rows and the chunks. `/_next/image?url=…&w=…&q=…` → the original file.
- **next/image:** the site's image config is patched to `unoptimized:!0` (chunk `3e-ec-r9mr0sf.js`), because a static host has no optimizer. Client-rendered images use the local `src` as given. Server-rendered `srcset` entries all point at the one saved file.
- **Header tone:** `chromeToneForPathname` (chunk `3k5fe_bpof39t.js`) picks the light or dark header from the pathname. It is patched to treat `/sites/...` as `/`, so the home-page tone is used inside the gallery.

## Tokens and reusable parts

All in `_next/static/chunks/1i6aekvvp5zat.css` (Tailwind v4 output):

- **Colours:** `--color-stone-100: #f5f5f4` (page), `--color-deep-navy: #171051` (primary buttons, Chapter 1 band, display accents), `--color-deep-teal: #00453d` (certification band), the `--color-mist-*` grey scale (dark header tone), and accents `--color-accent-red: #ff6467`, `--color-sky-blue: #82daed`, `--color-lime-green: #6fc800`, `--color-accent-periwinkle: #a2b0f4` and others.
- **Type:** `--font-display` (Hedvig Letters Serif) for headlines and quotes, and `--font-body` (Inter) for everything else. The scale runs from `--text-caption` 12px and `--text-body-s/m/l/xl` 14/16/18/20–24px to `--text-display-l` 40/52/64px (line height 1.1), stepping up at each breakpoint.
- **Layout:** `--container-content: 1280px` and `--container-full-bleed: 1440px`, with `--radius-feature: 48px` and `--radius-pill`.
- **Breakpoints:** Tailwind defaults: `sm` 40rem, `md` 48rem (mobile ↔ desktop nav, accordions ↔ tabs), `lg` 64rem, `xl` 80rem, `2xl` 96rem.
- **Components:** the outlined section chip ("The problem", "Proof", …), the engraved-icon card, the pixel-grid bar, the use-case panel (title + numbered accordion + media), the certification seal row, the testimonial card, and the header with its `HEADER_TONE_CLASSES` light/dark variants.

## Assets

`assets-manifest.json` lists all 102 files with their source URLs. `dist/` is about 34 MB, and 23 MB of that is the eight MP4s: the brand film (11.5 MB), the four use-case demos and the three how-it-works demos. They are the original files, not re-encoded. Fonts are the two latin `woff2` subsets that Next.js emitted.

## Removed

- The CookieYes consent manager (script tag, preconnect, and its custom-code entry in the RSC payload). The live page's consent banner, and the "Please accept cookies to access this content" box it lays over the page, do not appear.
- Google Tag Manager `GTM-MVZGRFXJ`: the `<noscript>` iframe, the preconnect, and the deferred client loader entry in the payload.

## Intentional differences

- Only the homepage is captured. Other routes open on adopt.ai.
- The JSON-LD in the payload's text rows still names the Strapi URL of Adopt's logo. It is metadata and is never fetched.
- Image sizes: the live site serves resized WebP from its optimizer. The clone serves the original Strapi files at every width.
- Logo images in the marquee load lazily, as on the live page. Copies that are still off-screen report `complete: false` until they scroll in.

## Licensing

Adopt AI's name, marks, engravings, film, product UI, customer logos and testimonials, and all copy belong to Adopt AI Inc. and the respective owners. This capture is for design study. Replace them with material you are allowed to publish before using any of this in a derivative.
