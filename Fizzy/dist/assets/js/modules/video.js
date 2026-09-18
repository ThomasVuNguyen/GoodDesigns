function ready() {

  const videos = document.querySelectorAll('.visual--inline-video');

  if(videos) {

    videos.forEach(video => {

      const videoElement = video.querySelector('video');
      const videoButton = video.querySelector('button');
      const videoTracks = videoElement.textTracks;

      if(videoTracks[0]) videoTracks[0].mode = 'hidden';

      videoButton.addEventListener('click', () => {

        if(videoElement.paused) {

          videoElement.play();

        } else {

          videoElement.pause();

        }

      });

      videoElement.addEventListener('play', (e) => {

        video.classList.add('visual--video-playing');

        e.target.setAttribute('controls', 'controls');

      });

      videoElement.addEventListener('ended', (e) => {

        video.classList.remove('visual--video-playing');

        e.target.removeAttribute('controls');
        e.target.load();

      });

    });

  }

}

export { ready };
