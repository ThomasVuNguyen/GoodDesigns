// Browser health check for the buildspace capture, at the two reference viewports.
//
//   node Buildspace/tools/check.mjs           # verify every page
//   node Buildspace/tools/check.mjs --prune   # verify, then delete assets no page loaded
//
// It starts tools/serve.py itself, so nothing else needs to be running. Screenshots of
// the local pages are written to reference/ for the side-by-side comparison.
import { spawn } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync, unlinkSync, statSync } from 'node:fs';
import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const assets = path.join(dist, 'assets');
const reference = path.join(root, 'reference');
const prune = process.argv.includes('--prune');

const PAGES = [
  ['index', '/', 900, 844],
  ['letter', '/letter', 15127, 19852],
  ['nw', '/nw', 8131, 7054],
  ['faq', '/faq', 3101, 7408],
  ['hyper', '/hyper', 14560, 20211],
  ['demoday', '/s4/demoday', 154710, 430947],
];
const VIEWPORTS = [['desktop', 1280, 900], ['mobile', 390, 844]];

const port = 4187 + Math.floor(Math.random() * 500);
const server = spawn('python3', [path.join(root, 'tools', 'serve.py'), String(port)], { stdio: 'ignore' });
const base = `http://localhost:${port}`;
await new Promise((resolve) => setTimeout(resolve, 900));

const used = new Set();
const failures = [];
let problems = 0;

async function traverse(page, name) {
  // Scroll the whole page so lazy media and scroll-triggered sections settle.
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.85;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 80));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1200);
  if (name !== 'demoday') return;
  // The demo day page is the only interactive one: category chips, search, video modal.
  for (const chip of await page.locator('span[data-framer-name="Secondary"]').all()) {
    await chip.click({ timeout: 5000 }).catch(() => {});
    await page.waitForTimeout(400);
  }
  await page.locator('span[data-framer-name="Secondary"]', { hasText: /^all$/ }).first().click().catch(() => {});
  await page.waitForTimeout(600);
  await page.mouse.click(1232, 657);
  await page.waitForTimeout(600);
  await page.keyboard.type('ai').catch(() => {});
  await page.waitForTimeout(600);
  await page.keyboard.press('Escape').catch(() => {});
  await page.evaluate(() => window.scrollTo(0, 900));
  await page.waitForTimeout(400);
  await page.locator('article').first().click({ timeout: 5000 }).catch(() => {});
  await page.waitForTimeout(2500);
}

const browser = await chromium.launch();
for (const [name, route, desktopHeight, mobileHeight] of PAGES) {
  const expected = { desktop: desktopHeight, mobile: mobileHeight };
  for (const [viewport, width, height] of VIEWPORTS) {
    const context = await browser.newContext({ viewport: { width, height } });
    const page = await context.newPage();
    const errors = [];
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
    page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
    page.on('response', (r) => {
      if (!r.url().startsWith(base)) return;
      used.add(decodeURIComponent(new URL(r.url()).pathname.slice(1)));
      if (r.status() >= 400) failures.push(`${r.status()} ${r.url().slice(base.length)}`);
    });

    await page.goto(base + route, { waitUntil: 'load', timeout: 180000 });
    await page.waitForTimeout(3000);
    const heightBefore = await page.evaluate(() => document.body.scrollHeight);
    await traverse(page, name);
    // Interactions can filter the demo day grid, so the height check runs before them.
    if (name === 'demoday') await page.evaluate(() => window.scrollTo(0, 0));

    const report = await page.evaluate((h) => ({
      title: document.title,
      height: h,
      overflow: document.documentElement.scrollWidth > window.innerWidth,
      brokenImages: [...document.images].filter((i) => !i.complete || i.naturalWidth === 0)
        .map((i) => i.currentSrc || i.src),
    }), heightBefore);
    await page.screenshot({ path: path.join(reference, `local-${name}-${viewport}.png`), fullPage: name !== 'demoday' });
    await context.close();

    const heightOk = report.height === expected[viewport];
    const ok = heightOk && !report.overflow && !report.brokenImages.length;
    if (!ok) problems++;
    console.log(`${ok ? 'ok  ' : 'FAIL'} ${name.padEnd(8)} ${viewport.padEnd(8)} `
      + `height=${report.height}${heightOk ? '' : ` (expected ${expected[viewport]})`} `
      + `overflow=${report.overflow} brokenImages=${report.brokenImages.length} `
      + `consoleErrors=${errors.length} failedRequests=${failures.length}`);
    if (!ok) {
      if (report.brokenImages.length) console.log('   broken:', report.brokenImages.slice(0, 5));
      console.log('   errors:', errors.slice(0, 3));
    }
  }
}
await browser.close();
server.kill();

if (failures.length) {
  console.log(`\n${failures.length} failed request(s):`, [...new Set(failures)].slice(0, 10));
  problems++;
}

if (prune) {
  const html = PAGES.map(([, route]) => path.join(dist, route === '/' ? 'index.html' : `${route}.html`))
    .map((file) => readFileSync(file, 'utf8')).join('');
  const referenced = new Set([...html.matchAll(/assets\/([A-Za-z0-9._@%-]+)/g)].map((m) => `assets/${m[1]}`));
  const keep = new Set([...used, ...referenced].filter((p) => p.startsWith('assets/')).map((p) => p.slice(7)));
  let removed = 0;
  let bytes = 0;
  for (const entry of await readdir(assets)) {
    if (entry === 'manifest.json' || keep.has(entry)) continue;
    const file = path.join(assets, entry);
    bytes += statSync(file).size;
    unlinkSync(file);
    removed++;
  }
  const manifestPath = path.join(assets, 'manifest.json');
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
  for (const key of Object.keys(manifest.assets)) {
    if (!existsSync(path.join(dist, key))) delete manifest.assets[key];
  }
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
  console.log(`\npruned ${removed} unused assets (${(bytes / 1e6).toFixed(0)} MB); ${keep.size} kept`);
}

console.log(problems ? `\n${problems} problem(s)` : '\nall checks passed');
process.exit(problems ? 1 : 0);
