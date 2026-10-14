// Visits every page in pages.txt on the live store with Chrome and records what the server HTML alone
// does not contain: assets requested at runtime, stylesheets injected by apps, the rendered Judge.me
// review widgets, and the same-origin section/JSON responses the theme fetches after load.
//
// Usage: PLAYWRIGHT=/path/to/node_modules/playwright node TheOdin/tools/snapshot.cjs [path-filter]
// Output: TheOdin/.cache/snapshot/<page-key>.json
const fs = require('fs');
const path = require('path');
const { chromium } = require(process.env.PLAYWRIGHT || 'playwright');

const ORIGIN = 'https://the-odin.com';
const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, '.cache', 'snapshot');
const filter = process.argv[2];
const pages = fs.readFileSync(path.join(__dirname, 'pages.txt'), 'utf8').split('\n').map((s) => s.trim()).filter(Boolean)
  .filter((p) => !filter || p.includes(filter));

const NOISE = /monorail|\/api\/collect|otlp|error-analytics|\/\.well-known|web-pixels|\/wpm\/|graphql\.json|shopify_pay|checkouts\/internal|checkout-web|trekkie|shop\.app|chimpstatic|intuit\.com|judge\.me\/|tracking\./;

const key = (p) => (p === '/' ? 'home' : p.replace(/^\//, '').replace(/[/?=&]/g, '__'));

async function scrollThrough(page) {
  const H = await page.evaluate(() => (document.querySelector('.page-wrapper') || document.scrollingElement).scrollHeight);
  for (let y = 0; y < H + 900; y += 450) {
    await page.evaluate((y) => (document.querySelector('.page-wrapper') || document.scrollingElement).scrollTo(0, y), y);
    await page.waitForTimeout(110);
  }
  await page.evaluate(() => (document.querySelector('.page-wrapper') || document.scrollingElement).scrollTo(0, 0));
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch({ channel: 'chrome' });
  for (const p of pages) {
    for (const vp of [{ width: 1280, height: 900 }, { width: 390, height: 844, mobile: true }]) {
      const file = path.join(OUT, `${key(p)}${vp.mobile ? '.m' : ''}.json`);
      if (fs.existsSync(file) && !process.env.FORCE) continue;
      const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, isMobile: !!vp.mobile, hasTouch: !!vp.mobile });
      const page = await ctx.newPage();
      const assets = new Set();
      const replays = [];
      page.on('response', async (r) => {
        const u = r.url();
        if (NOISE.test(u) || !u.startsWith('http') || r.status() >= 400) return;
        const t = r.request().resourceType();
        if ((t === 'fetch' || t === 'xhr') && u.startsWith(ORIGIN) && r.request().method() === 'GET') {
          try { replays.push({ url: u, ct: r.headers()['content-type'] || '', body: await r.text() }); } catch {}
        } else if (t !== 'document') assets.add(u);
      });
      for (let attempt = 0; ; attempt++) {
        try { await page.goto(ORIGIN + p, { waitUntil: 'load', timeout: 90000 }); break; }
        catch (e) { if (attempt > 4) throw e; console.log('retry', p, e.message.slice(0, 80)); await page.waitForTimeout(15000); }
      }
      await page.waitForTimeout(1500);
      await scrollThrough(page);
      await page.waitForTimeout(2500);
      const dom = await page.evaluate(() => {
        const head = [...document.querySelectorAll('style, link[rel=stylesheet]')].filter((e) => !e.closest('.shopify-block')).map((e) => e.outerHTML);
        const islands = {};
        for (const el of document.querySelectorAll('.shopify-block[id]')) {
          if (/jdgm|judge_me/.test(el.className + ' ' + el.id)) islands[el.id] = el.outerHTML;
        }
        return { head, islands };
      });
      const data = { path: p, viewport: vp, assets: [...assets].sort(), replays, ...dom };
      fs.writeFileSync(file, JSON.stringify(data));
      console.log(`${p} ${vp.width}: ${assets.size} assets, ${replays.length} replays, ${Object.keys(dom.islands).length} islands`);
      await ctx.close();
    }
  }
  await browser.close();
})();
