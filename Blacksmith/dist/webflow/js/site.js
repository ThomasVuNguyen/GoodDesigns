	$(document).ready(function () {

window.scrollTo(window.scrollX, window.scrollY + 1);

		// $(".menu_open_overlay").click(function () {
		//   $(".nav_dropdown").triggerHandler("w-close.w-dropdown");    
		// });
		// Matches jQuery slideUp/slideDown (400ms swing over height, margins and
		// padding) with Web Animations, so no script runs per frame.
		var SLIDE_PROPS = ['height', 'marginTop', 'marginBottom', 'paddingTop', 'paddingBottom'];
		var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
		function boxOf(el) {
			var cs = getComputedStyle(el);
			var box = {};
			SLIDE_PROPS.forEach(function (p) { box[p] = cs[p]; });
			return box;
		}
		function slide(el, open) {
			var from = el.style.display === 'block' ? boxOf(el) : null;
			el.getAnimations().forEach(function (a) { a.cancel(); });
			el.style.overflow = '';
			el.style.display = 'block';
			var full = boxOf(el);
			var closed = {};
			SLIDE_PROPS.forEach(function (p) { closed[p] = '0px'; });
			if (!open && !from) {
				el.style.display = 'none';
				return;
			}
			if (reducedMotion.matches || !el.animate) {
				el.style.display = open ? 'block' : 'none';
				return;
			}
			// Clips the answer to the animated box, as jQuery's slide does.
			el.style.overflow = 'hidden';
			// Closing holds its last frame until display flips, so the full
			// height never flashes between the finish and the event.
			var anim = el.animate([from || closed, open ? full : closed], {
				duration: 400,
				easing: 'cubic-bezier(0.37, 0, 0.63, 1)',
				fill: open ? 'none' : 'forwards',
			});
			anim.onfinish = function () {
				el.style.overflow = '';
				if (!open) {
					el.style.display = 'none';
					anim.cancel();
				}
			};
		}
		$('.faq_item').on('click', function(e) {
			if ($(e.target).closest('a').length) return;
			e.preventDefault();
			var answer = $(this).find('.answer')[0];
			if($(this).hasClass('active')) {
				$(this).removeClass('active');
				if (answer) slide(answer, false);
			} else {
				var item = this;
				$('.faq_item.active').each(function () {
					var other = $(this).find('.answer')[0];
					if (other) slide(other, false);
				});
				$('.faq_item').removeClass('active');
				$(item).addClass('active');
				if (answer) slide(answer, true);
			}
		})
	})
