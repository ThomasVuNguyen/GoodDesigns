// Rebuilds PostHog/dist from the live https://posthog.com/ homepage.
//
//   NODE_PATH=<dir containing node_modules/playwright> node capture.mjs
//
// posthog.com is a Gatsby app whose server-rendered HTML already contains the whole homepage, so this script:
//   1. downloads that HTML (the source of truth for markup, copy and the ~640 KB of inlined Tailwind CSS),
//   2. opens the hydrated page once to record what only exists after React runs (header dropdown menus, the cookie toast),
//   3. mirrors every font/image the markup and CSS reference into dist/assets/,
//   4. strips the Gatsby runtime and analytics, and writes dist/index.html + dist/styles.css.
// dist/script.js and dist/vendor/ are hand-written/vendored and are never touched here.
import { createRequire } from 'node:module';
import { createHash } from 'node:crypto';
import { mkdir, writeFile, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const ORIGIN = 'https://posthog.com';
const here = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(here, 'dist');
const assetsDir = path.join(dist, 'assets');

// ---------------------------------------------------------------- asset mirroring
const assets = new Map(); // absolute url -> local path relative to dist/
const usedNames = new Set();
const pending = [];
const EXT_BY_TYPE = { 'image/png': '.png', 'image/jpeg': '.jpg', 'image/webp': '.webp', 'image/avif': '.avif', 'image/svg+xml': '.svg', 'image/gif': '.gif', 'font/woff2': '.woff2', 'font/woff': '.woff' };

function absolute(u) {
  return new URL(u.replace(/&amp;/g, '&'), ORIGIN + '/').href;
}

function localName(url, type) {
  const u = new URL(url);
  let base = decodeURIComponent(u.pathname.split('/').filter(Boolean).pop() || 'file');
  base = base.replace(/[^\w.-]+/g, '_');
  if (!path.extname(base) && EXT_BY_TYPE[type]) base += EXT_BY_TYPE[type];
  let name = base;
  if (usedNames.has(name)) name = `${createHash('sha1').update(url).digest('hex').slice(0, 6)}-${base}`;
  usedNames.add(name);
  return name;
}

// The local filename depends on the response's content type, so callers get a placeholder token that
// resolveTokens() swaps for the real path once every queued download has finished.
const tokens = new Map(); // token -> { url, local }
function mirror(rawUrl) {
  const url = absolute(rawUrl).split('#')[0];
  if (assets.has(url)) return assets.get(url);
  const token = `@@ASSET${assets.size}@@`;
  const entry = { url, local: null };
  assets.set(url, token);
  tokens.set(token, entry);
  pending.push(
    (async () => {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`${res.status} ${url}`);
      const type = (res.headers.get('content-type') || '').split(';')[0];
      const name = localName(url, type);
      await writeFile(path.join(assetsDir, name), Buffer.from(await res.arrayBuffer()));
      entry.local = `assets/${name}`;
    })()
  );
  return token;
}
async function resolveTokens(text) {
  await Promise.all(pending);
  return text.replace(/@@ASSET\d+@@/g, (t) => tokens.get(t).local);
}

const URL_IN_CSS = /url\(\s*(?:"([^"]*)"|'([^']*)'|([^'")\s][^)]*?))\s*\)/g;
function rewriteCssUrls(css) {
  return css.replace(URL_IN_CSS, (whole, dq, sq, bare) => {
    const u = dq ?? sq ?? bare;
    if (u.startsWith('data:') || u.startsWith('#') || u.startsWith('var(')) return whole;
    return `url(${mirror(u)})`;
  });
}

