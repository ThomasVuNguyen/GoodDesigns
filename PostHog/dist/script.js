// Interaction layer for the static PostHog homepage capture. posthog.com is a React app; the server-rendered
// markup in index.html is complete, so this file re-implements just the behaviours the visitor can see:
// hero carousel (+ its three scripted demos), header dropdown menus, cookie toast, rough-notation highlights,
// the "Install with AI" drawer, copy buttons and the US/EU cloud picker.
(() => {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  // The page scrolls inside the desktop "window", not the document. The outermost viewport is first in DOM order.
  const scroller = $('.app-scroll-viewport');

  // The hit counter is rendered only after Gatsby hydrates. Keep the captured
  // segmented digits in the same final row of the reader content.
  const hitCounter = $('#hit-counter');
  const content = $('.reader-content-container > .space-y-12');
  if (hitCounter && content) content.append(hitCounter.content.cloneNode(true));

  // The live page replaces this server-rendered fallback with a playful number.
  const hurry = $$('#cta p').find((p) => p.textContent.includes('companies signed up'));
  if (hurry) hurry.innerHTML = hurry.innerHTML.replace('Tons of', '2354');

  // ?theme=dark|light (posthog.com keeps this in localStorage and defaults to light)
  const themeParam = new URLSearchParams(location.search).get('theme');
  if (themeParam === 'dark' || themeParam === 'light') document.body.className = themeParam;

  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href="#top"]');
    if (!link) return;
    event.preventDefault();
    scroller?.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  });

  // ------------------------------------------------------------------ rough-notation highlights
  const annotateOptions = {
    highlight: { type: 'highlight', color: 'rgba(247, 165, 1, 0.15)', strokeWidth: 1, padding: 2, multiline: true, iterations: 2, animationDuration: 800 },
    underline: { type: 'underline', color: 'currentColor', strokeWidth: 1, multiline: true, iterations: 2, animationDuration: 800 },
  };
  if (window.RoughNotation) {
    for (const el of $$('[data-annotate]')) {
      const annotation = window.RoughNotation.annotate(el, { ...annotateOptions[el.dataset.annotate], animate: !reducedMotion });
      const delay = Number(el.dataset.annotateDelay || 0);
      // Same trigger as posthog.com: draw once the phrase is comfortably in view.
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          observer.disconnect();
          setTimeout(() => annotation.show(), delay);
        },
        { threshold: 0.8, rootMargin: '-15% 0px -15% 0px' }
      );
      observer.observe(el);
    }
  }

  // ------------------------------------------------------------------ hero carousel
  const tablist = $('[role="tablist"]');
  const SLIDE_DURATION = 5000;
  const TABS = {
    'ask-anything': { color: 'bg-purple', text: 'text-white', bar: 'bg-white shadow-[0_0_6px_2px_rgba(255,255,255,0.4)]' },
    slack: { color: 'bg-red', text: 'text-white', bar: 'bg-white shadow-[0_0_6px_2px_rgba(255,255,255,0.4)]' },
    'fix-bugs': { color: 'bg-blue', text: 'text-white', bar: 'bg-white shadow-[0_0_6px_2px_rgba(0,0,0,0.2)]' },
  };
  const demos = {}; // slide value -> { setActive, setPaused }

  if (tablist) {
    const tabs = $$('[role="tab"]', tablist);
    const carouselRoot = tablist.closest('[data-orientation="horizontal"]').parentElement;
    const panels = $$('[role="tabpanel"]', carouselRoot);
    const stage = panels[0].parentElement.parentElement; // coloured frame around the white panel grid
    const pauseButton = $('button[aria-label$="carousel"]', carouselRoot);
    const valueOf = (tab) => tab.id.split('-trigger-')[1];
    const values = tabs.map(valueOf);
    const pauseIcon = pauseButton?.innerHTML;
    // posthog.com ships an IconPlayFilled elsewhere on the page ("Watch a demo"); reuse its glyph for the paused state.
    const playSvg = $$('a svg').find((svg) => svg.parentElement.textContent.includes('Watch a demo'));
    const playIcon = playSvg ? playSvg.outerHTML.replace(/class="[^"]*"/, 'class="LemonIcon size-3.5"') : pauseIcon;

    const state = { active: values[0], userPaused: false, hovering: false, holds: new Set(), visible: !document.hidden };
    const paused = () => state.userPaused || state.hovering || state.holds.size > 0;

    const syncBar = () => {
      const bar = $('[role="tab"][data-state="active"] > div > div', tablist);
      if (bar) bar.style.animationPlayState = paused() ? 'paused' : 'running';
    };
    const carousel = {
      hold(key) { state.holds.add(key); syncBar(); },
      release(key) { state.holds.delete(key); syncBar(); },
    };

    const select = (value) => {
      state.active = value;
      const config = TABS[value];
      tabs.forEach((tab) => {
        const on = valueOf(tab) === value;
        tab.dataset.state = on ? 'active' : 'inactive';
        tab.setAttribute('aria-selected', String(on));
        for (const other of Object.values(TABS)) tab.classList.remove(other.color, other.text);
        tab.classList.toggle('text-secondary', !on);
        tab.classList.toggle('order-last', on);
        tab.classList.toggle('@sm:order-none', on);
        if (on) tab.classList.add(config.color, config.text);
        const track = tab.lastElementChild;
        track.textContent = '';
        if (on) {
          const bar = document.createElement('div');
          bar.className = `h-full rounded-full ${config.bar}`;
          bar.style.animation = `carousel-progress ${SLIDE_DURATION}ms linear forwards`;
          bar.style.animationPlayState = paused() ? 'paused' : 'running';
          bar.addEventListener('animationend', advance);
          track.append(bar);
        }
      });
      for (const other of Object.values(TABS)) stage.classList.remove(other.color);
      stage.classList.add(config.color);
      stage.classList.toggle('@sm:rounded-tl-none', value === values[0]);
      stage.classList.toggle('@sm:rounded-tr-none', value === values[values.length - 1]);
      panels.forEach((panel) => {
        const on = panel.id.endsWith(`-content-${value}`);
        panel.dataset.state = on ? 'active' : 'inactive';
        on ? panel.removeAttribute('inert') : panel.setAttribute('inert', '');
        panel.style.animationDuration = on ? '' : '0s';
      });
      Object.entries(demos).forEach(([key, demo]) => demo.setActive(key === value));
    };
    const advance = () => select(values[(values.indexOf(state.active) + 1) % values.length]);

    tabs.forEach((tab) => tab.addEventListener('click', () => valueOf(tab) !== state.active && select(valueOf(tab))));
    carouselRoot.addEventListener('pointerenter', () => { state.hovering = true; syncBar(); });
    carouselRoot.addEventListener('pointerleave', () => { state.hovering = false; syncBar(); });
    pauseButton?.addEventListener('click', () => {
      state.userPaused = !state.userPaused;
      pauseButton.setAttribute('aria-label', state.userPaused ? 'Resume carousel' : 'Pause carousel');
      pauseButton.innerHTML = state.userPaused ? playIcon : pauseIcon;
      syncBar();
      Object.values(demos).forEach((demo) => demo.setPaused(state.userPaused));
    });
    document.addEventListener('visibilitychange', () => {
      state.visible = !document.hidden;
      Object.values(demos).forEach((demo) => demo.refresh());
    });

    const inView = (el, onChange) => {
      let visible = false;
      new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; onChange(); }, { threshold: 0.25 }).observe(el);
      return () => visible;
    };
    const canRun = () => state.visible && !reducedMotion;

    // ---- Slide 1: scripted "Ask PostHog anything" conversation (20 s, then it holds its final frame)
    const ask = $('.ask-anything-demo');
    if (ask) {
      const QUESTION = 'Why are signups growing, but paid conversions falling?';
      const DURATION = 20000, CONVERSATION_START = 4800, FINDING_START = 15500;
      const TOOLS = [
        { start: 5800, action: 'Compare campaign traffic', result: 'More visitors, same audience' },
        { start: 8200, action: 'Analyze the signup → payment funnel', result: 'Drop-off at mobile checkout' },
        { start: 10600, action: 'Check payments and declines', result: 'Payment declines are unchanged' },
        { start: 13000, action: 'Review recent checkout changes', result: 'A required field was added' },
      ];
      const welcome = $('.ai-demo-welcome', ask), conversation = $('.ai-demo-conversation', ask);
      const composer = $('.ai-demo-composer', ask), prompt = $('.ai-demo-prompt', ask), finding = $('.ai-demo-finding', ask);
      const rows = $$('.ai-demo-tool', ask);
      const placeholder = prompt.innerHTML;
      const spinner = $('.ai-demo-tool-status', rows[0]).innerHTML;
      const checkSvg = $('ul.not-prose li svg');
      const check = checkSvg ? checkSvg.outerHTML.replace(/class="[^"]*"/, 'class="LemonIcon text-green"') : '✓';
      let elapsed = 0, active = true, userPaused = false, timer = null;
      const visible = inView(ask, () => refresh());

      const render = (time) => {
        const talking = time >= CONVERSATION_START, found = time >= FINDING_START;
        ask.dataset.phase = found ? 'finding' : talking ? 'tools' : 'composer';
        welcome.dataset.visible = String(!talking);
        conversation.dataset.visible = String(talking);
        composer.dataset.submitting = String(time >= 4200 && !talking);
        finding.dataset.visible = String(found);
        const typed = QUESTION.slice(0, Math.floor(Math.max(0, time - 1500) / 45));
        const promptHTML = typed
          ? `${typed}${time < 4200 ? '<span class="ai-demo-caret inline-block h-[1em] ml-[0.15em] border-r border-current align-[-0.12em]"></span>' : ''}`
          : placeholder;
        if (prompt.dataset.frame !== promptHTML) { prompt.innerHTML = promptHTML; prompt.dataset.frame = promptHTML; }
        rows.forEach((row, i) => {
          const started = time >= TOOLS[i].start, done = time >= TOOLS[i].start + 1800;
          row.dataset.visible = String(started);
          if (row.dataset.done !== String(done)) {
            row.dataset.done = String(done);
            $('.ai-demo-tool-copy span', row).textContent = done ? TOOLS[i].result : TOOLS[i].action;
            $('.ai-demo-tool-status', row).innerHTML = done ? check : spinner;
          }
        });
      };
      const refresh = () => {
        const finished = elapsed >= DURATION;
        const running = active && visible() && canRun() && !userPaused && !finished;
        ask.dataset.running = String(running);
        active && !finished && !reducedMotion ? carousel.hold('ask') : carousel.release('ask');
        clearInterval(timer);
        if (!running) return;
        let previous = performance.now();
        timer = setInterval(() => {
          const now = performance.now();
          elapsed = Math.min(DURATION, elapsed + now - previous);
          previous = now;
          render(elapsed);
          if (elapsed >= DURATION) refresh();
        }, 50);
      };
      demos['ask-anything'] = {
        setActive(on) { active = on; if (on) { elapsed = 0; render(0); } refresh(); },
        setPaused(on) { userPaused = on; refresh(); },
        refresh,
      };
      if (reducedMotion) { elapsed = DURATION; render(DURATION); }
      demos['ask-anything'].setActive(true);
    }

    // ---- Slide 2: product-context diagram (pure CSS animation, only gated by visibility)
    const context = $('.product-context-demo');
    if (context) {
      let active = false, userPaused = false;
      const visible = inView(context, () => refresh());
      const refresh = () => { context.dataset.running = String(active && visible() && !userPaused && !reducedMotion); };
      demos.slack = { setActive(on) { active = on; refresh(); }, setPaused(on) { userPaused = on; refresh(); }, refresh };
      refresh();
    }

    // ---- Slide 3: self-driving inbox (CSS keyframes; finishes when the first report's timeline ends)
    const inbox = $('.inbox-demo');
    if (inbox) {
      let active = false, userPaused = false, finished = false;
      const visible = inView(inbox, () => refresh());
      const refresh = () => {
        inbox.dataset.active = String(active);
        inbox.dataset.finished = String(finished);
        inbox.dataset.running = String(active && visible() && canRun() && !userPaused && !finished);
        active && !finished && !reducedMotion ? carousel.hold('inbox') : carousel.release('inbox');
      };
      $('.inbox-demo-item', inbox)?.addEventListener('animationend', (event) => {
        if (event.animationName === 'inbox-arrival') { finished = true; refresh(); }
      });
      demos['fix-bugs'] = { setActive(on) { active = on; if (on) finished = false; refresh(); }, setPaused(on) { userPaused = on; refresh(); }, refresh };
      refresh();
    }

    select(values[0]);
  }

  // ------------------------------------------------------------------ header dropdown menus
  const templates = Object.fromEntries($$('template[id^="menu-"]').map((t) => [t.id.slice(5), t]));
  const triggers = $$('button[role="menuitem"][aria-haspopup="menu"]');
  let openMenu = null; // { trigger, wrapper }

  const closeMenu = () => {
    if (!openMenu) return;
    openMenu.wrapper.remove();
    openMenu.trigger.dataset.state = 'closed';
    openMenu.trigger.setAttribute('aria-expanded', 'false');
    openMenu = null;
  };
  const showMenu = (trigger) => {
    const key = trigger.textContent.trim().toLowerCase() || 'mobile';
    const template = templates[key];
    if (!template) return;
    closeMenu();
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'position:fixed;z-index:60;';
    wrapper.append(template.content.cloneNode(true));
    document.body.append(wrapper);
    const rect = trigger.getBoundingClientRect();
    const width = wrapper.firstElementChild.getBoundingClientRect().width;
    const left = rect.left + Number(template.dataset.dx || -3);
    wrapper.style.left = `${Math.max(8, Math.min(left, innerWidth - width - 8))}px`;
    wrapper.style.top = `${rect.bottom + Number(template.dataset.dy || 5)}px`;
    trigger.dataset.state = 'open';
    trigger.setAttribute('aria-expanded', 'true');
    openMenu = { trigger, wrapper };
    wrapper.addEventListener('pointermove', (event) => {
      const item = event.target.closest('[role^="menuitem"]');
      $$('[data-highlighted]', wrapper).forEach((el) => el !== item && el.removeAttribute('data-highlighted'));
      item?.setAttribute('data-highlighted', '');
    });
    wrapper.addEventListener('pointerleave', () => $$('[data-highlighted]', wrapper).forEach((el) => el.removeAttribute('data-highlighted')));
    wrapper.addEventListener('click', (event) => event.target.closest('a') && closeMenu());
  };
  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => (openMenu?.trigger === trigger ? closeMenu() : showMenu(trigger)));
    // Menubar behaviour: once one menu is open, hovering a neighbour switches to it.
    trigger.addEventListener('pointerenter', () => openMenu && openMenu.trigger !== trigger && showMenu(trigger));
  });
  document.addEventListener('pointerdown', (event) => {
    if (openMenu && !openMenu.wrapper.contains(event.target) && !event.target.closest('button[role="menuitem"][aria-haspopup="menu"]')) closeMenu();
  });
  document.addEventListener('keydown', (event) => event.key === 'Escape' && closeMenu());
  addEventListener('resize', closeMenu);

  // ------------------------------------------------------------------ cookie toast
  const toast = $('#cookie-toast');
  if (toast) {
    const list = document.createElement('ol');
    list.className = 'fixed bottom-4 right-4 z-50 flex flex-col gap-2 sm:w-[390px] max-w-[calc(100vw_-_2rem)] m-0 list-none outline-none';
    list.append(toast.content.cloneNode(true));
    document.body.append(list);
    list.addEventListener('click', (event) => {
      const item = event.target.closest('li');
      if (!item || !event.target.closest('button')) return;
      item.dataset.state = 'closed';
      setTimeout(() => item.remove(), 200);
    });
  }

  // ------------------------------------------------------------------ small controls
  // "Install with AI" opens the wizard command drawer under the hero card.
  const installButton = $$('button').find((b) => b.textContent.trim() === 'Install with AI');
  const drawer = installButton?.closest('.grid')?.parentElement && $('.grid.grid-rows-\\[0fr\\]', installButton.closest('.grid').parentElement.parentElement);
  if (installButton && drawer) {
    let open = false;
    installButton.addEventListener('click', () => {
      open = !open;
      drawer.style.gridTemplateRows = open ? '1fr' : '';
    });
  }

  for (const button of $$('button[aria-label="Copy to clipboard"]')) {
    button.addEventListener('click', () => {
      const command = button.closest('div')?.querySelector('pre')?.textContent.trim();
      if (command) navigator.clipboard?.writeText(command).catch(() => {});
    });
  }

  // US / EU cloud picker: swap the selected styling between the two buttons.
  const cloud = ['US (Virginia)', 'EU (Frankfurt)'].map((label) => $$('button').find((b) => b.textContent.trim() === label));
  if (cloud.every(Boolean)) {
    cloud.forEach((button) => button.addEventListener('click', () => {
      const other = cloud.find((b) => b !== button);
      if (button.className === other.className) return;
      const selected = button.className;
      button.className = other.className;
      other.className = selected;
    }));
  }
})();
