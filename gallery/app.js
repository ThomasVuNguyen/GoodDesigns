(async () => {
  const { repo, branch, sites } = await (await fetch('sites.json')).json();
  const $ = (id) => document.getElementById(id);
  const srcUrl = (s) => `${repo}/tree/${branch}/${s.folder}`;

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

  const frame = $('frame');
  let current = -1;

  function route() {
    const slug = location.hash.replace(/^#\/?/, '');
    const i = sites.findIndex((s) => s.slug === slug);
    const open = i >= 0;
    current = i;
    $('gallery').hidden = open;
    $('viewer').hidden = !open;
    document.body.style.overflow = open ? 'hidden' : '';
    if (!open) { document.title = 'GoodDesigns'; frame.removeAttribute('src'); return; }
    const s = sites[i];
    document.title = `${s.name} · GoodDesigns`;
    frame.title = `${s.name} preview`;
    $('back').setAttribute('aria-label', `Back to the GoodDesigns gallery from ${s.name}`);
    $('v-src').href = srcUrl(s);
    $('v-src').setAttribute('aria-label', `View source for ${s.name} on GitHub (opens in a new tab)`);
    const target = `sites/${s.slug}/`;
    if (!frame.src.endsWith(target)) frame.src = target;
  }
  addEventListener('hashchange', route);
  addEventListener('keydown', (e) => {
    if ($('viewer').hidden) return;
    const step = (d) => { location.hash = `#/${sites[(current + d + sites.length) % sites.length].slug}`; };
    if (e.key === 'Escape') location.hash = '#/';
    if (e.key === 'ArrowLeft' && e.altKey) step(-1);
    if (e.key === 'ArrowRight' && e.altKey) step(1);
  });
  route();
})();
