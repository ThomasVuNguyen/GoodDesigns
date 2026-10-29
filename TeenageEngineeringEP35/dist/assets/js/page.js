/*
 * EP-35 page behaviour.
 * The two functions below are the page's own scripts, as published in the
 * reference page data (one per layout: the mobile layout's script sizes the
 * email field at 2x the button text, the desktop one at 1x and also reveals `covers`). They are run with a
 * small stand-in for the te013 runtime's `$` object. The only change is the
 * newsletter request: `localNewsletter` resolves locally and sends nothing.
 */
(function () {
  "use strict";

  // Local stand-in for POST /_api/mw/newsletter. No data leaves the page.
  function localNewsletter() {
    return new Promise(function (resolve) {
      setTimeout(function () { resolve({ ok: true, status: 200 }); }, 450);
    });
  }

  var scripts = {
    mobile: function ($) {
        if (!$.init) {
          $.init = true;

          const q = (id) => $.query_this('[id="' + id + '"]');
          const holdOn = q("hold-on-btn");
          const holdOnBtn = q("hold-on-btn-btn");
          const signUpBtn = q("sign-up-btn");
          const enterEmail = q("enter-email");
          const firstText = q("1st-text");
          const secondText = q("2nd-text");
          const successText = q("3rd-text");
          const privacyPolicy = q("privacy-policy");
          const controls = ["sign-up", "enter-email", "sign-up-btn"].map(q).filter(Boolean);
          // everything belonging to the second view
          const second = [secondText, ...controls, privacyPolicy, successText].filter(Boolean);
          const FADE_MS = 300;
          const FADE_IN_MS = 700;
          const FADE_IN_EASE = "cubic-bezier(.25,.1,.25,1)";
          const STAGGER_MS = 120;
          const TYPE_MS = 2000;
          // input text offset, as a fraction of the field height
          const TEXT_DOWN = 0.05;
          const TEXT_LEFT = 0.05;

          const timers = [];
          const after = (ms, fn) => timers.push(setTimeout(fn, ms));
          let typeFrame = 0;

          const scope = "nl" + Math.random().toString(36).slice(2, 8);
          const root = '[data-nl="' + scope + '"] ';
          $.elm.setAttribute("data-nl", scope);
          const style = document.createElement("style");
          style.textContent =
            root + "input,"  + root + "input:hover," + root + "input:focus{" +
            "appearance:none;-webkit-appearance:none;box-sizing:border-box;display:block;width:100%;height:100%;" +
            "cursor:pointer;margin:0;border:0;outline:0;border-radius:0;box-shadow:none;background:transparent!important;" +
            "font-family:TechnoType,Unicode,sans-serif!important;text-transform:uppercase!important;color:#fff!important;}" +
            root + "input::placeholder{font-family:TechnoType,Unicode,sans-serif;text-transform:uppercase;color:#fff;opacity:1}" +
            root + "input:focus::placeholder{color:transparent}" +
            // no hover on the email box, just a pointer
            root + '[id="enter-email"],' + root + '[id="enter-email"]:hover{background-color:transparent!important;cursor:pointer}' +
            root + "input:-webkit-autofill{-webkit-text-fill-color:#fff;transition:background-color 9999s}" +
            root + '[id="enter-email"][data-nl-error]{--border-color:#f00!important}' +
            ["hold-on-btn-btn", "sign-up-btn"]
              .map((id) => {
                const sel = root + '[id="' + id + '"]';
                return (
                  sel + "{cursor:pointer;transition:background-color .15s,color .15s}" +
                  sel + ":hover{background-color:#fff!important;color:#000!important}" +
                  sel + ":hover *{color:#000!important}"
                );
              })
              .join("");
          $.elm.appendChild(style);

          // elements stay in the layout; only opacity/visibility change, so nothing jumps
          const conceal = (el) => {
            el.style.transition = "none";
            el.style.opacity = "0";
            el.style.visibility = "hidden";
            el.style.pointerEvents = "none";
          };
          const show = (el, delay = 0) => {
            el.style.transition = "none";
            el.style.opacity = "0";
            el.style.visibility = "";
            el.style.pointerEvents = "";
            // commit opacity 0 so the transition always has a start value
            void el.offsetWidth;
            el.style.transition = "opacity " + FADE_IN_MS + "ms " + FADE_IN_EASE + " " + delay + "ms";
            el.style.opacity = "1";
          };
          const hide = (el) => {
            el.style.transition = "opacity " + FADE_MS + "ms";
            el.style.opacity = "0";
            el.style.pointerEvents = "none";
            after(FADE_MS, () => (el.style.visibility = "hidden"));
          };

          const setError = (on) => {
            if (!enterEmail) return;
            if (on) enterEmail.setAttribute("data-nl-error", "");
            else enterEmail.removeAttribute("data-nl-error");
          };

          // per-character clones, prepared up front so typing never changes the layout
          const typed = [];
          const prepareTyping = (el) => {
            const chars = [];
            for (const child of Array.from(el.children)) {
              const clone = child.cloneNode(true);
              clone.removeAttribute("id");
              const walker = document.createTreeWalker(clone, NodeFilter.SHOW_TEXT);
              const nodes = [];
              while (walker.nextNode()) nodes.push(walker.currentNode);
              for (const node of nodes) {
                const frag = document.createDocumentFragment();
                for (const ch of node.textContent) {
                  const span = document.createElement("span");
                  span.textContent = ch;
                  span.style.opacity = "0";
                  frag.appendChild(span);
                  chars.push(span);
                }
                node.replaceWith(frag);
              }
              typed.push([child, child.style.display, clone]);
              child.style.display = "none";
              child.after(clone);
            }
            return chars;
          };
          const typeOut = (el, chars) => {
            el.style.transition = "none";
            el.style.opacity = "1";
            el.style.visibility = "";
            el.style.pointerEvents = "";
            const start = performance.now();
            let shown = 0;
            const tick = (now) => {
              const target = Math.min(chars.length, Math.ceil(((now - start) / TYPE_MS) * chars.length));
              while (shown < target) chars[shown++].style.opacity = "1";
              if (shown < chars.length) typeFrame = requestAnimationFrame(tick);
            };
            typeFrame = requestAnimationFrame(tick);
          };

          // the element actually holding a box's text
          const textElOf = (box) => {
            const walker = document.createTreeWalker(box, NodeFilter.SHOW_TEXT);
            while (walker.nextNode()) {
              if (walker.currentNode.textContent.trim()) return walker.currentNode.parentElement;
            }
            return box;
          };

          // email input; font size is double the sign-up button's text, line height follows it, left aligned
          const input = document.createElement("input");
          input.type = "email";
          input.autocomplete = "email";
          const hidden = [];
          let resizeObserver = null;
          let fontScale = 1;
          let sizeSource = null;
          const syncFont = () => {
            if (!sizeSource) return;
            const cs = getComputedStyle(sizeSource);
            input.style.fontSize = "calc(2 * " + parseFloat(cs.fontSize) * fontScale + "px)";
            input.style.lineHeight = cs.lineHeight;
          };
          if (enterEmail) {
            const cs = getComputedStyle(textElOf(enterEmail));
            sizeSource = textElOf(signUpBtn || enterEmail);
            input.placeholder = enterEmail.innerText.trim();
            input.style.letterSpacing = cs.letterSpacing;
            input.style.textAlign = "left";
            input.style.padding = "0 0.4em";
            for (const child of Array.from(enterEmail.children)) {
              hidden.push([child, child.style.display]);
              child.style.display = "none";
            }
            enterEmail.appendChild(input);
            syncFont();
            const offsetText = () => {
              const h = input.offsetHeight;
              input.style.transform = "translate(" + -h * TEXT_LEFT + "px," + h * TEXT_DOWN + "px)";
            };
            offsetText();
            if (typeof ResizeObserver !== "undefined") {
              resizeObserver = new ResizeObserver(() => {
                syncFont();
                offsetText();
              });
              resizeObserver.observe(input);
            }
          }

          // initial state: only first view visible; 3rd-text waits for a successful signup
          const secondChars = secondText ? prepareTyping(secondText) : [];
          const successChars = successText ? prepareTyping(successText) : [];
          for (const el of second) conceal(el);

          // shrinks the font until the placeholder fits the input
          const fitPlaceholder = () => {
            fontScale = 1;
            syncFont();
            const cs = getComputedStyle(input);
            const baseFontSize = parseFloat(cs.fontSize);
            if (!baseFontSize) return;
            const avail = input.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
            const ctx = document.createElement("canvas").getContext("2d");
            if (!ctx || avail <= 0) return;
            ctx.font = baseFontSize + "px " + cs.fontFamily;
            ctx.letterSpacing = cs.letterSpacing;
            const width = ctx.measureText(input.placeholder.toUpperCase()).width;
            if (width > avail) {
              fontScale = avail / width;
              syncFont();
            }
          };

          let sending = false;
          const submit = async () => {
            const email = input.value.trim();
            if (sending) return;
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
              setError(true);
              input.focus();
              return;
            }
            setError(false);
            sending = true;
            if (signUpBtn) signUpBtn.style.opacity = "0.5";
            try {
              const res = await localNewsletter({
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, tags: ["ep_magazine_subscriber"] }),
              });
              if (!res.ok) throw new Error(String(res.status));
              input.disabled = true;
              input.blur();
              for (const el of [secondText, ...controls, privacyPolicy]) if (el) hide(el);
              after(FADE_MS, () => successText && typeOut(successText, successChars));
            } catch {
              setError(true);
              input.placeholder = "something went wrong, try again";
              fitPlaceholder();
              if (signUpBtn) signUpBtn.style.opacity = "1";
              sending = false;
            }
          };

          const onHoldOn = (e) => {
            e.preventDefault();
            for (const el of [holdOn, firstText]) if (el) hide(el);
            // 1. text types out, 2. inputs + buttons fade in one after another, 3. legal fades in last
            after(FADE_MS, () => secondText && typeOut(secondText, secondChars));
            after(FADE_MS + TYPE_MS, () => {
              controls.forEach((el, i) => show(el, i * STAGGER_MS));
              if (privacyPolicy) show(privacyPolicy, controls.length * STAGGER_MS + FADE_IN_MS / 2);
            });
          };
          const onSignUp = (e) => {
            e.preventDefault();
            void submit();
          };
          const onKey = (e) => {
            if (e.key === "Enter") void submit();
          };
          const onInput = () => setError(false);

          holdOnBtn?.addEventListener("click", onHoldOn);
          signUpBtn?.addEventListener("click", onSignUp);
          input.addEventListener("keydown", onKey);
          input.addEventListener("input", onInput);

          $.cleanup = () => {
            for (const t of timers) clearTimeout(t);
            cancelAnimationFrame(typeFrame);
            resizeObserver?.disconnect();
            holdOnBtn?.removeEventListener("click", onHoldOn);
            signUpBtn?.removeEventListener("click", onSignUp);
            input.remove();
            style.remove();
            setError(false);
            $.elm.removeAttribute("data-nl");
            for (const [child, display] of hidden) child.style.display = display;
            for (const [child, display, clone] of typed) {
              clone.remove();
              child.style.display = display;
            }
            for (const el of [holdOn, firstText, ...second]) {
              el.style.opacity = el.style.transition = el.style.visibility = el.style.pointerEvents = "";
            }
          };
        }
    },
    desktop: function ($) {
        if (!$.init) {
          $.init = true;

          const q = (id) => $.query_this('[id="' + id + '"]');
          const holdOn = q("hold-on-btn");
          const holdOnBtn = q("hold-on-btn-btn");
          const signUpBtn = q("sign-up-btn");
          const enterEmail = q("enter-email");
          const firstText = q("1st-text");
          const secondText = q("2nd-text");
          const successText = q("3rd-text");
          const covers = q("covers");
          const privacyPolicy = q("privacy-policy");
          const controls = ["sign-up", "enter-email", "sign-up-btn"].map(q).filter(Boolean);
          // everything belonging to the second view
          const second = [secondText, ...controls, privacyPolicy, successText, covers].filter(Boolean);
          const FADE_MS = 300;
          const FADE_IN_MS = 700;
          const FADE_IN_EASE = "cubic-bezier(.25,.1,.25,1)";
          const STAGGER_MS = 120;
          const TYPE_MS = 2000;
          // input text offset, as a fraction of the field height
          const TEXT_DOWN = 0.05;
          const TEXT_LEFT = 0.05;

          const timers = [];
          const after = (ms, fn) => timers.push(setTimeout(fn, ms));
          let typeFrame = 0;

          const scope = "nl" + Math.random().toString(36).slice(2, 8);
          const root = '[data-nl="' + scope + '"] ';
          $.elm.setAttribute("data-nl", scope);
          const style = document.createElement("style");
          style.textContent =
            root + "input,"  + root + "input:hover," + root + "input:focus{" +
            "appearance:none;-webkit-appearance:none;box-sizing:border-box;display:block;width:100%;height:100%;" +
            "cursor:pointer;margin:0;border:0;outline:0;border-radius:0;box-shadow:none;background:transparent!important;" +
            "font-family:TechnoType,Unicode,sans-serif!important;text-transform:uppercase!important;color:#fff!important;}" +
            root + "input::placeholder{font-family:TechnoType,Unicode,sans-serif;text-transform:uppercase;color:#fff;opacity:1}" +
            root + "input:focus::placeholder{color:transparent}" +
            // no hover on the email box, just a pointer
            root + '[id="enter-email"],' + root + '[id="enter-email"]:hover{background-color:transparent!important;cursor:pointer}' +
            root + "input:-webkit-autofill{-webkit-text-fill-color:#fff;transition:background-color 9999s}" +
            root + '[id="enter-email"][data-nl-error]{--border-color:#f00!important}' +
            ["hold-on-btn-btn", "sign-up-btn"]
              .map((id) => {
                const sel = root + '[id="' + id + '"]';
                return (
                  sel + "{cursor:pointer;transition:background-color .15s,color .15s}" +
                  sel + ":hover{background-color:#fff!important;color:#000!important}" +
                  sel + ":hover *{color:#000!important}"
                );
              })
              .join("");
          $.elm.appendChild(style);

          // elements stay in the layout; only opacity/visibility change, so nothing jumps
          const conceal = (el) => {
            el.style.transition = "none";
            el.style.opacity = "0";
            el.style.visibility = "hidden";
            el.style.pointerEvents = "none";
          };
          const show = (el, delay = 0) => {
            el.style.transition = "none";
            el.style.opacity = "0";
            el.style.visibility = "";
            el.style.pointerEvents = "";
            // commit opacity 0 so the transition always has a start value
            void el.offsetWidth;
            el.style.transition = "opacity " + FADE_IN_MS + "ms " + FADE_IN_EASE + " " + delay + "ms";
            el.style.opacity = "1";
          };
          const hide = (el) => {
            el.style.transition = "opacity " + FADE_MS + "ms";
            el.style.opacity = "0";
            el.style.pointerEvents = "none";
            after(FADE_MS, () => (el.style.visibility = "hidden"));
          };

          const setError = (on) => {
            if (!enterEmail) return;
            if (on) enterEmail.setAttribute("data-nl-error", "");
            else enterEmail.removeAttribute("data-nl-error");
          };

          // per-character clones, prepared up front so typing never changes the layout
          const typed = [];
          const prepareTyping = (el) => {
            const chars = [];
            for (const child of Array.from(el.children)) {
              const clone = child.cloneNode(true);
              clone.removeAttribute("id");
              const walker = document.createTreeWalker(clone, NodeFilter.SHOW_TEXT);
              const nodes = [];
              while (walker.nextNode()) nodes.push(walker.currentNode);
              for (const node of nodes) {
                const frag = document.createDocumentFragment();
                for (const ch of node.textContent) {
                  const span = document.createElement("span");
                  span.textContent = ch;
                  span.style.opacity = "0";
                  frag.appendChild(span);
                  chars.push(span);
                }
                node.replaceWith(frag);
              }
              typed.push([child, child.style.display, clone]);
              child.style.display = "none";
              child.after(clone);
            }
            return chars;
          };
          const typeOut = (el, chars) => {
            el.style.transition = "none";
            el.style.opacity = "1";
            el.style.visibility = "";
            el.style.pointerEvents = "";
            const start = performance.now();
            let shown = 0;
            const tick = (now) => {
              const target = Math.min(chars.length, Math.ceil(((now - start) / TYPE_MS) * chars.length));
              while (shown < target) chars[shown++].style.opacity = "1";
              if (shown < chars.length) typeFrame = requestAnimationFrame(tick);
            };
            typeFrame = requestAnimationFrame(tick);
          };

          // the element actually holding a box's text
          const textElOf = (box) => {
            const walker = document.createTreeWalker(box, NodeFilter.SHOW_TEXT);
            while (walker.nextNode()) {
              if (walker.currentNode.textContent.trim()) return walker.currentNode.parentElement;
            }
            return box;
          };

          // email input; font size and line height follow the sign-up button's text, left aligned
          const input = document.createElement("input");
          input.type = "email";
          input.autocomplete = "email";
          const hidden = [];
          let resizeObserver = null;
          let fontScale = 1;
          let sizeSource = null;
          const syncFont = () => {
            if (!sizeSource) return;
            const cs = getComputedStyle(sizeSource);
            input.style.fontSize = parseFloat(cs.fontSize) * fontScale + "px";
            input.style.lineHeight = cs.lineHeight;
          };
          if (enterEmail) {
            const cs = getComputedStyle(textElOf(enterEmail));
            sizeSource = textElOf(signUpBtn || enterEmail);
            input.placeholder = enterEmail.innerText.trim();
            input.style.letterSpacing = cs.letterSpacing;
            input.style.textAlign = "left";
            input.style.padding = "0 0.4em";
            for (const child of Array.from(enterEmail.children)) {
              hidden.push([child, child.style.display]);
              child.style.display = "none";
            }
            enterEmail.appendChild(input);
            syncFont();
            const offsetText = () => {
              const h = input.offsetHeight;
              input.style.transform = "translate(" + -h * TEXT_LEFT + "px," + h * TEXT_DOWN + "px)";
            };
            offsetText();
            if (typeof ResizeObserver !== "undefined") {
              resizeObserver = new ResizeObserver(() => {
                syncFont();
                offsetText();
              });
              resizeObserver.observe(input);
            }
          }

          // initial state: only first view visible; 3rd-text waits for a successful signup
          const secondChars = secondText ? prepareTyping(secondText) : [];
          const successChars = successText ? prepareTyping(successText) : [];
          for (const el of second) conceal(el);

          // shrinks the font until the placeholder fits the input
          const fitPlaceholder = () => {
            fontScale = 1;
            syncFont();
            const cs = getComputedStyle(input);
            const baseFontSize = parseFloat(cs.fontSize);
            if (!baseFontSize) return;
            const avail = input.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
            const ctx = document.createElement("canvas").getContext("2d");
            if (!ctx || avail <= 0) return;
            ctx.font = baseFontSize + "px " + cs.fontFamily;
            ctx.letterSpacing = cs.letterSpacing;
            const width = ctx.measureText(input.placeholder.toUpperCase()).width;
            if (width > avail) {
              fontScale = avail / width;
              syncFont();
            }
          };

          let sending = false;
          const submit = async () => {
            const email = input.value.trim();
            if (sending) return;
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
              setError(true);
              input.focus();
              return;
            }
            setError(false);
            sending = true;
            if (signUpBtn) signUpBtn.style.opacity = "0.5";
            try {
              const res = await localNewsletter({
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, tags: ["ep_magazine_subscriber"] }),
              });
              if (!res.ok) throw new Error(String(res.status));
              input.disabled = true;
              input.blur();
              for (const el of [secondText, ...controls, privacyPolicy]) if (el) hide(el);
              after(FADE_MS, () => successText && typeOut(successText, successChars));
              after(FADE_MS + TYPE_MS, () => covers && show(covers));
            } catch {
              setError(true);
              input.placeholder = "something went wrong, try again";
              fitPlaceholder();
              if (signUpBtn) signUpBtn.style.opacity = "1";
              sending = false;
            }
          };

          const onHoldOn = (e) => {
            e.preventDefault();
            for (const el of [holdOn, firstText]) if (el) hide(el);
            // 1. text types out, 2. inputs + buttons fade in one after another, 3. legal fades in last
            after(FADE_MS, () => secondText && typeOut(secondText, secondChars));
            after(FADE_MS + TYPE_MS, () => {
              controls.forEach((el, i) => show(el, i * STAGGER_MS));
              if (privacyPolicy) show(privacyPolicy, controls.length * STAGGER_MS + FADE_IN_MS / 2);
            });
          };
          const onSignUp = (e) => {
            e.preventDefault();
            void submit();
          };
          const onKey = (e) => {
            if (e.key === "Enter") void submit();
          };
          const onInput = () => setError(false);

          holdOnBtn?.addEventListener("click", onHoldOn);
          signUpBtn?.addEventListener("click", onSignUp);
          input.addEventListener("keydown", onKey);
          input.addEventListener("input", onInput);

          $.cleanup = () => {
            for (const t of timers) clearTimeout(t);
            cancelAnimationFrame(typeFrame);
            resizeObserver?.disconnect();
            holdOnBtn?.removeEventListener("click", onHoldOn);
            signUpBtn?.removeEventListener("click", onSignUp);
            input.remove();
            style.remove();
            setError(false);
            $.elm.removeAttribute("data-nl");
            for (const [child, display] of hidden) child.style.display = display;
            for (const [child, display, clone] of typed) {
              clone.remove();
              child.style.display = display;
            }
            for (const el of [holdOn, firstText, ...second]) {
              el.style.opacity = el.style.transition = el.style.visibility = el.style.pointerEvents = "";
            }
          };
        }
    }
  };

  document.querySelectorAll(".page .cond").forEach(function (cond) {
    var kind = cond.classList.contains("desktop") ? "desktop" : "mobile";
    var holdOn = cond.querySelector('[id="hold-on-btn"]');
    if (!holdOn) return;
    var elm = holdOn.parentElement;
    var $ = {
      elm: elm,
      init: false,
      query_this: function (sel) { return elm.querySelector(sel) || cond.querySelector(sel); }
    };
    scripts[kind]($);
  });
})();
