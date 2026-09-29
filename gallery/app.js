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
  const seg = document.querySelector('.seg');
  seg.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    seg.querySelectorAll('button').forEach((x) => x.classList.toggle('on', x === b));
    frame.style.width = b.dataset.w;
  });

  function route() {
    const slug = location.hash.replace(/^#\/?/, '');
    const i = sites.findIndex((s) => s.slug === slug);
    const open = i >= 0;
    $('gallery').hidden = open;
    $('viewer').hidden = !open;
    document.body.style.overflow = open ? 'hidden' : '';
    if (!open) { document.title = 'GoodDesigns'; frame.removeAttribute('src'); return; }
    const s = sites[i];
    document.title = `${s.name} · GoodDesigns`;
    $('v-name').textContent = s.name;
    $('v-tag').textContent = s.tagline;
    $('v-open').href = `sites/${s.slug}/`;
    $('v-src').href = srcUrl(s);
    $('prev').href = `#/${sites[(i - 1 + sites.length) % sites.length].slug}`;
    $('next').href = `#/${sites[(i + 1) % sites.length].slug}`;
    const target = `sites/${s.slug}/`;
    if (!frame.src.endsWith(target)) frame.src = target;
  }
  addEventListener('hashchange', route);
  addEventListener('keydown', (e) => {
    if ($('viewer').hidden) return;
    if (e.key === 'Escape') location.hash = '#/';
    if (e.key === 'ArrowLeft' && e.altKey) $('prev').click();
    if (e.key === 'ArrowRight' && e.altKey) $('next').click();
  });
  route();
})();
