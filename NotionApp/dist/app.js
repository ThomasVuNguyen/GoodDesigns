import { ICONS } from './icons.js';
import { seed, WORKSPACE, TEAMSPACE, AI_NAME, EMOJIS, COVERS } from './data.js';

/* ================================================================ helpers */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const ic = (name, cls = '') => {
  const def = ICONS[name];
  if (!def) return '';
  return `<svg viewBox="${def[0]}"${cls ? ` class="${cls}"` : ''} aria-hidden="true">${def[1]}</svg>`;
};
// Block-type glyphs for the slash and turn-into menus (drawn for this clone).
const G = {
  text: ic('textFormat'),
  h1: '<span class="h-glyph">H1</span>', h2: '<span class="h-glyph">H2</span>', h3: '<span class="h-glyph">H3</span>',
  bullet: '<svg viewBox="0 0 20 20"><circle cx="4.5" cy="6" r="1.4"/><circle cx="4.5" cy="10" r="1.4"/><circle cx="4.5" cy="14" r="1.4"/><path d="M8 5.4h9v1.2H8zM8 9.4h9v1.2H8zM8 13.4h9v1.2H8z"/></svg>',
  number: '<svg viewBox="0 0 20 20"><path d="M3.6 4.2h1.3v4H3.9V5.3l-.6.2V4.6zM3 12.3c0-.8.6-1.3 1.4-1.3s1.3.5 1.3 1.1c0 .5-.3.9-.9 1.4l-.5.4h1.5v.9H3.1v-.8l1.2-1c.4-.3.5-.5.5-.8 0-.3-.2-.4-.4-.4-.3 0-.5.2-.5.5zM8 5.4h9v1.2H8zM8 12.4h9v1.2H8z"/></svg>',
  todo: '<svg viewBox="0 0 20 20"><path d="M5.5 3.5h9a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-9a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2m0 1.2a.8.8 0 0 0-.8.8v9c0 .44.36.8.8.8h9a.8.8 0 0 0 .8-.8v-9a.8.8 0 0 0-.8-.8z"/><path d="m8.6 12.6-2.3-2.3.85-.85 1.45 1.45 4.25-4.25.85.85z"/></svg>',
  toggle: '<svg viewBox="0 0 20 20"><path d="M4 5.2 8 8 4 10.8z"/><path d="M10 7.4h7v1.2h-7zM6 13.4h11v1.2H6z"/></svg>',
  page: ic('page'),
  callout: '<svg viewBox="0 0 20 20"><path d="M4.5 3.5h11a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2m0 1.2a.8.8 0 0 0-.8.8v9c0 .44.36.8.8.8h11a.8.8 0 0 0 .8-.8v-9a.8.8 0 0 0-.8-.8z"/><circle cx="6.8" cy="8" r="1.3"/><path d="M9.5 7.4h5v1.2h-5zM6 11.4h8.5v1.2H6z"/></svg>',
  quote: '<svg viewBox="0 0 20 20"><path d="M4 3.5h1.4v13H4zM8 5.4h9v1.2H8zM8 9.4h9v1.2H8zM8 13.4h6v1.2H8z"/></svg>',
  divider: '<svg viewBox="0 0 20 20"><path d="M2.5 9.4h15v1.2h-15z"/><path d="M5 4.4h10v1.2H5zM5 14.4h10v1.2H5z" opacity=".35"/></svg>',
  code: '<svg viewBox="0 0 20 20"><path d="m7.1 5.6.9.85L4.4 10 8 13.55l-.9.85L2.6 10zm5.8 0L17.4 10l-4.5 4.4-.9-.85L15.6 10 12 6.45z"/></svg>',
  trash: '<svg viewBox="0 0 20 20"><path d="M8.2 2.6h3.6c.7 0 1.3.56 1.3 1.25v.75h3.3a.6.6 0 0 1 0 1.2h-.75l-.7 9.6a2 2 0 0 1-2 1.85H7.05a2 2 0 0 1-2-1.85l-.7-9.6H3.6a.6.6 0 0 1 0-1.2h3.3v-.75c0-.7.6-1.25 1.3-1.25m-.1 2h3.8v-.75H8.1zm-2.55 1.2.7 9.5c.03.42.38.75.8.75h5.9c.42 0 .77-.33.8-.75l.7-9.5z"/></svg>',
  color: '<svg viewBox="0 0 20 20"><path d="M5.606 2.669a1.55 1.55 0 0 0-1.55 1.55v.379l-.069-.004h-.693a.55.55 0 0 0 0 1.1h.693l.069-.004v.379c0 .856.694 1.55 1.55 1.55h8.787a1.55 1.55 0 0 0 1.55-1.55v-.375h.3c.208 0 .376.168.376.375v2.023a.375.375 0 0 1-.375.375h-5.32c-.814 0-1.474.66-1.474 1.475v.592a1.55 1.55 0 0 0-1.463 1.547v3.7c0 .856.694 1.55 1.55 1.55h.925a1.55 1.55 0 0 0 1.55-1.55v-3.7a1.55 1.55 0 0 0-1.462-1.547v-.592c0-.207.168-.375.375-.375h5.319c.814 0 1.475-.66 1.475-1.475V6.069c0-.815-.66-1.475-1.475-1.475h-.3v-.375a1.55 1.55 0 0 0-1.55-1.55zm-.3 1.55a.3.3 0 0 1 .3-.3h8.787a.3.3 0 0 1 .3.3v1.85a.3.3 0 0 1-.3.3H5.606a.3.3 0 0 1-.3-.3z"/></svg>',
  arrowMove: '<svg viewBox="0 0 20 20"><path d="M11.6 4.4a.6.6 0 0 1 .85 0l4.6 4.6a.6.6 0 0 1 0 .85l-4.6 4.6a.6.6 0 1 1-.85-.85l3.58-3.57H5.5a1.7 1.7 0 0 0-1.7 1.7v3.1a.6.6 0 0 1-1.2 0v-3.1a2.9 2.9 0 0 1 2.9-2.9h9.68L11.6 5.25a.6.6 0 0 1 0-.85"/></svg>',
  check: '<svg viewBox="0 0 16 16"><path d="M6.3 11.7 2.6 8l1-1 2.7 2.7 6.1-6.1 1 1z"/></svg>',
  sun: '<svg viewBox="0 0 20 20"><path d="M10 6.2a3.8 3.8 0 1 1 0 7.6 3.8 3.8 0 0 1 0-7.6m0 1.2a2.6 2.6 0 1 0 0 5.2 2.6 2.6 0 0 0 0-5.2M9.4 2h1.2v2.4H9.4zm0 13.6h1.2V18H9.4zM2 9.4h2.4v1.2H2zm13.6 0H18v1.2h-2.4zM4.05 4.9l.85-.85 1.7 1.7-.85.85zm9.35 9.35.85-.85 1.7 1.7-.85.85zM4.05 15.1l1.7-1.7.85.85-1.7 1.7zm9.35-9.35 1.7-1.7.85.85-1.7 1.7z"/></svg>',
  reset: '<svg viewBox="0 0 20 20"><path d="M10 3.4a6.6 6.6 0 1 1-6.27 8.65.6.6 0 0 1 1.14-.37A5.4 5.4 0 1 0 6.1 6.2h2.15a.6.6 0 0 1 0 1.2H4.6a.6.6 0 0 1-.6-.6V3.15a.6.6 0 0 1 1.2 0v2.1A6.58 6.58 0 0 1 10 3.4"/></svg>',
};

const TYPES = [
  { key: 'text', name: 'Text', hint: '', ph: 'Press / to insert blocks' },
  { key: 'h1', name: 'Heading 1', hint: '#', ph: 'Heading 1' },
  { key: 'h2', name: 'Heading 2', hint: '##', ph: 'Heading 2' },
  { key: 'h3', name: 'Heading 3', hint: '###', ph: 'Heading 3' },
  { key: 'bullet', name: 'Bulleted list', hint: '-', ph: 'List' },
  { key: 'number', name: 'Numbered list', hint: '1.', ph: 'List' },
  { key: 'todo', name: 'To-do list', hint: '[]', ph: 'To-do' },
  { key: 'toggle', name: 'Toggle list', hint: '>', ph: 'Toggle' },
  { key: 'page', name: 'Page', hint: '' },
  { key: 'callout', name: 'Callout', hint: '', ph: 'Type something…' },
  { key: 'quote', name: 'Quote', hint: '"', ph: 'Empty quote' },
  { key: 'divider', name: 'Divider', hint: '---' },
  { key: 'code', name: 'Code', hint: '```', ph: '' },
];
const TYPE = Object.fromEntries(TYPES.map((x) => [x.key, x]));
const LEAFLESS = new Set(['divider', 'page']);
const LISTY = new Set(['bullet', 'number', 'todo', 'toggle']);
const COLORS = ['gray', 'brown', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'red'];

const uid = () => Math.random().toString(36).slice(2, 9);
const nowTime = () => {
  const d = new Date();
  const month = d.toLocaleString('en-US', { month: 'long' });
  const time = d.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit' });
  return `${month} ${d.getDate()} at ${time}`;
};

/* ================================================================ state */
const KEY = 'notion-clone-state';
let S;
function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.v === seed().v) return parsed;
    }
  } catch (e) { /* storage unavailable */ }
  return seed();
}
let saveTimer = 0;
function save() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* ignore */ }
  }, 250);
}
S = load();

const page = (pid) => S.pages[pid];
const alive = (pid) => S.pages[pid] && !S.pages[pid].trash;
const titleOf = (p) => (p && p.title) || 'New page';

function walkBlocks(list, fn, parent = null) {
  for (let i = 0; i < list.length; i++) {
    const blk = list[i];
    if (fn(blk, list, i, parent) === false) return false;
    if (blk.children && walkBlocks(blk.children, fn, blk) === false) return false;
  }
  return true;
}
function findBlock(p, bid) {
  let hit = null;
  walkBlocks(p.blocks, (blk, list, index, parent) => {
    if (blk.id === bid) { hit = { blk, list, index, parent }; return false; }
  });
  return hit;
}
function childPages(pid) {
  const out = [];
  const p = page(pid);
  if (!p) return out;
  walkBlocks(p.blocks, (blk) => { if (blk.type === 'page' && alive(blk.pageId) && page(blk.pageId).parent === pid) out.push(blk.pageId); });
  return out;
}
function ancestors(pid) {
  const chain = [];
  let cur = page(pid);
  let guard = 0;
  while (cur && guard++ < 20) {
    chain.unshift(cur);
    if (cur.parent === 'team' || cur.parent === 'private') break;
    cur = page(cur.parent);
  }
  return { root: chain[0] ? chain[0].parent : 'private', chain };
}
function touch(p) {
  p.edited = 'just now';
  const label = $('.edited');
  if (label && route.pid === p.id) label.textContent = 'Edited just now';
  save();
}

