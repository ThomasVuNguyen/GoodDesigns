# Dessn homepage

A local capture of the Dessn homepage, made for the GoodDesigns gallery.

- **Reference:** https://www.dessn.com/ (homepage only)
- **Page title:** `Dessn - Design in production`
- **Captured:** 2026-11-05 (TanStack Start, React 19, Vite chunks, Tailwind v4)
- **Viewports checked:** desktop 1280×900, mobile 390×844
- **Run:** `python3 -m http.server 4192 --directory Dessn/dist` from the repository root, then open http://localhost:4192/

This is a rendered-page capture. The server HTML keeps TanStack's dehydrated router state, so Dessn's own React app hydrates locally, and all animation and controls run from Dessn's client chunks. The page makes no runtime requests to dessn.com, files.dessn.ai, Google Fonts or any analytics host. Paths stay root-absolute (`/assets/...`, `/fonts/...`, `/media/...`). The gallery build prefixes them with `/sites/dessn`.

## Structure

```
Dessn/
  README.md
  assets-manifest.json        every saved file -> its source URL
  tools/capture.py            rebuilds dist/ from the live site
  tools/local.js              local additions, copied into dist/ by capture.py
  dist/
    index.html                server HTML (analytics bodies emptied, local.js added to <head>)
    local.js
    assets/                   Vite JS chunks and CSS for every route, plus the homepage's generated images
    fonts/                    Kalice (display serif, 6 cuts); fonts/google/ holds Inter and JetBrains Mono
    media/                    the testimonial video (WebM + MP4), its poster and captions
    agent-logos/, *.svg, ...  customer logos, testimonial portraits, MCP agent logos, doodles
```

dessn.com redeploys every few minutes, and an old build's chunks start returning 404 soon after. `capture.py` fetches all code in parallel straight after the HTML, which takes about 7 seconds. It starts over if any chunk has already gone. Re-run `python3 Dessn/tools/capture.py` rather than patching files by hand. It replaces `dist/` completely, so put local edits in `tools/local.js`.

## Sections (top to bottom)

1. **Header:** DESSN logo, Customers, Pricing, Mission, Resources ▾ (How to ›, Popular prompts, Blog, Events), Talk to us, Log in, and a red "Sign up free" button. On mobile, a menu button opens a dropdown sheet with the same links, an expandable Resources group, and "Talk to us" / "Log in" buttons.
2. **Hero:** "See what's *live*. Fix what's *drifting*." (Inter 600 with Kalice italic), the intro line, "Connect your repo", and "No credit card required". Below it, an animated canvas demo: a GitHub repo card wired by a red line to a workspace showing `/cards`, `/cards/freeze`, `/cards?frozen` and the replace flow, with live cursors (Sam, Priya, Leo). On mobile it becomes a tabbed walkthrough (Cards, Freeze, Replace, Frozen, Ordered). The orange brushstroke backdrop sits behind it.
3. **Customer logo marquee:** greenlight guru, color, noyo, ngrok, Lette, Great Question, Operate, Pencil, and others.
4. **Testimonial carousel:** large Kalice quote cards in cream, teal and other tones, with portraits, prev/next arrows and a segmented progress bar.
5. **Dessn's *MCP*:** three feature bullets, "Get started", a copyable setup prompt (`Set up Dessn for this project: https://www.dessn.com/llms.txt`), and a teal panel with agent tiles (Claude, Grok, Codex, Cursor) above an "ASK DESSN ANYTHING" prompt box.
6. **Anchored in prod, built for design:** three coloured pillars (sky, amber, periwinkle) with flower marks, then three large brushstroke panels:
   - *Visibility* into what's live (light blue): the booking-flow diagram.
   - Shortcut to *consistency* (amber): the table-consistency audit.
   - *Design-first* environment (orange): the editor with its design panel and comments.
7. **How it works (dark band):** three step cards (Connect your repo in one click, Dessn compiles your codebase in 30 minutes, Pull your product pages onto a canvas) with rough-drawn mouse and keyboard doodles. Then the RISR testimonial video with captions, beside Alex's quote.
8. **FAQ:** seven accordion questions.
9. **Closing CTA:** "Product, in your hands." in Kalice on an amber card over an orange and blue brushstroke field, with "Get access" and four flower tiles.
10. **Footer:** logo, "Production, in your hands", Explore and Socials columns, the copyright line, "Cookie settings" and "Talk to us".

## Interactions

All run on Dessn's original client code. Each was exercised on localhost at `/` and under a simulated gallery path, `/sites/dessn/`.

