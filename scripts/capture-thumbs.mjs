// Dev-only: screenshots each built site into gallery/thumbs/<slug>.jpg and reports failed sub-requests.
// Usage: node scripts/build-gallery.mjs && npx -p playwright node scripts/capture-thumbs.mjs
import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { existsSync, statSync, createReadStream } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pub = path.join(root, 'public');
const { sites } = JSON.parse(await readFile(path.join(root, 'gallery/sites.json'), 'utf8'));
const only = process.argv.slice(2);

const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.json': 'application/json', '.woff2': 'font/woff2', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp' };
const server = http.createServer((req, res) => {
  let p = path.join(pub, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (existsSync(p) && statSync(p).isDirectory()) p = path.join(p, 'index.html');
  if (!existsSync(p)) { res.writeHead(404).end(); return; }
  res.writeHead(200, { 'content-type': types[path.extname(p)] || 'application/octet-stream' });
  createReadStream(p).pipe(res);
}).listen(0);
const base = `http://localhost:${server.address().port}`;

const browser = await chromium.launch();
for (const s of sites.filter((x) => !only.length || only.includes(x.slug))) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const failed = [];
  page.on('response', (r) => { if (r.status() >= 400 && r.url().startsWith(base)) failed.push(`${r.status()} ${r.url().replace(base, '')}`); });
  await page.goto(`${base}/sites/${s.slug}/`, { waitUntil: 'load' });
  await page.waitForTimeout(2500);
  await page.screenshot({ path: path.join(root, `gallery/thumbs/${s.slug}.jpg`), type: 'jpeg', quality: 82 });
  console.log(`${s.slug}: ${failed.length} failed request(s)`, failed.slice(0, 5));
  await page.close();
}
await browser.close();
server.close();
