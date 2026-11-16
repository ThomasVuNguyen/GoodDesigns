// Local stand-ins for the network calls mastra.ai makes after load, so the capture runs with no requests off this host.
// capture.py inlines tools/consent-init.json as CONSENT_INIT below.
//
// - The consent manager (c15t, hosted at *.inth.app) asks /init which banner policy applies. It gets the answer a
//   visitor from the US gets live: jurisdiction NONE, no banner.
// - /api/auth/hint answers {"authed":false}, as it does for a signed-out visitor, so the header shows Log in / Sign Up.
// - /api/status answers {"status":"operational"}, which the footer shows as FULLY OPERATIONAL.
// - The footer newsletter form posts to /api/newsletter, which a static capture does not have. Nothing is sent: the
//   call answers 503 and the form shows its own error state.
// - Any other call to another host answers {} and beacons are dropped. Scripts from other hosts never load.
(function () {
  var CONSENT_INIT = "{\"jurisdiction\":\"NONE\",\"location\":{\"countryCode\":\"US\",\"regionCode\":null},\"translations\":{\"translations\":{\"common\":{\"acceptAll\":\"Accept All\",\"rejectAll\":\"Reject All\",\"customize\":\"Customize\",\"save\":\"Save Settings\",\"close\":\"Close\",\"securedBy\":\"Secured by\"},\"cookieBanner\":{\"title\":\"We value your privacy\",\"description\":\"This site uses cookies to improve your browsing experience, analyze site traffic, and show personalized content.\"},\"consentManagerDialog\":{\"title\":\"Privacy Settings\",\"description\":\"Customize your privacy settings here. You can choose which types of cookies and tracking technologies you allow.\"},\"consentTypes\":{\"necessary\":{\"title\":\"Strictly Necessary\",\"description\":\"These cookies are essential for the website to function properly and cannot be disabled.\"},\"functionality\":{\"title\":\"Functionality\",\"description\":\"These cookies enable enhanced functionality and personalization of the website.\"},\"marketing\":{\"title\":\"Marketing\",\"description\":\"These cookies are used to deliver relevant advertisements and track their effectiveness.\"},\"measurement\":{\"title\":\"Analytics\",\"description\":\"These cookies help us understand how visitors interact with the website and improve its performance.\"},\"experience\":{\"title\":\"Experience\",\"description\":\"These cookies help us provide a better user experience and test new features.\"}},\"frame\":{\"title\":\"Accept {category} consent to view this content.\",\"actionButton\":\"Enable {category} consent\",\"policyBlocked\":\"This content is unavailable under your region's consent policy.\",\"loading\":\"Loading content\\u2026\",\"error\":\"This content could not be loaded.\"},\"legalLinks\":{\"privacyPolicy\":\"Privacy Policy\",\"cookiePolicy\":\"Cookie Policy\",\"termsOfService\":\"Terms of Service\"}},\"language\":\"en\"},\"branding\":\"inth\",\"policy\":{\"id\":\"world_no_banner\",\"model\":\"none\",\"consent\":{\"scopeMode\":\"permissive\"},\"ui\":{\"mode\":\"none\"},\"proof\":{\"storeIp\":false,\"storeUserAgent\":true,\"storeLanguage\":false}},\"policyDecision\":{\"policyId\":\"world_no_banner\",\"matchedBy\":\"default\",\"country\":\"US\",\"region\":null,\"jurisdiction\":\"NONE\"}}";
  var API = { '/api/auth/hint': '{"authed":false}', '/api/status': '{"status":"operational"}' };
  var UNAVAILABLE = '/api/newsletter';

  var answer = function (url) {
    try { var u = new URL(url, location.href); } catch (e) { return null; }
    if (!/^https?:$/.test(u.protocol)) return null;
    if (u.origin === location.origin) {
      if (u.pathname.slice(-UNAVAILABLE.length) === UNAVAILABLE) return { body: '{"error":"not available in this capture"}', status: 503 };
      var key = Object.keys(API).filter(function (k) { return u.pathname.slice(-k.length) === k; })[0];
      return key ? { body: API[key] } : null;
    }
    if (/\.inth\.app$/.test(u.hostname) && /\/init$/.test(u.pathname)) return { body: CONSENT_INIT };
    return { body: '{}', block: true };
  };
  var json = function (hit) { return new Response(hit.body, { status: hit.status || 200, headers: { 'content-type': 'application/json' } }); };

  var fetch0 = window.fetch;
  window.fetch = function (input) {
    var url = typeof input === 'string' || input instanceof URL ? String(input) : input.url;
    var hit = answer(url);
    if (hit) return Promise.resolve(json(hit));
    return fetch0.apply(this, arguments);
  };

  var open0 = XMLHttpRequest.prototype.open, send0 = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.open = function (method, url) {
    this.__local = answer(url);
    return open0.apply(this, arguments);
  };
  XMLHttpRequest.prototype.send = function () {
    var hit = this.__local;
    if (!hit) return send0.apply(this, arguments);
    var xhr = this, body = hit.body;
    ['readyState', 'status', 'responseText', 'response'].forEach(function (k, i) {
      Object.defineProperty(xhr, k, { configurable: true, value: [4, hit.status || 200, body, body][i] });
    });
    setTimeout(function () {
      xhr.dispatchEvent(new Event('readystatechange'));
      xhr.dispatchEvent(new Event('load'));
      xhr.dispatchEvent(new Event('loadend'));
    });
  };

  if (navigator.sendBeacon) navigator.sendBeacon = function () { return true; };

  var foreign = function (url) { var hit = answer(url); return hit && hit.block; };
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