/* ================================================================ routing */
let route = {};
function parseRoute() {
  const h = location.hash.replace(/^#\/?/, '');
  const [kind, rest] = [h.split('/')[0], h.split('/').slice(1).join('/')];
  if (kind === 'p' && alive(rest)) return { view: 'page', pid: rest };
  if (kind === 'ai') return { view: 'newchat' };
  if (kind === 'chat' && S.chats[rest]) return { view: 'chat', cid: rest };
  return { view: 'page', pid: 'health-science-lab' };
}
function go(hash) {
  if (location.hash === hash) render();
  else location.hash = hash;
}
window.addEventListener('hashchange', () => render());

/* ================================================================ theme */
const mq = matchMedia('(prefers-color-scheme: dark)');
function applyTheme() {
  const theme = S.ui.theme || (mq.matches ? 'dark' : 'light');
  document.documentElement.dataset.theme = theme;
}
mq.addEventListener?.('change', applyTheme);
const qsTheme = new URLSearchParams(location.search).get('theme');
if (qsTheme === 'dark' || qsTheme === 'light') S.ui.theme = qsTheme;
applyTheme();

/* ================================================================ shell */
const app = $('#app');
app.innerHTML = `
  <div class="sidebar" aria-label="Sidebar">
    <nav class="sidebar-inner" aria-label="Sidebar navigation"></nav>
    <div class="resizer" role="separator" aria-label="Resize with left and right arrow keys" tabindex="0"></div>
  </div>
  <div class="scrim"></div>
  <div class="frame" id="frame"></div>
  <button class="ai-corner" data-tip="Notion AI" data-hint="⌘J" aria-label="Notion AI">${aiFace()}</button>`;
const sidebarEl = $('.sidebar-inner');
const frame = $('#frame');

function aiFace() {
  return `<span class="ai-face"><img src="assets/ai-face.png" alt="" draggable="false"><img class="crown" src="assets/ai-crown.png" alt="" draggable="false"></span>`;
}

function applySidebar() {
  document.documentElement.style.setProperty('--sbw', S.ui.sbw + 'px');
  app.classList.toggle('sb-closed', !S.ui.sbOpen);
}

/* ================================================================ sidebar */
function maskIcon(file) { return `<span style="--m:url('assets/${file}')"></span>`; }

function renderSidebar() {
  const tab = S.ui.tab;
  const tabs = [['home', 'Home', 'home_gray.svg'], ['chat', 'Chat', 'chat_gray.svg'], ['meetings', 'Meetings', 'calendar_gray.svg']];
  const selIndex = tabs.findIndex((x) => x[0] === tab);
  sidebarEl.innerHTML = `
    <div class="sb-top">
      <button class="icon-btn" data-act="close-sidebar" data-tip="Close sidebar" data-hint="⌘\\" aria-label="Close sidebar">${ic('sidebarLeft')}</button>
      <div class="sb-top-right">
        <button class="icon-btn" data-act="inbox" data-tip="Inbox" aria-label="Inbox">${ic('inbox')}<span class="badge">99+</span></button>
        <button class="icon-btn" data-act="new-page" data-tip="New page" data-hint="⌘N" aria-label="New page">${ic('compose')}</button>
      </div>
    </div>
    <div class="sb-search-wrap"><button class="sb-search" data-act="search" aria-label="Search or ask"><span class="ellipsis">Search or ask</span><span class="kbd">⌘K</span></button></div>
    <div class="sb-tabs"><div class="tablist" role="tablist" aria-label="Sidebar navigation">
      ${tabs.map(([key, label, file], i) => `
        <button class="tab${key === tab ? ' sel' : ''}${(i === selIndex - 1 || i === selIndex) && i < tabs.length - 1 ? ' gap' : ''}" role="tab" aria-selected="${key === tab}" aria-label="${label}" data-tab="${key}"${key === tab ? '' : ` data-tip="${label}"`}>
          <span class="tab-ico">${maskIcon(file)}</span><span class="tab-label"><span><b>${label}</b></span></span>
        </button>`).join('')}
    </div></div>
    <div class="sb-scroll"><div class="sb-panel" role="tabpanel">${tab === 'chat' ? chatPanel() : tab === 'meetings' ? meetingsPanel() : homePanel()}</div></div>
    <div class="sb-foot">
      <button class="ws-btn" data-act="workspace"><span class="ws-ico emoji">${WORKSPACE.icon}<span class="dot"></span></span><span class="ws-name ellipsis">${esc(WORKSPACE.name)}</span>${ic('arrowChevronSingleDown')}</button>
      <button class="icon-btn" data-act="help" data-tip="What’s new, help, contact, more…" aria-label="Help">${ic('questionMarkCircle')}<span class="dot"></span></button>
      <button class="icon-btn" data-act="library" data-tip="Library, Trash, more…" aria-label="Library, Trash, more…">${ic('circleGrid2X2')}</button>
    </div>`;
}

function section(key, label, body, extraClass = '') {
  const collapsed = S.ui.collapsed[key];
  return `<div class="sb-section${collapsed ? ' collapsed' : ''} ${extraClass}" data-section="${key}">
    <button class="sb-head" data-act="section" aria-expanded="${!collapsed}"><span>${label}</span>${ic('arrowChevronSingleDownFillSmall', 'chev')}</button>
    <div class="sb-tree" role="tree">${body}</div></div>`;
}

function pageGlyph(p, wide = false) {
  if (p.icon) return `<span class="emoji">${p.icon}</span>`;
  if (p.db) return ic('viewTable', 'wide');
  const empty = !p.blocks.some((b) => (b.text || '').trim() || b.type === 'page');
  return ic(empty ? 'pageEmpty' : 'page', wide ? 'wide' : '');
}

function pageRow(pid, depth = 0, scope = '') {
  const p = page(pid);
  if (!p || p.trash) return '';
  const kids = childPages(pid);
  const key = scope + pid;
  const open = !!S.ui.expanded[key];
  const sel = route.view === 'page' && route.pid === pid;
  let html = `<div class="sb-row has-toggle${open ? ' open' : ''}${sel ? ' sel' : ''}" role="treeitem" aria-expanded="${open}" style="--depth:${depth}" data-page="${pid}" data-key="${key}">
    <span class="sb-ico"><span class="glyph">${pageGlyph(p)}</span><button class="toggle" data-act="expand" aria-label="${open ? 'Close' : 'Open'}">${ic('arrowChevronSingleDownFillSmall')}</button></span>
    <span class="sb-title ellipsis" data-title-for="${pid}">${esc(titleOf(p))}</span>
    <span class="sb-actions"><button class="mini-btn" data-act="page-menu" data-tip="Delete, duplicate, and more…" aria-label="Delete, duplicate, and more…">${ic('ellipsisSmall')}</button><button class="mini-btn" data-act="add-child" data-tip="Add a page inside" aria-label="Add a page inside">${ic('plusSmall')}</button></span>
  </div>`;
  if (open) {
    html += kids.length ? kids.map((k) => pageRow(k, depth + 1, scope)).join('') : `<div class="sb-empty" style="--depth:${depth + 1}">No pages inside</div>`;
  }
  return html;
}

function homePanel() {
  const favs = S.order.favorites.filter(alive);
  const priv = S.order.private.filter(alive);
  const team = S.order.team.filter(alive);
  const teamOpen = !S.ui.expanded['teamspace-collapsed'];
  return [
    favs.length ? section('favorites', 'Favorites', favs.map((p) => pageRow(p, 0, 'fav:')).join('')) : '',
    section('agents', 'Agents', `<div class="sb-row" data-act="agent" role="treeitem"><span class="sb-ico"><span class="glyph"><span class="emoji">✍🏽</span></span></span><span class="sb-title ellipsis">Lab Notes Writer</span><span class="sb-actions"><button class="mini-btn" data-act="noop" aria-label="Agent menu">${ic('ellipsisSmall')}</button></span></div>`),
    section('private', 'Private', priv.map((p) => pageRow(p)).join('') +
      `<div class="sb-row muted" data-act="search"><span class="sb-ico"><span class="glyph">${ic('ellipsisSmall')}</span></span><span class="sb-title">View all</span></div>`),
    section('teamspaces', 'Teamspaces',
      `<div class="sb-row team${teamOpen ? ' open' : ''}" data-act="teamspace"><span class="sb-ico"><span class="glyph"><span class="team-tile">${TEAMSPACE.tile}</span></span></span><span class="sb-title ellipsis">${esc(TEAMSPACE.name)}</span><span class="sb-actions"><button class="mini-btn" data-act="noop" data-tip="Teamspace settings and members…" aria-label="Teamspace settings">${ic('ellipsisSmall')}</button><button class="mini-btn" data-act="add-team" data-tip="Add a page" aria-label="Add to ${esc(TEAMSPACE.name)}">${ic('plusSmall')}</button></span></div>` +
      (teamOpen ? team.map((p) => pageRow(p, 1, 'team:')).join('') : '')),
    section('apps', 'Notion apps',
      `<div class="sb-row" data-act="noop-toast" data-msg="Notion Calendar opens in its own app"><span class="sb-ico"><span class="glyph">${ic('calendarDate17', 'wide')}</span></span><span class="sb-title ellipsis">Notion Calendar</span></div>
       <div class="sb-row" data-act="noop-toast" data-msg="Notion Desktop is a separate download"><span class="sb-ico"><span class="glyph">${ic('notionTintable', 'wide')}</span></span><span class="sb-title ellipsis">Notion Desktop</span></div>`),
    `<div class="sb-row muted" data-act="noop-toast" data-msg="Sidebar customization isn't part of this clone"><span class="sb-ico"><span class="glyph">${ic('sliders', 'wide')}</span></span><span class="sb-title ellipsis">Customize sidebar</span></div>`,
  ].join('');
}

function chatPanel() {
  const rows = S.chatOrder.filter((c) => S.chats[c]).map((cid) => {
    const c = S.chats[cid];
    const sel = route.view === 'chat' && route.cid === cid;
    return `<div class="sb-row chat-row${sel ? ' sel-strong' : ''}" role="treeitem" data-chat="${cid}">
      <span class="chat-ico">${ic('chatBubble')}</span><span class="sb-title ellipsis">${esc(c.title)}</span>
      ${c.unread ? '<span class="unread" role="img" aria-label="Unread"></span>' : ''}
      <span class="sb-actions"><button class="mini-btn" data-act="chat-menu" data-tip="Delete, rename, and more…" aria-label="Delete, rename, and more…">${ic('ellipsisSmall')}</button><button class="mini-btn" data-act="noop-toast" data-msg="Pinned chats aren't part of this clone" data-tip="Pin" aria-label="Pin">${ic('pinSmall')}</button></span>
    </div>`;
  }).join('');
  const sel = route.view === 'newchat';
  return `<div class="sb-tree"><div class="sb-row${sel ? ' sel' : ''}" data-act="new-chat"><span class="sb-ico"><span class="glyph">${ic('chatBubblePlus', 'wide')}</span></span><span class="sb-title ellipsis">New chat</span><span class="sb-actions"><button class="mini-btn" data-act="noop" aria-label="Open shortcut menu">${ic('ellipsisSmall')}</button></span></div></div>
    <div style="height:4px"></div>
    ${section('agents', 'Agents', `<div class="sb-row" data-act="agent"><span class="sb-ico"><span class="glyph"><span class="emoji">✍🏽</span></span></span><span class="sb-title ellipsis">Lab Notes Writer</span></div>`)}
    ${section('chats', 'Chats', rows + `<div class="sb-row muted" data-act="search-chats"><span class="sb-ico"><span class="glyph">${ic('ellipsisSmall')}</span></span><span class="sb-title">View all</span></div>`)}`;
}

function meetingsPanel() {
  return `<div class="sb-tree"><div class="sb-row" data-act="noop-toast" data-msg="Meeting notes aren't part of this clone"><span class="sb-ico"><span class="glyph">${ic('calendarDate17', 'wide')}</span></span><span class="sb-title ellipsis">New meeting notes</span></div></div>
    <div style="height:4px"></div>
    ${section('meetings', 'Upcoming', '<div class="meet-empty">No upcoming meetings. Connect a calendar in Notion to see them here.</div>')}`;
}

sidebarEl.addEventListener('click', (e) => {
  const actEl = e.target.closest('[data-act]');
  const row = e.target.closest('.sb-row');
  const tabBtn = e.target.closest('[data-tab]');
  if (tabBtn) {
    S.ui.tab = tabBtn.dataset.tab;
    save();
    renderSidebar();
    return;
  }
  const act = actEl && actEl.dataset.act;
  switch (act) {
    case 'close-sidebar': setSidebar(false); return;
    case 'inbox': toast('You’re all caught up. The inbox isn’t part of this clone.'); return;
    case 'new-page': newPage('private'); return;
    case 'search': openSearch('pages'); return;
    case 'search-chats': openSearch('chats'); return;
    case 'section': {
      const key = actEl.closest('.sb-section').dataset.section;
      S.ui.collapsed[key] = !S.ui.collapsed[key];
      save(); renderSidebar(); return;
    }
    case 'expand': {
      e.stopPropagation();
      const key = row.dataset.key;
      S.ui.expanded[key] = !S.ui.expanded[key];
      save(); renderSidebar(); return;
    }
    case 'teamspace':
      S.ui.expanded['teamspace-collapsed'] = !S.ui.expanded['teamspace-collapsed'];
      save(); renderSidebar(); return;
    case 'add-child': {
      e.stopPropagation();
      const pid = row.dataset.page;
      S.ui.expanded[row.dataset.key] = true;
      newPage(pid); return;
    }
    case 'add-team': e.stopPropagation(); newPage('team'); return;
    case 'page-menu': e.stopPropagation(); pageMenu(actEl, row.dataset.page, row); return;
    case 'chat-menu': e.stopPropagation(); chatMenu(actEl, row.dataset.chat, row); return;
    case 'new-chat': closeMobileSidebar(); go('#/ai'); return;
    case 'agent': closeMobileSidebar(); go('#/ai'); return;
    case 'workspace': workspaceMenu(actEl); return;
    case 'help': toast('Help, shortcuts and what’s new live in Notion itself.'); return;
    case 'library': libraryMenu(actEl); return;
    case 'noop': e.stopPropagation(); return;
    case 'noop-toast': e.stopPropagation(); toast(actEl.dataset.msg); return;
  }
  if (row && row.dataset.page) { closeMobileSidebar(); go('#/p/' + row.dataset.page); return; }
  if (row && row.dataset.chat) {
    S.chats[row.dataset.chat].unread = false;
    closeMobileSidebar(); go('#/chat/' + row.dataset.chat);
  }
});

function setSidebar(open) {
  if (matchMedia('(max-width: 640px)').matches) {
    app.classList.toggle('sb-mobile-open', open);
    return;
  }
  S.ui.sbOpen = open;
  app.classList.remove('sb-peek');
  hideTip();
  save();
  applySidebar();
}
function closeMobileSidebar() { app.classList.remove('sb-mobile-open'); }
$('.scrim').addEventListener('click', closeMobileSidebar);

// Resizing
const resizer = $('.resizer');
resizer.addEventListener('pointerdown', (e) => {
  e.preventDefault();
  resizer.setPointerCapture(e.pointerId);
  document.body.classList.add('resizing');
  const move = (ev) => {
    S.ui.sbw = Math.max(220, Math.min(480, Math.round(ev.clientX)));
    applySidebar();
  };
  const up = () => {
    document.body.classList.remove('resizing');
    resizer.removeEventListener('pointermove', move);
    resizer.removeEventListener('pointerup', up);
    save();
  };
  resizer.addEventListener('pointermove', move);
  resizer.addEventListener('pointerup', up);
});
resizer.addEventListener('dblclick', () => { S.ui.sbw = 270; applySidebar(); save(); });
resizer.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    S.ui.sbw = Math.max(220, Math.min(480, S.ui.sbw + (e.key === 'ArrowLeft' ? -10 : 10)));
    applySidebar(); save();
  }
});

// Floating sidebar while collapsed
let peekTimer = 0;
document.addEventListener('mousemove', (e) => {
  if (S.ui.sbOpen || matchMedia('(max-width: 640px)').matches) return;
  const overMenu = e.target.closest && e.target.closest('.menu-btn');
  const overSidebar = e.target.closest && e.target.closest('.sidebar-inner');
  if (overMenu || overSidebar || e.clientX < 6) {
    clearTimeout(peekTimer);
    if (!app.classList.contains('sb-peek')) peekTimer = setTimeout(() => app.classList.add('sb-peek'), overMenu ? 250 : 120);
  } else if (app.classList.contains('sb-peek') && e.clientX > S.ui.sbw + 40 && !$('.layer')) {
    clearTimeout(peekTimer);
    peekTimer = setTimeout(() => app.classList.remove('sb-peek'), 200);
  }
});

