// Local additions for the Dessn capture (not part of dessn.com; copied into dist/ by tools/capture.py).
// Only the homepage is captured. A click on a link to any other dessn.com route (Customers, Pricing, Blog, ...)
// opens that page on www.dessn.com instead of letting the client router render its not-found page.
(function () {
  // The analytics this banner asks about are removed from the capture, so record a refusal before the app
  // reads the cookie; the consent banner then stays closed. "Cookie settings" in the footer still opens it.
  if (document.cookie.indexOf('dessn_cookie_consent=') < 0) {
    document.cookie = 'dessn_cookie_consent=denied; path=/; max-age=31536000; SameSite=Lax';
  }

  var base = location.pathname.replace(/\/(index\.html)?$/, '');
  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0) return;
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a || a.target === '_blank' || a.origin !== location.origin) return;
    var path = a.pathname.indexOf(base) === 0 ? a.pathname.slice(base.length) : a.pathname;
    if (path === '' || path === '/' || path === '/index.html') return; // the homepage itself
    e.preventDefault();
    e.stopImmediatePropagation();
    var url = 'https://www.dessn.com' + path + a.search + a.hash;
    if (e.metaKey || e.ctrlKey || e.shiftKey) window.open(url, '_blank', 'noopener');
    else location.href = url;
  }, true);
})();
