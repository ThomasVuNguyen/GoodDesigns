document.addEventListener("click", function (event) {
  // Check if clicked element or its parent has the data-dropdown attribute
  let dropdownElement = event.target.hasAttribute("data-dropdown")
    ? event.target
    : event.target.closest("[data-dropdown]");

  if (dropdownElement) {
    // Get the value of the data-dropdown attribute
    const dropdownValue = dropdownElement.getAttribute("data-dropdown");

    // Find the matching tab element using the data-w-tab attribute
    const tabElement = document.querySelector(
      `[data-w-tab="${dropdownValue}"]`
    );

    // If a matching tab is found, trigger a click on it
    if (tabElement) {
      tabElement.click();
    }

    // Extract text directly from the dropdown element
    const dropdownText = dropdownElement.textContent.trim();

    // Find the element with .replace-text class
    const replaceTextElement = document.querySelector(".replace-text");

    // If found, replace its text content with the text extracted from data-dropdown element
    if (replaceTextElement) {
      replaceTextElement.textContent = dropdownText;
    }
  }
});

$(document).ready(function() {
    const compare = document.querySelector('.compare');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let revealFrame;
    function revealBars() {
        compare.classList.add('is-in-view');
        if (reducedMotion.matches) return;
        compare.querySelectorAll('.w--tab-active .cm_inner').forEach(function(bar, index) {
            bar.animate(
                [{ clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0 0 0)' }],
                { duration: 700, delay: index * 90, easing: 'cubic-bezier(.645,.045,.355,1)', fill: 'backwards' }
            );
        });
    }
    function skipWipeForReducedMotion() {
        if (!reducedMotion.matches) return;
        compare.querySelectorAll('.cm_inner').forEach(function(bar) {
            bar.getAnimations().forEach(function(animation) { animation.cancel(); });
        });
    }
    // Entries also arrive when isIntersecting flips below the threshold.
    const visibilityObserver = new IntersectionObserver(function(entries) {
        if (entries.some(entry => entry.isIntersecting && entry.intersectionRatio >= 0.5)) {
            visibilityObserver.disconnect();
            revealBars();
        }
    }, { threshold: 0.5 });
    if (compare) {
        visibilityObserver.observe(compare.querySelector('.compare_stats'));
        reducedMotion.addEventListener('change', skipWipeForReducedMotion);
    }
    $('[data-dropdown]').on('click.compare', function() {
        $('.comparison-metric').triggerHandler('w-close.w-dropdown');
        // The document click listener above switches the tab after this handler.
        visibilityObserver.disconnect();
        cancelAnimationFrame(revealFrame);
        revealFrame = requestAnimationFrame(revealBars);
    });
    window.addEventListener('pagehide', function(event) {
        if (event.persisted) return;
        visibilityObserver.disconnect();
        cancelAnimationFrame(revealFrame);
        reducedMotion.removeEventListener('change', skipWipeForReducedMotion);
        $('[data-dropdown]').off('click.compare');
    });
  

  if($(window).width() < 768) {
    $('.list_comparison .row-title').on('click', function(e) {
      e.preventDefault();
      if($(this).hasClass('active')) {
        $(this).removeClass('active');
        $(this).parent().find('.comparison_rows_list').hide();
      } else {
        $('.comparison_rows_list').hide();
        $('.list_comparison .row-title').removeClass('active');
        $(this).addClass('active');
        $(this).parent().find('.comparison_rows_list').show();
      }
    })
  }
})




function TyperSetup() {
  const element = document.getElementById('typer1');
  if (!element || !element.parentElement) return;
  const mobile = window.matchMedia('(max-width: 767px)');
  const label = () => (mobile.matches && element.dataset.wordsMobile) || element.dataset.words;
  let text = label();
  if (!text) return;
  let characters = Array.from(text);
  const delay = Number(element.dataset.delay || 200);
  const cursor = document.querySelector('.blinker[data-owner="typer1"]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let visible = false;
  let suspended = false;
  let disposed = false;
  let started = !element.hasAttribute('data-start-on-scroll');
  let character = 0;
  let timer;
  let blink;
  if (element.dataset.colors) element.style.color = element.dataset.colors;
  if (cursor) {
    cursor.textContent = cursor.dataset.cursordisplay || cursor.dataset.cursorDisplay || '█';
    blink = cursor.animate(
      [
        { opacity: 1, easing: 'steps(1, end)' },
        { opacity: 0, easing: 'steps(1, end)' },
        { opacity: 1 },
      ],
      { duration: 800, iterations: Infinity }
    );
    blink.pause();
  }

  function canAnimate() {
    return !disposed && !suspended && visible && !document.hidden && !reducedMotion.matches;
  }

  function typeCharacter() {
    timer = undefined;
    if (!canAnimate() || !started) return;
    character += 1;
    element.textContent = characters.slice(0, character).join('');
    if (character < characters.length) {
      timer = setTimeout(typeCharacter, delay);
    } else {
      syncTyping();
    }
  }

  function syncTyping() {
    clearTimeout(timer);
    timer = undefined;
    if (disposed) return;
    if (reducedMotion.matches) {
      character = characters.length;
      element.textContent = text;
      if (blink) blink.cancel();
      if (cursor) cursor.style.opacity = '1';
      return;
    }
    if (!canAnimate()) {
      if (blink) blink.pause();
      return;
    }
    if (!started) started = true;
    if (character < characters.length) {
      if (blink) {
        blink.pause();
        blink.currentTime = 0;
      }
      timer = setTimeout(typeCharacter, delay);
    } else if (blink) {
      blink.play();
    }
  }

  // Both labels share the "+ runs-on: blacksmith" prefix, so a typed prefix stays valid.
  function swapLabel() {
    const next = label();
    if (next === text) return;
    const typed = character >= characters.length;
    text = next;
    characters = Array.from(text);
    character = typed ? characters.length : Math.min(character, characters.length);
    if (character > 0) element.textContent = characters.slice(0, character).join('');
    syncTyping();
  }

  // The empty inline typer has no observable area; its parent includes the cursor.
  const observer = new IntersectionObserver(function(entries) {
    visible = entries.some(entry => entry.isIntersecting);
    syncTyping();
  });
  observer.observe(element.parentElement);
  document.addEventListener('visibilitychange', syncTyping);
  reducedMotion.addEventListener('change', syncTyping);
  mobile.addEventListener('change', swapLabel);

  function handlePageHide(event) {
    suspended = true;
    clearTimeout(timer);
    if (blink) blink.pause();
    if (event.persisted) return;
    disposed = true;
    observer.disconnect();
    if (blink) blink.cancel();
    document.removeEventListener('visibilitychange', syncTyping);
    reducedMotion.removeEventListener('change', syncTyping);
    mobile.removeEventListener('change', swapLabel);
    window.removeEventListener('pagehide', handlePageHide);
    window.removeEventListener('pageshow', handlePageShow);
  }

  function handlePageShow(event) {
    if (!event.persisted) return;
    suspended = false;
    syncTyping();
  }

  window.addEventListener('pagehide', handlePageHide);
  window.addEventListener('pageshow', handlePageShow);
  syncTyping();
}

// Run when DOM is fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', TyperSetup);
} else {
  TyperSetup();
}

$(document).ready(function() {
    const $popup = $('#videoPopup');
    const $triggers = $('.video-overlay-click, .icon-play-light');
    const $closers = $('.video-popup-close, .video-popup-overlay');
    let player;
    let playerReady = false;
    let playerFailed = false;
    let currentVideoId = '';
    let requestedVideoId = '';
    let apiPromise;
    let cancelApiLoad;
    let playerTimer;
    let disposed = false;

    function loadYouTubeApi() {
        if (window.YT && window.YT.Player) return Promise.resolve();
        if (apiPromise) return apiPromise;
        apiPromise = new Promise(function(resolve, reject) {
            const script = document.createElement('script');
            const previousReady = window.onYouTubeIframeAPIReady;
            let timer;
            let finished = false;
            function finish(error) {
                if (finished) return;
                finished = true;
                clearTimeout(timer);
                script.onerror = null;
                if (window.onYouTubeIframeAPIReady === onReady) {
                    window.onYouTubeIframeAPIReady = previousReady;
                }
                cancelApiLoad = null;
                if (error) {
                    script.remove();
                    if (!disposed && window.YT && !window.YT.Player) {
                        window.YT.loading = 0;
                        document.getElementById('www-widgetapi-script')?.remove();
                    }
                    reject(error);
                } else {
                    resolve();
                }
            }
            function onReady() {
                if (finished) return;
                finish();
                if (typeof previousReady === 'function') previousReady();
            }
            window.onYouTubeIframeAPIReady = onReady;
            cancelApiLoad = () => finish(new Error('YouTube API load cancelled'));
            script.src = 'https://www.youtube.com/iframe_api';
            script.onerror = () => finish(new Error('YouTube API failed to load'));
            timer = setTimeout(() => finish(new Error('YouTube API load timed out')), 15000);
            document.head.appendChild(script);
        }).catch(function(error) {
            apiPromise = null;
            throw error;
        });
        return apiPromise;
    }

    function resetPlayer() {
        clearTimeout(playerTimer);
        if (player) player.destroy();
        player = null;
        playerReady = false;
        playerFailed = false;
        currentVideoId = '';
        const content = document.querySelector('.video-popup-content');
        if (content && !content.querySelector('#youtubePlayer')) {
            const mount = document.createElement('div');
            mount.id = 'youtubePlayer';
            content.prepend(mount);
        }
    }

    function playRequestedVideo() {
        if (!requestedVideoId || disposed || !document.getElementById('videoPopup')) return;
        if (playerReady) {
            if (requestedVideoId !== currentVideoId) {
                player.loadVideoById(requestedVideoId, 0, 'hd720');
                currentVideoId = requestedVideoId;
            } else {
                player.playVideo();
            }
            return;
        }
        if (!player) {
            // Embedding the video with autoplay starts it on first load; a later
            // loadVideoById from onReady can be blocked as a non-gesture play.
            currentVideoId = requestedVideoId;
            player = new window.YT.Player('youtubePlayer', {
                height: '100%',
                width: '100%',
                videoId: currentVideoId,
                playerVars: { playsinline: 1, autoplay: 1, controls: 1, rel: 0 },
                events: {
                    onReady: function(event) {
                        if (event.target !== player || disposed) return;
                        clearTimeout(playerTimer);
                        playerReady = true;
                        playRequestedVideo();
                    },
                    onStateChange: function(event) {
                        if (event.target !== player || disposed) return;
                        if (event.data === window.YT.PlayerState.PLAYING && !requestedVideoId) {
                            player.pauseVideo();
                        }
                    },
                    onError: function(event) {
                        if (event.target !== player || disposed) return;
                        // Keep the popup open so YouTube's in-player message stays visible.
                        clearTimeout(playerTimer);
                        playerFailed = true;
                        console.error('YouTube video failed to play; close and reopen to retry.');
                    }
                }
            });
        }
        clearTimeout(playerTimer);
        playerTimer = setTimeout(function() {
            console.error('YouTube player timed out; reopen to retry.');
            closeVideoPopup();
            resetPlayer();
        }, 15000);
    }

    function openVideoPopup(event) {
        const videoId = event.currentTarget.dataset.videoId;
        if (!videoId || !videoId.trim()) return;
        requestedVideoId = videoId;
        $popup.addClass('is-active');
        loadYouTubeApi().then(playRequestedVideo).catch(function(error) {
            if (disposed) return;
            console.error(error);
            closeVideoPopup();
            resetPlayer();
        });
    }

    function closeVideoPopup() {
        requestedVideoId = '';
        clearTimeout(playerTimer);
        if (playerFailed) resetPlayer();
        else if (playerReady) player.pauseVideo();
        $popup.removeClass('is-active');
    }

    $triggers.on('click.homeVideo', openVideoPopup);
    $closers.on('click.homeVideo', closeVideoPopup);
    window.addEventListener('pagehide', function(event) {
        closeVideoPopup();
        if (event.persisted) return;
        disposed = true;
        resetPlayer();
        if (cancelApiLoad) cancelApiLoad();
        $triggers.off('.homeVideo');
        $closers.off('.homeVideo');
    });
});