/* ================================================================ frame render */
function render() {
  route = parseRoute();
  closeAllLayers();
  closeMobileSidebar();
  if (route.view !== 'page') S.ui.tab = 'chat';
  hideTip();
  renderSidebar();
  applySidebar();
  $('.ai-corner').hidden = route.view !== 'page';
  if (route.view === 'page') {
    const p = page(route.pid);
    S.recent = [route.pid, ...S.recent.filter((x) => x !== route.pid)].slice(0, 30);
    document.title = `${titleOf(p)} | Notion`;
    renderPage(p);
  } else if (route.view === 'newchat') {
    document.title = 'Notion AI | Notion';
    renderNewChat();
  } else {
    const c = S.chats[route.cid];
    c.unread = false;
    document.title = `${c.title} | Notion`;
    renderThread(c);
  }
  save();
}

function crumbsHTML(p) {
  const { root, chain } = ancestors(p.id);
  const parts = [];
  if (root === 'team') parts.push(`<button class="crumb" data-act="noop"><span class="c-ico"><span class="team-tile">${TEAMSPACE.tile}</span></span><span class="ellipsis">${esc(TEAMSPACE.name)}</span></button>`);
  let items = chain;
  if (items.length > 3) items = [items[0], null, ...items.slice(-2)];
  items.forEach((cp) => {
    if (parts.length) parts.push('<span class="crumb-sep" aria-hidden="true">/</span>');
    if (!cp) { parts.push('<span class="crumb"><span>...</span></span>'); return; }
    parts.push(`<button class="crumb" data-go="#/p/${cp.id}">${cp.icon ? `<span class="c-ico emoji">${cp.icon}</span>` : ''}<span class="ellipsis" data-title-for="${cp.id}">${esc(titleOf(cp))}</span></button>`);
  });
  return parts.join('');
}

function topbarHTML(p) {
  const fav = S.order.favorites.includes(p.id);
  return `<header class="topbar">
    <div class="crumbs">
      <button class="menu-btn" data-act="open-sidebar" data-tip="Lock sidebar open" data-hint="⌘\\" aria-label="Lock sidebar open">${ic('menu')}</button>
      ${crumbsHTML(p)}
    </div>
    <div class="top-actions">
      <button class="text-btn edited" data-act="noop-toast" data-msg="Page history isn't part of this clone">Edited ${esc(p.edited)}</button>
      <button class="text-btn share-btn" data-act="share" aria-label="Share">${ic('teamspace')}<span>Share</span></button>
      <button class="icon-btn" data-act="copy-link" data-tip="Copy link" aria-label="Copy link">${ic('link')}</button>
      <button class="icon-btn fav-btn${fav ? ' on' : ''}" data-act="favorite" data-tip="${fav ? 'Remove from Favorites' : 'Add to Favorites'}" aria-label="${fav ? 'Favorited' : 'Favorite'}">${ic(fav ? 'starFill' : 'star')}</button>
      <button class="icon-btn more-btn" data-act="page-actions" data-tip="Style, export, and more…" aria-label="Actions">${ic('ellipsis')}</button>
    </div>
  </header>`;
}

/* ================================================================ page view */
function renderPage(p) {
  const st = p.style || {};
  const cls = ['page', st.font ? 'font-' + st.font : '', st.small ? 'small-text' : '', st.full ? 'full-width' : ''].filter(Boolean).join(' ');
  frame.innerHTML = `${topbarHTML(p)}
    <main class="scroller" id="main">
      <div class="${cls}" data-page="${p.id}">
        <div class="page-head ${p.cover ? 'has-cover' : ''} ${p.icon ? '' : 'no-icon'}">
          ${p.cover ? `<div class="cover" style="background:${p.cover}"><div class="cover-actions"><button data-act="cover-change">Change cover</button><button data-act="cover-remove">Remove</button></div></div>` : ''}
          ${p.icon ? `<div class="page-icon emoji" role="button" data-act="icon" aria-label="${p.icon} Change page icon">${p.icon}</div>` : ''}
          <div class="page-controls">
            ${p.icon ? '' : `<button class="text-btn" data-act="add-icon">${ic('faceSmile')}Add icon</button>`}
            ${p.cover ? '' : `<button class="text-btn" data-act="add-cover">${ic('photoFill')}Add cover</button>`}
            <button class="text-btn" data-act="noop-toast" data-msg="Page verification is a Business plan feature">${ic('badgeCheckFill')}Add verification</button>
            <button class="text-btn" data-act="noop-toast" data-msg="Comments aren't part of this clone">${ic('commentFilledFill')}Add comment</button>
          </div>
          <h1 class="page-title" contenteditable="plaintext-only" spellcheck="true" data-placeholder="New page" role="textbox">${esc(p.title)}</h1>
        </div>
        <div class="page-body" id="body"></div>
      </div>
    </main>`;
  renderBlocks(p);
  bindPage(p);
}

function groupOf(type) {
  if (type === 'text') return 'text';
  if (type === 'page') return 'page';
  if (LISTY.has(type)) return 'list';
  return null;
}

function blocksHTML(list, depth) {
  let num = 0;
  return list.map((b, i) => {
    num = b.type === 'number' ? num + 1 : 0;
    const prev = list[i - 1], next = list[i + 1];
    const g = groupOf(b.type);
    const pt = g && prev && groupOf(prev.type) === g ? 1 : null;
    const pb = g && next && groupOf(next.type) === g ? 1 : null;
    return blockHTML(b, depth, num, pt, pb);
  }).join('');
}

function blockHTML(b, depth, num, pt, pb) {
  const t = TYPE[b.type] || TYPE.text;
  const color = b.color ? (b.color.startsWith('bg-') ? ' bc-' + b.color.slice(3) : ' tc-' + b.color) : '';
  const style = [pt != null ? `--pt:${pt}px` : '', pb != null ? `--pb:${pb}px` : ''].filter(Boolean).join(';');
  const cls = `blk blk-${b.type}${b.type === 'todo' && b.checked ? ' done' : ''}${b.type === 'toggle' && b.open ? ' open' : ''}${color}`;
  const always = ['h1', 'h2', 'h3', 'quote', 'callout', 'toggle', 'bullet', 'number', 'todo'].includes(b.type);
  const leaf = `<div class="leaf${always ? ' always' : ''}" contenteditable="plaintext-only" spellcheck="true" role="textbox" data-ph-focus="${esc(t.ph || '')}" data-ph="${esc(always ? t.ph : '')}">${esc(b.text || '')}</div>`;
  let main;
  switch (b.type) {
    case 'bullet': main = `<div class="lead bullet"></div>${leaf}`; break;
    case 'number': main = `<div class="lead number">${num}.</div>${leaf}`; break;
    case 'todo': main = `<div class="lead"><div class="check" role="checkbox" aria-checked="${!!b.checked}" data-act="check">${G.check}</div></div>${leaf}`; break;
    case 'toggle': main = `<div class="lead"><button class="tgl" data-act="tgl" aria-label="${b.open ? 'Close' : 'Open'}">${ic('arrowChevronSingleDownFillSmall')}</button></div>${leaf}`; break;
    case 'callout': main = `<div class="lead emoji" data-act="callout-emoji">${b.emoji || '💡'}</div>${leaf}`; break;
    case 'divider': main = '<hr>'; break;
    case 'code': main = `<span class="code-lang">${esc(b.lang || 'Plain text')}</span>${leaf}`; break;
    case 'page': {
      const lp = page(b.pageId);
      if (!lp || lp.trash) { main = '<div class="leaf" style="color:var(--c-texTer)">Page in Trash</div>'; break; }
      main = `<a class="pagelink" href="#/p/${lp.id}" role="link"><span><span class="pl-ico">${lp.icon ? `<span class="emoji">${lp.icon}</span>` : ic('page')}</span><span class="pl-title" data-title-for="${lp.id}">${esc(titleOf(lp))}</span></span></a>`;
      break;
    }
    default: main = leaf;
  }
  let children = '';
  if (b.children && b.children.length) children = `<div class="blk-children">${blocksHTML(b.children, depth + 1)}</div>`;
  else if (b.type === 'toggle') children = `<div class="blk-children"><div class="toggle-empty" data-act="toggle-add">Empty toggle. Click or drop blocks inside.</div></div>`;
  return `<div class="${cls}" data-id="${b.id}" data-depth="${depth % 6}"${style ? ` style="${style}"` : ''}><div class="blk-main">${main}</div>${children}</div>`;
}

function renderBlocks(p, focus) {
  const body = $('#body');
  if (!body) return;
  body.innerHTML = blocksHTML(p.blocks, 0) + `<div class="handles"><button class="handle-add" data-tip="Click to add below" data-hint="Option-click to add a block above" aria-label="Click to add below">${ic('plusBlock')}</button><div class="handle-drag" role="button" data-tip="Drag to move" data-hint="Click to open menu" aria-label="Drag to move, click to open menu">${ic('dragHandle')}</div></div><div class="drop-line"></div>`;
  if (focus) focusBlock(focus.id, focus.offset);
}

function leafOf(bid) { return $(`.blk[data-id="${bid}"] > .blk-main > .leaf`); }
function focusBlock(bid, offset = 0) {
  const el = leafOf(bid);
  if (!el) return;
  setCaret(el, offset === 'end' ? el.textContent.length : offset);
}
function caretOffset(el) {
  const sel = getSelection();
  if (!sel.rangeCount) return 0;
  const r = sel.getRangeAt(0);
  if (!el.contains(r.startContainer) && r.startContainer !== el) return 0;
  const pre = document.createRange();
  pre.selectNodeContents(el);
  pre.setEnd(r.startContainer, r.startOffset);
  return pre.toString().length;
}
function setCaret(el, off) {
  el.focus({ preventScroll: false });
  const sel = getSelection();
  const range = document.createRange();
  let count = 0;
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    if (count + node.length >= off) {
      range.setStart(node, off - count);
      range.collapse(true);
      sel.removeAllRanges(); sel.addRange(range);
      return;
    }
    count += node.length;
  }
  range.selectNodeContents(el);
  range.collapse(false);
  sel.removeAllRanges(); sel.addRange(range);
}
function flatVisible(p) {
  const out = [];
  const rec = (list) => list.forEach((b) => {
    out.push(b);
    if (b.children && (b.type !== 'toggle' || b.open)) rec(b.children);
  });
  rec(p.blocks);
  return out;
}

