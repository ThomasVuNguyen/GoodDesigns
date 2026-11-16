// Local stand-ins for the network calls granola.ai makes after load, so the capture runs with no requests off this
// host. Scripts from other hosts never load (Google Tag Manager and everything it adds, iubenda, Tally, Amplitude,
// Facebook, LinkedIn, Bing, ...), the site's own analytics routes answer empty, and beacons are dropped.
//
// The Next.js router fetches React Server Component payloads (?_rsc=...) for client-side navigation and prefetching.
// A static capture has none, so those requests get a plain-text answer: Next.js then loads the target page's HTML
// instead, which is a full page load to the same route.
(function () {
  var base = (document.currentScript && document.currentScript.src.replace(/shim\.js(\?.*)?$/, '')) || '/';
  // The site's own analytics routes, its API, and Vercel BotID's client (a UUID path).
  var ANALYTICS = /\/(_vercel\/|_proxy\/|scripts\/appsflyer|api\/|[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\/)/;
  var classify = function (url) {
    try { var u = new URL(url, location.href); } catch (e) { return null; }
    if (!/^https?:$/.test(u.protocol)) return null;
    if (u.origin !== location.origin) return 'foreign';
    // The /jobs photo wall asks /api/images for its list; the answer recorded on the capture date is served instead.
    if (/\/api\/images$/.test(u.pathname)) return 'images';
    // Forms post to /api/sendEmail. Nothing is sent from the capture: the call fails and the form shows its error.
    if (/\/api\/sendEmail$/.test(u.pathname)) return 'unavailable';
    if (ANALYTICS.test(u.pathname)) return 'analytics';
    if (u.searchParams.has('_rsc')) return 'rsc';
    return null;
  };
  var isRsc = function (init) {
    var h = init && init.headers;
    if (!h) return false;
    if (typeof h.get === 'function') return h.get('RSC') === '1' || h.get('rsc') === '1';
    return h.RSC === '1' || h.rsc === '1';
  };

  var fetch0 = window.fetch.bind(window);
  window.fetch = function (input, init) {
    var url = typeof input === 'string' || input instanceof URL ? String(input) : input.url;
    var kind = classify(url);
    if (kind === 'rsc' || (kind === null && isRsc(init || (input instanceof Request ? { headers: input.headers } : null)))) {
      return Promise.resolve(new Response('', { status: 200, headers: { 'content-type': 'text/plain' } }));
    }
    if (kind === 'images') return fetch0(base + 'api-snapshots/images.json');
    if (kind === 'unavailable') return Promise.resolve(new Response('{"error":"not available in this capture"}', { status: 503, headers: { 'content-type': 'application/json' } }));
    if (kind) return Promise.resolve(new Response('{}', { status: 200, headers: { 'content-type': 'application/json' } }));
    return fetch0(input, init);
  };

  var open0 = XMLHttpRequest.prototype.open, send0 = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.open = function (method, url) {
    this.__kind = classify(url);
    return open0.apply(this, arguments);
  };
  XMLHttpRequest.prototype.send = function () {
    if (!this.__kind) return send0.apply(this, arguments);
    var xhr = this;
    ['readyState', 'status', 'responseText', 'response'].forEach(function (k, i) {
      Object.defineProperty(xhr, k, { configurable: true, value: [4, 200, '{}', '{}'][i] });
    });
    setTimeout(function () {
      ['readystatechange', 'load', 'loadend'].forEach(function (t) { xhr.dispatchEvent(new Event(t)); });
    });
  };

  if (navigator.sendBeacon) navigator.sendBeacon = function () { return true; };

  var blocked = function (url) { var k = classify(url); return k === 'foreign' || k === 'analytics'; };
  // A blocked script keeps type="javascript/blocked" even when its loader sets type afterwards (the iubenda loader
  // sets src first, then type="text/javascript").
  var typeDesc = Object.getOwnPropertyDescriptor(HTMLScriptElement.prototype, 'type');
  Object.defineProperty(HTMLScriptElement.prototype, 'type', {
    configurable: true,
    get: typeDesc.get,
    set: function (v) { return typeDesc.set.call(this, this.__blocked ? 'javascript/blocked' : v); },
  });
  var block = function (script) { script.__blocked = true; typeDesc.set.call(script, 'javascript/blocked'); };
  var srcDesc = Object.getOwnPropertyDescriptor(HTMLScriptElement.prototype, 'src');
  Object.defineProperty(HTMLScriptElement.prototype, 'src', {
    configurable: true,
    get: srcDesc.get,
    set: function (v) { if (blocked(v)) block(this); return srcDesc.set.call(this, v); },
  });
  var setAttr0 = Element.prototype.setAttribute;
  Element.prototype.setAttribute = function (name, value) {
    if (this instanceof HTMLScriptElement && name === 'src' && blocked(value)) block(this);
    if (this instanceof HTMLScriptElement && name === 'type' && this.__blocked) value = 'javascript/blocked';
    if (this instanceof HTMLIFrameElement && name === 'src' && blocked(value)) value = 'about:blank';
    if (this instanceof HTMLLinkElement && name === 'href' && blocked(value)) return;
    return setAttr0.call(this, name, value);
  };
  var iframeDesc = Object.getOwnPropertyDescriptor(HTMLIFrameElement.prototype, 'src');
  Object.defineProperty(HTMLIFrameElement.prototype, 'src', {
    configurable: true,
    get: iframeDesc.get,
    set: function (v) { return iframeDesc.set.call(this, blocked(v) ? 'about:blank' : v); },
  });
  var imgDesc = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src');
  Object.defineProperty(HTMLImageElement.prototype, 'src', {
    configurable: true,
    get: imgDesc.get,
    set: function (v) { return imgDesc.set.call(this, blocked(v) ? 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==' : v); },
  });
})();
