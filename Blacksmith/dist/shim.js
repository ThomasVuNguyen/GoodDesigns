// Local stand-ins for the network calls blacksmith.sh makes after load, so the capture runs with no requests off this
// host. Finsweet's licence check answers as it does live ({"valid":true}); other calls to other hosts answer {} and
// beacons are dropped. Scripts from other hosts never load, except YouTube's player API, which home.js requests only
// when a play button is clicked.
(function () {
  var local = function (url) {
    try { var u = new URL(url, location.href); } catch (e) { return null; }
    if (u.origin === location.origin || !/^https?:$/.test(u.protocol)) return null;
    if (u.hostname === 'accounts.finsweet.com') return { body: '{"valid":true}' };
    if (/(^|\.)youtube\.com$|(^|\.)ytimg\.com$/.test(u.hostname)) return null;
    return { block: true };
  };
  var json = function (body) { return new Response(body, { status: 200, headers: { 'content-type': 'application/json' } }); };

  // The newsletter form posts to the site's own /api/ routes, which a static capture does not have. Nothing is sent:
  // the call answers 503 and the form shows its own "Oops! Something went wrong" block.
  var api = function (url) {
    try { var u = new URL(url, location.href); } catch (e) { return false; }
    return u.origin === location.origin && /^\/api\//.test(u.pathname);
  };

  var fetch0 = window.fetch;
  window.fetch = function (input) {
    var url = typeof input === 'string' || input instanceof URL ? String(input) : input.url;
    if (api(url)) return Promise.resolve(new Response('{"error":"not available in this capture"}', { status: 503, headers: { 'content-type': 'application/json' } }));
    var hit = local(url);
    if (hit) return Promise.resolve(json(hit.body || '{}'));
    return fetch0.apply(this, arguments);
  };

  var open0 = XMLHttpRequest.prototype.open, send0 = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.open = function (method, url) {
    this.__local = local(url);
    return open0.apply(this, arguments);
  };
  XMLHttpRequest.prototype.send = function () {
    var hit = this.__local;
    if (!hit) return send0.apply(this, arguments);
    var xhr = this, body = hit.body || '{}';
    ['readyState', 'status', 'responseText', 'response'].forEach(function (k, i) {
      Object.defineProperty(xhr, k, { configurable: true, value: [4, 200, body, body][i] });
    });
    setTimeout(function () {
      xhr.dispatchEvent(new Event('readystatechange'));
      xhr.dispatchEvent(new Event('load'));
      xhr.dispatchEvent(new Event('loadend'));
    });
  };

  if (navigator.sendBeacon) navigator.sendBeacon = function () { return true; };

  var foreign = function (url) { var hit = local(url); return hit && hit.block; };
  var srcDesc = Object.getOwnPropertyDescriptor(HTMLScriptElement.prototype, 'src');
  Object.defineProperty(HTMLScriptElement.prototype, 'src', {
    configurable: true,
    get: srcDesc.get,
    set: function (v) { if (foreign(v)) { this.type = 'javascript/blocked'; } return srcDesc.set.call(this, v); },
  });
  var setAttr0 = Element.prototype.setAttribute;
  Element.prototype.setAttribute = function (name, value) {
    if (this instanceof HTMLScriptElement && name === 'src' && foreign(value)) this.type = 'javascript/blocked';
    return setAttr0.apply(this, arguments);
  };
})();
