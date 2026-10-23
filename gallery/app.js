(async () => {
  const $ = (id) => document.getElementById(id);
  // The gallery shows one tab at a time: #/ is sites, #/videos is videos, #/posts is posts.
  const tabs = $('tabs');
  const tabHash = { sites: '#/', videos: '#/videos', posts: '#/posts' };
  const tabOf = (hash) => (
    hash === 'posts' || hash.startsWith('posts/') ? 'posts' :
    hash === 'videos' || hash.startsWith('videos/') ? 'videos' : 'sites'
  );
  let tab;
  function showTab(next) {
    tab = next;
    for (const a of tabs.querySelectorAll('a')) {
      if (a.dataset.tab === next) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    }
    for (const el of document.querySelectorAll('.section')) el.hidden = el.dataset.tab !== next;
  }
  // Before the lists load, so a link to videos or posts never shows the sites heading first.
  showTab(tabOf(location.hash.replace(/^#\/?/, '')));

  const [{ repo, branch, sites }, { videos }, { posts }] = await Promise.all(
    ['sites.json', 'videos.json', 'posts.json'].map(async (f) => (await fetch(f)).json()),
  );
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
  const srcUrl = (s) => `${repo}/tree/${branch}/${s.folder}`;
  const PLATFORM = { youtube: 'YouTube', x: 'X' };
  const ICON = {
    youtube: '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8ZM9.8 15.1V8.9l5.8 3.1-5.8 3.1Z"/></svg>',
    x: '<svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true"><path fill="currentColor" d="M17.8 2.5h3.3l-7.2 8.2 8.5 10.8h-6.6l-5.2-6.7-5.9 6.7H1.4l7.7-8.8L1 2.5h6.8l4.7 6.1 5.3-6.1Zm-1.2 17.1h1.8L7.5 4.3H5.5l11.1 15.3Z"/></svg>',
  };
  // The player each platform offers for embedding; YouTube's privacy-enhanced domain sets no cookies until play.
  const embedUrl = (v) => v.platform === 'youtube'
    ? `https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0&playsinline=1`
    : `https://platform.twitter.com/embed/Tweet.html?id=${v.id}&dnt=true`;

  $('n-sites').textContent = sites.length;
  $('n-videos').textContent = videos.length;
  $('n-posts').textContent = posts.length;

  $('grid').innerHTML = sites.map((s) => `
    <li class="card">
      <a class="thumb" href="#/${s.slug}" aria-label="View ${s.name}">
        <img src="thumbs/${s.slug}.jpg?v=${s.captured}" alt="${s.name} preview" loading="lazy" width="1200" height="750">
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
      </a>
      <div class="meta">
        <h2><a href="#/videos/${v.slug}">${esc(v.title)}</a></h2>
        <a class="src src--icon" href="${esc(v.url)}" target="_blank" rel="noopener" aria-label="Open on ${PLATFORM[v.platform]} (opens in a new tab)" title="Open on ${PLATFORM[v.platform]}">${ICON[v.platform]}</a>
      </div>
      <p class="tag">${esc(v.note || v.author)}</p>
      ${v.breakdown ? `<a class="breakdown-button" href="breakdowns/${encodeURIComponent(v.breakdown)}.html">Breakdown</a>` : ''}
    </li>`).join('') || '<li class="empty">No videos yet.</li>';

  $('post-grid').innerHTML = posts.map((p) => `
    <li class="card card--post">
      <a class="thumb" href="#/posts/${p.slug}" aria-label="Read ${esc(p.title)}">
        <img src="thumbs/posts/${p.slug}.jpg" alt="" loading="lazy" width="1200" height="750">
      </a>
      <div class="meta">
        <h2><a href="#/posts/${p.slug}">${esc(p.title)}</a></h2>
        <a class="src src--icon" href="${esc(p.url)}" target="_blank" rel="noopener" aria-label="Open on ${PLATFORM[p.platform]} (opens in a new tab)" title="Open on ${PLATFORM[p.platform]}">${ICON[p.platform]}</a>
      </div>
      <p class="tag">${esc(p.note || p.author)}</p>
    </li>`).join('') || '<li class="empty">No posts yet.</li>';

  function renderPost(p) {
    const formattedText = esc(p.text || '')
      .replace(/@([a-zA-Z0-9_]+)/g, '<a class="mention" href="https://x.com/$1" target="_blank" rel="noopener">@$1</a>')
      .replace(/(https?:\/\/[^\s<]+)/g, '<a class="post-link" href="$1" target="_blank" rel="noopener">$1</a>');

    let mediaHtml = '';
    if (p.video) {
      mediaHtml = `
        <div class="post-media">
          <video class="post-media-video" src="${esc(p.video)}" poster="${esc(p.videoPoster || '')}" controls playsinline preload="metadata"></video>
        </div>`;
    } else if (p.photos && p.photos.length) {
      mediaHtml = `
        <div class="post-media">
          ${p.photos.map(u => `<img class="post-media-img" src="${esc(u)}" alt="" loading="lazy">`).join('')}
        </div>`;
    }

    return `
      <article class="post-card">
        <header class="post-header">
          <a class="post-author-link" href="${esc(p.authorUrl)}" target="_blank" rel="noopener">
            ${p.authorAvatar ? `<img class="post-avatar" src="${esc(p.authorAvatar)}" alt="${esc(p.authorName || p.author)}" width="48" height="48">` : ''}
            <div class="post-author-meta">
              <div class="post-author-name">
                <span>${esc(p.authorName || p.author)}</span>
                ${p.verified ? `<span class="post-badge" title="Verified"><svg viewBox="0 0 24 24" width="16" height="16" fill="#1d9bf0"><path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"/></svg></span>` : ''}
              </div>
              ${p.authorHandle ? `<div class="post-author-handle">@${esc(p.authorHandle)}</div>` : ''}
            </div>
          </a>
          <a class="post-platform-link" href="${esc(p.url)}" target="_blank" rel="noopener" aria-label="Open on ${PLATFORM[p.platform] || 'platform'}" title="Open on ${PLATFORM[p.platform] || 'platform'}">
            ${ICON[p.platform] || ''}
          </a>
        </header>
        <div class="post-body">${formattedText}</div>
        ${mediaHtml}
        <footer class="post-footer">
          ${p.date ? `<time class="post-date">${esc(p.date)}</time>` : ''}
          <div class="post-stats">
            ${p.likes ? `<span><b>${esc(p.likes)}</b> Likes</span>` : ''}
            ${p.reposts ? `<span><b>${esc(p.reposts)}</b> Reposts</span>` : ''}
            ${p.bookmarks ? `<span><b>${esc(p.bookmarks)}</b> Bookmarks</span>` : ''}
            ${p.replies ? `<span><b>${esc(p.replies)}</b> Replies</span>` : ''}
          </div>
        </footer>
      </article>`;
  }

  const frame = $('frame');
  const postView = $('post-view');
  const items = [
    ...sites.map((s) => ({ hash: s.slug, kind: 'site', item: s })),
    ...videos.map((v) => ({ hash: `videos/${v.slug}`, kind: 'video', item: v })),
    ...posts.map((p) => ({ hash: `posts/${p.slug}`, kind: 'post', item: p })),
  ];
  let current = -1;
  const scrolls = {}; // where each tab was left, restored when it comes back

  // The scroll at which the switch has just pinned, with the tab's heading below it.
  function tabStart() {
    const style = getComputedStyle(tabs);
    return $(`panel-${tab}`).offsetTop - parseFloat(style.marginBottom) - tabs.offsetHeight - parseFloat(style.top);
  }

  function route() {
    const hash = location.hash.replace(/^#\/?/, '');
    const i = items.findIndex((x) => x.hash === hash);
    const open = i >= 0;
    const wasOpen = $('gallery').hidden;
    const prev = tab;
    if (!wasOpen) scrolls[prev] = scrollY;
    current = i;
    $('gallery').hidden = open;
    $('viewer').hidden = !open;
    document.body.style.overflow = open ? 'hidden' : '';
    showTab(open ? (items[i].kind === 'post' ? 'posts' : items[i].kind === 'video' ? 'videos' : 'sites') : tabOf(hash));
    if (!open) {
      document.title = tab === 'posts' ? 'Posts · GoodDesigns' : tab === 'videos' ? 'Videos · GoodDesigns' : 'GoodDesigns';
      frame.removeAttribute('src');
      postView.hidden = true;
      postView.innerHTML = '';
      // A tab opened for the first time starts at its top, or where the switch pins if the page was scrolled past that.
      if (wasOpen || prev !== tab) scrollTo(0, scrolls[tab] ?? Math.min(scrolls[prev] ?? 0, tabStart()));
      return;
    }
    const { kind, item } = items[i];
    const name = kind === 'site' ? item.name : item.title;
    $('back').href = tabHash[tab];
    $('viewer').dataset.kind = kind === 'site' ? 'site' : kind === 'post' ? 'post' : item.platform;
    document.title = `${name} · GoodDesigns`;
    $('back').setAttribute('aria-label', `Back to the GoodDesigns gallery from ${name}`);
    const out = kind === 'site' ? srcUrl(item) : item.url;
    const label = kind === 'site' ? 'View source' : `Open on ${PLATFORM[item.platform] || 'platform'}`;
    $('v-src').href = out;
    $('v-src-label').textContent = label;
    $('v-src-icon').setAttribute('d', kind === 'site' ? 'M7 6 3 10l4 4M13 6l4 4-4 4' : 'M8.5 4.5H4.5v11h11v-4M11.5 3.5h5v5M16.5 3.5l-7.5 7.5');
    $('v-src').setAttribute('aria-label', `${label} for ${name} (opens in a new tab)`);

    if (kind === 'post') {
      frame.hidden = true;
      frame.removeAttribute('src');
      postView.hidden = false;
      postView.innerHTML = renderPost(item);
    } else {
      postView.hidden = true;
      postView.innerHTML = '';
      frame.hidden = false;
      frame.title = kind === 'site' ? `${name} preview` : name;
      const target = kind === 'site' ? `sites/${item.slug}/` : embedUrl(item);
      if (frame.getAttribute('src') !== target) frame.src = target;
    }
  }
  addEventListener('hashchange', route);
  // The switch is pinned once its top edge reaches the line 17px down, just past where it sticks.
  new IntersectionObserver(([e]) => tabs.toggleAttribute('data-stuck', e.intersectionRatio < 1 && e.boundingClientRect.top < 40), {
    threshold: 1, rootMargin: '-17px 0px 0px 0px',
  }).observe(tabs);
  addEventListener('keydown', (e) => {
    if ($('viewer').hidden) return;
    // Alt+arrows step through the open item's own list (sites, videos or posts).
    const kind = items[current].kind;
    const list = items.filter((x) => x.kind === kind);
    const step = (d) => { const at = list.indexOf(items[current]); location.hash = `#/${list[(at + d + list.length) % list.length].hash}`; };
    if (e.key === 'Escape') location.hash = tabHash[tab];
    if (e.key === 'ArrowLeft' && e.altKey) step(-1);
    if (e.key === 'ArrowRight' && e.altKey) step(1);
  });
  route();
})();
