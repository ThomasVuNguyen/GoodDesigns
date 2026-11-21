// Local stand-ins for the network calls notion.com makes after load, so the capture runs with no requests off this
// host. Scripts from other hosts never load (Transcend's cookie banner, Google sign-in, Vercel Speed Insights, ...),
// requests to other hosts (Sentry, Splunk, the experiments service, the app's session check) answer empty, and
// beacons are dropped.
//
// /front-api answers come from recordings under api-snapshots/. The Pages Router fetches /_next/data/<build>/<route>.json
// for client-side navigation and prefetching; a static capture has none, so those requests get a 404 and Next.js
// loads the target page's HTML instead, which is a full page load to the same route.
(function () {
  var base = (document.currentScript && document.currentScript.src.replace(/shim\.js(\?.*)?$/, '')) || '/';
  var classify = function (url) {
    try { var u = new URL(url, location.href); } catch (e) { return null; }
    if (!/^https?:$/.test(u.protocol)) return null;
    // The template search box asks the app for results; the answer recorded for an empty query is served.
    if (u.host === 'app.notion.com' && /^\/api\/v3\/getTemplateSearchResults$/.test(u.pathname)) return 'app-api';
    if (u.origin !== location.origin) return 'foreign';
    // Survey embeds (/embed/help/sprig-survey) are not part of the site.
    if (/\/embed\//.test(u.pathname)) return 'analytics';
    if (/\/front-api\//.test(u.pathname)) return 'api';
    if (/\/_next\/data\//.test(u.pathname)) return 'data';
    if (/\/(_vercel|api)\//.test(u.pathname)) return 'analytics';
    return null;
  };
  var json = function (body, status) {
    return new Response(body, { status: status || 200, headers: { 'content-type': 'application/json' } });
  };

  var fetch0 = window.fetch.bind(window);
  window.fetch = function (input, init) {
    var url = typeof input === 'string' || input instanceof URL ? String(input) : input.url;
    var kind = classify(url);
    if (kind === 'api') {
      var path = new URL(url, location.href).pathname.replace(/^.*\/front-api\//, '');
      return fetch0(base + 'api-snapshots/' + path + '.json').then(function (r) {
        return r.ok ? r : json('{}', 404);
      });
    }
    if (kind === 'app-api') {
      return fetch0(base + 'api-snapshots/app-api/' + new URL(url).pathname.split('/').pop() + '.json');
    }
    // An empty 404 (not a {"notFound":true} body, which would render the 404 page) makes the router load the page.
    if (kind === 'data') return Promise.resolve(new Response('', { status: 404 }));
    if (kind) return Promise.resolve(json('{}'));
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

  // Some links are rebuilt after load (the header's "Log in" becomes /login?from=marketing&pathname=...), so the
  // capture's rewrite of uncaptured routes to the live site does not reach them. A click on one goes to notion.com:
  // the app, the template marketplace and the translated sites.
  var LIVE = /^\/((login|signup|logout|loginwithemail|loginpasswordreset|startups-apply|privacy-center-redirect|aimn-mobile|invite|community)(\/.*)?|templates\/.+|@[^/]+|(ar|da|de|en-gb|en-us|es|es-es|fi|fr|he|id|it|ja|ko|nb|nl|pt|sv|th|vi|zh-cn|zh-tw)(\/.*)?)$/i;
  var root = new URL(base, location.href).pathname;
  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    var u = new URL(a.href, location.href);
    if (u.origin !== location.origin) return;
    // Under the gallery's /sites/notion/ prefix, links built at runtime can still be root-relative.
    var path = u.pathname.indexOf(root) === 0 ? '/' + u.pathname.slice(root.length) : u.pathname;
    if (!LIVE.test(path)) return;
    a.href = 'https://www.notion.com' + path + u.search + u.hash;
    e.stopPropagation(); // the router would load the local route; the browser follows the new href instead
  }, true);

  var blocked = function (url) { var k = classify(url); return k === 'foreign' || k === 'analytics'; };
  // Embedded players inside page content (YouTube) stay live, as they are on the reference.
  var embed = function (url) { return /^https:\/\/(www\.)?(youtube(-nocookie)?\.com|player\.vimeo\.com|fast\.wistia\.(net|com)|www\.loom\.com)\//.test(url); };
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
    if (this instanceof HTMLIFrameElement && name === 'src' && blocked(value) && !embed(value)) value = 'about:blank';
    if (this instanceof HTMLLinkElement && name === 'href' && blocked(value)) return;
    return setAttr0.call(this, name, value);
  };
  var iframeDesc = Object.getOwnPropertyDescriptor(HTMLIFrameElement.prototype, 'src');
  Object.defineProperty(HTMLIFrameElement.prototype, 'src', {
    configurable: true,
    get: iframeDesc.get,
    set: function (v) { return iframeDesc.set.call(this, blocked(v) && !embed(v) ? 'about:blank' : v); },
  });
})();