/* ---------- page events ---------- */
let slash = null; // { bid, start }
function bindPage(p) {
  const pageEl = $('.page');
  const title = $('.page-title');
  const body = $('#body');

  title.addEventListener('input', () => {
    p.title = title.textContent.replace(/\n/g, ' ');
    if (!title.textContent) title.innerHTML = '';
    $$(`[data-title-for="${p.id}"]`).forEach((el) => { if (el !== title) el.textContent = titleOf(p); });
    document.title = `${titleOf(p)} | Notion`;
    touch(p);
  });
  title.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.isComposing) {
      e.preventDefault();
      const first = p.blocks[0];
      if (first && first.type === 'text' && !first.text) focusBlock(first.id, 0);
      else {
        const nb = { id: uid(), type: 'text', text: '' };
        p.blocks.unshift(nb);
        renderBlocks(p, { id: nb.id, offset: 0 });
        touch(p);
      }
    } else if (e.key === 'ArrowDown') {
      const first = flatVisible(p).find((b) => !LEAFLESS.has(b.type));
      if (first) { e.preventDefault(); focusBlock(first.id, 0); }
    }
  });

  pageEl.addEventListener('click', (e) => {
    const a = e.target.closest('[data-act]');
    const blkEl = e.target.closest('.blk');
    const bid = blkEl && blkEl.dataset.id;
    if (!a) {
      // Clicking the empty area under the last block focuses or creates a trailing text block.
      if (e.target === body || (e.target.classList.contains('page') && e.clientY > body.getBoundingClientRect().bottom - 10)) {
        const last = p.blocks[p.blocks.length - 1];
        if (last && last.type === 'text' && !last.text) focusBlock(last.id, 0);
        else {
          const nb = { id: uid(), type: 'text', text: '' };
          p.blocks.push(nb);
          renderBlocks(p, { id: nb.id, offset: 0 });
          touch(p);
        }
      }
      return;
    }
    switch (a.dataset.act) {
      case 'check': {
        const hit = findBlock(p, bid);
        hit.blk.checked = !hit.blk.checked;
        blkEl.classList.toggle('done', hit.blk.checked);
        a.setAttribute('aria-checked', hit.blk.checked);
        touch(p);
        break;
      }
      case 'tgl': {
        const hit = findBlock(p, bid);
        hit.blk.open = !hit.blk.open;
        blkEl.classList.toggle('open', hit.blk.open);
        touch(p);
        break;
      }
      case 'toggle-add': {
        const hit = findBlock(p, bid);
        const nb = { id: uid(), type: 'text', text: '' };
        hit.blk.children = [nb];
        renderBlocks(p, { id: nb.id, offset: 0 });
        touch(p);
        break;
      }
      case 'callout-emoji': emojiPicker(a, (em) => { findBlock(p, bid).blk.emoji = em; a.textContent = em; touch(p); }); break;
      case 'icon': emojiPicker(a, (em) => { p.icon = em; touch(p); render(); }, () => { p.icon = null; touch(p); render(); }); break;
      case 'add-icon': p.icon = EMOJIS[Math.floor(Math.random() * 20)]; touch(p); render(); break;
      case 'add-cover': p.cover = COVERS[Math.floor(Math.random() * COVERS.length)]; touch(p); render(); break;
      case 'cover-change': p.cover = COVERS[(COVERS.indexOf(p.cover) + 1) % COVERS.length]; touch(p); render(); break;
      case 'cover-remove': p.cover = null; touch(p); render(); break;
      case 'noop-toast': toast(a.dataset.msg); break;
    }
  });

  body.addEventListener('input', (e) => {
    const leaf = e.target.closest('.leaf');
    if (!leaf) return;
    const bid = leaf.closest('.blk').dataset.id;
    const hit = findBlock(p, bid);
    if (!hit) return;
    let text = leaf.textContent;
    if (text === '\n') text = '';
    if (!text && leaf.innerHTML) leaf.innerHTML = '';
    hit.blk.text = text;
    hideHandles();
    // Markdown shortcuts at the start of a text block
    if (hit.blk.type === 'text' && e.inputType === 'insertText') {
      const rules = [[/^#\s/, 'h1'], [/^##\s/, 'h2'], [/^###\s/, 'h3'], [/^[-*+]\s/, 'bullet'], [/^1[.)]\s/, 'number'], [/^\[\]\s/, 'todo'], [/^>\s/, 'toggle'], [/^"\s/, 'quote']];
      for (const [re, type] of rules) {
        const m = text.match(re);
        if (m && caretOffset(leaf) === m[0].length) {
          hit.blk.text = text.slice(m[0].length);
          setType(p, hit.blk, type, 0);
          return;
        }
      }
      if (text === '---') { hit.blk.text = ''; setType(p, hit.blk, 'divider'); return; }
      if (text === '```') { hit.blk.text = ''; setType(p, hit.blk, 'code', 0); return; }
    }
    // Slash commands
    if (e.inputType === 'insertText' && e.data === '/' && hit.blk.type !== 'code') {
      slash = { bid, start: caretOffset(leaf) - 1 };
      openSlash(p, leaf);
    } else if (slash && slash.bid === bid) {
      updateSlash(p, leaf);
    }
    touch(p);
  });

  body.addEventListener('paste', (e) => {
    const leaf = e.target.closest('.leaf');
    if (!leaf) return;
    e.preventDefault();
    const text = (e.clipboardData || window.clipboardData).getData('text/plain');
    document.execCommand('insertText', false, text);
  });

  body.addEventListener('keydown', (e) => onLeafKey(e, p));

  // Hover handles
  pageEl.addEventListener('mousemove', (e) => {
    if (dragState) return;
    const blk = blockAtPoint(e.clientX, e.clientY);
    if (blk) showHandles(blk); else hideHandles();
  });
  pageEl.addEventListener('mouseleave', () => { if (!dragState && !$('.layer')) hideHandles(); });

  const handles = $('.handles', body);
  body.addEventListener('pointerdown', (e) => {
    const drag = e.target.closest('.handle-drag');
    if (!drag) return;
    e.preventDefault();
    startDrag(e, p);
  });
  body.addEventListener('click', (e) => {
    const add = e.target.closest('.handle-add');
    if (!add) return;
    const bid = handles.dataset.for;
    const hit = findBlock(p, bid);
    if (!hit) return;
    const nb = { id: uid(), type: 'text', text: '/' };
    hit.list.splice(e.altKey ? hit.index : hit.index + 1, 0, nb);
    renderBlocks(p, { id: nb.id, offset: 1 });
    slash = { bid: nb.id, start: 0 };
    openSlash(p, leafOf(nb.id));
    touch(p);
  });
}

function blockAtPoint(x, y) {
  const body = $('#body');
  if (!body) return null;
  const br = body.getBoundingClientRect();
  if (x < br.left - 80 || x > br.right + 20) return null;
  let best = null;
  for (const el of $$('.blk', body)) {
    const r = el.getBoundingClientRect();
    if (y >= r.top && y < r.bottom) {
      if (!best || el.compareDocumentPosition(best) & Node.DOCUMENT_POSITION_PRECEDING) best = el;
    }
  }
  // Prefer the innermost block whose own main row contains the point.
  if (best) {
    let cur = best;
    for (const child of $$('.blk', best)) {
      const r = child.getBoundingClientRect();
      if (y >= r.top && y < r.bottom) cur = child;
    }
    best = cur;
  }
  return best;
}

function showHandles(blkEl) {
  const handles = $('.handles');
  if (!handles) return;
  const body = $('#body');
  const br = body.getBoundingClientRect();
  const r = blkEl.getBoundingClientRect();
  const main = $(':scope > .blk-main', blkEl);
  const target = $(':scope > .leaf, :scope > .pagelink', main) || main;
  const tr = target.getBoundingClientRect();
  let lineBox = 28;
  if (target.classList.contains('leaf')) lineBox = parseFloat(getComputedStyle(target).lineHeight) + 4;
  if (blkEl.classList.contains('blk-divider')) lineBox = tr.height;
  const top = tr.top - br.top + Math.max(0, (Math.min(lineBox, tr.height) - 24) / 2);
  handles.style.transform = `translate(${r.left - br.left - 52}px, ${top}px)`;
  handles.dataset.for = blkEl.dataset.id;
  handles.classList.add('show');
}
function hideHandles() { const h = $('.handles'); if (h) h.classList.remove('show'); }

/* ---------- keyboard editing ---------- */
function onLeafKey(e, p) {
  const leaf = e.target.closest('.leaf');
  if (!leaf || e.isComposing) return;
  const bid = leaf.closest('.blk').dataset.id;
  const hit = findBlock(p, bid);
  if (!hit) return;
  const b = hit.blk;

  if (slash && slashPop) {
    if (['ArrowDown', 'ArrowUp', 'Enter', 'Tab', 'Escape'].includes(e.key)) {
      e.preventDefault();
      slashKey(e.key, p);
      return;
    }
  }

  const sel = getSelection();
  const collapsed = sel.isCollapsed;
  const off = caretOffset(leaf);

  if (e.key === 'Enter' && !e.shiftKey) {
    if (b.type === 'code') return; // newline inside code
    e.preventDefault();
    if (!collapsed) document.execCommand('delete');
    const text = leaf.textContent;
    const at = caretOffset(leaf);
    if (!text && (LISTY.has(b.type) || b.type === 'quote' || b.type === 'callout')) {
      if (hit.parent && LISTY.has(b.type)) { outdent(p, hit); return; }
      setType(p, b, 'text', 0);
      return;
    }
    b.text = text.slice(0, at);
    const cont = LISTY.has(b.type) && b.type !== 'toggle' ? b.type : (b.type === 'toggle' && !b.open ? 'toggle' : 'text');
    const nb = { id: uid(), type: cont, text: text.slice(at) };
    if (b.type === 'todo') nb.checked = false;
    if (at === 0 && text) {
      // Splitting at the very start: push an empty block above, keep focus on the text.
      hit.list.splice(hit.index, 0, { id: uid(), type: b.type === 'todo' ? 'todo' : cont, text: '' });
      b.text = text;
      renderBlocks(p, { id: b.id, offset: 0 });
    } else if (b.type === 'toggle' && b.open) {
      b.children = b.children || [];
      b.children.unshift({ id: nb.id, type: 'text', text: nb.text });
      renderBlocks(p, { id: nb.id, offset: 0 });
    } else {
      hit.list.splice(hit.index + 1, 0, nb);
      renderBlocks(p, { id: nb.id, offset: 0 });
    }
    touch(p);
    return;
  }

  if (e.key === 'Backspace' && collapsed && off === 0) {
    if (b.type !== 'text') {
      e.preventDefault();
      setType(p, b, 'text', 0);
      return;
    }
    if (hit.parent) { e.preventDefault(); outdent(p, hit, 0); return; }
    const flat = flatVisible(p);
    const idx = flat.indexOf(b);
    const prev = flat[idx - 1];
    e.preventDefault();
    if (!prev) {
      if (!b.text && p.blocks.length > 1) { hit.list.splice(hit.index, 1); renderBlocks(p); }
      setCaret($('.page-title'), $('.page-title').textContent.length);
      return;
    }
    if (LEAFLESS.has(prev.type)) {
      const ph = findBlock(p, prev.id);
      if (!b.text) { hit.list.splice(hit.index, 1); renderBlocks(p); selectBlock(prev.id); }
      else { ph.list.splice(ph.index, 1); renderBlocks(p, { id: b.id, offset: 0 }); }
      touch(p);
      return;
    }
    const len = (prev.text || '').length;
    prev.text = (prev.text || '') + b.text;
    if (b.children && b.children.length) hit.list.splice(hit.index, 1, ...b.children);
    else hit.list.splice(hit.index, 1);
    renderBlocks(p, { id: prev.id, offset: len });
    touch(p);
    return;
  }

  if (e.key === 'Delete' && collapsed && off === leaf.textContent.length) {
    const flat = flatVisible(p);
    const next = flat[flat.indexOf(b) + 1];
    if (next && !LEAFLESS.has(next.type) && !(next.children && next.children.length)) {
      e.preventDefault();
      const nh = findBlock(p, next.id);
      b.text = leaf.textContent + (next.text || '');
      nh.list.splice(nh.index, 1);
      renderBlocks(p, { id: b.id, offset: off });
      touch(p);
    }
    return;
  }

  if (e.key === 'Tab') {
    e.preventDefault();
    if (e.shiftKey) { if (hit.parent) outdent(p, hit, off); return; }
    const prev = hit.list[hit.index - 1];
    if (!prev || LEAFLESS.has(prev.type) || prev.type === 'code') return;
    b.text = leaf.textContent;
    hit.list.splice(hit.index, 1);
    prev.children = prev.children || [];
    prev.children.push(b);
    if (prev.type === 'toggle') prev.open = true;
    renderBlocks(p, { id: b.id, offset: off });
    touch(p);
    return;
  }

  if ((e.key === 'ArrowUp' || e.key === 'ArrowDown') && collapsed && !e.shiftKey) {
    const up = e.key === 'ArrowUp';
    if (!atEdgeLine(leaf, up)) return;
    const flat = flatVisible(p).filter((x) => !LEAFLESS.has(x.type));
    const idx = flat.indexOf(b);
    const target = flat[idx + (up ? -1 : 1)];
    e.preventDefault();
    if (target) focusBlock(target.id, up ? 'end' : Math.min(off, (target.text || '').length));
    else if (up) setCaret($('.page-title'), $('.page-title').textContent.length);
    return;
  }

  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'd') {
    e.preventDefault();
    duplicateBlock(p, hit);
  }
}

function atEdgeLine(leaf, up) {
  const sel = getSelection();
  if (!sel.rangeCount) return true;
  const r = sel.getRangeAt(0).cloneRange();
  let rect = r.getClientRects()[0];
  if (!rect) {
    if (!leaf.textContent) return true;
    const off = caretOffset(leaf);
    return up ? off === 0 : off === leaf.textContent.length;
  }
  const lr = leaf.getBoundingClientRect();
  const lh = parseFloat(getComputedStyle(leaf).lineHeight) || 24;
  return up ? rect.top - lr.top < lh * 0.9 : lr.bottom - rect.bottom < lh * 0.9;
}

function setType(p, b, type, caret) {
  if (type === 'page') {
    const np = createPage(p.id, false);
    const hit = findBlock(p, b.id);
    if (b.text) hit.list.splice(hit.index + 1, 0, { id: uid(), type: 'page', pageId: np.id });
    else hit.list.splice(hit.index, 1, { id: uid(), type: 'page', pageId: np.id });
    touch(p);
    go('#/p/' + np.id);
    requestAnimationFrame(() => setCaret($('.page-title'), 0));
    return;
  }
  b.type = type;
  if (type === 'todo' && b.checked == null) b.checked = false;
  if (type === 'toggle' && b.open == null) b.open = true;
  if (type === 'divider') {
    b.text = '';
    const hit = findBlock(p, b.id);
    const nb = { id: uid(), type: 'text', text: '' };
    if (!hit.list[hit.index + 1]) hit.list.splice(hit.index + 1, 0, nb);
    renderBlocks(p, { id: hit.list[hit.index + 1].id, offset: 0 });
  } else {
    renderBlocks(p, caret != null ? { id: b.id, offset: caret } : null);
  }
  touch(p);
}

function outdent(p, hit, caret = 0) {
  const parentHit = findBlock(p, hit.parent.id);
  hit.list.splice(hit.index, 1);
  parentHit.list.splice(parentHit.index + 1, 0, hit.blk);
  renderBlocks(p, { id: hit.blk.id, offset: caret });
  touch(p);
}

function cloneBlock(b) {
  const c = { ...b, id: uid() };
  if (b.children) c.children = b.children.map(cloneBlock);
  return c;
}
function duplicateBlock(p, hit) {
  const c = cloneBlock(hit.blk);
  hit.list.splice(hit.index + 1, 0, c);
  renderBlocks(p, LEAFLESS.has(c.type) ? null : { id: c.id, offset: 'end' });
  touch(p);
}
function selectBlock(bid) {
  $$('.blk.selected').forEach((x) => x.classList.remove('selected'));
  const el = $(`.blk[data-id="${bid}"]`);
  if (el) el.classList.add('selected');
}
document.addEventListener('pointerdown', (e) => {
  if (!e.target.closest('.layer') && !e.target.closest('.handle-drag')) $$('.blk.selected').forEach((x) => x.classList.remove('selected'));
});

/* ---------- drag to reorder ---------- */
let dragState = null;
function startDrag(e, p) {
  const handles = $('.handles');
  const bid = handles.dataset.for;
  const blkEl = $(`.blk[data-id="${bid}"]`);
  if (!blkEl) return;
  const sx = e.clientX, sy = e.clientY;
  dragState = { bid, moved: false, target: null };
  const line = $('.drop-line');
  const body = $('#body');
  const move = (ev) => {
    if (!dragState.moved && Math.hypot(ev.clientX - sx, ev.clientY - sy) < 4) return;
    if (!dragState.moved) { dragState.moved = true; blkEl.classList.add('dragging'); hideTip(); }
    const over = blockAtPoint(Math.max(ev.clientX, body.getBoundingClientRect().left + 20), ev.clientY);
    if (!over || over === blkEl || blkEl.contains(over)) { line.style.display = 'none'; dragState.target = null; return; }
    const r = over.getBoundingClientRect();
    const br = body.getBoundingClientRect();
    const before = ev.clientY < r.top + r.height / 2;
    dragState.target = { id: over.dataset.id, before };
    line.style.display = 'block';
    line.style.left = (r.left - br.left + 6) + 'px';
    line.style.width = (r.width - 12) + 'px';
    line.style.top = ((before ? r.top : r.bottom) - br.top - 2) + 'px';
  };
  const up = () => {
    document.removeEventListener('pointermove', move);
    document.removeEventListener('pointerup', up);
    line.style.display = 'none';
    const st = dragState;
    dragState = null;
    blkEl.classList.remove('dragging');
    if (!st.moved) { blockMenu(p, st.bid, $('.handle-drag')); return; }
    if (!st.target) return;
    const src = findBlock(p, st.bid);
    src.list.splice(src.index, 1);
    const dst = findBlock(p, st.target.id);
    dst.list.splice(st.target.before ? dst.index : dst.index + 1, 0, src.blk);
    renderBlocks(p);
    touch(p);
  };
  document.addEventListener('pointermove', move);
  document.addEventListener('pointerup', up);
}