| Behaviour | Checked |
| --- | --- |
| Resources dropdown opens on click, with a "How to" submenu | desktop |
| Menu sheet opens and closes. Resources expands inside it | mobile |
| Hero canvas demo animates (cursors, route cards, red connector); mobile tabs | both |
| Logo marquee scrolls | both |
| Testimonial carousel: arrows and the progress bar | desktop |
| Copy button puts the setup prompt on the clipboard | desktop |
| Testimonial video plays local WebM/MP4 with local captions | desktop |
| FAQ items expand and collapse | desktop |
| "Cookie settings" opens the consent banner. Accept/Reject close it | desktop |
| Links to other routes (Customers, Pricing, Blog, ...) open on www.dessn.com | desktop |

## Rewrites made by `tools/capture.py`

- **Router basepath:** the client entry calls `router.update({basepath:"", ...})`. It is patched to use the folder the page is served from (`location.pathname` minus a trailing `/` or `/index.html`). The `/` route then matches under `/sites/dessn/` as well, rather than rendering Dessn's "Page not found".
- **Vite preload helper:** builds `"/" + "assets/x.js"` at runtime, which the gallery's path rewrite can't reach. It is patched to resolve against the chunk's own URL (`new URL("../" + dep, import.meta.url)`).
- **Intent preloading** (`defaultPreload: "intent"`) is turned off, because other routes are not captured.
- **Media:** `https://files.dessn.ai/media/...` and the `"https://files.dessn.ai/media"` base constant become `/media/...`.
- **Google Fonts:** the `@import` in the stylesheet and the `<link>` in the HTML point at `/fonts/google/fonts-0.css`, a local copy with local woff2 files.
- **Images from other routes:** the crawl reads every route's chunks, and those name about 1,500 images for `/customers`, `/blog` and other pages. Only files named in the HTML, in a stylesheet, or in a chunk the `/` route loads are saved. JS and CSS are all kept, so lazy imports still resolve.

## Removed

- Google Tag Manager, gtag consent defaults and the PostHog snippet. React renders these tags, so the tags stay in place and only their inline bodies are emptied. Deleting them breaks hydration (React error #418).
- The Cloudflare RUM beacon (injected at the edge) and the Google Fonts preconnects.
- Vercel Web Analytics: its script URL is pointed at an empty `data:` script.
- The Convex funnel tracker is left in the code. It only fires on dessn.com and dessn.ai hostnames.

## Local additions (`local.js`)

- Sets `dessn_cookie_consent=denied` before the app reads it, so the consent banner stays closed: there is nothing left to consent to. Footer → "Cookie settings" still opens it.
- Sends a click on a same-origin link to any route other than `/` to `https://www.dessn.com/<route>`.

## Tokens and reusable parts

Measured from the rendered page. Definitions live in `assets/app-*.css` and `assets/index-*.css` (Tailwind v4 output):

- **Colours:** paper `rgb(245 243 230)` (page), ink `rgb(28 26 29)` (text, primary buttons, How it works band), signal red `rgb(198 65 37)` ("Sign up free", the hero connector), CTA orange `rgb(225 80 1)`. Panel colours: sky blue, amber, periwinkle, deep teal and orange.
- **Type:** `--font-sans` Inter (UI and most headings, weight 600 with tight tracking: h1 72px / −2.52px, h2 60px / −3px, 48px / −2.16px), `--font-display` "Kalice Marketing" (italic accent words, testimonial quotes, the closing CTA at 72px), and `--font-mono` JetBrains Mono (route labels, the prompt box, the setup snippet).
- **Layout:** the header and content container is 1152px. Buttons have radii of 7.8–10.4px, and the primary button is 48px tall.
- **Breakpoints:** Tailwind defaults (`sm` 40rem … `2xl` 96rem). At 390px the header uses the menu button and the hero canvas becomes the tabbed walkthrough. At 1280px both are in their desktop forms.
- **Components:** the brushstroke panel (title + three flower-bullet features + framed product screenshot), the flower mark, the coloured pillar card, the testimonial card, the step card, the FAQ accordion, the agent tile, and the prompt box.

## Assets

`assets-manifest.json` lists all 261 fetched files with their source URLs (`local.js` is not fetched and not listed). `dist/` is about 41 MB. 19 MB of that is the testimonial video in both WebM (6 MB) and MP4 (13 MB), and 17 MB is JS/CSS for every route.

## Intentional differences

- Only the homepage is captured. Other routes open on dessn.com.
- The consent banner does not appear on load (see Local additions).
- Logo images in the marquee load lazily, as on the live page. Copies still off-screen report `complete: false` until they scroll in (39 on desktop and 44 on mobile, on both the live page and the capture).

## Licensing

Dessn's name, marks, illustrations, flower and brushstroke artwork, Kalice font files, product UI, customer logos, testimonials, video and all copy belong to Dessn and the respective owners. Kalice is a commercial typeface. This capture is for design study. Replace them with material you are allowed to publish before using any of this in a derivative.
