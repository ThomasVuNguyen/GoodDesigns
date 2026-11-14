// Local stand-ins for the network calls vimeo.com makes after load, so the capture runs with no requests off this host.
// /me/info answers as it does for a logged-out visitor in the US and /_next/gtm with a logged-out data layer; logging and
// identity calls answer empty; beacons and scripts from other hosts (analytics, ads, Datadog, the bot-detection challenge)
// are dropped.
(function () {
  var ME = { user: null, xsrft: '', thirdPartyTracking: false, shouldOptIntoMarketing: false, isRecordToolSupported: false, country: 'US' };
  var local = function (url) {
    try { var u = new URL(url, location.href); } catch (e) { return null; }
    if (u.origin !== location.origin) return { block: true };
    if (/\/me\/info$/.test(u.pathname)) return { body: JSON.stringify(ME) };
    if (/\/_next\/gtm$/.test(u.pathname)) return { body: JSON.stringify({ dataLayers: { page_type: 'Marketing', user_status: 'logged_out', language: 'en' } }) };
    if (/\/(wh\/log|flarepoint\/|ablincoln\/|cdn-cgi\/)/.test(u.pathname)) return { body: '{}' };
    return null;
  };
  var json = function (body) { return new Response(body, { status: 200, headers: { 'content-type': 'application/json' } }); };

  var fetch0 = window.fetch;
  window.fetch = function (input, init) {
    var hit = local(typeof input === 'string' || input instanceof URL ? String(input) : input.url);
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

  // Transcend's consent manager is not loaded. The footer shows "Your Privacy Choices" once airgap reports the visitor's
  // privacy regime; this stand-in reports the US (CPRA) regime, as the live page does for US visitors. No banner is shown
  // and the button opens nothing.
  var ready = function (cb) { cb(this); };
  var noop = function () {};
  window.airgap = {
    ready: ready, getRegimes: function () { return new Set(['CPRA']); }, getRegimePurposes: function () { return new Set(); },
    getConsent: function () { return { purposes: {}, confirmed: false }; }, getPurposeTypes: function () { return {}; },
    isOptedOut: function () { return false; }, addEventListener: noop, removeEventListener: noop, setConsent: noop, optIn: noop, optOut: noop,
  };
  window.transcend = { ready: ready, showConsentManager: noop, hideConsentManager: noop, addEventListener: noop, removeEventListener: noop };

  if (navigator.sendBeacon) navigator.sendBeacon = function () { return true; };

  // Scripts and tracking pixels from other hosts never load.
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