/* ================================================================ popups */
let layers = [];
function openLayer(html, { passive = false, onClose } = {}) {
  const layer = document.createElement('div');
  layer.className = 'layer' + (passive ? ' passive' : '');
  layer.innerHTML = html;
  document.body.appendChild(layer);
  const entry = { layer, onClose };
  layers.push(entry);
  if (!passive) layer.addEventListener('pointerdown', (e) => { if (e.target === layer || e.target.classList.contains('underlay')) closeLayer(entry); });
  return entry;
}
function closeLayer(entry) {
  if (!entry || !entry.layer.isConnected) return;
  entry.layer.remove();
  layers = layers.filter((x) => x !== entry);
  entry.onClose && entry.onClose();
}
function closeAllLayers() { [...layers].reverse().forEach(closeLayer); }
function topLayer() { return layers[layers.length - 1]; }

function place(pop, anchor, { side = 'bottom', align = 'start', gap = 4 } = {}) {
  const r = anchor.getBoundingClientRect ? anchor.getBoundingClientRect() : anchor;
  const pw = pop.offsetWidth, ph = pop.offsetHeight;
  const vw = innerWidth, vh = innerHeight;
  let x, y;
  if (side === 'right') { x = r.right + gap; y = r.top - 6; }
  else if (side === 'left') { x = r.left - pw - gap; y = r.top; }
  else { x = align === 'end' ? r.right - pw : r.left; y = r.bottom + gap; }
  if (side === 'bottom' && y + ph > vh - 8 && r.top - ph - gap > 8) y = r.top - ph - gap;
  if (side === 'right' && x + pw > vw - 8) x = r.left - pw - gap;
  x = Math.max(8, Math.min(x, vw - pw - 8));
  y = Math.max(8, Math.min(y, vh - ph - 8));
  pop.style.left = x + 'px';
  pop.style.top = y + 'px';
}

// Generic keyboard-navigable menu. items: [{label, icon, hint, act, danger, sub, section}]
function menu(anchor, groups, opts = {}) {
  const width = opts.width || 265;
  const entry = openLayer(`<div class="pop" role="menu" style="width:${width}px">
    ${opts.search ? `<div class="pop-search"><div><input placeholder="${esc(opts.search)}" aria-label="${esc(opts.search)}"></div></div>` : ''}
    ${opts.top || ''}
    <div class="pop-groups"></div>
    ${opts.foot ? `<div class="pop-foot">${opts.foot}</div>` : ''}
  </div>`, { onClose: opts.onClose });
  const pop = $('.pop', entry.layer);
  const holder = $('.pop-groups', pop);
  let flat = [];
  let active = 0;
  const draw = (q = '') => {
    const ql = q.trim().toLowerCase();
    flat = [];
    holder.innerHTML = groups.map((g) => {
      const items = g.items.filter((it) => !ql || it.label.toLowerCase().includes(ql));
      if (!items.length) return '';
      return `<div class="pop-group">${g.label && !ql ? `<div class="pop-label">${esc(g.label)}</div>` : ''}${items.map((it) => {
        flat.push(it);
        return `<div class="mi${it.danger ? ' danger' : ''}" role="menuitem" data-i="${flat.length - 1}">
          ${it.icon != null ? `<span class="mi-ico">${it.icon}</span>` : ''}<span class="mi-text">${esc(it.label)}</span>
          ${it.right || ''}${it.hint ? `<span class="mi-hint">${esc(it.hint)}</span>` : ''}${it.sub ? ic('arrowChevronSingleDownSmall', 'mi-arrow') : ''}</div>`;
      }).join('')}</div>`;
    }).join('') || '<div class="pop-empty">No results</div>';
    active = Math.min(active, Math.max(0, flat.length - 1));
    paint();
  };
  const paint = () => $$('.mi', holder).forEach((el) => el.classList.toggle('active', +el.dataset.i === active));
  const choose = (i) => {
    const it = flat[i];
    if (!it) return;
    if (it.sub) { it.sub($(`.mi[data-i="${i}"]`, holder)); return; }
    if (!it.keepOpen) closeLayer(entry);
    it.act && it.act();
  };
  holder.addEventListener('mousemove', (e) => {
    const mi = e.target.closest('.mi');
    if (mi && +mi.dataset.i !== active) { active = +mi.dataset.i; paint(); }
  });
  holder.addEventListener('click', (e) => { const mi = e.target.closest('.mi'); if (mi) choose(+mi.dataset.i); });
  draw();
  place(pop, anchor, opts.place || {});
  const input = $('input', pop);
  if (input) {
    input.focus();
    input.addEventListener('input', () => { active = 0; draw(input.value); });
  }
  entry.key = (e) => {
    if (e.key === 'ArrowDown') { active = (active + 1) % Math.max(1, flat.length); paint(); return true; }
    if (e.key === 'ArrowUp') { active = (active - 1 + flat.length) % Math.max(1, flat.length); paint(); return true; }
    if (e.key === 'Enter') { choose(active); return true; }
    return false;
  };
  entry.pop = pop;
  return entry;
}

document.addEventListener('keydown', (e) => {
  const top = topLayer();
  if (top && !top.passiveKeys) {
    if (e.key === 'Escape') { e.preventDefault(); closeLayer(top); return; }
    if (top.key && top.key(e)) { e.preventDefault(); return; }
  }
  const mod = e.metaKey || e.ctrlKey;
  if (mod && e.key.toLowerCase() === 'k') { e.preventDefault(); openSearch('pages'); }
  else if (mod && e.key === '\\') { e.preventDefault(); setSidebar(!S.ui.sbOpen); }
  else if (mod && e.shiftKey && e.key.toLowerCase() === 'l') { e.preventDefault(); toggleTheme(); }
  else if (mod && e.key.toLowerCase() === 'j') { e.preventDefault(); go('#/ai'); }
}, true);

function toggleTheme() {
  const cur = document.documentElement.dataset.theme;
  S.ui.theme = cur === 'dark' ? 'light' : 'dark';
  applyTheme();
  save();
}

/* ---------- slash menu ---------- */
let slashPop = null;
function slashItems(q) {
  const ql = q.toLowerCase();
  return TYPES.filter((t) => !ql || t.name.toLowerCase().includes(ql) || t.key.startsWith(ql) || (t.hint && t.hint === q));
}
function openSlash(p, leaf) {
  const keep = slash;
  closeSlash();
  slash = keep;
  slashPop = openLayer('<div class="pop slash" role="listbox" style="width:324px;max-height:min(400px, 50vh)"></div>', { passive: true, onClose: () => { slashPop = null; slash = null; } });
  slashPop.passiveKeys = true;
  slashPop.active = 0;
  slashPop.leaf = leaf;
  const pop = $('.pop', slashPop.layer);
  pop.addEventListener('mousedown', (e) => e.preventDefault());
  pop.addEventListener('mousemove', (e) => {
    const mi = e.target.closest('.mi');
    if (mi && +mi.dataset.i !== slashPop.active) { slashPop.active = +mi.dataset.i; paintSlash(); }
  });
  pop.addEventListener('click', (e) => { const mi = e.target.closest('.mi'); if (mi) { slashPop.active = +mi.dataset.i; slashKey('Enter', p); } });
  updateSlash(p, leaf);
}
function updateSlash(p, leaf) {
  if (!slashPop || !slash) return;
  const text = leaf.textContent;
  const caret = caretOffset(leaf);
  if (caret <= slash.start || text[slash.start] !== '/') { closeSlash(); return; }
  const q = text.slice(slash.start + 1, caret);
  const items = slashItems(q);
  if (/\s{2}/.test(q) || (!items.length && q.length > 8)) { closeSlash(); return; }
  slashPop.items = items;
  slashPop.active = Math.min(slashPop.active, Math.max(0, items.length - 1));
  const pop = $('.pop', slashPop.layer);
  pop.innerHTML = items.length
    ? `<div class="pop-group">${q ? '' : '<div class="pop-label">Basic blocks</div>'}${items.map((t, i) => `<div class="mi" role="option" data-i="${i}"><span class="mi-ico">${G[t.key]}</span><span class="mi-text">${esc(t.name)}</span><span class="mi-hint">${esc(t.hint)}</span></div>`).join('')}</div>
       <div class="pop-foot">Type ‘/’ on the page <span style="float:right">esc</span></div>`
    : '<div class="pop-empty">No results</div>';
  paintSlash();
  // Position under the caret
  const sel = getSelection();
  let rect = sel.rangeCount ? sel.getRangeAt(0).getClientRects()[0] : null;
  if (!rect) rect = leaf.getBoundingClientRect();
  place(pop, { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom + 4 }, {});
}
function paintSlash() {
  if (!slashPop) return;
  $$('.mi', slashPop.layer).forEach((el) => el.classList.toggle('active', +el.dataset.i === slashPop.active));
  const act = $('.mi.active', slashPop.layer);
  act && act.scrollIntoView({ block: 'nearest' });
}
function slashKey(key, p) {
  if (!slashPop) return;
  const items = slashPop.items || [];
  if (key === 'Escape') { closeSlash(); return; }
  if (key === 'ArrowDown') { slashPop.active = (slashPop.active + 1) % Math.max(1, items.length); paintSlash(); return; }
  if (key === 'ArrowUp') { slashPop.active = (slashPop.active - 1 + items.length) % Math.max(1, items.length); paintSlash(); return; }
  const t = items[slashPop.active];
  const st = slash;
  const leaf = slashPop.leaf;
  closeSlash();
  if (!t || !st) return;
  const hit = findBlock(p, st.bid);
  const caret = caretOffset(leaf);
  const text = leaf.textContent;
  hit.blk.text = text.slice(0, st.start) + text.slice(Math.max(caret, st.start + 1));
  if (!hit.blk.text.trim() || t.key === 'divider') {
    hit.blk.text = hit.blk.text.trim() ? hit.blk.text : '';
    setType(p, hit.blk, t.key, 0);
  } else if (t.key === 'page') {
    setType(p, hit.blk, 'page');
  } else {
    const nb = { id: uid(), type: t.key, text: '' };
    if (t.key === 'todo') nb.checked = false;
    if (t.key === 'toggle') nb.open = true;
    hit.list.splice(hit.index + 1, 0, nb);
    renderBlocks(p, { id: nb.id, offset: 0 });
    touch(p);
  }
}
function closeSlash() { if (slashPop) closeLayer(slashPop); slashPop = null; slash = null; }

/* ---------- block menu ---------- */
function blockMenu(p, bid, anchor) {
  const hit = findBlock(p, bid);
  if (!hit) return;
  selectBlock(bid);
  const b = hit.blk;
  const label = b.type === 'page' ? 'Page' : (TYPE[b.type] || TYPE.text).name;
  const turnable = !['page', 'divider'].includes(b.type);
  const groups = [
    { label, items: [
      ...(turnable ? [{ label: 'Turn into', icon: ic('turnInto'), sub: (el) => turnIntoMenu(p, b, el) }] : []),
      ...(b.type !== 'divider' ? [{ label: 'Color', icon: G.color, sub: (el) => colorMenu(p, b, el) }] : []),
      ...(b.type === 'page' ? [{ label: 'Open in new tab', icon: ic('arrowDiagonalUpRight'), hint: '⌘⇧↵', act: () => window.open('#/p/' + b.pageId, '_blank') }] : []),
    ] },
    { items: [
      { label: 'Copy link to block', icon: ic('link'), hint: '⌥⇧L', act: () => copyText(location.href.split('#')[0] + '#/p/' + p.id + '?b=' + b.id, 'Copied link to block') },
      { label: 'Duplicate', icon: ic('copyCode'), hint: '⌘D', act: () => duplicateBlock(p, findBlock(p, bid)) },
      { label: 'Move to', icon: G.arrowMove, hint: '⌘⇧P', act: () => toast('Moving blocks between pages isn’t part of this clone') },
      { label: 'Delete', icon: G.trash, hint: 'Del', danger: true, act: () => { const h = findBlock(p, bid); h.list.splice(h.index, 1); if (!p.blocks.length) p.blocks.push({ id: uid(), type: 'text', text: '' }); renderBlocks(p); touch(p); } },
    ] },
    { items: [{ label: 'Ask AI', icon: ic('notionTintable'), hint: '⌘J', act: () => go('#/ai') }] },
  ];
  const entry = menu(anchor, groups, {
    search: 'Search actions…',
    foot: `Last edited by you<br>${esc(p.edited === 'just now' ? 'Just now' : p.edited + ', 2026')}`,
    place: { side: 'left', gap: 6 },
    onClose: () => $$('.blk.selected').forEach((x) => x.classList.remove('selected')),
  });
  return entry;
}
function turnIntoMenu(p, b, el) {
  const items = TYPES.filter((t) => !['page', 'divider'].includes(t.key)).map((t) => ({
    label: t.name, icon: G[t.key], right: b.type === t.key ? G.check.replace('<svg', '<svg class="check-mark"') : '',
    act: () => { closeAllLayers(); setType(p, b, t.key, (b.text || '').length); },
  }));
  menu(el, [{ label: 'Turn into', items }], { width: 240, place: { side: 'right', gap: 2 } });
}
function colorMenu(p, b, el) {
  const swatch = (c) => `<span class="color-swatch tc-${c}">A</span>`;
  const set = (val) => () => { closeAllLayers(); b.color = val; renderBlocks(p); touch(p); };
  menu(el, [
    { label: 'Text color', items: [{ label: 'Default text', icon: '<span class="color-swatch">A</span>', act: set(null) }, ...COLORS.map((c) => ({ label: c[0].toUpperCase() + c.slice(1) + ' text', icon: swatch(c), act: set(c) }))] },
    { label: 'Background color', items: [{ label: 'Default background', icon: '<span class="color-swatch"></span>', act: set(null) }, ...COLORS.map((c) => ({ label: c[0].toUpperCase() + c.slice(1) + ' background', icon: `<span class="color-swatch bg-sw" data-c="${c}"></span>`, act: set('bg-' + c) }))] },
  ], { width: 220, place: { side: 'right', gap: 2 } });
  $$('.bg-sw').forEach((s) => {
    const probe = document.createElement('div');
    probe.className = 'bc-' + s.dataset.c;
    probe.innerHTML = '<div class="blk-main"></div>';
    probe.style.display = 'none';
    document.body.appendChild(probe);
    s.style.background = getComputedStyle(probe.firstChild).backgroundColor;
    probe.remove();
  });
}

