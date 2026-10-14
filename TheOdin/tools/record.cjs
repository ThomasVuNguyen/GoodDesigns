// Drives the live store's interactive controls and records the section responses they fetch, so the
// local shim can replay them: every variant combination, collection sorting and availability filters,
// blog "Load more", and predictive/full search results for the store's vocabulary.
//
// Usage: PLAYWRIGHT=/path/to/node_modules/playwright node TheOdin/tools/record.cjs [products|collections|blog|search]
// Output: TheOdin/.cache/recorded.json (merged with any earlier run)
const fs = require('fs');
const path = require('path');
const { chromium } = require(process.env.PLAYWRIGHT || 'playwright');

const ORIGIN = 'https://the-odin.com';
const OUT = path.join(__dirname, '..', '.cache', 'recorded.json');
const only = process.argv[2];
const pages = fs.readFileSync(path.join(__dirname, 'pages.txt'), 'utf8').split('\n').map((s) => s.trim()).filter(Boolean);
const recorded = new Map(fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')).map((r) => [r.url, r]) : []);
const save = () => fs.writeFileSync(OUT, JSON.stringify([...recorded.values()]));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function listen(page) {
  page.on('response', async (r) => {
    const u = r.url();
    if (!u.startsWith(ORIGIN) || r.request().method() !== 'GET' || r.status() !== 200) return;
    if (!/[?&](section_id|option_values|page)=|\/recommendations\//.test(u)) return;
    try { recorded.set(u, { url: u, ct: r.headers()['content-type'] || '', body: await r.text() }); } catch {}
  });
}

async function open(ctx, p) {
  const page = await ctx.newPage();
  listen(page);
  for (let i = 0; ; i++) {
    try { await page.goto(ORIGIN + p, { waitUntil: 'load', timeout: 90000 }); break; }
    catch (e) { if (i > 4) throw e; await sleep(15000); }
  }
  await page.waitForTimeout(2000);
  return page;
}

async function products(ctx) {
  for (const p of pages.filter((x) => x.startsWith('/products/'))) {
    const page = await open(ctx, p);
    const product = await page.evaluate(async (p) => (await fetch(p + '.js')).json(), p);
    if (product.variants.length < 2) { await page.close(); continue; }
    for (const v of product.variants) {
      for (const [i, value] of v.options.entries()) {
        const done = await page.evaluate(([i, value]) => {
          const picker = document.querySelector('variant-picker');
          const groups = picker ? picker.querySelectorAll('fieldset, .variant-option') : [];
          const group = groups[i];
          if (!group) return 'nogroup';
          const select = group.querySelector('select');
          if (select) {
            const opt = [...select.options].find((o) => o.value === value || o.textContent.trim() === value);
            if (!opt || opt.selected) return 'same';
            select.value = opt.value;
            select.dispatchEvent(new Event('change', { bubbles: true }));
            return 'select';
          }
          const input = [...group.querySelectorAll('input[type=radio]')].find((x) => x.value === value);
          if (!input) return 'noinput';
          if (input.checked) return 'same';
          ((input.id && group.querySelector(`label[for="${input.id}"]`)) || input).click();
          return 'click';
        }, [i, value]);
        if (done !== 'same') await page.waitForTimeout(1800);
        if (done.startsWith('no')) console.log('  ', p, v.title, done);
      }
    }
    console.log(p, product.variants.length, 'variants; recorded', recorded.size);
    save();
    await page.close();
  }
}

async function collections(ctx) {
  for (const p of pages.filter((x) => x.startsWith('/collections/'))) {
    const page = await open(ctx, p);
    const SORT = '.facets--horizontal details[id^="Sorting"]';
    const sorts = await page.evaluate((SORT) => [...document.querySelectorAll(`${SORT} input[type=radio]`)].map((o) => o.value), SORT);
    for (const value of sorts) {
      await page.evaluate(([SORT, value]) => {
        const d = document.querySelector(SORT);
        d.open = true;
        const input = d.querySelector(`input[type=radio][value="${value}"]`);
        if (!input.checked) (input.labels?.[0] || input).click();
      }, [SORT, value]);
      await page.waitForTimeout(2200);
    }
    // availability (and any other checkbox) facets, one at a time, from the default sort
    await page.goto(ORIGIN + p, { waitUntil: 'load' });
    await page.waitForTimeout(1500);
    const boxes = await page.evaluate(() => [...document.querySelectorAll('.facets--horizontal input[type=checkbox]')].map((x) => x.id));
    for (const id of boxes) {
      for (let k = 0; k < 2; k++) {
        await page.evaluate((id) => document.getElementById(id)?.click(), id);
        await page.waitForTimeout(2200);
      }
    }
    console.log(p, sorts.length, 'sorts', boxes.length, 'checkboxes; recorded', recorded.size);
    save();
    await page.close();
  }
}

async function blog(ctx) {
  const page = await open(ctx, '/blogs/blog');
  for (let i = 0; i < 3; i++) {
    const btn = page.locator('button, a', { hasText: /load more/i }).first();
    if (!(await btn.count())) break;
    await btn.scrollIntoViewIfNeeded();
    await btn.click();
    await page.waitForTimeout(2500);
  }
  console.log('blog; recorded', recorded.size);
  save();
  await page.close();
}

async function search(ctx) {
  const page = await open(ctx, '/search');
  const titles = await page.evaluate(async () => {
    const out = [];
    for (const r of ['/products.json?limit=250', '/collections.json?limit=250']) {
      const d = await (await fetch(r)).json();
      for (const x of d.products || d.collections) out.push(x.title, x.product_type || '', ...(x.tags || []), (x.body_html || '').replace(/<[^>]+>/g, ' '));
    }
    out.push(...[...document.querySelectorAll('a')].map((a) => a.textContent));
    return out;
  });
  const extra = (process.env.ODIN_SEARCH_TITLES || '').split('|');
  const words = new Set('abcdefghijklmnopqrstuvwxyz'.split(''));
  for (const t of [...titles, ...extra]) for (const w of t.toLowerCase().match(/[a-z0-9]{2,}/g) || []) if (w.length <= 20) words.add(w);
  words.add('zzqxj');
  const ids = await page.evaluate(() => ({
    predictive: document.querySelector('predictive-search-component')?.dataset.sectionId,
    main: document.querySelector('[id^="shopify-section-template"][id$="__main"]')?.id.replace('shopify-section-', ''),
  }));
  console.log('search sections', ids, words.size, 'terms');
  const grab = async (url) => {
    if (recorded.has(url)) return;
    for (let i = 0; i < 6; i++) {
      const r = await page.evaluate(async (url) => { const r = await fetch(url); return { s: r.status, ct: r.headers.get('content-type'), body: await r.text() }; }, url);
      if (r.s === 200) { recorded.set(url, { url, ct: r.ct, body: r.body }); return; }
      await sleep(5000 * (i + 1));
    }
    console.log('  failed', url);
  };
  for (const w of [...words].sort()) {
    const q = encodeURIComponent(w);
    await grab(`${ORIGIN}/search/suggest?q=${q}&resources%5Blimit_scope%5D=each&section_id=${ids.predictive}`);
    if (ids.main) await grab(`${ORIGIN}/search?q=${q}&section_id=${ids.main}`);
    await sleep(250);
  }
  console.log('search; recorded', recorded.size);
  save();
  await page.close();
}

(async () => {
  const browser = await chromium.launch({ channel: 'chrome' });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  for (const [name, fn] of Object.entries({ products, collections, blog, search })) {
    if (!only || only === name) await fn(ctx);
  }
  await browser.close();
})();
