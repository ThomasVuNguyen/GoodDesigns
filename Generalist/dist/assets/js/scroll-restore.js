/*
  Scroll restoration on refresh.

  Browsers restore scroll position natively, but on pages where content is
  rendered by JavaScript after load (charts, canvases), the document is still
  short when the browser tries to restore, so the position gets clamped or
  lost. This script saves window.scrollY per-path in sessionStorage and
  restores it explicitly: once immediately, and once more on `load` after
  late-rendered content has taken up its final height — unless the user has
  already scrolled on their own by then.
*/
(function () {
  'use strict';

  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

  var key = 'scroll:' + location.pathname;
  var userScrolled = false;

  function markUserScroll() {
    userScrolled = true;
  }
  window.addEventListener('wheel', markUserScroll, { passive: true, once: true });
  window.addEventListener('touchstart', markUserScroll, { passive: true, once: true });
  window.addEventListener('keydown', markUserScroll, { once: true });

  // If the URL has a hash, let the browser jump to the anchor instead.
  var saved = location.hash ? null : sessionStorage.getItem(key);
  if (saved !== null) {
    var y = parseInt(saved, 10) || 0;
    window.scrollTo(0, y);
    window.addEventListener('load', function () {
      if (!userScrolled) window.scrollTo(0, y);
    });
  }

  var pending = false;
  window.addEventListener('scroll', function () {
    if (pending) return;
    pending = true;
    window.requestAnimationFrame(function () {
      pending = false;
      sessionStorage.setItem(key, String(Math.round(window.scrollY)));
    });
  }, { passive: true });
})();