;
(function () {
  var APP_BASE = "https://app.blacksmith.sh/";
  var UTM_KEYS = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
  ];

  function buildUrl() {
    var incoming = new URLSearchParams(window.location.search);
    var out = new URLSearchParams();

    UTM_KEYS.forEach(function (key) {
      var v = incoming.get(key);
      if (v !== null && String(v).trim() !== "") {
        out.set(key, String(v).trim());
      }
    });

    if (!out.get("utm_source")) out.set("utm_source", "webflow");
    if (!out.get("utm_medium")) out.set("utm_medium", "homepage");
    if (!out.get("utm_campaign")) out.set("utm_campaign", "try_for_free");

    var url = new URL(APP_BASE);
    out.forEach(function (val, key) {
      url.searchParams.set(key, val);
    });
    return url.toString();
  }

  function apply() {
    var finalUrl = buildUrl();
    document.querySelectorAll("a[data-blacksmith-app-cta]").forEach(function (a) {
      a.href = finalUrl;
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", apply);
  } else {
    apply();
  }
})();

(function () {
  // Customer stories carousel (pricing, customers). gsap + Draggable are
  // ~110KB of script evaluation, so they load on first pointer contact
  // instead of during page load.
  var container = document.querySelector(".customer_stories_container");
  if (!container) return;
  var frame = container.parentElement;
  // Draggable applies the same value; setting it up front keeps the browser
  // from claiming a touch press as a pan while the libraries download.
  if ($(window).width() > 991) container.style.touchAction = "pan-y";

  function load(src) {
    return new Promise(function (resolve, reject) {
      var el = document.createElement("script");
      el.src = src;
      el.onload = resolve;
      el.onerror = reject;
      document.body.appendChild(el);
    });
  }

  function create(press, swipeDx) {
    var gsap = window.gsap;
    gsap.registerPlugin(window.Draggable);
    var slides = gsap.utils.toArray(".customer_story_card");
    var snapPoints = slides.map(function (slide) {
      return -slide.offsetLeft;
    });
    var lastSlide = slides[slides.length - 1];
    var paddingEnd = 64;
    var minX = -(
      lastSlide.offsetLeft +
      lastSlide.offsetWidth -
      frame.offsetWidth +
      paddingEnd
    );
    function snapX(value) {
      return gsap.utils.snap(snapPoints, value);
    }
    var draggable = window.Draggable.create(container, {
      type: "x",
      inertia: true,
      zIndexBoost: false,
      bounds: { minX: minX, maxX: 0 },
      snap: { x: snapX },
    })[0];

    if (press) {
      draggable.startDrag(press);
      return;
    }
    // minX >= 0 when every card already fits (customers at wide viewports),
    // so there is nowhere to swipe to.
    if (Math.abs(swipeDx) < 10 || minX >= 0) return;
    // A swipe that ended during the download moves at least one slide in
    // its direction, standing in for the throw Draggable would have done.
    var current = snapPoints.indexOf(snapX(draggable.x));
    var landed = snapPoints.indexOf(snapX(draggable.x + swipeDx));
    if (landed === current) {
      landed = gsap.utils.clamp(
        0,
        snapPoints.length - 1,
        current + (swipeDx < 0 ? 1 : -1),
      );
    }
    gsap.to(container, {
      x: gsap.utils.clamp(minX, 0, snapPoints[landed]),
      duration: 0.5,
      ease: "power3.out",
      onComplete: function () {
        draggable.update();
      },
    });
  }

  // A press that lands while the libraries download is held and handed to
  // Draggable once it exists; one that already ended is replayed as a swipe.
  // Either way the first drag is not lost. Loading on contact rather than on
  // approach keeps gsap evaluation out of scrolling.
  var pendingPress = null;
  var swipeDx = 0;
  function holdPress(e) {
    if (!e.isPrimary) return;
    pendingPress = e;
    swipeDx = 0;
  }
  function releasePress(e) {
    if (!pendingPress || e.pointerId !== pendingPress.pointerId) return;
    swipeDx = e.type === "pointerup" ? e.clientX - pendingPress.clientX : 0;
    pendingPress = null;
  }
  function blockNativeDrag(e) {
    e.preventDefault();
  }
  function trackPresses(on) {
    var method = on ? "addEventListener" : "removeEventListener";
    frame[method]("pointerdown", holdPress);
    frame[method]("dragstart", blockNativeDrag);
    window[method]("pointerup", releasePress);
    window[method]("pointercancel", releasePress);
  }

  // Scrolling under a resting pointer fires pointerover and zero-movement
  // pointermoves, so only a pointer that really moves or presses starts it.
  function onIntent(e) {
    if (e.type === "pointermove" && !e.movementX && !e.movementY) return;
    start(e);
  }
  function listenForIntent(on) {
    var method = on ? "addEventListener" : "removeEventListener";
    frame[method]("pointermove", onIntent);
    frame[method]("pointerdown", onIntent);
  }

  function start(e) {
    if ($(window).width() <= 991) return;
    listenForIntent(false);
    trackPresses(true);
    if (e.type === "pointerdown") holdPress(e);
    load("/webflow/js/gsap.min.js")
      .then(function () {
        return load("/webflow/js/Draggable.min.js");
      })
      .then(
        function () {
          trackPresses(false);
          create(pendingPress, swipeDx);
          pendingPress = null;
          swipeDx = 0;
        },
        function () {
          trackPresses(false);
          pendingPress = null;
          swipeDx = 0;
          listenForIntent(true);
          console.error("customer stories carousel: failed to load gsap");
        },
      );
  }

  listenForIntent(true);
})();
