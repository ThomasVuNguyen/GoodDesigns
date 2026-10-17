# GoodDesigns

## Publishing

Commit and push to `main`. That is the release.

GitHub Actions (`.github/workflows/firebase-hosting.yml`) builds the gallery and deploys https://gooddesigns.web.app. The last run took about a minute and a half. Do not run `node scripts/build-gallery.mjs` or `firebase deploy`. `public/` is gitignored and is produced in CI.

Commit the inputs: each site's `dist/`, `gallery/sites.json`, and thumbnails. A new site also needs an entry in `gallery/sites.json` and a thumbnail from `npx -p playwright node scripts/capture-thumbs.mjs <slug>`.

## Cloning a site

Follow `.agents/workflows/clone-perfectly.md`.
