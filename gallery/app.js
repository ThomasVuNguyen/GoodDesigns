(async () => {
  const $ = (id) => document.getElementById(id);
  // The gallery shows one tab at a time: #/ is sites, #/videos is videos, #/posts is posts, #/folks is folks.
  const tabs = $('tabs');
  const tabHash = { sites: '#/', videos: '#/videos', posts: '#/posts', folks: '#/folks' };
  const tabOf = (hash) => (
    hash === 'folks' || hash.startsWith('folks/') ? 'folks' :
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

  const [{ repo, branch, sites }, { videos }, { posts }, { folks }] = await Promise.all(
    ['sites.json', 'videos.json', 'posts.json', 'folks.json'].map(async (f) => (await fetch(f)).json()),
  );
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
  const srcUrl = (s) => `${repo}/tree/${branch}/${s.folder}`;
  const PLATFORM = { youtube: 'YouTube', x: 'X', linkedin: 'LinkedIn' };
  const ICON = {
    youtube: '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8ZM9.8 15.1V8.9l5.8 3.1-5.8 3.1Z"/></svg>',
    x: '<svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true"><path fill="currentColor" d="M17.8 2.5h3.3l-7.2 8.2 8.5 10.8h-6.6l-5.2-6.7-5.9 6.7H1.4l7.7-8.8L1 2.5h6.8l4.7 6.1 5.3-6.1Zm-1.2 17.1h1.8L7.5 4.3H5.5l11.1 15.3Z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z"/></svg>',
  };
  // The player each platform offers for embedding; YouTube's privacy-enhanced domain sets no cookies until play.
  const embedUrl = (v) => v.platform === 'youtube'
    ? `https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0&playsinline=1`
    : `https://platform.twitter.com/embed/Tweet.html?id=${v.id}&dnt=true`;

  const formatSeconds = (s) => {
    const mins = Math.floor(s / 60);
    const secs = Math.floor(s % 60);
    return `${mins}:${String(secs).padStart(2, '0')}`;
  };

  $('n-sites').textContent = sites.length;
  $('n-videos').textContent = videos.length;
  $('n-posts').textContent = posts.length;
  $('n-folks').textContent = folks.length;

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

  const formatTotalDuration = (talks) => {
    const totalSec = (talks || []).reduce((sum, t) => sum + (t.duration || 0), 0);
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    if (hrs > 0) return `${hrs}h ${mins}m`;
    return `${mins}m`;
  };

  $('folks-grid').innerHTML = folks.map((f) => `
    <li class="card card--folk">
      <a class="thumb folk-thumb" href="#/folks/${f.slug}" aria-label="Explore ${esc(f.name)}’s profile, thoughts, and recordings">
        <div class="folk-thumb-frame">
          <img class="folk-portrait" src="${esc(f.portrait)}" alt="" loading="lazy" width="800" height="1000" style="object-position: ${esc(f.focus || '50% 30%')}">
        </div>
      </a>
      <div class="folk-card-body">
        <div class="folk-card-top">
          <span class="folk-no">No. ${esc(f.no)}</span>
          ${f.social && f.social[0] ? `
            <a class="src src--icon" href="${esc(f.social[0].url)}" target="_blank" rel="noopener" aria-label="${esc(f.social[0].label)}" title="${esc(f.social[0].label)}">
              ${ICON[f.social[0].platform] || ''}
            </a>
          ` : ''}
        </div>
        <h2 class="folk-card-name"><a href="#/folks/${f.slug}">${esc(f.name)}</a></h2>
        <p class="folk-card-role">${esc(f.role)}</p>
        <p class="folk-card-thesis">“${esc(f.thesis)}”</p>
        <p class="folk-card-stat">${f.talks.length} ${f.talks.length === 1 ? 'recording' : 'recordings'} · ${formatTotalDuration(f.talks)}</p>
      </div>
    </li>
  `).join('') || '<li class="empty">No folks yet.</li>';

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

  const cleanTalkTitle = (t) => (t || '')
    .replace(/^The Browser Company’s Josh Miller on\s*/i, '')
    .replace(/\s*\|\s*Ep\s*\d+/i, '')
    .replace(/\s*\(internal footage\)/i, '')
    .replace(/\s*\(CEO Update\)/i, '')
    .trim();

  function renderFolkProfile(folk) {
    return `
      <article class="folk-profile-spread">
        <header class="folk-profile-hero">
          <div class="folk-hero-portrait-frame">
            <img class="folk-hero-portrait" src="${esc(folk.portrait)}" alt="${esc(folk.name)}" style="object-position: ${esc(folk.focus || '50% 30%')}">
          </div>
          <div class="folk-hero-content">
            <div class="folk-hero-badge">
              <span class="folk-hero-no">No. ${esc(folk.no)}</span>
              <span class="folk-hero-sep">·</span>
              <span class="folk-hero-archive">Archival Profile</span>
            </div>
            <h1 class="folk-hero-name">${esc(folk.name)}</h1>
            <div class="folk-hero-role">${esc(folk.role)} · ${esc(folk.location)}</div>
            <div class="folk-hero-thesis">“${esc(folk.thesis)}”</div>
            
            <div class="folk-wall-label">
              <p class="folk-wall-label-text">${esc(folk.label)}</p>
              <div class="folk-wall-label-sig">— ${esc(folk.labelBy)}, ${esc(folk.labelDate)}</div>
            </div>

            ${folk.startHere ? `
              <div class="folk-start-here">
                <span class="folk-start-here-tag">Start Here</span>
                <div class="folk-start-here-body">
                  <a class="folk-start-here-link" href="#/folks/${folk.slug}/${folk.startHere.talkId}?t=${folk.startHere.at}">
                    <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><path d="M6 4.5v11l9-5.5z" fill="currentColor"/></svg>
                    <span>${esc(folk.startHere.label)}</span>
                    <span class="folk-start-here-time">from ${esc(folk.startHere.time)} ▸</span>
                  </a>
                  ${folk.startHere.context ? `<p class="folk-start-here-desc">${esc(folk.startHere.context)}</p>` : ''}
                </div>
              </div>
            ` : ''}

            <div class="folk-profile-socials">
              ${(folk.social || []).map(s => `
                <a class="folk-social-pill" href="${esc(s.url)}" target="_blank" rel="noopener">
                  ${ICON[s.platform] || ''}
                  <span>${esc(s.label)} ↗</span>
                </a>
              `).join('')}
            </div>
          </div>
        </header>

        ${folk.passages && folk.passages.length ? `
          <section class="folk-section folk-passages-section" aria-labelledby="passages-heading">
            <div class="folk-section-header">
              <h3 id="passages-heading" class="folk-section-heading">Archival Passages</h3>
              <p class="folk-section-sub">Verbatim excerpts from tape. Select any passage to open the recording at that exact moment.</p>
            </div>
            <div class="folk-passages-grid">
              ${folk.passages.map(p => `
                <a class="folk-passage-card" href="#/folks/${folk.slug}/${p.talkId}?t=${p.start}">
                  <blockquote class="folk-passage-quote">“${esc(p.text)}”</blockquote>
                  <div class="folk-passage-meta">
                    <span class="folk-passage-source">${esc(p.talkTitle)}</span>
                    <span class="folk-passage-stamp">${esc(p.time)} ▸</span>
                  </div>
                </a>
              `).join('')}
            </div>
          </section>
        ` : ''}

        ${folk.works && folk.works.length ? `
          <section class="folk-section folk-works-section" aria-labelledby="works-heading">
            <div class="folk-section-header">
              <h3 id="works-heading" class="folk-section-heading">Elsewhere in GoodDesigns</h3>
              <p class="folk-section-sub">Interactive recreations and featured works in this gallery connected to ${esc(folk.name)}.</p>
            </div>
            <div class="folk-works-grid">
              ${folk.works.map(w => `
                <a class="folk-work-card" href="#/${w.type === 'site' ? w.slug : 'videos/' + w.slug}">
                  <div class="folk-work-kind">${esc(w.kind)}</div>
                  <h4 class="folk-work-title">${esc(w.title)}</h4>
                  <p class="folk-work-note">${esc(w.note)}</p>
                  <span class="folk-work-action">Open ${w.type === 'site' ? 'Recreation' : 'Video'} ↗</span>
                </a>
              `).join('')}
            </div>
          </section>
        ` : ''}

        <section class="folk-section folk-recordings-section" aria-labelledby="recordings-heading">
          <div class="folk-section-header">
            <h3 id="recordings-heading" class="folk-section-heading">Recordings & Transcripts</h3>
            <p class="folk-section-sub">Curated talks, essays, and behind-the-scenes footage with interactive, searchable transcripts.</p>
          </div>
          <div class="folk-talks-list">
            ${folk.talks.map((t, idx) => `
              <div class="folk-talk-row">
                <div class="folk-talk-row-main">
                  <div class="folk-talk-row-index">${String(idx + 1).padStart(2, '0')}</div>
                  <div class="folk-talk-row-details">
                    <h4 class="folk-talk-row-title"><a href="#/folks/${folk.slug}/${t.id}">${esc(t.title)}</a></h4>
                    <div class="folk-talk-row-meta">
                      <span>${esc(t.event)}</span>
                      <span>·</span>
                      <span>${esc(t.durationFormatted)}</span>
                      <span>·</span>
                      <span>${t.paragraphsCount} transcript paragraphs</span>
                    </div>
                    ${t.note ? `<p class="folk-talk-row-note">${esc(t.note)}</p>` : ''}
                  </div>
                </div>
                <div class="folk-talk-row-actions">
                  <a class="folk-btn folk-btn--listen" href="#/folks/${folk.slug}/${t.id}">
                    <svg viewBox="0 0 20 20" width="14" height="14" aria-hidden="true"><path d="M6 4.5v11l9-5.5z" fill="currentColor"/></svg>
                    <span>Listen & Read</span>
                  </a>
                  <a class="folk-btn folk-btn--external" href="${esc(t.url)}" target="_blank" rel="noopener" title="Open on YouTube">
                    <span>YouTube ↗</span>
                  </a>
                </div>
              </div>
            `).join('')}
          </div>
        </section>
      </article>`;
  }

  function renderFolkTalk(folk, talk, startTime) {
    const startSec = startTime ? parseInt(startTime, 10) : (talk.startSeconds || 0);
    const embedSrc = `https://www.youtube-nocookie.com/embed/${talk.id}?enablejsapi=1&rel=0${startSec ? '&start=' + startSec : ''}`;
    const talks = folk.talks || [];
    const hasMultiple = talks.length > 1;

    return `
      <article class="folk-reader-card">
        <nav class="folk-nav-bar" aria-label="Profile navigation">
          <a class="folk-nav-back" href="#/folks/${folk.slug}">
            <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><path d="m13 16-6-6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <span>${esc(folk.name)} Profile</span>
          </a>
          <span class="folk-nav-sep">/</span>
          <span class="folk-nav-current">${esc(cleanTalkTitle(talk.title))}</span>
        </nav>

        <header class="folk-reader-profile">
          <div class="folk-reader-author">
            <a href="#/folks/${folk.slug}">
              <img class="folk-reader-avatar" src="${esc(folk.portrait)}" alt="${esc(folk.name)}" width="56" height="56" style="object-position: ${esc(folk.focus || '50% 30%')}">
            </a>
            <div class="folk-reader-meta">
              <h2 class="folk-reader-name"><a href="#/folks/${folk.slug}">${esc(folk.name)}</a></h2>
              <div class="folk-reader-role">${esc(folk.role)} · ${esc(folk.location)}</div>
            </div>
          </div>
          <div class="folk-socials">
            ${(folk.social || []).map(s => `
              <a class="folk-social-link" href="${esc(s.url)}" target="_blank" rel="noopener" aria-label="${esc(s.label)}" title="${esc(s.label)}">
                ${ICON[s.platform] || ''}
              </a>
            `).join('')}
          </div>
        </header>

        ${hasMultiple ? `
          <nav class="folk-talk-selector" aria-label="Talks by ${esc(folk.name)}">
            ${talks.map((t, idx) => `
              <a class="folk-pill" href="#/folks/${folk.slug}/${t.id}" ${t.id === talk.id ? 'aria-current="true"' : ''}>
                <span>${idx + 1}. ${esc(cleanTalkTitle(t.title))}</span>
                <span class="folk-pill-dur">${esc(t.durationFormatted)}</span>
              </a>
            `).join('')}
          </nav>
        ` : ''}

        <div class="folk-talk-header">
          <h3 class="folk-talk-heading">${esc(talk.title)}</h3>
          <div class="folk-talk-meta-row">
            <span>${esc(talk.event)}</span>
            <span>·</span>
            <span>${esc(talk.durationFormatted)}</span>
            ${startSec ? `<span>·</span><span>Playing from ${formatSeconds(startSec)}</span>` : ''}
            <span>·</span>
            <a href="${esc(talk.url)}" target="_blank" rel="noopener">Open on YouTube ↗</a>
          </div>
          ${talk.note ? `<p class="folk-talk-note">${esc(talk.note)}</p>` : ''}
        </div>

        <div class="folk-video-embed">
          <iframe id="folk-video-player" src="${embedSrc}" title="${esc(talk.title)}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>
        </div>

        <section class="transcript-section" aria-labelledby="transcript-heading">
          <div class="transcript-controls">
            <h4 id="transcript-heading" class="transcript-title">
              Transcript
              <span id="ts-count">${talk.paragraphsCount || 0} paragraphs</span>
            </h4>
            <div class="transcript-tools">
              <input type="search" id="ts-search" class="transcript-search-input" placeholder="Search transcript... (press /)" aria-label="Search transcript">
              <button id="ts-copy" class="transcript-copy-btn" type="button">Copy Transcript</button>
            </div>
          </div>
          <div id="ts-matches" class="transcript-matches" hidden></div>
          <div id="ts-list" class="transcript-paragraphs">
            <div class="transcript-loading">Loading verified transcript...</div>
          </div>
        </section>
      </article>`;
  }

  const transcriptCache = {};

  async function initFolkTalkInteractions(folk, talk, startTime) {
    const player = $('folk-video-player');
    const folkView = $('folk-view');
    const tsList = $('ts-list');
    if (!folkView || !tsList) return;

    let paragraphs = transcriptCache[talk.id];
    if (!paragraphs) {
      try {
        const res = await fetch(`transcripts/${talk.id}.json`);
        if (res.ok) {
          const data = await res.json();
          paragraphs = data.paragraphs || [];
          transcriptCache[talk.id] = paragraphs;
        } else {
          paragraphs = [];
        }
      } catch (err) {
        console.error('Error fetching transcript:', err);
        paragraphs = [];
      }
    }

    if (!paragraphs.length) {
      tsList.innerHTML = '<p class="transcript-empty">Transcript unavailable for this recording.</p>';
      return;
    }

    tsList.innerHTML = paragraphs.map(p => `
      <div class="transcript-p" data-start="${p.start}">
        <button class="ts-stamp" type="button" data-time="${p.start}" title="Jump video to ${p.time}">${p.time}</button>
        <p class="ts-text">${esc(p.text)}</p>
      </div>
    `).join('');

    const seekTo = (sec) => {
      if (player && player.contentWindow) {
        player.contentWindow.postMessage(JSON.stringify({
          event: 'command',
          func: 'seekTo',
          args: [sec, true]
        }), '*');
        player.contentWindow.postMessage(JSON.stringify({
          event: 'command',
          func: 'playVideo',
          args: []
        }), '*');
      }
    };

    tsList.querySelectorAll('.ts-stamp').forEach((btn) => {
      btn.addEventListener('click', () => {
        const sec = Math.floor(parseFloat(btn.dataset.time));
        seekTo(sec);
        if (player) {
          player.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        tsList.querySelectorAll('.transcript-p').forEach(p => p.classList.remove('is-active'));
        btn.closest('.transcript-p')?.classList.add('is-active');
      });
    });

    if (startTime) {
      const sec = parseInt(startTime, 10);
      const targetP = Array.from(tsList.querySelectorAll('.transcript-p')).find(el => {
        const s = parseFloat(el.dataset.start);
        return s >= sec;
      });
      if (targetP) {
        targetP.classList.add('is-active');
        setTimeout(() => targetP.scrollIntoView({ behavior: 'smooth', block: 'center' }), 300);
      }
    }

    const searchInput = $('ts-search');
    const matchesEl = $('ts-matches');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const q = e.target.value.trim().toLowerCase();
        const pEls = tsList.querySelectorAll('.transcript-p');
        let matches = 0;
        pEls.forEach((el) => {
          const textEl = el.querySelector('.ts-text');
          const rawText = el.dataset.rawText || (el.dataset.rawText = textEl.textContent);
          if (!q) {
            el.hidden = false;
            textEl.textContent = rawText;
          } else if (rawText.toLowerCase().includes(q)) {
            el.hidden = false;
            matches++;
            const regex = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
            textEl.innerHTML = esc(rawText).replace(regex, '<mark>$1</mark>');
          } else {
            el.hidden = true;
          }
        });
        if (q) {
          matchesEl.hidden = false;
          matchesEl.textContent = `${matches} ${matches === 1 ? 'match' : 'matches'} found for "${q}"`;
        } else {
          matchesEl.hidden = true;
        }
      });
    }

    const copyBtn = $('ts-copy');
    if (copyBtn) {
      copyBtn.addEventListener('click', async () => {
        const fullText = paragraphs.map((p) => `[${p.time}] ${p.text}`).join('\n\n');
        try {
          await navigator.clipboard.writeText(`${talk.title} — ${folk.name}\n${talk.url}\n\n${fullText}`);
          const orig = copyBtn.textContent;
          copyBtn.textContent = 'Copied!';
          setTimeout(() => { copyBtn.textContent = orig; }, 2000);
        } catch (err) {
          console.error('Failed to copy', err);
        }
      });
    }
  }

  const frame = $('frame');
  const postView = $('post-view');
  const folkView = $('folk-view');
  const items = [
    ...sites.map((s) => ({ hash: s.slug, kind: 'site', item: s })),
    ...videos.map((v) => ({ hash: `videos/${v.slug}`, kind: 'video', item: v })),
    ...posts.map((p) => ({ hash: `posts/${p.slug}`, kind: 'post', item: p })),
    ...folks.flatMap((f) => [
      { hash: `folks/${f.slug}`, kind: 'folk-profile', folk: f },
      ...f.talks.map((t) => ({ hash: `folks/${f.slug}/${t.id}`, kind: 'folk-talk', folk: f, talk: t, alias: `folks/${f.slug}/${t.slug}` })),
    ]),
  ];
  let current = -1;
  const scrolls = {}; // where each tab was left, restored when it comes back

  // The scroll at which the switch has just pinned, with the tab's heading below it.
  function tabStart() {
    const style = getComputedStyle(tabs);
    return $(`panel-${tab}`).offsetTop - parseFloat(style.marginBottom) - tabs.offsetHeight - parseFloat(style.top);
  }

  function route() {
    const rawHash = location.hash.replace(/^#\/?/, '');
    const [hash, queryString] = rawHash.split('?');
    const queryParams = new URLSearchParams(queryString || '');
    const startTime = queryParams.get('t') || queryParams.get('start');
    const i = items.findIndex((x) => x.hash === hash || x.alias === hash);
    const open = i >= 0;
    const wasOpen = $('gallery').hidden;
    const prev = tab;
    if (!wasOpen) scrolls[prev] = scrollY;
    current = i;
    $('gallery').hidden = open;
    $('viewer').hidden = !open;
    document.body.style.overflow = open ? 'hidden' : '';
    showTab(open ? (items[i].kind.startsWith('folk') ? 'folks' : items[i].kind === 'post' ? 'posts' : items[i].kind === 'video' ? 'videos' : 'sites') : tabOf(hash));
    if (!open) {
      document.title = tab === 'folks' ? 'Good Folks · GoodDesigns' : tab === 'posts' ? 'Posts · GoodDesigns' : tab === 'videos' ? 'Videos · GoodDesigns' : 'GoodDesigns';
      frame.removeAttribute('src');
      postView.hidden = true;
      postView.innerHTML = '';
      folkView.hidden = true;
      folkView.innerHTML = '';
      // A tab opened for the first time starts at its top, or where the switch pins if the page was scrolled past that.
      if (wasOpen || prev !== tab) scrollTo(0, scrolls[tab] ?? Math.min(scrolls[prev] ?? 0, tabStart()));
      return;
    }
    const { kind, item, folk, talk } = items[i];
    const isFolkProfile = kind === 'folk-profile';
    const isFolkTalk = kind === 'folk-talk';
    const isFolk = isFolkProfile || isFolkTalk;
    const name = kind === 'site' ? item.name : isFolkProfile ? `${folk.name} · Archive Profile` : isFolkTalk ? `${talk.title} · ${folk.name}` : item.title;
    $('back').href = isFolkTalk ? `#/folks/${folk.slug}` : tabHash[tab];
    $('viewer').dataset.kind = isFolk ? 'folk' : kind === 'site' ? 'site' : kind === 'post' ? 'post' : item.platform;
    document.title = `${name} · GoodDesigns`;
    $('back').setAttribute('aria-label', isFolkTalk ? `Back to ${folk.name} Profile` : `Back to GoodDesigns from ${name}`);
    const out = kind === 'site' ? srcUrl(item) : isFolkProfile ? (folk.social && folk.social[0] ? folk.social[0].url : '#') : isFolkTalk ? talk.url : item.url;
    const label = kind === 'site' ? 'View source' : isFolkProfile ? (folk.social && folk.social[0] ? (folk.social[0].platform === 'x' ? 'Open on X' : 'View Profile') : 'Good Folks') : isFolkTalk ? 'Open on YouTube' : `Open on ${PLATFORM[item.platform] || 'platform'}`;
    $('v-src').href = out;
    $('v-src-label').textContent = label;
    $('v-src-icon').setAttribute('d', kind === 'site' ? 'M7 6 3 10l4 4M13 6l4 4-4 4' : 'M8.5 4.5H4.5v11h11v-4M11.5 3.5h5v5M16.5 3.5l-7.5 7.5');
    $('v-src').setAttribute('aria-label', `${label} (opens in a new tab)`);

    if (kind === 'post') {
      frame.hidden = true;
      frame.removeAttribute('src');
      folkView.hidden = true;
      folkView.innerHTML = '';
      postView.hidden = false;
      postView.innerHTML = renderPost(item);
    } else if (isFolkProfile) {
      frame.hidden = true;
      frame.removeAttribute('src');
      postView.hidden = true;
      postView.innerHTML = '';
      folkView.hidden = false;
      folkView.innerHTML = renderFolkProfile(folk);
    } else if (isFolkTalk) {
      frame.hidden = true;
      frame.removeAttribute('src');
      postView.hidden = true;
      postView.innerHTML = '';
      folkView.hidden = false;
      folkView.innerHTML = renderFolkTalk(folk, talk, startTime);
      initFolkTalkInteractions(folk, talk, startTime);
    } else {
      postView.hidden = true;
      postView.innerHTML = '';
      folkView.hidden = true;
      folkView.innerHTML = '';
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
    if (e.key === '/' && !$('viewer').hidden && $('viewer').dataset.kind === 'folk') {
      const search = $('ts-search');
      if (search && document.activeElement !== search) {
        e.preventDefault();
        search.focus();
        return;
      }
    }
    if ($('viewer').hidden) return;
    const cur = items[current];
    if (!cur) return;
    const kind = cur.kind;
    const list = items.filter((x) => x.kind === kind);
    const step = (d) => {
      const at = list.indexOf(cur);
      location.hash = `#/${list[(at + d + list.length) % list.length].hash}`;
    };
    if (e.key === 'Escape') {
      if (kind === 'folk-talk') {
        location.hash = `#/folks/${cur.folk.slug}`;
      } else {
        location.hash = tabHash[tab];
      }
    }
    if (e.key === 'ArrowLeft' && e.altKey) step(-1);
    if (e.key === 'ArrowRight' && e.altKey) step(1);
  });
  route();
})();
