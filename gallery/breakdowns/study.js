const video = document.getElementById('study-video');

if (video) {
  const lines = [...document.querySelectorAll('.transcript-line')];
  let active = -1;
  let youtubePlayer = null;
  let pendingSeek = null;
  const isYouTube = Boolean(video.dataset.youtubeId);

  if (isYouTube) {
    window.onYouTubeIframeAPIReady = () => {
      youtubePlayer = new YT.Player(video, {
        videoId: video.dataset.youtubeId,
        playerVars: { playsinline: 1 },
        events: { onReady: () => {
          if (pendingSeek !== null) {
            youtubePlayer.seekTo(pendingSeek, true);
            youtubePlayer.playVideo();
            pendingSeek = null;
          }
        } },
      });
    };
    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    document.head.append(script);
  }

  function currentTime() {
    return isYouTube ? (youtubePlayer?.getCurrentTime?.() || 0) : video.currentTime;
  }

  function updateTranscript() {
    const time = currentTime();
    let next = -1;
    for (let i = 0; i < lines.length; i++) {
      if (Number(lines[i].dataset.time) > time) break;
      next = i;
    }
    if (next === active) return;
    if (active >= 0) lines[active].classList.remove('is-active');
    active = next;
    if (active >= 0) lines[active].classList.add('is-active');
  }

  document.addEventListener('click', (event) => {
    const seek = event.target.closest('[data-seek]');
    if (!seek) return;
    const time = Number(seek.dataset.seek);
    if (isYouTube) {
      if (youtubePlayer?.seekTo) {
        youtubePlayer.seekTo(time, true);
        youtubePlayer.playVideo();
      } else pendingSeek = time;
    } else {
      video.currentTime = time;
      video.play().catch(() => {});
    }
    if (!seek.classList.contains('transcript-line')) {
      document.getElementById('study-video').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' });
    }
  });

  if (isYouTube) setInterval(updateTranscript, 500);
  else video.addEventListener('timeupdate', updateTranscript);

  const tabs = [...document.querySelectorAll('[data-tab]')];
  function selectTab(tab) {
    tabs.forEach((item) => {
      const selected = item === tab;
      item.setAttribute('aria-selected', String(selected));
      document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
    });
  }
  tabs.forEach((tab) => tab.addEventListener('click', () => selectTab(tab)));
  document.querySelector('.frame-tabs')?.addEventListener('keydown', (event) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    const current = tabs.findIndex((tab) => tab.getAttribute('aria-selected') === 'true');
    const next = tabs[(current + (event.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
    selectTab(next);
    next.focus();
  });

  const framePreview = document.createElement('div');
  framePreview.className = 'frame-preview';
  framePreview.hidden = true;
  framePreview.setAttribute('aria-hidden', 'true');
  framePreview.innerHTML = '<img alt=""><div class="frame-preview-label"><strong>Frame preview</strong><span></span></div>';
  document.body.append(framePreview);
  const previewImage = framePreview.querySelector('img');
  const previewTime = framePreview.querySelector('span');
  const hoverEnabled = matchMedia('(hover: hover) and (pointer: fine)');
  let currentFrame = null;

  function positionPreview(card) {
    const rect = card.getBoundingClientRect();
    const width = framePreview.offsetWidth;
    const height = framePreview.offsetHeight;
    const gap = 14;
    const edge = 16;
    let left;
    if (innerWidth - rect.right >= width + gap + edge) left = rect.right + gap;
    else if (rect.left >= width + gap + edge) left = rect.left - width - gap;
    else left = Math.max(edge, Math.min(innerWidth - width - edge, rect.left + (rect.width - width) / 2));
    const top = Math.max(edge, Math.min(innerHeight - height - edge, rect.top));
    framePreview.style.left = `${left}px`;
    framePreview.style.top = `${top}px`;
  }

  function showPreview(card) {
    if (!card || !hoverEnabled.matches) return;
    if (currentFrame !== card) {
      const link = card.querySelector('a');
      previewImage.src = link.href;
      previewTime.textContent = card.querySelector('.frame-label').textContent;
      currentFrame = card;
    }
    framePreview.hidden = false;
    positionPreview(card);
  }

  function hidePreview() {
    framePreview.hidden = true;
    currentFrame = null;
  }

  document.addEventListener('pointerover', (event) => {
    if (event.pointerType === 'mouse') showPreview(event.target.closest('.frame-card'));
  });
  document.addEventListener('pointerout', (event) => {
    if (currentFrame && currentFrame.contains(event.target) &&
        !currentFrame.contains(event.relatedTarget) && !currentFrame.matches(':focus-within')) hidePreview();
  });
  document.addEventListener('focusin', (event) => showPreview(event.target.closest('.frame-card')));
  document.addEventListener('focusout', (event) => {
    if (currentFrame && !currentFrame.contains(event.relatedTarget) && !currentFrame.matches(':hover')) hidePreview();
  });
  document.addEventListener('scroll', () => {
    if (currentFrame?.matches(':focus-within')) positionPreview(currentFrame);
    else hidePreview();
  }, true);
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') hidePreview(); });
  window.addEventListener('resize', () => { if (currentFrame) positionPreview(currentFrame); });
}
