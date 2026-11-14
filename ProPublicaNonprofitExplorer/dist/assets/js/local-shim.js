// Local stand-ins for the JSON endpoints the Svelte components fetch (added by tools/capture.py).
// Live, an anonymous visitor gets a CSRF token, a 403 from the subscription list (so Subscribe shows its email
// form), and a 200 when the verification email is sent. The same answers are given here without a network call.
(function () {
  var realFetch = window.fetch.bind(window);
  function json(body, status) {
    return Promise.resolve(new Response(JSON.stringify(body), { status: status || 200, headers: { 'Content-Type': 'application/json' } }));
  }
  window.fetch = function (input, init) {
    var url = new URL(typeof input === 'string' ? input : input.url, location.href);
    var p = url.pathname;
    if (/\/csrf-token\.json$/.test(p)) return json('local-csrf-token');
    if (/\/nonprofits\/subscriptions\.json$/.test(p)) return json({ error: 'Not signed in' }, 403);
    if (/\/nonprofits\/send-verification-email$/.test(p)) return json({ ok: true });
    if (/\/nonprofits\/subscriptions(\/\d+)?$/.test(p)) return json({ ok: true });
    return realFetch(input, init);
  };
})();
