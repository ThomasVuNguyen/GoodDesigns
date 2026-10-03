/* Local stand-in for the reference page's client runtime: scroll reveals + interactions. */
(function () {
  'use strict';
  /* diagnostic: runtime errors are collected here so a browser check can assert there are none */
  window.__townErrors = [];
  window.addEventListener('error', function (e) { window.__townErrors.push(String(e.message || e)); });
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var text = function (el) { return (el.textContent || '').replace(/\s+/g, ' ').trim(); };
  /* innermost <section>s whose text matches (the page nests sections and ships desktop + mobile copies) */
  function sectionsMatching(re) {
    var all = $$('section').filter(function (s) { return re.test(text(s)); });
    return all.filter(function (s) { return !all.some(function (o) { return o !== s && s.contains(o); }); });
  }

  /* ---- reveal on scroll: SSR ships these nodes hidden; show them as they enter the viewport ---- */
  var hidden = $$('[style*="opacity:0"]').filter(function (el) {
    if (!/(^|;)\s*opacity:\s*0(;|$)/.test(el.getAttribute('style'))) return false;
    if (el.tagName === 'IMG') return false;                               /* image fades are handled below */
    if (/brand:absolute/.test(el.className || '')) return false;          /* stacked alternates stay hidden */
    return true;
  });
  function show(el) {
    el.style.opacity = '1';
    if (el.style.filter) el.style.filter = 'none';
    if (/scale\(0/.test(el.style.transform)) el.style.transform = 'none';
    if (el.style.clipPath) el.style.clipPath = 'none';
    if (!el.style.transition) el.style.transition = 'opacity 400ms ease-out, filter 400ms ease-out, transform 400ms ease-out';
  }
  if (reduce || !('IntersectionObserver' in window)) hidden.forEach(show);
  else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { show(e.target); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    hidden.forEach(function (el) { io.observe(el); });
  }

  /* ---- images: the runtime faded real images in over a pixelated preview layer ---- */
  $$('img').forEach(function (img) {
    var c = img.className || '';
    if (/brand:opacity-0/.test(c)) { img.style.opacity = '1'; img.style.transform = 'none'; }
    else if (/steps\(4,end\)/.test(c) && /brand:opacity-100/.test(c) && img.getAttribute('aria-hidden') === 'true') img.style.opacity = '0';
  });

  /* ---- hero: cycle the portrait slot inside the headline ---- */
  var cycle = $$('img[alt="A person paired with Bud"]');
  var pool = $$('img[src*="product-section-avatars"]').map(function (i) { return i.getAttribute('src'); })
    .filter(function (s, i, a) { return a.indexOf(s) === i; });
  if (cycle.length && pool.length && !reduce) {
    var n = 0;
    setInterval(function () {
      n = (n + 1) % pool.length;
      cycle.forEach(function (img) {
        img.style.opacity = '0'; img.style.transform = 'scale(.95)';
        setTimeout(function () { img.src = pool[n]; img.style.opacity = '1'; img.style.transform = 'none'; }, 300);
      });
    }, 2600);
  }

  /* ---- generic pressed-state chips that filter a list of cards ---- */
  function setPressed(chips, active) { chips.forEach(function (c) { c.setAttribute('aria-pressed', c === active ? 'true' : 'false'); }); }
  function cardOf(leaf, minSiblings) {
    var el = leaf;
    while (el && el.parentElement && el.parentElement.children.length < minSiblings) el = el.parentElement;
    return el;
  }
  function chipRow(section, labels) {
    return $$('button', section).filter(function (b) { return labels.indexOf(text(b)) > -1; });
  }

  /* pair each card strip with its own chip row (desktop + mobile copies live in one section) */
  function wireFilters(section, seedSel, seedText, minSiblings, labels, matches) {
    var seeds = $$(seedSel, section).filter(function (el) { return text(el) === seedText; });
    var groups = [];
    chipRow(section, labels).forEach(function (chip) {
      var g = groups.filter(function (x) { return x.el === chip.parentElement; })[0];
      if (!g) { g = { el: chip.parentElement, chips: [] }; groups.push(g); }
      g.chips.push(chip);
    });
    seeds.forEach(function (seed, i) {
      var cards = [].slice.call(cardOf(seed, minSiblings).parentElement.children);
      var g = groups[i] || groups[0]; if (!g) return;
      g.chips.forEach(function (chip) {
        chip.addEventListener('click', function () {
          setPressed(g.chips, chip);
          cards.forEach(function (card) { card.style.display = matches(text(chip), card) ? '' : 'none'; });
        });
      });
    });
  }

  /* routines: chips filter the horizontal card strip by its category line */
  var ROUTINE_CAT = { 'Inbox': 'Manage Your Inbox', 'Calendar': 'Manage Your Calendar', 'Meeting Prep': 'Prepare for Meetings', 'Stay Informed': 'Stay Informed', 'Relationships': 'Nurture Relationships' };
  sectionsMatching(/ready-made Routine/).forEach(function (section) {
    wireFilters(section, 'h3', 'Auto-inbox', 10, ['All', 'Inbox', 'Calendar', 'Meeting Prep', 'Stay Informed', 'Relationships'],
      function (label, card) { var want = ROUTINE_CAT[label]; return !want || text(card).indexOf(want) > -1; });
  });

  /* integrations: chips filter the grid using a local category table */
  var INTEGRATION_CAT = {
    'Messaging': 'Gmail|Slack Bot|Slack Persona|Telegram|Text Messaging|WhatsApp|Outlook|Front|Intercom',
    'Calendar': 'Google Calendar|Calendly|Cal.com|Outlook',
    'Meetings': 'Zoom|Fathom|Fireflies|Granola|Gong',
    'CRM': 'Affinity|Attio|Copper CRM|HubSpot|Salesforce|Pipedrive|Clay',
    'File Storage': 'Google Drive|Google Docs|Google Sheets|Dropbox|Box|Notion|Coda|Airtable',
    'Project Management': 'Asana|ClickUp|Linear|Jira|Monday.com|Todoist|Notion',
    'Data & Analytics': 'Google Analytics|PostHog|Hex|Sentry',
    'Development': 'GitHub|GitLab|Cursor|Supabase|Supabase Management API|Sentry|Linear',
    'Finance': 'Brex|Ramp|Stripe|QuickBooks Online|Xero Accounting|Link'
  };
  sectionsMatching(/Browse all integrations/).forEach(function (section) {
    wireFilters(section, 'p', 'Gmail', 20, ['All', 'Messaging', 'Calendar', 'Meetings', 'CRM', 'File Storage', 'Project Management', 'Data & Analytics', 'Development', 'Finance'],
      function (label, card) {
        var names = INTEGRATION_CAT[label]; if (!names) return true;
        var p = $('p', card); return names.split('|').indexOf(p ? text(p) : '') > -1;
      });
  });

  /* ---- profile widget: persona tabs swap the tagline and an original stand-in wiki page ---- */
  var PERSONAS = {
    'Business Owner': { lines: ['Her shoots,', 'her deadlines,', 'the way she words things.'], name: 'Rowan Hale',
      body: ['Rowan Hale runs a small photography studio in Portland, taking on weddings, portraits, and brand shoots. Booking, editing, invoicing, and client email all land on one desk.',
             'Most weeks revolve around shoot days on Thursdays and Fridays, which is why replies tend to arrive in the evening. Deposits are collected up front and the balance follows delivery.'],
      goals: 'Book two more brand clients each quarter without adding an editor, so turnaround on galleries has to shrink from ten days to five.' },
    'Recruiting': { lines: ['Her candidates,', 'her calendars,', 'the way she checks in.'], name: 'Devon Park',
      body: ['Devon Park leads hiring for a growing logistics company, running searches for operations and finance roles. Sourcing notes, interview loops, and offers all pass through one shared tracker.',
             'Screens are batched into Tuesday mornings, and feedback requests go out the same afternoon so hiring managers stay on schedule.'],
      goals: 'Cut the time from first screen to offer to under three weeks while keeping every candidate updated along the way.' },
    'Sales': { lines: ['His accounts,', 'his quarter,', 'the way he follows through.'], name: 'Imani Cole',
      body: ['Imani Cole sells software to mid-sized retailers and owns a pipeline of about forty open deals. Calls, demos, and proposals are logged as they happen.',
             'He blocks Mondays for pipeline review and sends a recap email within an hour of every meeting.'],
      goals: 'Close the quarter at one and a half times quota by moving stalled deals forward within two days of the last touch.' }
  };
  function renderDoc(host, p) {
    host.innerHTML = '';
    var doc = document.createElement('div'); doc.className = 'tn-doc';
    var h = document.createElement('h3'); h.className = 'tn-doc-title'; h.textContent = p.name; doc.appendChild(h);
    var pill = document.createElement('div'); pill.className = 'tn-doc-pill';
    pill.innerHTML = '<b>Recent updates</b><span>View all updates →</span><i aria-hidden="true"></i>'; doc.appendChild(pill);
    var oh = document.createElement('h4'); oh.textContent = 'Overview'; doc.appendChild(oh);
    p.body.forEach(function (t) { var el = document.createElement('p'); el.textContent = t; doc.appendChild(el); });
    var gh = document.createElement('h4'); gh.textContent = 'Goals'; doc.appendChild(gh);
    var gp = document.createElement('p'); gp.textContent = p.goals; doc.appendChild(gp);
    host.appendChild(doc);
  }
  var docHosts = $$('nav').filter(function (n) { return /Goals/.test(text(n)) && /Projects/.test(text(n)); })
    .map(function (n) { var pane = n.parentElement.children[1]; return pane && pane.children[1]; }).filter(Boolean);
  var taglines = $$('p').filter(function (p) { return /^Just like that\./.test(text(p)); });
  var personaBtns = $$('button').filter(function (b) { return PERSONAS[text(b)]; });
  function setPersona(label) {
    var p = PERSONAS[label];
    personaBtns.forEach(function (b) { b.setAttribute('aria-pressed', text(b) === label ? 'true' : 'false'); });
    taglines.forEach(function (el) { el.innerHTML = 'Just like that.<br>' + p.lines.join('<br>'); });
    docHosts.forEach(function (h) { renderDoc(h, p); });
  }
  personaBtns.forEach(function (b) { b.addEventListener('click', function () { setPersona(text(b)); }); });
  if (docHosts.length) setPersona('Business Owner');

  /* ---- floating "Ask <Townie> anything" bar: typewriter prompts + name that follows the section in view ---- */
  (function () {
    var bar = document.createElement('div');
    bar.className = 'tn-ask'; bar.setAttribute('aria-hidden', 'true');
    bar.innerHTML = '<p class="tn-ask-label">Ask <b>Bud</b> anything</p><div class="tn-ask-box"><span class="tn-ask-text"></span><span class="tn-ask-send"></span></div>';
    document.body.appendChild(bar);
    var nameEl = $('b', bar), textEl = $('.tn-ask-text', bar);
    var PROMPTS = ['Plan the week around my two client calls', 'Draft a reply to the vendor thread', 'Summarize what changed in the budget sheet'];
    var pi = 0, ci = 0, dir = 1, hold = 0;
    function tick() {
      if (reduce) { textEl.textContent = PROMPTS[0]; return; }
      var p = PROMPTS[pi];
      if (hold > 0) { hold--; return; }
      ci += dir; textEl.textContent = p.slice(0, ci);
      if (dir === 1 && ci >= p.length) { dir = -1; hold = 28; }
      else if (dir === -1 && ci <= 0) { dir = 1; pi = (pi + 1) % PROMPTS.length; hold = 6; }
    }
    setInterval(tick, 55); tick();
    /* which Townie is "speaking" depends on which showcase section is on screen */
    var SPEAKERS = [['Profile', 'Bo'], ['To-do Lists', 'Claus'], ['Routines', 'Snap'], ['Suggestions', 'Cliff'], ['Town Teams', 'Wisp']];
    var markers = SPEAKERS.map(function (sp) {
      var btn = $$('button').filter(function (b) { return text(b) === sp[0] && b.closest('section'); })[0];
      return btn ? { el: btn.closest('section'), name: sp[1] } : null;
    }).filter(Boolean);
    function update() {
      var mid = window.innerHeight * 0.5, name = 'Bud';
      markers.forEach(function (m) { var r = m.el.getBoundingClientRect(); if (r.top < mid && r.bottom > mid) name = m.name; });
      if (nameEl.textContent !== name) nameEl.textContent = name;
      /* hide over the closing call-to-action and footer */
      var foot = $('footer'); var fr = foot ? foot.getBoundingClientRect() : null;
      bar.classList.toggle('tn-ask-off', !!fr && fr.top < window.innerHeight);
    }
    window.addEventListener('scroll', update, { passive: true }); update();
  })();

  /* ---- header dropdowns (Features / Solutions) ---- */
  var MENUS = {
    Features: [['Decks', '/features/decks'], ['Security', '/features/security'], ['Routines', '/routines'], ['Integrations', '/integrations']],
    Solutions: [['Business owners', '/solutions'], ['Recruiting', '/solutions'], ['Sales', '/solutions']]
  };
  var open = null;
  function closeMenu() {
    if (!open) return;
    open.btn.setAttribute('aria-expanded', 'false');
    if (open.panel.parentNode) open.panel.parentNode.removeChild(open.panel);
    open = null;
  }
  $$('header button[aria-haspopup="menu"]').forEach(function (btn) {
    var items = MENUS[text(btn)]; if (!items) return;
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var same = open && open.btn === btn; closeMenu(); if (same) return;
      var panel = document.createElement('div');
      panel.className = 'tn-menu'; panel.setAttribute('role', 'menu');
      items.forEach(function (it) {
        var a = document.createElement('a'); a.setAttribute('role', 'menuitem'); a.textContent = it[0]; a.href = 'https://www.town.com' + it[1]; panel.appendChild(a);
      });
      var host = btn.closest('[class*="relative"]') || btn.parentElement; host.style.position = 'relative'; host.appendChild(panel);
      btn.setAttribute('aria-expanded', 'true'); open = { btn: btn, panel: panel };
    });
  });
  /* ---- mobile menu: full-screen panel under the sticky header ---- */
  (function () {
    var btn = $('header button[aria-label="Open menu"]'); if (!btn) return;
    var LINKS = [['Features', '/features/decks'], ['Solutions', '/solutions'], ['Routines', '/routines'], ['Integrations', '/integrations'], ['Pricing', '/pricing']];
    var panel = document.createElement('div');
    panel.className = 'tn-mobile'; panel.hidden = true; panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-label', 'Menu');
    var nav = document.createElement('nav');
    LINKS.forEach(function (l) { var a = document.createElement('a'); a.href = 'https://www.town.com' + l[1]; a.textContent = l[0]; nav.appendChild(a); });
    var foot = document.createElement('div'); foot.className = 'tn-mobile-foot';
    [['Get the Mac app', '/', 'tn-btn-ghost'], ['Sign up', '/sign-up', 'tn-btn-solid'], ['Sign in', '/sign-in', 'tn-btn-text']].forEach(function (l) {
      var a = document.createElement('a'); a.href = 'https://www.town.com' + l[1]; a.className = l[2]; a.textContent = l[0]; foot.appendChild(a);
    });
    panel.appendChild(nav); panel.appendChild(foot); document.body.appendChild(panel);
    function setOpen(on) {
      panel.hidden = !on; btn.setAttribute('aria-expanded', on ? 'true' : 'false'); btn.setAttribute('aria-label', on ? 'Close menu' : 'Open menu');
      document.documentElement.classList.toggle('tn-menu-open', on);
    }
    btn.addEventListener('click', function (e) { e.stopPropagation(); setOpen(panel.hidden); });
    panel.addEventListener('click', function (e) { if (e.target.tagName === 'A') setOpen(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !panel.hidden) { setOpen(false); btn.focus(); } });
    window.matchMedia('(min-width: 768px)').addEventListener('change', function (m) { if (m.matches) setOpen(false); });
  })();

  document.addEventListener('click', closeMenu);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });
})();
