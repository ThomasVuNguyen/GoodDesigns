/*
 * Site chrome for the EP-35 clone: desktop pinwheel, mobile header,
 * mobile menu, newsletter modal, search overlay and country selector.
 * Re-implemented locally from behaviour observed on the reference page.
 */
(function () {
  "use strict";

  var doc = document;
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function fromTemplate(id) {
    var tpl = doc.getElementById(id);
    return tpl ? tpl.content.firstElementChild.cloneNode(true) : null;
  }

  /* ---------- desktop navigation pinwheel ----------
   * Hovering the navigation spins the pinwheel up; leaving lets it coast to a
   * stop. Constants match the reference bundle. */
  var nav = doc.getElementById("header");
  if (nav) {
    var wings = ["#wings", "#wings_outline", "#wings_outline_clip"]
      .map(function (s) { return nav.querySelector(s); })
      .filter(Boolean);
    var ACC = 900, MAX = 820, KICK = 160, DECAY = 1.55, MIN = 4;
    var angle = 0, vel = 0, hovering = false, raf = null, last = null;
    var paint = function () {
      wings.forEach(function (w) { w.style.transform = "rotate(" + angle + "deg)"; });
    };
    var frame = function (t) {
      if (last === null) last = t;
      var dt = (t - last) / 1000;
      last = t;
      var n = vel;
      if (hovering) n = Math.min(MAX, n + ACC * dt);
      else n *= Math.exp(-DECAY * dt);
      if (!hovering && n < MIN) n = 0;
      vel = n;
      if (n > 0) { angle = (angle + n * dt) % 360; paint(); }
      if (hovering || n > 0) { raf = requestAnimationFrame(frame); return; }
      raf = null;
      last = null;
    };
    var start = function () { if (!reduceMotion && raf === null) raf = requestAnimationFrame(frame); };
    nav.addEventListener("mouseenter", function () { hovering = true; vel = Math.min(MAX, vel + KICK); start(); });
    nav.addEventListener("mouseleave", function () { hovering = false; start(); });
    paint();
  }

  /* ---------- mobile header: hides while scrolling down, returns on scroll up ---------- */
  var mobileHeader = doc.querySelector("header.mobile-only._header-root_flvnk_1");
  if (mobileHeader) {
    var prevY = window.scrollY;
    window.addEventListener("scroll", function () {
      var y = window.scrollY;
      var threshold = (180 / 980) * window.innerWidth;
      if (y > threshold) mobileHeader.setAttribute("aria-hidden", y > prevY ? "true" : "false");
      else if (y <= 0) mobileHeader.setAttribute("aria-hidden", "false");
      prevY = y;
    }, { passive: true });
  }

  /* ---------- layered overlays (menu, newsletter, search) ---------- */
  var stack = [];
  function openLayer(el, onClose) {
    doc.body.appendChild(el);
    var layer = { el: el, onClose: onClose };
    stack.push(layer);
    return layer;
  }
  function closeLayer(layer) {
    var i = stack.indexOf(layer);
    if (i === -1) return;
    stack.splice(i, 1);
    layer.el.remove();
    if (layer.onClose) layer.onClose();
  }
  doc.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && stack.length) closeLayer(stack[stack.length - 1]);
  });

  /* ---------- newsletter modal ---------- */
  function openNewsletter() {
    var el = fromTemplate("tpl-newsletter");
    if (!el) return;
    var layer = openLayer(el);
    var form = el.querySelector("form");
    var email = el.querySelector('input[name="email"]');
    var terms = el.querySelector('input[name="termsAndConditions"]');
    el.querySelector("._close_cl1bg_26").addEventListener("click", function () { closeLayer(layer); });
    el.addEventListener("click", function (e) { if (e.target === el) closeLayer(layer); });
    email.addEventListener("input", function () {
      email.setAttribute("data-has-value", email.value ? "true" : "false");
      email.setAttribute("aria-invalid", "false");
    });
    terms.addEventListener("change", function () {
      terms.value = terms.checked ? "true" : "false";
      terms.setAttribute("aria-invalid", "false");
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var okEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
      email.setAttribute("aria-invalid", okEmail ? "false" : "true");
      terms.setAttribute("aria-invalid", terms.checked ? "false" : "true");
      // Visual study only: a valid form closes the modal and nothing is sent.
      if (okEmail && terms.checked) closeLayer(layer);
    });
    email.focus({ preventScroll: true });
  }

  /* ---------- search overlay ---------- */
  var indexPromise = null;
  function loadIndex() {
    if (!indexPromise) {
      indexPromise = fetch("assets/data/search-index.json")
        .then(function (r) { return r.json(); })
        .catch(function () { return []; });
    }
    return indexPromise;
  }
  var norm = function (s) { return s.toLowerCase().replace(/[–—]/g, "-"); };
  var esc = function (s) {
    return s.replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; });
  };
  var COL = "_flex_kneuy_2 _flex-direction-column_kneuy_15 _justify-flex-start_kneuy_24 _align-stretch_kneuy_65";

  function openSearch() {
    if (stack.some(function (l) { return l.el.classList.contains("_backdrop_1t1dq_1"); })) return;
    var el = fromTemplate("tpl-search");
    if (!el) return;
    var layer = openLayer(el);
    var input = el.querySelector('input[name="search"]');
    var container = el.querySelector("._container_1t1dq_45");
    var results = null;
    el.addEventListener("click", function (e) { if (e.target === el) closeLayer(layer); });
    var cancel = el.querySelector("._cancel_1t1dq_131");
    if (cancel) cancel.addEventListener("click", function () { closeLayer(layer); });

    var render = function () {
      var q = norm(input.value.trim());
      if (results) { results.remove(); results = null; }
      if (!q) return;
      loadIndex().then(function (index) {
        if (norm(input.value.trim()) !== q) return;
        var groups = { store: [], pages: [], apps: [], guides: [] };
        index.forEach(function (row) {
          if (norm(row[1]).indexOf(q) !== -1 && groups[row[0]]) groups[row[0]].push(row);
        });
        var html = "";
        Object.keys(groups).forEach(function (k) {
          var rows = groups[k];
          if (!rows.length) return;
          html += '<div class="' + COL + '"><p class="fs-20 fs-10:md dim _category_1dep4_63">' + k + " (" + rows.length + ")</p>" +
            '<ul class="' + COL + ' _gap-sm_kneuy_95 _gap-xs:md_kneuy_117">' +
            rows.slice(0, 8).map(function (r) {
              return '<li class="_result-item_1dep4_75"><a class="_url_1dep4_83" href="https://teenage.engineering' +
                esc(r[2]) + '"><span class="fs-30 fs-20:md">' + esc(r[1]) + "</span></a></li>";
            }).join("") + "</ul></div>";
        });
        if (!html) return;
        if (results) results.remove();
        results = doc.createElement("div");
        results.className = "_container_oxzah_1 _full-width_oxzah_13 _results-wrapper_1t1dq_118";
        results.innerHTML = '<div class="' + COL + ' _gap-lg_kneuy_103">' + html + "</div>";
        container.appendChild(results);
      });
    };
    input.addEventListener("input", render);
    input.focus({ preventScroll: true });
  }

  doc.addEventListener("click", function (e) {
    var t = e.target instanceof Element ? e.target : null;
    if (!t) return;
    if (t.closest('button[data-menu-action="search-toggle"]') || t.closest("._search-trigger_flvnk_79")) {
      e.preventDefault();
      openSearch();
      return;
    }
    if (t.closest("._newsletter-btn_1iqct_26")) {
      e.preventDefault();
      openNewsletter();
    }
  });

  /* ---------- mobile menu ---------- */
  var toggle = doc.querySelector("._toggle-menu_flvnk_75");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var el = fromTemplate("tpl-menu");
      if (!el) return;
      var prevOverflow = doc.documentElement.style.overflow;
      doc.documentElement.style.overflow = "hidden";
      var layer = openLayer(el, function () {
        doc.documentElement.style.overflow = prevOverflow;
        toggle.focus({ preventScroll: true });
      });
      var close = el.querySelector("._header-inner_flvnk_28 > button");
      close.setAttribute("aria-label", "close menu");
      close.addEventListener("click", function () { closeLayer(layer); });
      close.focus({ preventScroll: true });
    });
  }

  /* ---------- country / region selector ---------- */
  var selects = doc.querySelectorAll("select._country-select_11j21_1");
  selects.forEach(function (sel) {
    if (!sel.value || sel.value !== "US") sel.value = "US";
    sel.addEventListener("change", function () {
      var label = sel.options[sel.selectedIndex].text;
      selects.forEach(function (other) {
        other.value = sel.value;
        var value = other.parentElement.querySelector("._country-select-value_11j21_1");
        if (value && value.firstChild && value.firstChild.nodeType === 3) value.firstChild.nodeValue = label;
      });
    });
  });
})();
