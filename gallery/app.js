(async () => {
  const $ = (id) => document.getElementById(id);
  // The gallery shows one tab at a time.
  const tabs = $('tabs');
  const tabHash = { sites: '#/', videos: '#/videos', shorts: '#/shorts', posts: '#/posts', emails: '#/emails', insta: '#/insta', research: '#/research' };
  const tabOf = (hash) => (
    hash === 'research' || hash.startsWith('research/') ? 'research' :
    hash === 'insta' || hash.startsWith('insta/') ? 'insta' :
    hash === 'emails' || hash.startsWith('emails/') ? 'emails' :
    hash === 'posts' || hash.startsWith('posts/') ? 'posts' :
    hash === 'shorts' || hash.startsWith('shorts/') ? 'shorts' :
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

  const [{ repo, branch, sites }, { videos }, { shorts }, { posts }, { emails }, { insta }, { research }] = await Promise.all(
    ['sites.json', 'videos.json', 'shorts.json', 'posts.json', 'emails.json', 'insta.json', 'research.json'].map(async (f) => (await fetch(f)).json()),
  );
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
  const srcUrl = (s) => `${repo}/tree/${branch}/${s.folder}`;
  // Several cards can share one folder, each opening a different route inside it
  // (buildspace's six pages). The first card for a folder is the one that gets built.
  const siteRoot = (s) => sites.find((x) => x.folder === s.folder) ?? s;
  const siteUrl = (s) => `sites/${siteRoot(s).slug}${s.entry ?? '/'}`;
  const PLATFORM = { youtube: 'YouTube', x: 'X', linkedin: 'LinkedIn', instagram: 'Instagram' };
  const ICON = {
    youtube: '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8ZM9.8 15.1V8.9l5.8 3.1-5.8 3.1Z"/></svg>',
    x: '<svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true"><path fill="currentColor" d="M17.8 2.5h3.3l-7.2 8.2 8.5 10.8h-6.6l-5.2-6.7-5.9 6.7H1.4l7.7-8.8L1 2.5h6.8l4.7 6.1 5.3-6.1Zm-1.2 17.1h1.8L7.5 4.3H5.5l11.1 15.3Z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.4" cy="6.6" r="1.25" fill="currentColor"/></svg>',
  };
  // The player each platform offers for embedding; YouTube's privacy-enhanced domain sets no cookies until play.
  // An `end` in seconds limits a YouTube entry to its opening, for videos kept only for their first moments.
  const embedUrl = (v) => v.platform === 'youtube'
    ? `https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0&playsinline=1${v.end ? `&end=${v.end}` : ''}`
    : `https://platform.twitter.com/embed/Tweet.html?id=${v.id}&dnt=true`;

  $('n-sites').textContent = sites.length;
  $('n-videos').textContent = videos.length;
  $('n-shorts').textContent = shorts.length;
  $('n-posts').textContent = posts.length;
  $('n-emails').textContent = emails.length;
  $('n-insta').textContent = insta.length;
  $('n-research').textContent = research.length;

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

  $('short-grid').innerHTML = shorts.map((v) => `
    <li class="card card--short">
      <a class="thumb" href="#/shorts/${esc(v.slug)}" aria-label="Play ${esc(v.title)}">
        <img src="thumbs/shorts/${esc(v.slug)}.jpg" alt="" loading="lazy" width="720" height="1280">
        <span class="play" aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22"><path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg></span>
      </a>
      <div class="meta">
        <h2><a href="#/shorts/${esc(v.slug)}">${esc(v.title)}</a></h2>
        <a class="src src--icon" href="${esc(v.url)}" target="_blank" rel="noopener" aria-label="Open on YouTube (opens in a new tab)" title="Open on YouTube">${ICON.youtube}</a>
      </div>
      <p class="tag">${esc(v.note || v.author)}</p>
      ${v.breakdown ? `<a class="breakdown-button" href="shorts/${encodeURIComponent(v.breakdown)}.html">See more · ${v.frames} frames</a>` : ''}
    </li>`).join('') || '<li class="empty">No shorts yet.</li>';

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

  // Email cards show the top of the letter itself: sender, subject and the opening lines, fading out.
  const emailText = (html) => html.replace(/<\/(p|li)>/g, ' ').replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
  $('email-grid').innerHTML = emails.map((m) => `
    <li class="card card--email">
      <a class="thumb email-thumb" href="#/emails/${esc(m.slug)}" aria-label="Read ${esc(m.subject)}">
        <span class="email-thumb-from"><b>${esc(m.fromName)}</b><span>${esc(m.date.split(',')[0])}</span></span>
        <span class="email-thumb-subject">${esc(m.subject)}</span>
        <span class="email-thumb-body">${esc(emailText(m.html))}</span>
      </a>
      <div class="meta">
        <h2><a href="#/emails/${esc(m.slug)}">${esc(m.subject)}</a></h2>
        <a class="src" href="${esc(m.link.url)}" target="_blank" rel="noopener">Visit ↗</a>
      </div>
      <p class="tag">${esc(m.note || m.fromName)}</p>
    </li>`).join('') || '<li class="empty">No emails yet.</li>';

  // Instagram cards are square like the feed; a carousel gets Instagram's stacked-squares mark in the corner.
  $('insta-grid').innerHTML = insta.map((p) => `
    <li class="card card--insta">
      <a class="thumb" href="#/insta/${p.slug}" aria-label="View ${esc(p.title)}">
        <img src="thumbs/insta/${p.slug}.jpg" alt="" loading="lazy" width="720" height="720">
        ${p.media.length > 1 ? `<span class="insta-stack" title="${p.media.length} items" aria-hidden="true"><svg viewBox="0 0 24 24" width="16" height="16"><path d="M8 3h11a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" fill="currentColor"/><path d="M3 8v11a2 2 0 0 0 2 2h11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></span>` : ''}
        ${p.media[0].type === 'video' ? `<span class="play" aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22"><path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg></span>` : ''}
      </a>
      <div class="meta">
        <h2><a href="#/insta/${p.slug}">${esc(p.title)}</a></h2>
        <a class="src src--icon" href="${esc(p.url)}" target="_blank" rel="noopener" aria-label="Open on Instagram (opens in a new tab)" title="Open on Instagram">${ICON.instagram}</a>
      </div>
      <p class="tag">${esc(p.note || p.author)}</p>
    </li>`).join('') || '<li class="empty">No Instagram posts yet.</li>';

  const domainOf = (url) => { try { return new URL(url).hostname.replace(/^www\./, ''); } catch { return ''; } };

  $('research-grid').innerHTML = research.map((r) => `
    <li class="card card--research">
      <a class="thumb" href="${esc(r.url)}" target="_blank" rel="noopener" aria-label="Visit ${esc(r.title)}">
        <img src="thumbs/research/${r.slug}.jpg?v=${r.captured}" alt="${esc(r.title)} preview" loading="lazy" width="1200" height="750">
        <span class="domain-chip" aria-hidden="true">${esc(domainOf(r.url))} ↗</span>
      </a>
      <div class="research-label">${esc(r.org)} · ${esc(r.kind)}</div>
      <div class="meta">
        <h2><a href="${esc(r.url)}" target="_blank" rel="noopener">${esc(r.title)}</a></h2>
        <a class="src" href="${esc(r.url)}" target="_blank" rel="noopener">Visit ↗</a>
      </div>
      <p class="tag">${esc(r.note)}</p>
      ${r.recreation ? `<a class="breakdown-button" href="#/${esc(r.recreation)}">Recreation</a>` : ''}
    </li>`).join('') || '<li class="empty">No research yet.</li>';

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

  // The email reads like a letter: who sent it, the subject, the body as sent, then the sender's postal line.
  // The body is curated HTML from emails.json; its links open in a new tab.
  function renderEmail(m) {
    const body = m.html.replace(/<a href="(?!mailto:)/g, '<a target="_blank" rel="noopener" href="');
    return `
      <article class="post-card email-card">
        <h1 class="email-subject">${esc(m.subject)}</h1>
        <header class="email-header">
          <div class="email-from">
            <div><b>${esc(m.fromName)}</b> <span class="email-address">&lt;${esc(m.fromAddress)}&gt;</span></div>
          </div>
          <time class="email-date">${esc(m.date)}</time>
        </header>
        <div class="email-body">${body}</div>
        ${m.footer ? `<p class="email-footer">${esc(m.footer)}</p>` : ''}
      </article>
      ${m.note ? `<aside class="email-note"><span>Why it's good</span>${esc(m.note)}</aside>` : ''}`;
  }

  // Captions link their bare domains, #hashtags and @handles the way Instagram does.
  function instaCaption(text) {
    return esc(text || '')
      .replace(/(^|[\s(])((?:https?:\/\/)?(?:[a-z0-9-]+\.)+(?:com|io|org|net|dev|co|app|ai|gg|me|ly|tv|so|xyz)(?:\/[^\s<]*)?)/gi,
        (m, pre, u) => `${pre}<a class="post-link" href="${/^https?:/.test(u) ? u : `https://${u}`}" target="_blank" rel="noopener">${u}</a>`)
      .replace(/(^|\s)#(\w+)/g, '$1<a class="mention" href="https://www.instagram.com/explore/tags/$2/" target="_blank" rel="noopener">#$2</a>')
      .replace(/(^|\s)@([\w.]+\w)/g, '$1<a class="mention" href="https://www.instagram.com/$2/" target="_blank" rel="noopener">@$2</a>');
  }

  function renderInsta(p) {
    const first = p.media[0];
    const many = p.media.length > 1;
    return `
      <article class="post-card insta-card">
        <header class="post-header">
          <a class="post-author-link" href="${esc(p.authorUrl)}" target="_blank" rel="noopener">
            <img class="post-avatar insta-avatar" src="${esc(p.authorAvatar)}" alt="${esc(p.authorName)}" width="48" height="48">
            <div class="post-author-meta">
              <div class="post-author-name">
                <span>${esc(p.authorName)}</span>
                ${p.verified ? `<span class="post-badge" title="Verified"><svg viewBox="0 0 40 40" width="15" height="15"><path fill="#0095f6" d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z"/></svg></span>` : ''}
              </div>
              <div class="post-author-handle">@${esc(p.authorHandle)}</div>
            </div>
          </a>
          <a class="post-platform-link" href="${esc(p.url)}" target="_blank" rel="noopener" aria-label="Open on Instagram" title="Open on Instagram">${ICON.instagram}</a>
        </header>
        <div class="insta-media" style="aspect-ratio: ${first.width} / ${first.height}" ${many ? 'role="region" aria-roledescription="carousel" aria-label="Post media"' : ''}>
          <div class="insta-track" id="insta-track">
            ${p.media.map((m, i) => `
              <div class="insta-slide" ${many ? `role="group" aria-roledescription="slide" aria-label="${i + 1} of ${p.media.length}"` : ''}>
                ${m.type === 'video'
                  ? `<video src="${esc(m.src)}" poster="${esc(m.poster)}" muted loop playsinline controls preload="${i ? 'metadata' : 'auto'}" ${i ? '' : 'autoplay'} aria-label="${esc(m.alt || '')}"></video>`
                  : `<img src="${esc(m.poster)}" alt="${esc(m.alt || '')}" loading="${i ? 'lazy' : 'eager'}">`}
              </div>`).join('')}
          </div>
          ${many ? `
            <button class="insta-nav insta-nav--prev" type="button" data-step="-1" aria-label="Previous" hidden><svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><path d="m12.5 15-5-5 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
            <button class="insta-nav insta-nav--next" type="button" data-step="1" aria-label="Next"><svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><path d="m7.5 15 5-5-5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
            <span class="insta-count" id="insta-count">1 / ${p.media.length}</span>` : ''}
        </div>
        ${many ? `<div class="insta-dots" aria-hidden="true">${p.media.map((_, i) => `<span${i ? '' : ' class="is-on"'}></span>`).join('')}</div>` : ''}
        <div class="post-body insta-caption">${instaCaption(p.text)}</div>
        <footer class="post-footer">
          ${p.date ? `<time class="post-date">${esc(p.date)}</time>` : ''}
          <div class="post-stats">
            ${p.likes ? `<span><b>${esc(p.likes)}</b> Likes</span>` : ''}
            ${p.comments ? `<span><b>${esc(p.comments)}</b> Comments</span>` : ''}
          </div>
        </footer>
      </article>`;
  }

  // The carousel scrolls natively (swipe, trackpad); the arrows, dots and counter follow it, and only the slide in view plays.
  function initInsta() {
    const track = $('insta-track');
    if (!track) return;
    const slides = [...track.children];
    const view = $('insta-view');
    let at = 0;
    const sync = () => {
      const next = Math.round(track.scrollLeft / track.clientWidth);
      if (next === at) return;
      at = next;
      slides.forEach((s, i) => {
        const v = s.querySelector('video');
        if (!v) return;
        if (i === at) v.play().catch(() => {}); else v.pause();
      });
      view.querySelectorAll('.insta-dots span').forEach((d, i) => d.classList.toggle('is-on', i === at));
      const count = $('insta-count');
      if (count) count.textContent = `${at + 1} / ${slides.length}`;
      view.querySelector('.insta-nav--prev')?.toggleAttribute('hidden', at === 0);
      view.querySelector('.insta-nav--next')?.toggleAttribute('hidden', at === slides.length - 1);
    };
    track.addEventListener('scroll', sync, { passive: true });
    view.querySelectorAll('.insta-nav').forEach((b) => b.addEventListener('click', () => {
      track.scrollTo({ left: (at + Number(b.dataset.step)) * track.clientWidth, behavior: 'smooth' });
    }));
  }

  const frame = $('frame');
  const postView = $('post-view');
  const instaView = $('insta-view');
  const items = [
    ...sites.map((s) => ({ hash: s.slug, kind: 'site', item: s })),
    ...videos.map((v) => ({ hash: `videos/${v.slug}`, kind: 'video', item: v })),
    ...shorts.map((v) => ({ hash: `shorts/${v.slug}`, kind: 'short', item: v })),
    ...posts.map((p) => ({ hash: `posts/${p.slug}`, kind: 'post', item: p })),
    ...emails.map((m) => ({ hash: `emails/${m.slug}`, kind: 'email', item: m })),
    ...insta.map((p) => ({ hash: `insta/${p.slug}`, kind: 'insta', item: p })),
  ];
  let current = -1;
  const scrolls = {}; // where each tab was left, restored when it comes back

  // The scroll at which the switch has just pinned, with the tab's heading below it.
  function tabStart() {
    const style = getComputedStyle(tabs);
    return $(`panel-${tab}`).offsetTop - parseFloat(style.marginBottom) - tabs.offsetHeight - parseFloat(style.top);
  }

  function route() {
    const hash = location.hash.replace(/^#\/?/, '').split('?')[0];
    const i = items.findIndex((x) => x.hash === hash);
    const open = i >= 0;
    const wasOpen = $('gallery').hidden;
    const prev = tab;
    if (!wasOpen) scrolls[prev] = scrollY;
    current = i;
    $('gallery').hidden = open;
    $('viewer').hidden = !open;
    document.body.style.overflow = open ? 'hidden' : '';
    showTab(open ? (items[i].kind === 'post' ? 'posts' : items[i].kind === 'email' ? 'emails' : items[i].kind === 'insta' ? 'insta' : items[i].kind === 'video' ? 'videos' : items[i].kind === 'short' ? 'shorts' : 'sites') : tabOf(hash));
    if (!open) {
      document.title = tab === 'research' ? 'Good Research · GoodDesigns' : tab === 'insta' ? 'Good Insta · GoodDesigns' : tab === 'posts' ? 'Posts · GoodDesigns' : tab === 'emails' ? 'Good Emails · GoodDesigns' : tab === 'shorts' ? 'Good Shorts · GoodDesigns' : tab === 'videos' ? 'Videos · GoodDesigns' : 'GoodDesigns';
      frame.removeAttribute('src');
      postView.hidden = true;
      postView.innerHTML = '';
      instaView.hidden = true;
      instaView.innerHTML = '';
      // A tab opened for the first time starts at its top, or where the switch pins if the page was scrolled past that.
      if (wasOpen || prev !== tab) scrollTo(0, scrolls[tab] ?? Math.min(scrolls[prev] ?? 0, tabStart()));
      return;
    }
    const { kind, item } = items[i];
    const name = kind === 'site' ? item.name : kind === 'email' ? item.subject : item.title;
    $('back').href = tabHash[tab];
    $('viewer').dataset.kind = kind === 'site' ? 'site' : kind === 'post' ? 'post' : kind === 'email' ? 'email' : kind === 'insta' ? 'insta' : kind === 'short' ? 'short' : item.platform;
    document.title = `${name} · GoodDesigns`;
    $('back').setAttribute('aria-label', `Back to GoodDesigns from ${name}`);
    const out = kind === 'site' ? srcUrl(item) : kind === 'email' ? item.link.url : item.url;
    const label = kind === 'site' ? 'View source' : kind === 'email' ? item.link.label : `Open on ${PLATFORM[item.platform] || 'platform'}`;
    $('v-src').href = out;
    $('v-src-label').textContent = label;
    $('v-src-icon').setAttribute('d', kind === 'site' ? 'M7 6 3 10l4 4M13 6l4 4-4 4' : 'M8.5 4.5H4.5v11h11v-4M11.5 3.5h5v5M16.5 3.5l-7.5 7.5');
    $('v-src').setAttribute('aria-label', `${label} (opens in a new tab)`);

    // Whatever opens next replaces the Instagram reader, which stops its videos.
    if (kind !== 'insta') {
      instaView.hidden = true;
      instaView.innerHTML = '';
    }
    if (kind === 'insta') {
      frame.hidden = true;
      frame.removeAttribute('src');
      postView.hidden = true;
      postView.innerHTML = '';
      instaView.hidden = false;
      instaView.innerHTML = renderInsta(item);
      $('viewer').scrollTop = 0;
      initInsta();
    } else if (kind === 'post' || kind === 'email') {
      frame.hidden = true;
      frame.removeAttribute('src');
      postView.hidden = false;
      postView.innerHTML = kind === 'email' ? renderEmail(item) : renderPost(item);
      $('viewer').scrollTop = 0;
    } else {
      postView.hidden = true;
      postView.innerHTML = '';
      frame.hidden = false;
      frame.title = kind === 'site' ? `${name} preview` : name;
      const target = kind === 'site' ? siteUrl(item) : embedUrl(item);
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
    const cur = items[current];
    if (!cur) return;
    const kind = cur.kind;
    const list = items.filter((x) => x.kind === kind);
    const step = (d) => {
      const at = list.indexOf(cur);
      location.hash = `#/${list[(at + d + list.length) % list.length].hash}`;
    };
    if (e.key === 'Escape') location.hash = tabHash[tab];
    if (kind === 'insta' && !e.altKey && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
      instaView.querySelector(`.insta-nav--${e.key === 'ArrowLeft' ? 'prev' : 'next'}:not([hidden])`)?.click();
    }
    if (e.key === 'ArrowLeft' && e.altKey) step(-1);
    if (e.key === 'ArrowRight' && e.altKey) step(1);
  });
  route();
})();
