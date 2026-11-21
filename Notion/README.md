# Notion

A local capture of notion.com, made for design study. It covers the homepage and every other English page on the site.

- **Reference:** https://www.notion.com/ and every page it links to: the URLs in the site's eight English sitemaps (root, blog, customers, help, md, releases, use-case, feature) plus the pages they link to, by relative or absolute URL.
- **Captured:** 2026-11-21
- **Run:** from the repository root, `node Notion/tools/serve.mjs 4340`, then open `http://127.0.0.1:4340/`.
  - `node Notion/tools/serve.mjs 4341 --gallery` serves it under `/sites/notion/` with the gallery build's path rewrite applied, as it runs on gooddesigns.web.app.
  - Use this server and not `python3 -m http.server`, which redirects `/pricing` to `/pricing/`. `serve.mjs` serves `pricing/index.html` at `/pricing`, as Firebase Hosting does.
- **Rebuild:** `python3 Notion/tools/capture.py` crawls the live site again and rewrites `dist/` and `assets-manifest.json`.
  - Set `CAPTURE_CACHE=<dir>` to reuse downloads and video encodes between runs.
  - It needs `curl` and `ffmpeg`.

The previous version of this folder, a hand-built rebuild of `/product` from September 2026, is in the git history.

## Pages

There are 1,789 pages, each saved as `dist/<route>/index.html`:

| Section | Pages |
| --- | --- |
| `/blog/…` | 708: the index, its pages and topics, and the posts |
| `/help/…` | 564: the help center, its categories, guides and articles |
| `/releases/…` | 171 release notes |
| `/customers/…` | 99 customer stories |
| `/product/…` | 50: the product, AI, agents, calendar, mail, sites and feature pages |
| `/use-case/…` | 37 |
| `/custom-agent-templates/…` | 37 |
| `/connections/…` | 29 |
| `/webinars/…` | 19 |
| Everything else | the homepage, `/pricing`, `/enterprise`, `/teams`, `/startups`, `/about`, `/careers`, `/security`, `/templates`, `/explore-templates`, `/download`, `/desktop`, `/mobile`, partner pages and the rest |

Not captured, so links to them open the live site:

- the template marketplace's 17,000 pages (`/templates/<slug>`, categories, creators); `/templates` itself is captured
- the 21 translated sites (`/ja`, `/fr`, …)
- the app: `/login`, `/signup`, `@creator` profiles, invites
- links that redirect elsewhere (`/calendar` goes to `/product/calendar`, which is captured)

## How it is built

notion.com is a Next.js Pages Router site built with Turbopack. Every page is server-rendered with `getServerSideProps`: the HTML carries the markup and the page's props in `__NEXT_DATA__`, and the client chunks hydrate it. The capture keeps the original app and runs it from local files. Nothing is reimplemented.

- `dist/<route>/index.html`: the server-rendered pages, with `<script src="/shim.js">` added first in `<head>`.
- `dist/_next/static/`: the Turbopack runtime, the CSS and every chunk the build manifest and the chunks name.
- `dist/front-static/`: the site's own files: the NotionInter and Die Grotesk fonts, illustrations, icons and videos. The code names every language's copy of some illustrations (`fr-FR.gif`, `ko-KR.mp4`); only `en-US` is kept.
- `dist/_ctf/<asset id>/`: images and videos from Contentful, the site's CMS (`images.ctfassets.net`, `videos.ctfassets.net`).
- `dist/_ext/<host>/`: files from other hosts, renamed by a hash of their URL: Notion's S3 bucket (`public.notion-static.com`), notion.so, app.notion.com and library.notion.com icons and images, and YouTube thumbnails.
- `dist/api-snapshots/`: the API answers pages ask for after load (see below).
- `dist/cdn-cgi/scripts/`: Cloudflare's email decoder. Cloudflare obfuscates email addresses in the HTML and this script restores them before React hydrates. Without it, `/pricing` fails hydration.
- `dist/shim.js`: handles network calls locally (see below).
- `assets-manifest.json`: maps each saved file to its source URL.
- `tools/`:
  - `capture.py` makes the capture.
  - `shim.js` is copied into `dist/`.
  - `serve.mjs` is the local server.
  - `api/` holds the recorded API answers.

### Images and video

