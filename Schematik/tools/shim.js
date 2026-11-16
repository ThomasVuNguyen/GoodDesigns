// Local stand-ins for the calls schematik.io makes after load, so the capture runs with no requests off this host.
// The auth endpoints answer as they do for a logged-out visitor; any other /api/ call answers {}.
(function () {
  var answers = { 'get-session': 'null', providers: '{"providers":["google","github"]}' };
  var local = function (url) {
    try { var u = new URL(url, location.href); } catch (e) { return null; }
    if (u.origin !== location.origin) return /^https?:$/.test(u.protocol) ? '{}' : null;
    var m = u.pathname.match(/\/api\/(?:[\w-]+\/)*([\w-]+)$/);
    return m ? (answers[m[1]] || '{}') : null;
  };
  var fetch0 = window.fetch;
  window.fetch = function (input, init) {
    var body = local(typeof input === 'string' || input instanceof URL ? String(input) : input.url);
    if (body) return Promise.resolve(new Response(body, { status: 200, headers: { 'content-type': 'application/json' } }));
    return fetch0.apply(this, arguments);
  };
  if (navigator.sendBeacon) navigator.sendBeacon = function () { return true; };
})();
