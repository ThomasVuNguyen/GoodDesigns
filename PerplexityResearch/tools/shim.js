// Local stand-ins for the network calls the Perplexity marketing app makes after hydration, so the capture runs with
// no requests off this host. The app's own API calls answer with the JSON the live page received on the capture date
// (api-snapshots/); analytics and telemetry calls answer {} or are dropped, and scripts from other hosts never load.
(function () {
  var base = (document.currentScript && document.currentScript.src.replace(/shim\.js(\?.*)?$/, '')) || '/';
  var snapshots = {
    '/api/auth/session': 'auth-session',
    '/rest/user/info': 'user-info',
    '/rest/models/config/v2': 'models-config',
    '/rest/visitor/consent-requirement': 'consent-requirement',
    '/rest/event/analytics': 'event-analytics',
  };
  // Answer for a URL: { snapshot: name } | { body: json } | null (let it through).
  var route = function (url) {
    try { var u = new URL(url, location.href); } catch (e) { return null; }
    if (!/^https?:$/.test(u.protocol)) return null;
    var path = u.pathname;
    for (var p in snapshots) if (path.slice(-p.length) === p) return { snapshot: snapshots[p] };
    if (/\/marketing\/api\/sanity$/.test(path)) {
      // One blog post per slug (the Resources menu's featured cards), or the Research journal list. The app refetches
      // the list after hydration because the dehydrated copy in the HTML is older than its stale time.
      try { var params = JSON.parse(u.searchParams.get('params')) || {}; } catch (e) { params = {}; }
      return { snapshot: params.slug ? 'sanity-' + params.slug : 'sanity-' + (params.translatedDocumentType || 'blog') + '-landing' };
    }
    if (u.origin === location.origin) {
      if (/\/(rest|cdn-cgi)\//.test(path)) return { body: '{}' };
      return null;
    }
    return { body: '{}', block: true };
  };
  var json = function (body, status) {
    return new Response(body, { status: status || 200, headers: { 'content-type': 'application/json' } });
  };
  var answer = function (hit) {
    if (!hit.snapshot) return Promise.resolve(json(hit.body));
    return fetch0(base + 'api-snapshots/' + hit.snapshot + '.json').then(function (r) {
      return r.ok ? r.text().then(function (t) { return json(t); }) : json('null', 404);
    });
  };

  var fetch0 = window.fetch.bind(window);
  window.fetch = function (input, init) {
    var url = typeof input === 'string' || input instanceof URL ? String(input) : input.url;
    var hit = route(url);
    return hit ? answer(hit) : fetch0(input, init);
  };

  var open0 = XMLHttpRequest.prototype.open, send0 = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.open = function (method, url) {
    this.__hit = route(url);
    return open0.apply(this, arguments);
  };
  XMLHttpRequest.prototype.send = function () {
    var hit = this.__hit, xhr = this;
    if (!hit) return send0.apply(this, arguments);
    answer(hit).then(function (r) { return r.text().then(function (t) { return [r.status, t]; }); }).then(function (res) {
      ['readyState', 'status', 'responseText', 'response'].forEach(function (k, i) {
        Object.defineProperty(xhr, k, { configurable: true, value: [4, res[0], res[1], res[1]][i] });
      });
      ['readystatechange', 'load', 'loadend'].forEach(function (t) { xhr.dispatchEvent(new Event(t)); });
    });
  };

  if (navigator.sendBeacon) navigator.sendBeacon = function () { return true; };

  var foreign = function (url) { var hit = route(url); return hit && hit.block; };
  var srcDesc = Object.getOwnPropertyDescriptor(HTMLScriptElement.prototype, 'src');
  Object.defineProperty(HTMLScriptElement.prototype, 'src', {
    configurable: true,
    get: srcDesc.get,
    set: function (v) { if (foreign(v)) this.type = 'javascript/blocked'; return srcDesc.set.call(this, v); },
  });
  var setAttr0 = Element.prototype.setAttribute;
  Element.prototype.setAttribute = function (name, value) {
    if (this instanceof HTMLScriptElement && name === 'src' && foreign(value)) this.type = 'javascript/blocked';
    return setAttr0.apply(this, arguments);
  };
  // Images from other hosts (tracking pixels such as edge.perplexity.ai/image) never load.
  var imgDesc = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src');
  Object.defineProperty(HTMLImageElement.prototype, 'src', {
    configurable: true,
    get: imgDesc.get,
    set: function (v) { return imgDesc.set.call(this, foreign(v) ? 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==' : v); },
  });
})();