// ---------------------------------------------------------------- hydrated fragments
async function captureHydrated() {
  const browser = await chromium.launch({ channel: 'chrome' });
  const out = { menus: {}, mobileMenu: null, toast: null, hitCounter: null };

  const grabMenus = async (page, triggers, viewportLabel) => {
    for (const label of triggers) {
      const trigger = page.locator('button[role="menuitem"][aria-haspopup="menu"]', { hasText: new RegExp(`^${label}$`) }).first();
      if (!(await trigger.count()) || !(await trigger.isVisible())) continue;
      await trigger.click();
      await page.waitForSelector('[data-radix-popper-content-wrapper] [role="menu"]', { timeout: 5000 });
      await page.waitForTimeout(400);
      const data = await page.evaluate(() => {
        const menu = document.querySelector('[data-radix-popper-content-wrapper] [role="menu"]');
        const rect = menu.getBoundingClientRect();
        return { html: menu.outerHTML, left: rect.left, top: rect.top, width: rect.width };
      });
      const tr = await trigger.boundingBox();
      out[viewportLabel === 'desktop' ? 'menus' : 'mobileMenus'] ??= {};
      (viewportLabel === 'desktop' ? out.menus : out.mobileMenus)[label] = { html: data.html, dx: data.left - tr.x, dy: data.top - (tr.y + tr.height), width: data.width };
      await page.keyboard.press('Escape');
      await page.waitForTimeout(250);
    }
  };

  const desktop = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await desktop.goto(`${ORIGIN}/`, { waitUntil: 'networkidle' });
  await desktop.waitForTimeout(2500);
  out.toast = await desktop.evaluate(() => document.querySelector('[data-radix-toast-viewport]')?.innerHTML ?? null);
  out.hitCounter = await desktop.evaluate(() => {
    const content = document.querySelector('.reader-content-container > .space-y-12');
    const last = content?.lastElementChild;
    return last?.matches('span.inline-flex') && last.querySelectorAll('svg').length >= 7 ? last.outerHTML : null;
  });
  await grabMenus(desktop, ['Products', 'Docs', 'Community', 'Company', 'More'], 'desktop');
  await desktop.close();

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobile.goto(`${ORIGIN}/`, { waitUntil: 'networkidle' });
  await mobile.waitForTimeout(2500);
  const trigger = mobile.locator('button[role="menuitem"][aria-haspopup="menu"]').first();
  if (await trigger.count()) {
    await trigger.click();
    await mobile.waitForSelector('[data-radix-popper-content-wrapper] [role="menu"]', { timeout: 5000 }).catch(() => {});
    await mobile.waitForTimeout(400);
    out.mobileMenu = await mobile.evaluate(() => {
      const menu = document.querySelector('[data-radix-popper-content-wrapper] [role="menu"]');
      return menu ? menu.outerHTML : null;
    });
  }
  await mobile.close();
  await browser.close();
  return out;
}

// ---------------------------------------------------------------- HTML transform
function stripInlineNoise(html) {
  return html
    .replace(/<script\b[\s\S]*?<\/script>/g, '')
    .replace(/<link\b[^>]*\brel="(?:preload|prefetch|preconnect|dns-prefetch|manifest|alternate|canonical|sitemap|search|apple-touch-icon)"[^>]*>/g, '')
    .replace(/<link\b[^>]*\brel="(?:preload|prefetch)"[^>]*>/g, '')
    .replace(/<meta\b[^>]*\b(?:property|name)="(?:og:|twitter:)[^"]*"[^>]*>/g, '')
    .replace(/<meta\b[^>]*name="(?:generator|msapplication[^"]*)"[^>]*>/g, '')
    // <Logo width="auto"> serialises to an invalid SVG length that Chrome logs as an error; omitting it is identical.
    .replace(/(<svg\b[^>]*?) width="auto"/g, '$1');
}

function localizeAttributes(html) {
  // The desktop wallpaper art is lazy-loaded: Gatsby swaps data-src into src at hydration. Promote it now.
  html = html.replace(/<img\b[^>]*\bdata-src="[^"]*"[^>]*>/g, (tag) => tag.replace(' data-src=', ' src=').replace(' loading="lazy"', ''));
  // <img>/<source>/<video> sources and posters, plus <link rel=icon>
  html = html.replace(/\b(src|poster|data-src)="([^"]+)"/g, (whole, attr, value) => {
    if (value.startsWith('data:') || value.startsWith('#')) return whole;
    return `${attr}="${mirror(value)}"`;
  });
  html = html.replace(/<link\b[^>]*\brel="icon"[^>]*>/g, (tag) =>
    tag.replace(/href="([^"]+)"/, (_, href) => `href="${mirror(href)}"`)
  );
  // inline style="…url(…)…"
  html = html.replace(/\bstyle="([^"]*url\([^"]*)"/g, (whole, style) => {
    const decoded = style.replace(/&#x27;/g, "'").replace(/&quot;/g, '"');
    return `style="${rewriteCssUrls(decoded).replace(/"/g, '&quot;')}"`;
  });
  return html;
}

function rewriteLinks(html) {
  return html.replace(/<a\b([^>]*?)\bhref="([^"]*)"([^>]*)>/g, (whole, pre, href, post) => {
    if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return whole;
    let target = href;
    if (href.startsWith('/')) target = href === '/' ? '#top' : ORIGIN + href;
    if (target === '#top') return `<a${pre}href="#top"${post}>`;
    const extra = /\btarget=/.test(pre + post) ? '' : ' target="_blank"';
    const rel = /\brel=/.test(pre + post) ? '' : ' rel="noopener noreferrer"';
    return `<a${pre}href="${target}"${post}${extra}${rel}>`;
  });
}

