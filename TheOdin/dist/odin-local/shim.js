/*
 * Local stand-in for the Shopify storefront endpoints the Horizon theme calls after page load.
 * Loaded first (classic script) so every theme module sees the patched fetch.
 *
 *  - Section rendering (?section_id=…) is answered from recorded responses (variants, recommendations,
 *    predictive search, sorting/filters, pagination), else cut from the matching local page.
 *  - /cart/* is a small cart emulator kept in localStorage; drawer and cart-page markup are assembled
 *    from per-variant line templates recorded from the live store (odin-local/cart/).
 *  - Analytics and other third-party calls resolve to empty responses.
 */
(() => {
  const BASE = new URL('..', document.currentScript.src).pathname.replace(/\/$/, '');
  const nativeFetch = window.fetch.bind(window);
  // Root paths are spelled P('x') so the gallery build's path rewriter leaves them alone.
  const P = (s) => '/' + s;
  const local = (p) => BASE + p;
  const strip = (p) => (BASE && p.startsWith(BASE) ? p.slice(BASE.length) || '/' : p);
  // Markup that arrives inside JSON is not touched by the gallery build, so prefix its root paths here.
  const fixPaths = (s) => (BASE ? s.replace(/(["'(=,\s])\/(cdn|products|collections|pages|blogs|cart|search|odin-local)(?=[/"'?#)\s\\]|$)/g, '$1' + BASE + '/$2') : s);
  const html = (body, status = 200) => new Response(body, { status, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
  const json = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

  // ------------------------------------------------------------ routes and keys
  const enc = (s) => encodeURIComponent(s).replace(/%20/g, '+').replace(/[!'()*~]/g, (c) => '%' + c.charCodeAt(0).toString(16).toUpperCase()).replace(/%7E/g, '~');
  function normPath(path) {
    return strip(path).replace(/^\/collections\/[^/]+\/products\//, P('products/')).replace(/\/+$/, '') || '/';
  }
  function replayKey(url) {
    const pairs = [...url.searchParams].filter(([k]) => k !== '_' && k !== 'v');
    pairs.sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : a[1] < b[1] ? -1 : a[1] > b[1] ? 1 : 0));
    const q = pairs.map(([k, v]) => enc(k) + '=' + enc(v)).join('&');
    return normPath(url.pathname) + (q ? '?' + q : '');
  }
  function pageFile(path, params) {
    let route = normPath(path).replace(/\/page-\d+$/, '');
    const page = params && params.get('page');
    if (page && page !== '1') route += '/page-' + page;
    return local(route === '/' ? '/' : route + '/');
  }

  let indexPromise;
  const replayIndex = () => (indexPromise ??= nativeFetch(local(P('odin-local/replay/index.json'))).then((r) => r.json()).catch(() => ({})));
  const replayFile = (entry) => nativeFetch(local(P('odin-local/replay/') + entry.file));

  const pageCache = new Map();
  function pageDoc(file) {
    if (!pageCache.has(file)) {
      pageCache.set(file, nativeFetch(file).then((r) => (r.ok ? r.text() : '')).then((t) => new DOMParser().parseFromString(t, 'text/html')));
    }
    return pageCache.get(file);
  }
  async function sectionFromPage(url, sectionId) {
    const doc = await pageDoc(pageFile(url.pathname, url.searchParams));
    const el = doc.getElementById('shopify-section-' + sectionId);
    return el ? el.outerHTML : '';
  }

  // ------------------------------------------------------------ predictive search
  // Search responses were recorded for every word in the store's vocabulary; answer a typed query with the
  // closest recorded term (Shopify matches the last word as a prefix) and swap the echoed term back in.
  async function searchByTerm(url, index) {
    const q = (url.searchParams.get('q') || '').trim().toLowerCase();
    const sid = url.searchParams.get('section_id');
    const route = normPath(url.pathname);
    const candidates = Object.keys(index)
      .filter((k) => k.startsWith(route + '?') && k.includes('section_id=' + enc(sid)))
      .map((k) => ({ k, term: new URLSearchParams(k.split('?')[1]).get('q') }))
      .filter((c) => c.term && !c.term.startsWith('id:'));
    if (!candidates.length) return null;
    const forWord = (w) =>
      candidates.filter((c) => c.term.startsWith(w)).sort((a, b) => a.term.length - b.term.length)[0] ||
      candidates.filter((c) => w.startsWith(c.term)).sort((a, b) => b.term.length - a.term.length)[0];
    let pick = candidates.find((c) => c.term === q);
    if (!pick) {
      // Several words: Shopify returns the broader match set, so keep the largest recorded response.
      const words = q.split(/\s+/).filter(Boolean).map(forWord);
      if (words.length && words.every(Boolean)) {
        const sized = await Promise.all(words.map(async (c) => ({ c, n: (await (await replayFile(index[c.k])).text()).length })));
        pick = sized.sort((a, b) => b.n - a.n)[0].c;
      }
    }
    pick ||= candidates.find((c) => c.term === 'zzqxj') || (candidates.length === 1 ? candidates[0] : null);
    if (!pick) return html('');
    let body = await (await replayFile(index[pick.k])).text();
    const typed = url.searchParams.get('q') || '';
    const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
    body = body.replaceAll('__ODIN_QU__', enc(typed)).replaceAll('__ODIN_QH__', esc(typed));
    return html(q.includes(' ') ? rankByWords(body, q.split(/\s+/)) : body);
  }

  // Multi-word queries reuse one word's recording; float the results that mention more of the words.
  function rankByWords(markup, words) {
    const doc = new DOMParser().parseFromString(markup, 'text/html');
    const items = [...doc.querySelectorAll('.product-grid__item, [ref="resultsItems[]"]')];
    const score = (el) => words.filter((w) => el.textContent.toLowerCase().includes(w)).length;
    const groups = new Map();
    items.forEach((el, i) => { const p = el.parentElement; if (!groups.has(p)) groups.set(p, []); groups.get(p).push({ el, i, s: score(el) }); });
    for (const [parent, list] of groups) list.sort((a, b) => b.s - a.s || a.i - b.i).forEach(({ el }) => parent.appendChild(el));
    return doc.body.innerHTML;
  }

  // ------------------------------------------------------------ section requests
  async function sectionRequest(url) {
    const index = await replayIndex();
    const key = replayKey(url);
    if (index[key]) return replayFile(index[key]);
    const path = normPath(url.pathname);
    if ((path === P('search/suggest') || path === P('search')) && url.searchParams.get('q') && !url.searchParams.get('q').startsWith('id:')) {
      const found = await searchByTerm(url, index);
      if (found) return found;
    }
    const sid = url.searchParams.get('section_id');
    // Unrecorded filter/sort combinations: drop the most specific parameters until a recording matches.
    const params = [...url.searchParams.keys()].filter((k) => k !== 'section_id');
    const order = (k) => (k.startsWith('filter.v.price') ? 0 : k.startsWith('filter.') ? 1 : k === 'sort_by' ? 2 : 3);
    const trimmed = new URL(url);
    for (const k of params.sort((a, b) => order(a) - order(b))) {
      if (k === 'page' || k === 'option_values') continue;
      trimmed.searchParams.delete(k);
      const hit = index[replayKey(trimmed)];
      if (hit) return replayFile(hit);
    }
    if (path === P('search') && url.searchParams.get('q')?.startsWith('id:')) return html('');
    const fromPage = await sectionFromPage(url, sid);
    if (fromPage) return html(fromPage);
    // Sections that only exist in rendering responses (e.g. predictive-search-empty): reuse any recording.
    const any = Object.keys(index).find((k) => new URLSearchParams(k.split('?')[1] || '').get('section_id') === sid);
    return any ? replayFile(index[any]) : html('');
  }

  // ------------------------------------------------------------ cart emulator
  const CART_KEY = 'odin-local-cart';
  const DRAWER = 'cart-drawer-section';
  const CART_PAGE = 'template--21672899575943__cart-section';
  const readCart = () => { try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch { return []; } };
  const writeCart = (lines) => { try { localStorage.setItem(CART_KEY, JSON.stringify(lines)); } catch {} };
  const templates = new Map();
  const template = (name) => {
    if (!templates.has(name)) templates.set(name, nativeFetch(local(P(`odin-local/cart/${name}.json`))).then((r) => (r.ok ? r.text() : 'null')).then((t) => JSON.parse(fixPaths(t))));
    return templates.get(name);
  };
  const money = (cents, code = true) => '$' + (cents / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + (code ? ' USD' : '');

  async function cartJSON(lines = readCart()) {
    const items = [];
    for (const line of lines) {
      const t = await template(line.id);
      if (!t) continue;
      const item = { ...t.items[0] };
      item.quantity = line.quantity;
      for (const f of ['line_price', 'original_line_price', 'final_line_price']) item[f] = item.price * line.quantity;
      items.push(item);
    }
    const total = items.reduce((s, i) => s + i.final_line_price, 0);
    const empty = (await template('empty')) || {};
    return {
      ...empty, sections: undefined, items, item_count: items.reduce((s, i) => s + i.quantity, 0),
      total_price: total, original_total_price: total, items_subtotal_price: total,
      requires_shipping: items.some((i) => i.requires_shipping),
    };
  }

  function rowsOf(sectionHTML) {
    const doc = new DOMParser().parseFromString(sectionHTML, 'text/html');
    return [...doc.querySelectorAll('tr[ref="cartItemRows[]"]')];
  }

  async function renderSection(id, lines) {
    if (!lines.length) return (await template('empty'))?.sections?.[id] ?? null;
    const first = await template(lines[0].id);
    if (!first?.sections?.[id]) return null;
    const doc = new DOMParser().parseFromString(first.sections[id], 'text/html');
    const anchor = doc.querySelector('tr[ref="cartItemRows[]"]');
    if (!anchor) return first.sections[id];
    const tbody = anchor.parentElement;
    tbody.querySelectorAll('tr[ref="cartItemRows[]"]').forEach((r) => r.remove());
    let total = 0;
    let count = 0;
    for (const [i, line] of lines.entries()) {
      const t = await template(line.id);
      const row = t && rowsOf(t.sections[id] || '')[0];
      if (!row) continue;
      const unit = t.items[0].price;
      total += unit * line.quantity;
      count += line.quantity;
      let markup = row.outerHTML
        .replace(/data-cart-line="1"/g, `data-cart-line="${i + 1}"`)
        .replace(/(cartItemError(?:Container)?)-1/g, (_, a) => `${a}-${i + 1}`)
        .replace(/data-cart-quantity="1"/g, `data-cart-quantity="${line.quantity}"`)
        .replace(/(<input[^>]*name="updates\[\]"[^>]*value=")1"/g, (_, a) => `${a}${line.quantity}"`)
        .replace(/(<input[^>]*value=")1("[^>]*name="updates\[\]")/g, (_, a, b) => `${a}${line.quantity}${b}`)
        .replace(/line=1&/g, `line=${i + 1}&`);
      const lineTotal = money(unit * line.quantity);
      // function replacement: the "$" in prices must not be read as a backreference
      markup = markup.replace(/(cart-items__price[\s\S]*?<text-component value=")[^"]*(">)[^<]*(<\/text-component>)/, (_, a, b, c) => a + lineTotal + b + lineTotal + c);
      tbody.insertAdjacentHTML('beforeend', markup);
    }
    for (const terms of doc.querySelectorAll('shopify-payment-terms')) {
      try {
        const meta = JSON.parse(terms.getAttribute('shopify-meta'));
        meta.full_price_amount = total / 100;
        terms.setAttribute('shopify-meta', JSON.stringify(meta));
      } catch {}
    }
    let out = doc.body.innerHTML;
    const firstTotal = money(first.total_price);
    out = out.split(firstTotal).join(money(total));
    out = out.replace(/(ref="cartItemCount"[^>]*>)\s*\d+\s*</, (_, a) => `${a}${count}<`);
    out = out.replace(/(cart-bubble__text-count[^>]*>)\s*\d+\s*</g, (_, a) => `${a}${count}<`);
    out = out.replace(/(theme-drawer__badge[^>]*>)\s*\d+\s*</g, (_, a) => `${a}${count}<`);
    return out;
  }

  async function sectionsFor(ids, lines) {
    const out = {};
    for (const id of String(ids || '').split(',').map((s) => s.trim()).filter(Boolean)) {
      const rendered = await renderSection(id, lines);
      if (rendered != null) out[id] = rendered;
    }
    return out;
  }

  async function readBody(init, req) {
    const body = init?.body ?? (req ? await req.clone().text() : null);
    if (body instanceof FormData) return Object.fromEntries([...body.keys()].map((k) => [k, body.getAll(k).length > 1 ? body.getAll(k) : body.get(k)]));
    if (body instanceof URLSearchParams) return Object.fromEntries(body);
    if (typeof body === 'string') { try { return JSON.parse(body); } catch { return Object.fromEntries(new URLSearchParams(body)); } }
    return {};
  }

  async function cartRequest(path, method, init, req) {
    const op = path.replace(/^\/cart\/?/, '').replace(/\.(js|json)$/, '');
    let lines = readCart();
    if (method === 'GET' && (op === '' || op === 'cart')) return json(await cartJSON(lines));
    const body = await readBody(init, req);
    const sectionIds = Array.isArray(body.sections) ? body.sections.join(',') : body.sections;
    if (op === 'add') {
      const adds = body.items || [{ id: body.id, quantity: body.quantity }];
      const added = [];
      for (const a of adds) {
        const id = String(a.id);
        if (!(await template(id))) return json({ status: 422, message: 'Cart Error', description: 'This item is not available in the local copy.' }, 422);
        const qty = Number(a.quantity) || 1;
        const existing = lines.find((l) => l.id === id);
        if (existing) existing.quantity += qty; else lines.push({ id, quantity: qty });
        added.push(id);
      }
      writeCart(lines);
      const cart = await cartJSON(lines);
      const items = cart.items.filter((i) => added.includes(String(i.variant_id)));
      const sections = await sectionsFor(sectionIds, lines);
      return json(body.items ? { items, sections } : { ...items[0], sections });
    }
    if (op === 'change') {
      const idx = body.line ? Number(body.line) - 1 : lines.findIndex((l) => body.id && (String(body.id).startsWith(l.id + ':') || String(body.id) === l.id));
      if (idx >= 0 && lines[idx]) {
        const q = Number(body.quantity);
        if (q > 0) lines[idx].quantity = q; else lines.splice(idx, 1);
      }
    } else if (op === 'update') {
      const updates = body.updates || {};
      if (Array.isArray(updates)) updates.forEach((q, i) => lines[i] && (lines[i].quantity = Number(q)));
      else for (const [k, q] of Object.entries(updates)) { const l = lines.find((x) => String(k).startsWith(x.id)); if (l) l.quantity = Number(q); }
      lines = lines.filter((l) => l.quantity > 0);
    } else if (op === 'clear') {
      lines = [];
    }
    writeCart(lines);
    const cart = await cartJSON(lines);
    cart.sections = await sectionsFor(sectionIds, lines);
    return json(cart);
  }

  // ------------------------------------------------------------ fetch patch
  // Other origins get an empty answer, except the gallery's own analytics (Rybbit).
  const ANALYTICS = /^rybbit\.beenex\.org$/;
  window.fetch = async function (input, init = {}) {
    const req = input instanceof Request ? input : null;
    const url = new URL(req ? req.url : String(input), location.href);
    const method = String(init.method || req?.method || 'GET').toUpperCase();
    if (url.origin !== location.origin) return ANALYTICS.test(url.hostname) ? nativeFetch(input, init) : json({}, 200);
    const path = strip(url.pathname);
    if (/^\/(odin-local|cdn)\//.test(path) || /\.(css|js|json|svg|png|jpe?g|webp|woff2?)$/.test(path) && !/^\/(cart|products)/.test(path)) return nativeFetch(input, init);
    if (/^\/cart(\/[a-z]|\.js|\.json)/.test(path) || (/^\/cart\/?$/.test(path) && method !== 'GET')) return cartRequest(path, method, init, req);
    if (/^\/(api|\.well-known|web-pixels|checkouts?|shopify_pay|services|recommendations\/products\.json)/.test(path)) return json({});
    if (method !== 'GET') return json({});
    if (url.searchParams.has('section_id') || url.searchParams.has('option_values') || path.startsWith(P('recommendations')) || path === P('search/suggest')) {
      const index = await replayIndex();
      const hit = index[replayKey(url)];
      if (hit) return replayFile(hit);
      if (url.searchParams.has('section_id')) return sectionRequest(url);
      return nativeFetch(pageFile(url.pathname, url.searchParams), init);
    }
    if (url.search) {
      const hit = (await replayIndex())[replayKey(url)];
      if (hit) return replayFile(hit);
    }
    return nativeFetch(pageFile(url.pathname, url.searchParams), init);
  };
  const nativeBeacon = navigator.sendBeacon && navigator.sendBeacon.bind(navigator);
  navigator.sendBeacon = (url, data) => (nativeBeacon && ANALYTICS.test(new URL(url, location.href).hostname) ? nativeBeacon(url, data) : true);

  // ------------------------------------------------------------ restore the emulated cart on load
  const lines = readCart();
  const count = lines.reduce((s, l) => s + l.quantity, 0);
  try { sessionStorage.setItem('cart-count', JSON.stringify({ value: String(count), timestamp: Date.now() })); } catch {}
  if (lines.length) {
    const ready = Promise.all([renderSection(DRAWER, lines), renderSection(CART_PAGE, lines)]);
    document.addEventListener('DOMContentLoaded', async () => {
      const [drawer, page] = await ready;
      const swap = (id, markup) => {
        const el = document.getElementById('shopify-section-' + id);
        if (el && markup) el.outerHTML = markup;
      };
      swap(DRAWER, drawer);
      swap(CART_PAGE, page);
    });
  }

  // /search?q=… is a static page here: fill its results section from the recorded search responses.
  const SEARCH_SECTIONS = ['template--21672899707015__search', 'template--21672899707015__main'];
  const here = new URL(location.href);
  if (normPath(here.pathname) === P('search') && here.searchParams.get('q')) {
    const rendered = SEARCH_SECTIONS.map((id) => {
      const u = new URL(here);
      u.searchParams.set('section_id', id);
      return sectionRequest(u).then((r) => r.text());
    });
    document.addEventListener('DOMContentLoaded', async () => {
      const markups = await Promise.all(rendered);
      SEARCH_SECTIONS.forEach((id, i) => {
        const el = document.getElementById('shopify-section-' + id);
        if (el && markups[i]) el.outerHTML = markups[i];
      });
    });
  }

  // Express checkout buttons are drawn by Shopify's wallet runtime; paint its skeletons as static buttons.
  const WALLET_LOGOS = { shop_pay: 'shop-logo.svg', paypal: 'paypal-blue.svg', google_pay: 'google-pay-logo-dark.svg' };
  function paintWallets() {
    for (const host of document.querySelectorAll('shopify-accelerated-checkout-cart, shopify-accelerated-checkout')) {
      let names = [];
      try { names = JSON.parse(host.getAttribute('wallet-configs') || '[]').map((w) => w.name); } catch {}
      host.querySelectorAll('.wallet-cart-button__skeleton, .shopify-payment-button__skeleton').forEach((el, i) => {
        const name = names[i];
        if (!WALLET_LOGOS[name]) return;
        el.className = `wallet-cart-button odin-wallet odin-wallet--${name}`;
        el.removeAttribute('aria-hidden');
        el.setAttribute('aria-label', name.replace('_', ' '));
        el.innerHTML = `<img src="${local(P('odin-local/wallets/') + WALLET_LOGOS[name])}" alt="">`;
      });
    }
  }
  document.addEventListener('DOMContentLoaded', () => {
    paintWallets();
    new MutationObserver(paintWallets).observe(document.body, { childList: true, subtree: true });
  });

  // Shop Pay installments line ("4 interest-free installments, or from $X/mo with shop").
  const SHOP_SVG = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 60 25" role="img" style="height:14px;width:34px;vertical-align:middle;color:#5a31f4"><title>Shop</title><path fill="currentColor" d="M7.74 11.067c-2.35-.509-3.396-.708-3.396-1.612 0-.85.708-1.274 2.125-1.274 1.246 0 2.157.544 2.828 1.609.05.082.155.11.24.066l2.644-1.334a.186.186 0 0 0 .076-.259c-1.098-1.9-3.125-2.94-5.794-2.94-3.507 0-5.686 1.727-5.686 4.470 0 2.914 2.653 3.650 5.006 4.160 2.353.509 3.403.708 3.403 1.612 0 .904-.765 1.330-2.293 1.330-1.410 0-2.457-.644-3.090-1.896a.185.185 0 0 0-.250-.082L.916 16.222a.188.188 0 0 0-.082.253c1.046 2.102 3.194 3.284 6.062 3.284 3.653 0 5.860-1.697 5.860-4.526 0-2.830-2.666-3.650-5.015-4.160v-.006ZM21.909 5.324c-1.500 0-2.824.530-3.776 1.476a.093.093 0 0 1-.158-.067V.700a.185.185 0 0 0-.187-.186H14.480a.185.185 0 0 0-.187.186v18.728c0 .105.083.187.187.187h3.308a.185.185 0 0 0 .187-.187v-8.215c0-1.586 1.217-2.803 2.859-2.803 1.641 0 2.830 1.191 2.830 2.803v8.215c0 .105.082.187.187.187h3.308a.185.185 0 0 0 .186-.187v-8.215c0-3.451-2.264-5.888-5.436-5.888ZM34.056 4.786c-1.796 0-3.478.550-4.687 1.344a.187.187 0 0 0-.060.250l1.458 2.487c.054.089.168.120.256.066a5.812 5.812 0 0 1 3.040-.834c2.887 0 5.010 2.035 5.010 4.725 0 2.292-1.700 3.990-3.853 3.990-1.755 0-2.973-1.022-2.973-2.463 0-.825.351-1.501 1.265-1.979a.183.183 0 0 0 .073-.259L32.210 9.787a.186.186 0 0 0-.224-.080c-1.844.683-3.137 2.327-3.137 4.533 0 3.338 2.660 5.829 6.369 5.829 4.333 0 7.448-3 7.448-7.302 0-4.611-3.624-7.980-8.609-7.980ZM52.342 5.295c-1.673 0-3.169.620-4.260 1.707a.092.092 0 0 1-.158-.066V5.627a.185.185 0 0 0-.186-.186h-3.223a.185.185 0 0 0-.187.186v18.700c0 .104.082.186.187.186h3.308a.185.185 0 0 0 .187-.187v-6.131c0-.083.098-.124.158-.070 1.088 1.012 2.527 1.602 4.174 1.602 3.880 0 6.907-3.138 6.907-7.216 0-4.077-3.030-7.216-6.907-7.216Zm-.626 11.265c-2.207 0-3.880-1.754-3.880-4.074s1.670-4.074 3.880-4.074 3.877 1.726 3.877 4.074c0 2.349-1.644 4.074-3.880 4.074h.003Z"/></svg>';
  const HELP_SVG = '<svg aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" style="width:20px;height:20px;vertical-align:middle"><path fill-rule="evenodd" d="M10 7.25c-.69 0-1.25.56-1.25 1.25a.75.75 0 0 1-1.5 0 2.75 2.75 0 1 1 3.758 2.56.61.61 0 0 0-.226.147.154.154 0 0 0-.032.046.75.75 0 0 1-1.5-.003c0-.865.696-1.385 1.208-1.586A1.25 1.25 0 0 0 10 7.25Z"/><path d="M10 14.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"/><path fill-rule="evenodd" d="M10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm0-1.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z"/></svg>';
  class PaymentTerms extends HTMLElement {
    static observedAttributes = ['shopify-meta'];
    connectedCallback() { this.render(); }
    attributeChangedCallback() { this.render(); }
    render() {
      let meta;
      try { meta = JSON.parse(this.getAttribute('shopify-meta')); } catch { return; }
      const root = this.shadowRoot || this.attachShadow({ mode: 'open' });
      const price = meta.full_price_amount;
      const plan = (meta.financing_plans || []).find((p) => price >= p.min_price_amount && price <= p.max_price_amount);
      if (!meta.eligible || !plan) { root.innerHTML = ''; return; }
      const fmt = (n) => '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      const interest = plan.terms.filter((t) => t.loan_type === 'interest').sort((a, b) => b.installments_count - a.installments_count)[0];
      const split = plan.terms.filter((t) => t.loan_type === 'split_pay').sort((a, b) => b.installments_count - a.installments_count)[0];
      let text;
      if (interest) {
        const r = interest.apr / 100 / 12;
        const n = interest.installments_count;
        const monthly = r ? (price * r) / (1 - Math.pow(1 + r, -n)) : price / n;
        text = `${split ? split.installments_count + ' interest-free installments, or from' : 'From'} <b>${fmt(monthly)}</b>/mo with ${SHOP_SVG}`;
      } else {
        text = `Pay in ${split.installments_count} interest-free installments of <b>${fmt(price / split.installments_count)}</b> with ${SHOP_SVG}`;
      }
      root.innerHTML = `<style>p{margin:0}b{font-weight:700}button{margin:0;border:0;background:none;padding:2px;font:inherit;color:inherit;cursor:default}</style><p>${text}<button type="button" aria-label="View sample plans">${HELP_SVG}</button></p>`;
    }
  }
  customElements.get('shopify-payment-terms') || customElements.define('shopify-payment-terms', PaymentTerms);

  // Theme links built at runtime (search, view-all) are root-relative; keep them inside the gallery path.
  if (BASE) {
    document.addEventListener('click', (e) => {
      const a = e.target.closest?.('a[href^="/"]');
      if (a && !a.getAttribute('href').startsWith(BASE + '/')) a.setAttribute('href', BASE + a.getAttribute('href'));
    }, true);
  }
})();
