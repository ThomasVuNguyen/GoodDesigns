(function () {
  'use strict';

  function metadataReady(video) {
    if (video.readyState >= 1 && Number.isFinite(video.duration)) {
      return Promise.resolve();
    }
    return new Promise(function (resolve) {
      video.addEventListener('loadedmetadata', resolve, { once: true });
    });
  }

  function isVisible(element) {
    var rect = element.getBoundingClientRect();
    return rect.bottom > 0 &&
      rect.right > 0 &&
      rect.top < window.innerHeight &&
      rect.left < window.innerWidth;
  }

  function initSwitcher(root) {
    var tabs = Array.from(root.querySelectorAll('[data-prompt-pair-tab]'));
    var panels = Array.from(root.querySelectorAll('[data-prompt-pair-panel]'));
    var tabList = root.querySelector('.prompt-pair-tabs');
    var selection = root.querySelector('[data-prompt-pair-selection]');
    if (!tabs.length || tabs.length !== panels.length) return;

    var mobileQuery = window.matchMedia('(max-width: 639px)');
    var longestPlayCount = Math.max(1, parseInt(root.getAttribute('data-longest-play-count'), 10) || 1);
    var activeIndex = -1;
    var selectedIndex = 0;
    var activationToken = 0;

    function positionSelection() {
      if (mobileQuery.matches || !tabList || !selection || activeIndex < 0) return;
      var activeTab = tabs[activeIndex];
      selection.style.width = activeTab.offsetWidth + 'px';
      selection.style.height = activeTab.offsetHeight + 'px';
      selection.style.transform = 'translate(' +
        activeTab.offsetLeft + 'px, ' +
        activeTab.offsetTop + 'px)';

      if (!tabList.classList.contains('is-ready')) {
        requestAnimationFrame(function () {
          tabList.classList.add('is-ready');
        });
      }
    }

    panels.forEach(function (panel, panelIndex) {
      var videos = Array.from(panel.querySelectorAll('video-player')).map(function (player) {
        return player.querySelector('video');
      }).filter(Boolean);
      panel.__promptPairVideos = videos;
      panel.__promptPairLongest = null;
      panel.__promptPairCompletedPlays = 0;

      videos.forEach(function (video) {
        video.addEventListener('ended', function () {
          if (activeIndex !== panelIndex || panel.__promptPairLongest !== video) return;
          panel.__promptPairCompletedPlays += 1;
          if (panel.__promptPairCompletedPlays < longestPlayCount) {
            video.currentTime = 0;
            video.play().catch(function () {});
            return;
          }
          selectPair((panelIndex + 1) % panels.length);
        });
      });
    });

    function pausePanel(panel) {
      (panel.__promptPairVideos || []).forEach(function (video) {
        video.pause();
        try {
          video.currentTime = 0;
        } catch (error) {
          // Metadata may not be available yet; activation resets it again.
        }
      });
    }

    function preparePanel(panel, token) {
      var videos = panel.__promptPairVideos || [];
      if (mobileQuery.matches || !videos.length) return;

      Promise.all(videos.map(metadataReady)).then(function () {
        if (mobileQuery.matches || token !== activationToken || panel.hidden) return;

        var longest = videos.reduce(function (current, video) {
          var currentDuration = Number.isFinite(current.duration) ? current.duration : 0;
          var videoDuration = Number.isFinite(video.duration) ? video.duration : 0;
          return videoDuration > currentDuration ? video : current;
        }, videos[0]);

        panel.__promptPairLongest = longest;
        panel.__promptPairCompletedPlays = 0;
        videos.forEach(function (video) {
          video.loop = video !== longest;
          try {
            video.currentTime = 0;
          } catch (error) {
            // loadedmetadata has fired, but some browsers can still reject a seek.
          }
        });

        if (!document.hidden && isVisible(root)) {
          videos.forEach(function (video) {
            video.muted = true;
            video.play().catch(function () {});
          });
        }
      });
    }

    function selectPair(index, focusTab) {
      if (mobileQuery.matches) return;
      var nextIndex = (index + panels.length) % panels.length;
      activationToken += 1;
      var token = activationToken;
      selectedIndex = nextIndex;

      panels.forEach(function (panel, panelIndex) {
        var selected = panelIndex === nextIndex;
        if (!selected) pausePanel(panel);
        panel.hidden = !selected;
        panel.setAttribute('aria-hidden', selected ? 'false' : 'true');
      });

      tabs.forEach(function (tab, tabIndex) {
        var selected = tabIndex === nextIndex;
        tab.classList.toggle('is-selected', selected);
        tab.setAttribute('aria-selected', selected ? 'true' : 'false');
        tab.tabIndex = selected ? 0 : -1;
      });

      activeIndex = nextIndex;
      if (focusTab) tabs[nextIndex].focus();

      requestAnimationFrame(function () {
        positionSelection();
        preparePanel(panels[nextIndex], token);
      });
    }

    function showAllPairs() {
      activationToken += 1;
      activeIndex = -1;

      panels.forEach(function (panel) {
        panel.hidden = false;
        panel.setAttribute('aria-hidden', 'false');
        panel.__promptPairLongest = null;
        panel.__promptPairCompletedPlays = 0;
        (panel.__promptPairVideos || []).forEach(function (video) {
          video.loop = true;
        });
      });

      tabs.forEach(function (tab) {
        tab.classList.remove('is-selected');
        tab.setAttribute('aria-selected', 'false');
        tab.tabIndex = -1;
      });
    }

    function updateLayout() {
      if (mobileQuery.matches) {
        showAllPairs();
      } else {
        selectPair(selectedIndex);
      }
    }

    tabs.forEach(function (tab, index) {
      tab.addEventListener('click', function () {
        selectPair(index);
      });

      tab.addEventListener('keydown', function (event) {
        var nextIndex = null;
        if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
        if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
        if (event.key === 'Home') nextIndex = 0;
        if (event.key === 'End') nextIndex = tabs.length - 1;
        if (nextIndex === null) return;
        event.preventDefault();
        selectPair(nextIndex, true);
      });
    });

    updateLayout();

    if (typeof mobileQuery.addEventListener === 'function') {
      mobileQuery.addEventListener('change', updateLayout);
    } else {
      mobileQuery.addListener(updateLayout);
    }

    if (tabList && typeof ResizeObserver !== 'undefined') {
      new ResizeObserver(positionSelection).observe(tabList);
    } else {
      window.addEventListener('resize', positionSelection);
    }
  }

  function boot() {
    customElements.whenDefined('video-player').then(function () {
      document.querySelectorAll('[data-prompt-pair-switcher]').forEach(initSwitcher);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();