// Marks the three phrases posthog.com decorates with rough-notation so script.js can redraw them.
function annotate(html) {
  html = html
    .replace('<span class="inline ">analytics, errors, replays, and business data</span>', '<span class="inline " data-annotate="highlight">analytics, errors, replays, and business data</span>')
    .replace('<span class="inline text-secondary">agents</span>', '<span class="inline text-secondary" data-annotate="underline" data-annotate-delay="900">agents</span>')
    .replace('<span class="inline ">for free</span>', '<span class="inline " data-annotate="highlight">for free</span>');
  if ((html.match(/data-annotate=/g) || []).length !== 3) throw new Error('Expected 3 annotation targets in the SSR HTML');
  return html;
}

function template(id, html, extra = '') {
  return `<template id="${id}"${extra}>${html}</template>`;
}

// ---------------------------------------------------------------- main
await rm(dist + '/assets', { recursive: true, force: true });
await mkdir(assetsDir, { recursive: true });

const capturedAt = new Date().toISOString().slice(0, 10);
const res = await fetch(`${ORIGIN}/`);
let html = await res.text();
const title = html.match(/<title[^>]*>([^<]*)<\/title>/)?.[1];
console.log(`Fetched ${html.length} bytes — ${title}`);

const hydrated = await captureHydrated();
console.log(`Hydrated: ${Object.keys(hydrated.menus).length} desktop menus, mobile menu ${hydrated.mobileMenu ? 'yes' : 'no'}, toast ${hydrated.toast ? 'yes' : 'no'}`);

// Stylesheet: the big Gatsby-inlined block becomes styles.css; small critical <style> blocks stay inline.
const styleTag = html.match(/<style data-href="[^"]*" data-identity="gatsby-global-css">([\s\S]*?)<\/style>/);
if (!styleTag) throw new Error('Gatsby global CSS block not found');
let css = rewriteCssUrls(styleTag[1]);
html = html.replace(styleTag[0], '<link rel="stylesheet" href="styles.css">');

html = stripInlineNoise(html);
html = localizeAttributes(html);
html = rewriteLinks(html);
html = annotate(html);
// This illustration is revealed by Gatsby on scroll; keep it visible after removing Gatsby.
html = html.replace('opacity:0;transform:translateY(100%) translateZ(0)', 'opacity:1;transform:translateY(0) translateZ(0)');

// Hydrated-only fragments, shipped as inert <template>s that dist/script.js instantiates on demand.
const fragments = [];
const wrap = (s) => rewriteLinks(localizeAttributes(s));
for (const [label, m] of Object.entries(hydrated.menus)) {
  fragments.push(template(`menu-${label.toLowerCase()}`, wrap(m.html), ` data-dx="${m.dx.toFixed(1)}" data-dy="${m.dy.toFixed(1)}" data-width="${m.width.toFixed(1)}"`));
}
if (hydrated.mobileMenu) fragments.push(template('menu-mobile', wrap(hydrated.mobileMenu)));
if (hydrated.toast) fragments.push(template('cookie-toast', wrap(hydrated.toast)));
if (hydrated.hitCounter) fragments.push(template('hit-counter', hydrated.hitCounter.replace(/ width="auto"/g, '')));
html = html.replace('</body>', `${fragments.join('\n')}\n<script src="vendor/rough-notation.iife.js"></script>\n<script src="script.js"></script>\n</body>`);

css = await resolveTokens(css);
html = await resolveTokens(html);
await writeFile(path.join(dist, 'styles.css'), css);
await writeFile(path.join(dist, 'index.html'), html);

const manifest = Object.fromEntries([...tokens.values()].map((e) => [e.local, e.url]));
await writeFile(path.join(assetsDir, 'manifest.json'), JSON.stringify({ capturedAt, source: `${ORIGIN}/`, files: manifest }, null, 2));
console.log(`Wrote index.html (${html.length}), styles.css (${css.length}), ${Object.keys(manifest).length} assets — ${capturedAt}`);
