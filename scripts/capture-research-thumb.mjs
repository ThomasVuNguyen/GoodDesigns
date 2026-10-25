// Capture a screenshot of an external URL for research thumbnails.
// Usage: npx -p playwright node scripts/capture-research-thumb.mjs <slug> <url>
import { chromium } from 'playwright';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const [slug, url] = process.argv.slice(2);
if (!slug || !url) { console.error('Usage: node scripts/capture-research-thumb.mjs <slug> <url>'); process.exit(1); }

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(url, { waitUntil: 'load', timeout: 30000 });
await page.waitForTimeout(4000);
const out = path.join(root, `gallery/thumbs/research/${slug}.jpg`);
await page.screenshot({ path: out, type: 'jpeg', quality: 82 });
console.log(`✓ ${out}`);
await browser.close();
