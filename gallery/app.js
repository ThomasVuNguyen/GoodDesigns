(async () => {
  const [{ repo, branch, sites }, { videos }] = await Promise.all(
    ['sites.json', 'videos.json'].map(async (f) => (await fetch(f)).json()),
  );
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
  const srcUrl = (s) => `${repo}/tree/${branch}/${s.folder}`;
  const PLATFORM = { youtube: 'YouTube', x: 'X' };
  // The player each platform offers for embedding; YouTube's privacy-enhanced domain sets no cookies until play.
  const embedUrl = (v) => v.platform === 'youtube'
    ? `https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0&playsinline=1`
    : `https://platform.twitter.com/embed/Tweet.html?id=${v.id}&dnt=true`;

  $('n-designs').textContent = sites.length;
  $('n-videos').textContent = videos.length;

  $('grid').innerHTML = sites.map((s) => `
    <li class="card">
      <a class="thumb" href="#/${s.slug}" aria-label="View ${s.name}">
        <img src="thumbs/${s.slug}.jpg" alt="${s.name} preview" loading="lazy" width="1200" height="750">
      </a>
      <div class="meta">
        <h2><a href="#/${s.slug}">${s.name}</a></h2>
        <a class="src" href="${srcUrl(s)}" target="_blank" rel="noopener">Source ↗</a>
      </div>
      <p class="tag">${s.tagline}</p>
    </li>`).join('');

  $('video-grid').innerHTML = videos.map((v) => `
    <li class="card card--video">
      <a class="thumb" href="#/videos/${v.slug}" aria-label="Play ${esc(v.title)}">
        <img src="thumbs/videos/${v.slug}.jpg" alt="" loading="lazy" width="1280" height="720">
        <span class="play" aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22"><path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg></span>
        <span class="badge">${PLATFORM[v.platform]}</span>
      </a>
      <div class="meta">
        <h2><a href="#/videos/${v.slug}">${esc(v.title)}</a></h2>
        <a class="src" href="${esc(v.url)}" target="_blank" rel="noopener">${PLATFORM[v.platform]} ↗</a>
      </div>
      <p class="tag">${esc(v.note || v.author)}</p>
    </li>`).join('') || '<li class="empty">No videos yet.</li>';

  const frame = $('frame');
  const items = [
    ...sites.map((s) => ({ hash: s.slug, kind: 'site', item: s })),
    ...videos.map((v) => ({ hash: `videos/${v.slug}`, kind: 'video', item: v })),
  ];
  let current = -1;
  let galleryScroll = 0; // where the gallery was when a viewer opened, restored when it closes

  function route() {
    const hash = location.hash.replace(/^#\/?/, '');
    const i = items.findIndex((x) => x.hash === hash);
    const open = i >= 0;
    if (open && !$('gallery').hidden) galleryScroll = scrollY;
    current = i;
    $('gallery').hidden = open;
    $('viewer').hidden = !open;
    document.body.style.overflow = open ? 'hidden' : '';
    if (!open) {
      document.title = 'GoodDesigns';
      frame.removeAttribute('src');
      if (!hash) scrollTo(0, galleryScroll);
      return;
    }
    const { kind, item } = items[i];
    const name = kind === 'site' ? item.name : item.title;
    $('viewer').dataset.kind = kind === 'site' ? 'site' : item.platform;
    document.title = `${name} · GoodDesigns`;
    frame.title = kind === 'site' ? `${name} preview` : name;
    $('back').setAttribute('aria-label', `Back to the GoodDesigns gallery from ${name}`);
    const out = kind === 'site' ? srcUrl(item) : item.url;
    const label = kind === 'site' ? 'View source' : `Open on ${PLATFORM[item.platform]}`;
    $('v-src').href = out;
    $('v-src-label').textContent = label;
    $('v-src-icon').setAttribute('d', kind === 'site' ? 'M7 6 3 10l4 4M13 6l4 4-4 4' : 'M8.5 4.5H4.5v11h11v-4M11.5 3.5h5v5M16.5 3.5l-7.5 7.5');
    $('v-src').setAttribute('aria-label', `${label} for ${name} (opens in a new tab)`);
    const target = kind === 'site' ? `sites/${item.slug}/` : embedUrl(item);
    if (frame.getAttribute('src') !== target) frame.src = target;
  }
  addEventListener('hashchange', route);
  addEventListener('keydown', (e) => {
    if ($('viewer').hidden) return;
    // Alt+arrows step through the open item's own list (sites or videos).
    const kind = items[current].kind;
    const list = items.filter((x) => x.kind === kind);
    const step = (d) => { const at = list.indexOf(items[current]); location.hash = `#/${list[(at + d + list.length) % list.length].hash}`; };
    if (e.key === 'Escape') location.hash = '#/';
    if (e.key === 'ArrowLeft' && e.altKey) step(-1);
    if (e.key === 'ArrowRight' && e.altKey) step(1);
  });
  route();
})();
