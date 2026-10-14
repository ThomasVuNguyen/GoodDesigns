// Runs before the original bundle. Answers the microsite's API calls from a capture-time
// snapshot and swallows analytics, so the page renders identically with no backend.
(function () {
  var SNAPSHOT = /*SNAPSHOT*/null;

  // Gallery serves the site under /sites/<slug>/; the patched router uses this as its basename.
  var base = location.pathname.match(/^\/sites\/[^/]+/);
  window.__TWG_BASE__ = base ? base[0] : '';

  var answers = [
    [/\/gateway\/api\/graphql\/pq\/[^?]*\?operation=utils_twg_microsite_CurrentUser_Query/, SNAPSHOT.currentUser],
    [/\/gateway\/api\/twg-api\/v1\/microsite\/metrics\/global/, SNAPSHOT.metricsGlobal],
    [/\/flags\/api\/v2\/frontend\/clientSdkKey\//, SNAPSHOT.clientSdkKey],
    [/\/flags\/api\/v2\/frontend\/experimentValues/, SNAPSHOT.experimentValues],
  ];
  // Everything else that would leave the page: telemetry, feature-flag sync, consent, and other gateway APIs.
  var silenced = /sentry\.io|sentry-cdn|xp\.atlassian\.com|as\.atlassian\.com|statsig|featureassets\.org|prodregistryv2\.org|vercel-insights|api\.atlassian\.com\/flags|cookielaw|onetrust|marketo|mktoresp|\/gateway\//;

  function lookup(url) {
    for (var i = 0; i < answers.length; i++) if (answers[i][0].test(url)) return answers[i][1];
    return silenced.test(url) ? {} : undefined;
  }

  var realFetch = window.fetch.bind(window);
  window.fetch = function (input, init) {
    var url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
    var body = lookup(url);
    if (body === undefined) return realFetch(input, init);
    return Promise.resolve(new Response(JSON.stringify(body), { status: 200, headers: { 'Content-Type': 'application/json' } }));
  };

  var realOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function (method, url) {
    var body = lookup(String(url));
    if (body !== undefined) {
      arguments[0] = 'GET';
      arguments[1] = 'data:application/json,' + encodeURIComponent(JSON.stringify(body));
    }
    return realOpen.apply(this, arguments);
  };

  if (navigator.sendBeacon) {
    var realBeacon = navigator.sendBeacon.bind(navigator);
    navigator.sendBeacon = function (url, data) {
      return lookup(String(url)) !== undefined ? true : realBeacon(url, data);
    };
  }
})();