- **Contentful:** the pages ask Contentful for WebP renditions at the widths in their `srcset` (`…/find_desktop.png?w=1080&q=55&fm=webp`). Each JPEG and PNG is saved once, as the WebP rendition at the widest width any page asks for (capped at 2048 px) and the highest quality. Every width in a `srcset` points at that one file. SVGs, GIFs and videos are the original files.
- **next/image:** the `/_next/image` optimizer does not exist on a static host. Each `/front-static/` image the pages sent through it is saved as the optimizer's rendition at the widest width used, under the image's own path. Next's default image loader is patched to return the file's path instead of an optimizer URL.
  - Switching next/image to `unoptimized` instead would drop the `<source>` elements of the art-directed `<picture>`s, and hydration fails (React error #418).
- **Video:**
  - The product pages' videos are the files Contentful serves. Only files over 25 MB would be re-encoded, to at most 1920 px wide.
  - The roughly 1,000 short clips inside help articles, blog posts, release notes and customer stories took 1.3 GB as served. They play in a column at most about 900 px wide, so each one over 300 KB is re-encoded to at most 1280 px wide, H.264 CRF 28. The original is kept when the re-encode is not smaller.
- **GIFs:** the Contentful GIFs in release notes and blog posts (270 MB) are saved as lossy animated WebP (q70) when that is smaller.
- **Other hosts:** template previews and creator photos on S3 are full-size PNGs of up to 6 MB. Those over 150 KB are saved as WebP (q80, at most 1600 px wide).
- **Size:** `dist/` is about 1.6 GB. That is 460 MB of HTML, which compresses well in git, and about 1.1 GB of media.

## What the capture changes

- **Links:** links to captured routes stay local, including the absolute `https://www.notion.com/...` links articles use. A link to a route that notion.com redirects to a captured page (`/integrations` to `/connections`) points at that page. Anything else (the app, the template marketplace, the translated sites, other hosts) opens the live site.
  - Some links are built after load, such as the header's "Log in" (`/login?from=marketing&pathname=...`). `shim.js` sends a click on an app, template-marketplace or translated-site link to notion.com.
- **Navigation:** the Pages Router fetches `/_next/data/<build>/<route>.json` for client-side navigation and prefetching. A static capture has none, so `shim.js` answers those requests with an empty 404, and Next.js falls back to a full page load of the same route. The browser's Back button works.
- **API answers:** `shim.js` serves recordings from the capture date:
  - `/front-api/releases/latest-byline`: the "What's New" byline in the navigation
  - `/front-api/notifications/en-US`: the banner candidates (none on the capture date)
  - `/front-api/pricingPlans`: plan prices on `/product/ai` and other pages. Without it `/product/ai` crashes.
  - `app.notion.com/api/v3/getTemplateSearchResults`: the template search, answered with its results for an empty query
- **Analytics and third parties:** none of it loads.
  - `shim.js` blocks scripts, iframes and preload links from other hosts. That covers Transcend's cookie banner, Google sign-in (One Tap), Vercel Speed Insights, Sentry, Splunk, Statsig experiments and the app's event client.
  - Requests to other hosts answer `{}`, and beacons are dropped. Statsig logs that it could not parse its answer, so the pages show the default experience.
  - Sentry's DSN is blanked.
  - The capture strips the preload and preconnect hints for those hosts from the HTML.
  - The help center's survey embed (`/embed/help/sprig-survey`) is replaced with `about:blank`.
- **Embeds:** YouTube players inside page content stay live, as Granola's capture keeps its embeds.
- **Gallery prefix:** the gallery serves the capture under `/sites/notion/`, and its build prefixes root-absolute paths whose first segment exists in `dist/`, in the HTML, CSS and JS. That includes `__NEXT_DATA__.page` and the route names the page chunks register, so the router stays consistent.

## Known differences

- In-site navigation does full page loads, not client-side transitions.
- No cookie banner: Transcend's consent dialog is a third-party script.
- The footer's "We do not sell or share your personal information" line is missing. It renders only once Transcend reports the visitor's consent, so every page is 11 px shorter than live.
- The help center leaves out "Talk with sales", in its sidebar and in "Still have questions?", so `/help` is 119 px shorter. The live site shows it after its third-party scripts load.
- `/partners/ai-sales-demo` keeps its embedded voice agent (withsable.com) live, as it is the page's content.
- Six blog posts and the `/feature/enterprise-search` pages log React error #418 (a hydration text mismatch). They do the same on the live site.
- Forms (contact sales, webinar registration, newsletter) do not submit.
- Template search shows the same results whatever you type.
- The "Log in" and "Get Notion free" buttons open the live app.
- Clips inside help articles, the blog, release notes and customer stories are re-encoded smaller than the originals.

## Licensing

Everything on these pages belongs to Notion Labs, Inc. or the respective rights holders. That includes the copy, the blog posts and help articles, the brand, the NotionInter and Die Grotesk typefaces, the illustrations, the customer logos and photography, and the app code. The capture is for private design study. Before publishing anything built from it, replace the copy, logos, fonts, images and posts with material you are allowed to use.
