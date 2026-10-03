// Snapshots the HubSpot newsletter form HubSpot injects into the footer, so the clone needs no runtime HubSpot script.
// Needs playwright + Chrome: node Plasmidsaurus/tools/snapshot-form.mjs  -> writes newsletter-form.{html,css} next to this file.
import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';
const b = await chromium.launch({ channel: 'chrome' });
const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
await p.goto('https://plasmidsaurus.com/', { waitUntil: 'load' });
await p.waitForSelector('.hs-form-html form', { timeout: 15000 });
const { html, css } = await p.evaluate(() => {
  const host = document.querySelector('.hs-form-html');
  const clone = host.cloneNode(true);
  clone.querySelectorAll('script').forEach((s) => s.remove());
  const css = [...document.querySelectorAll('style[data-hsfc-id]')].map((s) => s.textContent).join('\n');
  return { html: clone.innerHTML, css };
});
const dir = new URL('.', import.meta.url).pathname;
writeFileSync(dir + 'newsletter-form.html', html);
writeFileSync(dir + 'newsletter-form.css', css);
console.log(html.length, css.length);
await b.close();