/* ---------- emoji picker ---------- */
function emojiPicker(anchor, onPick, onRemove) {
  const entry = openLayer(`<div class="pop" style="width:330px">
    <div class="pop-tabs"><button class="on">Emoji</button><button data-x="1">Icons</button><span class="spacer"></span>${onRemove ? '<button data-remove>Remove</button>' : ''}</div>
    <div class="emoji-grid">${EMOJIS.map((em) => `<button class="emoji" data-em="${em}">${em}</button>`).join('')}</div></div>`);
  const pop = $('.pop', entry.layer);
  place(pop, anchor, { gap: 6 });
  pop.addEventListener('click', (e) => {
    const em = e.target.closest('[data-em]');
    if (em) { closeLayer(entry); onPick(em.dataset.em); return; }
    if (e.target.closest('[data-remove]')) { closeLayer(entry); onRemove(); return; }
    if (e.target.closest('[data-x]')) toast('Only emoji icons are available in this clone');
  });
}

/* ---------- topbar & frame actions ---------- */
frame.addEventListener('click', (e) => {
  const crumb = e.target.closest('[data-go]');
  if (crumb) { go(crumb.dataset.go); return; }
  const a = e.target.closest('[data-act]');
  if (!a || a.closest('.page')) return;
  const p = route.view === 'page' ? page(route.pid) : null;
  switch (a.dataset.act) {
    case 'open-sidebar': setSidebar(true); break;
    case 'copy-link': copyText(location.href, 'Copied link to clipboard'); break;
    case 'favorite': {
      const favs = S.order.favorites;
      if (favs.includes(p.id)) S.order.favorites = favs.filter((x) => x !== p.id);
      else favs.push(p.id);
      save(); render(); break;
    }
    case 'share': sharePopover(a, p); break;
    case 'page-actions': pageActions(a, p); break;
    case 'noop-toast': toast(a.dataset.msg); break;
  }
});

function copyText(text, msg) {
  const done = () => toast(msg);
  if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, done);
  else done();
}

function sharePopover(anchor, p) {
  const entry = openLayer(`<div class="pop share-pop">
    <div class="share-tabs"><span class="on">Share</span><span>Publish</span></div>
    <div class="share-body">
      <div class="share-invite"><div>Email or group, separated by commas</div><button class="blue-btn" data-x>Invite</button></div>
      <div class="share-row"><span class="avatar emoji">${WORKSPACE.icon}</span><div>You<small>Full access</small></div><span class="right">Full access</span></div>
      <div class="share-row"><span class="avatar"><span class="team-tile">${TEAMSPACE.tile}</span></span><div>Everyone at ${esc(TEAMSPACE.name)}<small>Teamspace members</small></div><span class="right">Can edit</span></div>
    </div>
    <div class="share-foot"><span>General access: Only people invited</span><button class="ghost-btn" data-copy>${ic('link')}Copy link</button></div>
  </div>`);
  const pop = $('.pop', entry.layer);
  place(pop, anchor, { align: 'end' });
  pop.addEventListener('click', (e) => {
    if (e.target.closest('[data-copy]')) { closeLayer(entry); copyText(location.href, 'Copied link to clipboard'); }
    if (e.target.closest('[data-x]')) toast('Invites aren’t part of this clone');
  });
}

function pageActions(anchor, p) {
  p.style = p.style || {};
  const st = p.style;
  const fonts = [['default', 'Ag', 'Default'], ['serif', 'Ag', 'Serif'], ['mono', 'Ag', 'Mono']];
  const top = `<div class="font-picks">${fonts.map(([k, g, n]) => `<button data-font="${k}" class="${(st.font || 'default') === k ? 'on' : ''}"><b style="font-family:${k === 'serif' ? 'Lyon-Text, Georgia, serif' : k === 'mono' ? 'iawriter-mono, Menlo, monospace' : 'inherit'}">${g}</b><small>${n}</small></button>`).join('')}</div>`;
  const flip = (key) => () => { st[key] = !st[key]; touch(p); render(); };
  const entry = menu(anchor, [
    { items: [
      { label: 'Copy link', icon: ic('link'), hint: '⌘L', act: () => copyText(location.href, 'Copied link to clipboard') },
      { label: 'Duplicate', icon: ic('copyCode'), hint: '⌘D', act: () => duplicatePage(p.id) },
      { label: 'Move to', icon: G.arrowMove, hint: '⌘⇧P', act: () => toast('Moving pages isn’t part of this clone') },
      { label: 'Move to Trash', icon: G.trash, danger: true, act: () => trashPage(p.id) },
    ] },
    { items: [
      { label: 'Small text', icon: '<span class="h-glyph" style="font-size:11px">Aa</span>', right: `<span class="switch${st.small ? ' on' : ''}"></span>`, act: flip('small') },
      { label: 'Full width', icon: '<svg viewBox="0 0 20 20"><path d="M2.6 4.6h14.8v1.2H2.6zm0 9.6h14.8v1.2H2.6zM5.4 7.6 3 10l2.4 2.4.85-.85L4.7 10l1.55-1.55zm9.2 0-.85.85L15.3 10l-1.55 1.55.85.85L17 10z"/></svg>', right: `<span class="switch${st.full ? ' on' : ''}"></span>`, act: flip('full') },
      { label: S.ui.theme === 'dark' || document.documentElement.dataset.theme === 'dark' ? 'Light mode' : 'Dark mode', icon: G.sun, hint: '⌘⇧L', act: toggleTheme },
    ] },
  ], { top, width: 265, place: { align: 'end' }, foot: `Word count: ${wordCount(p)}<br>Last edited by you · ${esc(p.edited === 'just now' ? 'Just now' : p.edited)}` });
  entry.pop.addEventListener('click', (e) => {
    const f = e.target.closest('[data-font]');
    if (f) { st.font = f.dataset.font === 'default' ? null : f.dataset.font; closeLayer(entry); touch(p); render(); }
  });
}
function wordCount(p) {
  let n = (p.title || '').split(/\s+/).filter(Boolean).length;
  walkBlocks(p.blocks, (b) => { n += (b.text || '').split(/\s+/).filter(Boolean).length; });
  return n;
}

/* ---------- page CRUD ---------- */
function createPage(parent, navigate = true) {
  const np = { id: 'p' + uid(), title: '', icon: null, parent, blocks: [{ id: uid(), type: 'text', text: '' }], cover: null, edited: 'just now' };
  S.pages[np.id] = np;
  if (parent === 'private' || parent === 'team') S.order[parent].push(np.id);
  else {
    const pp = page(parent);
    pp.blocks.push({ id: uid(), type: 'page', pageId: np.id });
    touch(pp);
  }
  save();
  if (navigate) {
    go('#/p/' + np.id);
    requestAnimationFrame(() => { const t = $('.page-title'); t && setCaret(t, 0); });
  }
  return np;
}
function newPage(parent) { closeMobileSidebar(); createPage(parent); }
function duplicatePage(pid) {
  const p = page(pid);
  const np = { ...JSON.parse(JSON.stringify(p)), id: 'p' + uid(), title: (p.title || 'New page') + ' (1)', edited: 'just now' };
  np.blocks = np.blocks.map((b) => (b.type === 'page' ? { ...b, id: uid() } : cloneBlock(b)));
  S.pages[np.id] = np;
  if (p.parent === 'private' || p.parent === 'team') {
    const list = S.order[p.parent];
    list.splice(list.indexOf(pid) + 1, 0, np.id);
  } else {
    const pp = page(p.parent);
    const hit = (() => { let h = null; walkBlocks(pp.blocks, (b, list, i) => { if (b.type === 'page' && b.pageId === pid) { h = { list, i }; return false; } }); return h; })();
    if (hit) hit.list.splice(hit.i + 1, 0, { id: uid(), type: 'page', pageId: np.id });
    np.parent = p.parent;
  }
  save();
  go('#/p/' + np.id);
  toast('Duplicated page');
}
function trashPage(pid) {
  const p = page(pid);
  p.trash = true;
  S.order.favorites = S.order.favorites.filter((x) => x !== pid);
  save();
  toast(`Moved “${titleOf(p)}” to Trash`);
  if (route.view === 'page' && (route.pid === pid || ancestors(route.pid).chain.some((x) => x.id === pid))) {
    const fallback = alive(p.parent) ? p.parent : 'health-science-lab';
    go('#/p/' + (alive(fallback) ? fallback : S.order.private.find(alive)));
  } else render();
}

function pageMenu(anchor, pid, row) {
  const p = page(pid);
  const fav = S.order.favorites.includes(pid);
  row.classList.add('menu-open');
  menu(anchor, [
    { label: 'Page', items: [
      { label: fav ? 'Remove from Favorites' : 'Add to Favorites', icon: ic('star'), act: () => { if (fav) S.order.favorites = S.order.favorites.filter((x) => x !== pid); else S.order.favorites.push(pid); save(); render(); } },
      { label: 'Copy link', icon: ic('link'), act: () => copyText(location.href.split('#')[0] + '#/p/' + pid, 'Copied link to clipboard') },
      { label: 'Duplicate', icon: ic('copyCode'), hint: '⌘D', act: () => duplicatePage(pid) },
      { label: 'Rename', icon: ic('pencilSmall'), hint: '⌘⇧R', act: () => { go('#/p/' + pid); requestAnimationFrame(() => { const t = $('.page-title'); t && setCaret(t, t.textContent.length); }); } },
      { label: 'Open in new tab', icon: ic('arrowDiagonalUpRight'), hint: '⌘⇧↵', act: () => window.open('#/p/' + pid, '_blank') },
    ] },
    { items: [{ label: 'Move to Trash', icon: G.trash, danger: true, act: () => trashPage(pid) }] },
  ], { width: 265, foot: `Last edited by you<br>${esc(p.edited === 'just now' ? 'Just now' : p.edited + ', 2026')}`, onClose: () => row.classList.remove('menu-open') });
}

function chatMenu(anchor, cid, row) {
  const c = S.chats[cid];
  row.classList.add('menu-open');
  menu(anchor, [{ items: [
    { label: 'Rename', icon: ic('pencilSmall'), act: () => { const t = prompt('Rename chat', c.title); if (t) { c.title = t; save(); render(); } } },
    { label: 'Copy link', icon: ic('link'), act: () => copyText(location.href.split('#')[0] + '#/chat/' + cid, 'Copied link to clipboard') },
    { label: 'Delete', icon: G.trash, danger: true, act: () => { delete S.chats[cid]; S.chatOrder = S.chatOrder.filter((x) => x !== cid); save(); if (route.cid === cid) go('#/ai'); else render(); } },
  ] }], { width: 220, onClose: () => row.classList.remove('menu-open') });
}

function workspaceMenu(anchor) {
  menu(anchor, [
    { label: 'Workspaces', items: [
      { label: WORKSPACE.name, icon: `<span class="emoji">${WORKSPACE.icon}</span>`, right: G.check.replace('<svg', '<svg class="check-mark"'), act: () => {} },
    ] },
    { items: [
      { label: 'Settings', icon: ic('sliders'), act: () => toast('Settings aren’t part of this clone') },
      { label: 'Invite members', icon: ic('person'), act: () => toast('Invites aren’t part of this clone') },
    ] },
  ], { width: 280, place: { side: 'bottom' } });
}
function libraryMenu(anchor) {
  const trashed = Object.values(S.pages).filter((p) => p.trash);
  menu(anchor, [
    { items: [
      { label: S.ui.theme ? `Appearance: ${S.ui.theme === 'dark' ? 'Dark' : 'Light'}` : 'Appearance: System', icon: G.sun, hint: '⌘⇧L', act: () => { S.ui.theme = S.ui.theme === null ? (mq.matches ? 'light' : 'dark') : S.ui.theme === 'dark' ? 'light' : null; applyTheme(); save(); } },
      { label: `Trash${trashed.length ? ` (${trashed.length})` : ''}`, icon: G.trash, sub: trashed.length ? (el) => trashMenu(el) : null, act: () => toast('Trash is empty') },
    ] },
    { items: [{ label: 'Reset demo content', icon: G.reset, danger: true, act: () => { if (confirm('Reset the clone to its original sample content?')) { S = seed(); applyTheme(); save(); go('#/p/health-science-lab'); render(); } } }] },
  ], { width: 260, place: { side: 'right', gap: 8 } });
}
function trashMenu(el) {
  const trashed = Object.values(S.pages).filter((p) => p.trash);
  menu(el, [{ label: 'Restore from Trash', items: trashed.map((p) => ({ label: titleOf(p), icon: p.icon ? `<span class="emoji">${p.icon}</span>` : ic('page'), act: () => { p.trash = false; save(); closeAllLayers(); go('#/p/' + p.id); } })) }], { width: 240, place: { side: 'right' } });
}

/* ================================================================ search */
function openSearch(scope = 'pages') {
  closeAllLayers();
  closeMobileSidebar();
  const entry = openLayer(`<div class="underlay"></div><div class="search-dlg" role="dialog" aria-label="Search Notion">
    <div class="sd-top">
      <div class="sd-input-wrap">${ic('magnifyingGlass')}<input role="combobox" aria-expanded="true" placeholder="Search or ask a question in ${esc(WORKSPACE.name)}…" autocomplete="off" spellcheck="false"><span class="sd-arrows">${ic('arrowStraightLeftSmall')}${ic('arrowStraightRightSmall')}</span></div>
      <div class="sd-toggles"><button class="round-btn" data-tip="Hide highlight pane" aria-label="Hide highlight pane">${ic('sidebarRight')}</button><button class="round-btn" data-tip="Hide filters" aria-label="Hide filters">${ic('filterCircle')}</button></div>
    </div>
    <div class="sd-filters">
      <button class="pill-tab" data-scope="pages">Pages</button><button class="pill-tab" data-scope="chats">Chats</button>
      <span class="vsep"></span>
      <button class="filter-chip">${ic('textFormat')}Title only</button>
      <button class="filter-chip">${ic('person')}Created by${ic('arrowChevronSingleDownSmall', 'chev')}</button>
      <button class="filter-chip">${ic('pageEmpty')}In${ic('arrowChevronSingleDownSmall', 'chev')}</button>
      <button class="filter-chip add">${ic('plusSmall')}Filter</button>
    </div>
    <div class="sd-body"><div class="sd-list" role="listbox"></div><aside class="sd-preview"></aside></div>
    <div class="sd-foot"><span>⌘ ↵ Open in new tab</span>${ic('slidersSmall')}</div>
  </div>`);
  const dlg = $('.search-dlg', entry.layer);
  const input = $('input', dlg);
  const list = $('.sd-list', dlg);
  const preview = $('.sd-preview', dlg);
  let items = [];
  let active = 0;
  let sc = scope;

  const pathOf = (p) => {
    const { root, chain } = ancestors(p.id);
    const names = [root === 'team' ? TEAMSPACE.name : 'Private', ...chain.slice(0, -1).map(titleOf)];
    return names.length > 3 ? [names[0], '...', names[names.length - 1]] : names;
  };
  const draw = () => {
    $$('.pill-tab', dlg).forEach((b) => b.classList.toggle('on', b.dataset.scope === sc));
    const q = input.value.trim().toLowerCase();
    let groups;
    if (sc === 'pages') {
      const all = Object.values(S.pages).filter((p) => !p.trash);
      const ranked = [...S.recent.filter(alive).map(page), ...all.filter((p) => !S.recent.includes(p.id))];
      const hits = ranked.filter((p) => !q || titleOf(p).toLowerCase().includes(q) || p.blocks.some((b) => (b.text || '').toLowerCase().includes(q)));
      items = hits.map((p) => ({ kind: 'page', p }));
      groups = q ? [['Best matches', items]] : [['Today', items.slice(0, 5)], ['Past week', items.slice(5, 9)], ['Older', items.slice(9)]];
    } else {
      const chats = S.chatOrder.map((c) => S.chats[c]).filter((c) => c && (!q || c.title.toLowerCase().includes(q)));
      items = chats.map((c) => ({ kind: 'chat', c }));
      groups = [[q ? 'Best matches' : 'Recent chats', items]];
    }
    active = Math.min(active, Math.max(0, items.length - 1));
    let i = -1;
    list.innerHTML = items.length ? groups.filter((g) => g[1].length).map(([label, gi]) => `<div class="sd-group"><div class="sd-group-label">${label}</div>${gi.map((it) => {
      i++;
      if (it.kind === 'chat') return `<div class="sd-item" role="option" data-i="${i}"><span class="sd-ico">${ic('chatBubble')}</span><span class="sd-main"><span class="sd-title">${esc(it.c.title)}</span></span>${ic('arrowTurnDownLeftSmall', 'sd-enter')}</div>`;
      const path = pathOf(it.p);
      return `<div class="sd-item" role="option" data-i="${i}"><span class="sd-ico">${it.p.icon ? `<span class="emoji">${it.p.icon}</span>` : ic(it.p.db ? 'viewTable' : 'page')}</span><span class="sd-main"><span class="sd-title">${esc(titleOf(it.p))}</span><span class="sd-dash">—</span><span class="sd-path">${path.map(esc).join(' / ')}</span></span>${ic('arrowTurnDownLeftSmall', 'sd-enter')}</div>`;
    }).join('')}</div>`).join('') : `<div class="sd-empty">No results${q ? ` for “${esc(input.value)}”` : ''}</div>`;
    paint();
  };
  const paint = () => {
    $$('.sd-item', list).forEach((el) => el.classList.toggle('active', +el.dataset.i === active));
    const act = $('.sd-item.active', list);
    act && act.scrollIntoView({ block: 'nearest' });
    const it = items[active];
    if (!it) { preview.innerHTML = ''; return; }
    if (it.kind === 'chat') {
      preview.innerHTML = `<div class="sd-card"><div class="sd-card-body"><div class="sd-card-path">Notion AI · ${esc(it.c.turns[0] ? it.c.turns[0].time : '')}</div><div class="sd-card-title">${esc(it.c.title)}</div><div class="sd-card-text">${esc(plainTurn(it.c.turns[0]))}</div></div></div>`;
      return;
    }
    const p = it.p;
    const lines = [];
    walkBlocks(p.blocks, (b) => { if (b.text && lines.length < 6) lines.push(b.text); if (b.type === 'page' && alive(b.pageId) && lines.length < 6) lines.push('↳ ' + titleOf(page(b.pageId))); });
    preview.innerHTML = `<div class="sd-card"><div class="sd-card-tools"><button data-tip="Copy link" data-copy>${ic('link')}</button><button data-tip="Open" data-open>${ic('arrowDiagonalUpRight')}</button></div>
      <div class="sd-card-cover" style="${p.cover ? `background:${p.cover}` : ''}"></div>
      <div class="sd-card-body"><div class="sd-card-path">${pathOf(p).map(esc).join(' / ')}</div><div class="sd-card-title">${p.icon ? `<span class="emoji">${p.icon}</span> ` : ''}${esc(titleOf(p))}</div>
      <div class="sd-card-text">${lines.length ? lines.map((l) => `<div>${esc(l)}</div>`).join('') : '<div class="ph" style="width:80%"></div><div class="ph" style="width:60%"></div><div class="ph" style="width:70%"></div>'}</div></div></div>`;
  };
  const open = (i, newTab) => {
    const it = items[i];
    if (!it) return;
    const hash = it.kind === 'chat' ? '#/chat/' + it.c.id : '#/p/' + it.p.id;
    closeLayer(entry);
    if (newTab) window.open(hash, '_blank'); else go(hash);
  };
  input.addEventListener('input', () => { active = 0; draw(); });
  list.addEventListener('mousemove', (e) => { const el = e.target.closest('.sd-item'); if (el && +el.dataset.i !== active) { active = +el.dataset.i; paint(); } });
  list.addEventListener('click', (e) => { const el = e.target.closest('.sd-item'); if (el) open(+el.dataset.i, e.metaKey || e.ctrlKey); });
  preview.addEventListener('click', (e) => {
    if (e.target.closest('[data-open]')) open(active);
    if (e.target.closest('[data-copy]') && items[active] && items[active].p) copyText(location.href.split('#')[0] + '#/p/' + items[active].p.id, 'Copied link to clipboard');
  });
  $$('.pill-tab', dlg).forEach((b) => b.addEventListener('click', () => { sc = b.dataset.scope; active = 0; draw(); input.focus(); }));
  $$('.filter-chip, .round-btn', dlg).forEach((b) => b.addEventListener('click', () => toast('Search filters aren’t part of this clone')));
  entry.key = (e) => {
    if (e.key === 'ArrowDown') { active = Math.min(items.length - 1, active + 1); paint(); return true; }
    if (e.key === 'ArrowUp') { active = Math.max(0, active - 1); paint(); return true; }
    if (e.key === 'Enter') { open(active, e.metaKey || e.ctrlKey); return true; }
    if ((e.key === 'ArrowLeft' || e.key === 'ArrowRight') && !input.value) { sc = sc === 'pages' ? 'chats' : 'pages'; active = 0; draw(); return true; }
    return false;
  };
  draw();
  input.focus();
}

/* ================================================================ chat */
function plainTurn(turn) {
  if (!turn) return '';
  const seg = (parts) => parts.map((x) => (typeof x === 'string' ? x : titleOf(page(x.m)))).join('');
  return seg(turn.user);
}
function richText(parts) {
  return parts.map((x) => {
    if (typeof x === 'string') return esc(x);
    const p = page(x.m);
    if (!p) return '';
    return `<a class="mention" href="#/p/${p.id}"><span class="m-ico">${p.icon ? `<span class="emoji">${p.icon}</span>` : ic('page')}${ic('arrowDiagonalUpRightSmall')}</span><span class="m-title">${esc(titleOf(p))}</span></a>`;
  }).join('');
}

function composerHTML(home) {
  return `<div class="composer-wrap">
    <div class="composer-stack">
      <div class="composer">
        <div class="composer-input" contenteditable="plaintext-only" role="textbox" aria-label="Ask Notion AI" data-ph="Ask Notion AI"></div>
        <div class="composer-row">
          <div class="left">
            <button class="c-round" data-act="c-attach" data-tip="Add files and options" aria-label="Add files and options">${ic('plus')}</button>
            <button class="c-pill" data-act="c-mode" aria-label="Choose approval mode">Review for me</button>
          </div>
          <div class="right">
            <button class="c-pill" data-act="c-model" aria-label="Choose AI model">Auto</button>
            <button class="c-round" data-act="c-mic" data-tip="Start dictation" aria-label="Start dictation">${ic('microphone')}</button>
            <button class="send-btn" data-act="c-send" aria-label="Submit AI message" disabled>${ic('arrowStraightUpFillSmall')}</button>
          </div>
        </div>
      </div>
      ${home && S.ui.apps ? `<div class="apps-banner" role="button" data-act="c-apps"><span class="ellipsis">Get better answers from your apps</span><span class="apps-icons">${['slack', 'gmail', 'notionCalendar', 'googleCalendar', 'googleDrive', 'microsoftTeams', 'microsoftOutlook', 'microsoftSharePoint', 'asana', 'box', 'gitHub', 'jira', 'linear', 'salesforce'].map((n) => ic(n)).join('')}</span><button class="x" data-act="c-apps-close" aria-label="Close">${ic('xMarkSmall')}</button></div>` : ''}
    </div>
    ${home ? `<div class="suggest">
      <button data-act="c-suggest" data-q="Make a slide deck from Health Science Lab">${ic('squareGrid2X2')}Slides</button>
      <button data-act="c-suggest" data-q="Turn my Tool Diary into a spreadsheet">${ic('viewTable')}Spreadsheets</button>
      <button data-act="c-suggest" data-q="Research the best soil pH meters">${ic('docTextMagnifyingGlass')}Research</button>
      <button data-act="c-suggest" data-q="Visualize the cilantro germination log">${ic('cursorClick')}Visualize</button>
    </div>` : ''}
  </div>`;
}

function renderNewChat() {
  frame.innerHTML = `<div class="chat-view">
    <div class="chat-toolbar" role="toolbar"><button class="menu-btn" data-act="open-sidebar" data-tip="Lock sidebar open" data-hint="⌘\\" aria-label="Lock sidebar open">${ic('menu')}</button><div class="grow"></div></div>
    <div class="chat-home"><div class="chat-home-inner">
      <div class="chat-hero">
        <div class="hero-avatar" role="button" aria-label="Open personalization settings" data-act="c-personalize">${aiFace()}<span class="personalize">${ic('pencilLine')}Personalize</span></div>
        <h2>What royal service do you require?</h2>
      </div>
      ${composerHTML(true)}
    </div></div>
  </div>`;
  bindChat(null);
  const input = $('.composer-input');
  input && input.focus();
}

function turnHTML(turn, idx, streaming) {
  const ai = (turn.ai || []).map((part) => {
    if (part.tool) return `<div class="tool-line${part.thinking ? ' thinking' : ''}"><span class="notion-agent-tool-use-title">${esc(part.tool)}</span></div>`;
    if (part.p) return `<div class="ai-body"><p>${richText(part.p)}${streaming && part === turn.ai[turn.ai.length - 1] ? '<span class="typing-caret"></span>' : ''}</p></div>`;
    if (part.card) return `<div class="edit-card" data-card="${idx}"><div class="edit-card-head"><span class="t">${esc(part.card.title)}</span><button class="chip-btn" data-act="c-show-changes">${part.open ? 'Hide changes' : 'Show changes'}</button><button class="sq-btn" data-act="c-undo" data-tip="Undo" aria-label="Undo">${ic('arrowUTurnUpLeftSmall')}</button></div>
      ${part.open ? `<div class="edit-card-list">${part.card.pages.filter(alive).map((pid) => `<a href="#/p/${pid}"><span class="emoji">${page(pid).icon || ''}</span>${esc(titleOf(page(pid)))}<span class="moved">Moved into Health Science Lab</span></a>`).join('')}</div>` : ''}</div>`;
    return '';
  }).join('');
  return `<div class="turn" data-turn="${idx}">
    ${idx === 0 ? `<div class="meta-line">Notion AI · ${esc(turn.time)}</div>` : ''}
    <div class="msg-user"><div class="bubble">${richText(turn.user)}</div>
      <div class="msg-tools"><span class="time">${esc(turn.time)}</span><button class="sq-btn" data-act="c-edit" data-tip="Edit message" aria-label="Edit message">${ic('pencilSmall')}</button><button class="sq-btn" data-act="c-copy-user" data-tip="Copy text" aria-label="Copy text">${ic('duplicateSmall')}</button></div></div>
    <div class="msg-ai">${ai}
      ${streaming ? '' : `<div class="ai-actions">
        <button class="sq-btn" data-act="c-copy" data-tip="Copy response" aria-label="Copy response">${ic('duplicateSmall')}</button>
        <button class="sq-btn" data-act="c-save" data-tip="Save to private pages" aria-label="Save to private pages">${ic('plusSmall')}</button>
        <button class="sq-btn${turn.vote === 1 ? ' on' : ''}" data-act="c-up" data-tip="Share positive feedback" aria-label="Share positive feedback">${ic('handThumbsUpSmall')}</button>
        <button class="sq-btn${turn.vote === -1 ? ' on' : ''}" data-act="c-down" data-tip="Share negative feedback" aria-label="Share negative feedback">${ic('handThumbsDownSmall')}</button>
        ${turn.ai && turn.ai.some((x) => x.card) ? `<button class="undo" data-act="c-undo">${ic('arrowUTurnUpLeftSmall')}Undo</button>` : ''}
        <span class="time">${esc(turn.time)}</span>
      </div>`}
    </div>
  </div>`;
}

function renderThread(c, streamingIdx = -1) {
  const artifacts = (c.artifacts || []).filter(alive);
  frame.innerHTML = `<div class="chat-view${S.ui.ctx ? ' with-panel' : ''}">
    <div class="chat-toolbar" role="toolbar">
      <button class="menu-btn" data-act="open-sidebar" data-tip="Lock sidebar open" data-hint="⌘\\" aria-label="Lock sidebar open">${ic('menu')}</button>
      <div class="grow">
        <button class="chat-avatar-btn" data-act="c-personalize" aria-label="Personalize">${aiFace()}</button>
        <button class="chat-crumb" data-act="c-personalize"><span class="ellipsis">${esc(AI_NAME)}</span></button>
        <span class="crumb-sep" aria-hidden="true">/</span>
        <button class="chat-crumb title" data-act="c-rename"><span class="ellipsis">${esc(c.title)}</span></button>
        <button class="icon-btn" data-act="c-history" data-tip="Chat history" aria-label="Chat history">${ic('arrowChevronSingleDownSmall')}</button>
      </div>
      <div class="chat-tools">
        <button class="icon-btn keep" data-act="c-new" data-tip="Start new chat" aria-label="Start new chat">${ic('chatBubblePlus')}</button>
        <button class="icon-btn" data-act="c-share" data-tip="Share" aria-label="Share">${ic('squareAndArrowUp')}</button>
        <button class="icon-btn${S.ui.ctx ? ' on' : ''}" data-act="c-ctx" data-tip="${S.ui.ctx ? 'Hide context' : 'Show context'}" aria-label="${S.ui.ctx ? 'Hide context' : 'Show context'}">${ic('agentServiceContextPanel')}</button>
        <button class="icon-btn" data-act="noop-toast" data-msg="Pinned chats aren't part of this clone" data-tip="Pin chat" aria-label="Pin chat">${ic('pin')}</button>
        <button class="icon-btn more-btn keep" data-act="c-more" data-tip="Delete, rename, and more…" aria-label="Delete, rename, and more…">${ic('ellipsis')}</button>
      </div>
    </div>
    <div class="thread-wrap">
      <div class="thread-scroll"><div class="thread-col"><div class="inner">
        ${c.turns.map((t, i) => turnHTML(t, i, i === streamingIdx)).join('')}
      </div></div></div>
      <button class="scroll-bottom" data-act="c-bottom" aria-label="Scroll to bottom">${ic('arrowChevronSingleDownFill')}</button>
      <div class="thread-composer"><div>${composerHTML(false)}</div></div>
    </div>
    ${S.ui.ctx ? `<aside class="ctx-panel${S.ui.ctxFold ? ' folded' : ''}" aria-label="Agent details"><button class="ctx-head" data-act="c-fold"><span>Artifacts</span>${ic('arrowChevronSingleRightSmall')}</button>
      ${artifacts.length ? `<div class="ctx-list">${artifacts.map((pid) => `<a href="#/p/${pid}"><span class="ci emoji">${page(pid).icon || ''}</span><span class="ct ellipsis">${esc(titleOf(page(pid)))}</span></a>`).join('')}</div>` : '<div class="ctx-empty">Pages this chat reads or edits show up here.</div>'}</aside>` : ''}
  </div>`;
  bindChat(c);
  const sc = $('.thread-scroll');
  sc.scrollTop = sc.scrollHeight;
}

function bindChat(c) {
  const view = $('.chat-view');
  const input = $('.composer-input', view);
  const send = $('.send-btn', view);
  const sync = () => {
    if (!input.textContent.trim()) input.innerHTML = '';
    const ok = !!input.textContent.trim();
    send.classList.toggle('ready', ok);
    send.disabled = !ok;
  };
  input.addEventListener('input', sync);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) { e.preventDefault(); submit(); }
  });
  const submit = () => {
    const text = input.textContent.trim();
    if (!text) return;
    ask(text, c);
  };
  const sc = $('.thread-scroll', view);
  if (sc) {
    const btn = $('.scroll-bottom', view);
    sc.addEventListener('scroll', () => btn.classList.toggle('show', sc.scrollHeight - sc.scrollTop - sc.clientHeight > 80));
  }
  view.addEventListener('click', (e) => {
    const a = e.target.closest('[data-act]');
    if (!a) return;
    const turnEl = a.closest('[data-turn]');
    const turn = c && turnEl ? c.turns[+turnEl.dataset.turn] : null;
    switch (a.dataset.act) {
      case 'open-sidebar': setSidebar(true); break;
      case 'c-send': submit(); break;
      case 'c-suggest': input.textContent = a.dataset.q; sync(); submit(); break;
      case 'c-apps-close': e.stopPropagation(); S.ui.apps = false; save(); $('.apps-banner').classList.add('gone'); break;
      case 'c-apps': toast('Connecting apps isn’t part of this clone'); break;
      case 'c-attach': case 'c-mic': toast('Attachments and dictation aren’t part of this clone'); break;
      case 'c-mode': modeMenu(a, ['Review for me', 'Auto-approve', 'Ask every time']); break;
      case 'c-model': modeMenu(a, ['Auto', 'Claude Opus 5.5', 'Claude Sonnet 5.5', 'GPT-5']); break;
      case 'c-personalize': toast('Personalization isn’t part of this clone'); break;
      case 'c-new': go('#/ai'); break;
      case 'c-ctx': S.ui.ctx = !S.ui.ctx; save(); renderThread(c); break;
      case 'c-fold': S.ui.ctxFold = !S.ui.ctxFold; save(); $('.ctx-panel').classList.toggle('folded', S.ui.ctxFold); break;
      case 'c-share': copyText(location.href, 'Copied link to chat'); break;
      case 'c-rename': { const t = prompt('Rename chat', c.title); if (t) { c.title = t; save(); render(); } break; }
      case 'c-more': chatMenu(a, c.id, a); break;
      case 'c-history': openSearch('chats'); break;
      case 'c-bottom': sc.scrollTo({ top: sc.scrollHeight, behavior: 'smooth' }); break;
      case 'c-copy-user': copyText(plainTurn(turn), 'Copied to clipboard'); break;
      case 'c-copy': copyText((turn.ai || []).filter((x) => x.p).map((x) => x.p.map((s) => (typeof s === 'string' ? s : titleOf(page(s.m)))).join('')).join('\n'), 'Copied to clipboard'); break;
      case 'c-edit': input.textContent = plainTurn(turn); sync(); setCaret(input, input.textContent.length); break;
      case 'c-up': case 'c-down': turn.vote = a.dataset.act === 'c-up' ? (turn.vote === 1 ? 0 : 1) : (turn.vote === -1 ? 0 : -1); save(); renderThread(c); break;
      case 'c-save': toast('Saved to Private pages (simulated)'); break;
      case 'c-show-changes': { const part = turn.ai.find((x) => x.card); part.open = !part.open; save(); renderThread(c); break; }
      case 'c-undo': toast('Undo isn’t available for sample chats'); break;
      case 'noop-toast': toast(a.dataset.msg); break;
    }
  });
}

function modeMenu(anchor, options) {
  const cur = anchor.textContent.trim();
  menu(anchor, [{ items: options.map((o) => ({ label: o, right: o === cur ? G.check.replace('<svg', '<svg class="check-mark"') : '', act: () => { anchor.textContent = o; } })) }], { width: 220, place: { side: 'bottom' } });
}

function ask(text, c) {
  if (!c) {
    const cid = 'c' + uid();
    const words = text.replace(/\s+/g, ' ').split(' ');
    c = { id: cid, title: words.slice(0, 6).join(' ') + (words.length > 6 ? '…' : ''), turns: [], artifacts: [] };
    S.chats[cid] = c;
    S.chatOrder.unshift(cid);
    S.ui.tab = 'chat';
  }
  const mentioned = Object.values(S.pages).filter((p) => !p.trash && p.title && text.toLowerCase().includes(p.title.toLowerCase()));
  const user = [];
  let rest = text;
  mentioned.slice(0, 3).forEach((p) => {
    const i = rest.toLowerCase().indexOf(p.title.toLowerCase());
    if (i < 0) return;
    user.push(rest.slice(0, i), { m: p.id });
    rest = rest.slice(i + p.title.length);
  });
  user.push(rest);
  const turn = { time: nowTime(), user: user.filter((x) => x !== ''), ai: [{ tool: 'Thinking', thinking: true }] };
  c.turns.push(turn);
  mentioned.forEach((p) => { if (!c.artifacts.includes(p.id)) c.artifacts.push(p.id); });
  save();
  const idx = c.turns.length - 1;
  if (route.view !== 'chat' || route.cid !== c.id) {
    history.replaceState(null, '', '#/chat/' + c.id);
    route = { view: 'chat', cid: c.id };
    renderSidebar();
    document.title = `${c.title} | Notion`;
  }
  renderThread(c, idx);
  const reply = mentioned.length
    ? ['I read ', { m: mentioned[0].id }, `${mentioned.length > 1 ? ` and ${mentioned.length - 1} other page${mentioned.length > 2 ? 's' : ''}` : ''}. This is a design clone of Notion AI: it reproduces the layout and keeps your chats in this browser, but it doesn’t run a model, so this answer is a placeholder.`]
    : ['This is a design clone of Notion AI. It reproduces the layout and keeps your chats in this browser, but it doesn’t run a model, so this answer is a placeholder. Mention a page by name, like Health Science Lab, and it will show up under Artifacts.'];
  setTimeout(() => {
    turn.ai = [{ tool: mentioned.length ? `Read ${mentioned.length} page${mentioned.length > 1 ? 's' : ''}` : 'Searched workspace' }, { p: [] }];
    const full = reply;
    let segI = 0, charI = 0;
    const tick = () => {
      if (route.view !== 'chat' || route.cid !== c.id) { turn.ai[1].p = full; save(); return; }
      if (segI >= full.length) { turn.ai[1].p = full; save(); renderThread(c); return; }
      const seg = full[segI];
      if (typeof seg !== 'string') segI++;
      else {
        charI = Math.min(seg.length, charI + 3 + Math.floor(Math.random() * 4));
        if (charI >= seg.length) { segI++; charI = 0; }
      }
      // The streamed paragraph is the completed segments plus the partial one.
      turn.ai[1].p = full.slice(0, segI).concat(charI ? [full[segI].slice(0, charI)] : []);
      const body = $(`[data-turn="${idx}"] .ai-body p`);
      if (body) body.innerHTML = richText(turn.ai[1].p) + '<span class="typing-caret"></span>';
      const sc = $('.thread-scroll');
      if (sc) sc.scrollTop = sc.scrollHeight;
      setTimeout(tick, 24);
    };
    renderThread(c, idx);
    tick();
  }, 900);
}

/* ================================================================ tooltip + toast */
let tipTimer = 0;
let tipEl = null;
function hideTip() { clearTimeout(tipTimer); if (tipEl) { tipEl.remove(); tipEl = null; } }
document.addEventListener('mouseover', (e) => {
  const t = e.target.closest('[data-tip]');
  if (!t) { hideTip(); return; }
  if (tipEl && tipEl.dataset.for === t.dataset.tip) return;
  hideTip();
  tipTimer = setTimeout(() => {
    if (!t.isConnected || dragState) return;
    tipEl = document.createElement('div');
    tipEl.className = 'tooltip';
    tipEl.dataset.for = t.dataset.tip;
    tipEl.innerHTML = `<div>${esc(t.dataset.tip)}</div>${t.dataset.hint ? `<div class="tip-hint">${esc(t.dataset.hint)}</div>` : ''}`;
    document.body.appendChild(tipEl);
    const r = t.getBoundingClientRect();
    const w = tipEl.offsetWidth, h = tipEl.offsetHeight;
    let x = r.left + r.width / 2 - w / 2;
    let y = r.bottom + 6;
    if (t.closest('.sb-top, .menu-btn')) { x = r.right + 6; y = r.top + r.height / 2 - h / 2; }
    if (y + h > innerHeight - 6) y = r.top - h - 6;
    tipEl.style.left = Math.max(6, Math.min(x, innerWidth - w - 6)) + 'px';
    tipEl.style.top = y + 'px';
  }, 450);
});
document.addEventListener('pointerdown', hideTip);
document.addEventListener('scroll', hideTip, true);

let toastTimer = 0;
function toast(msg) {
  let el = $('.toast');
  if (!el) { el = document.createElement('div'); el.className = 'toast'; el.setAttribute('role', 'status'); document.body.appendChild(el); }
  el.textContent = msg;
  el.style.animation = 'none';
  void el.offsetWidth;
  el.style.animation = '';
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.remove(), 2600);
}

$('.ai-corner').addEventListener('click', () => go('#/ai'));

/* ================================================================ boot */
if (!location.hash) history.replaceState(null, '', '#/p/health-science-lab');
render();
