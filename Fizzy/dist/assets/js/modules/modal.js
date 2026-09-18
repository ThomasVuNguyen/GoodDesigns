function ready() {

  const modal = document.querySelector('.modal');

  if(modal) {

    const modalTriggers = document.querySelectorAll('.modal-trigger');
    const modalBackdrop = modal.querySelector('.modal__backdrop');
    const modalContainer = modal.querySelector('.modal__container');

    if(modalTriggers) {

      modalTriggers.forEach(trigger => {

        const triggerButton = trigger.querySelector('button');

        triggerButton.addEventListener('click', () => {

          open(trigger);

        });

      });

    }

    modalBackdrop.addEventListener('click', close);

    document.addEventListener('keydown', (e) => {

      if(e.key === 'Escape') close();

    });

    function open(element) {

      const dataType = element.dataset.type;
      const dataSrc = element.dataset.src;
      const dataPoster = element.dataset.poster;
      const dataTrack = element.dataset.track;

      if(dataType === 'image') {

        modalContainer.innerHTML = `
          <div class="visual visual--modal-image">
            <div class="visual__container">
              <figure>
                <div>
                  <img src="${dataSrc}" alt="${element.querySelector('img').alt}">
                </div>
              </figure>
              <button class="visual__close" aria-label="Close modal"></button>
            </div>
          </div>
        `;

        const modalImage = modalContainer.querySelector('.visual--modal-image');

        modalImage.addEventListener('click', close);

      } else if(dataType === 'video') {

        modalContainer.innerHTML = `
          <div class="visual visual--modal-video">
            <div class="visual__container">
              <figure>
                <div>
                  <video ${dataPoster ? `poster="${dataPoster}"` : ''} src="${dataSrc}" playsinline>
                    ${dataTrack ? `<track src="${dataTrack}" kind="captions" label="English" srclang="en" default>` : ''}
                  </video>
                  <button type="button" aria-label="Play video"></button>
                </div>
              </figure>
              <button class="visual__close" aria-label="Close modal"></button>
            </div>
          </div>
        `;

        const modalVideo = modalContainer.querySelector('.visual--modal-video');
        const modalVideoElement = modalVideo.querySelector('video');
        const modalVideoButton = modalVideo.querySelector('button');
        const modalVideoTracks = modalVideoElement.textTracks;

        if(modalVideoTracks[0]) modalVideoTracks[0].mode = 'hidden';

        modalVideoButton.addEventListener('click', () => {

          if(modalVideoElement.paused) {

            modalVideoElement.play();

          } else {

            modalVideoElement.pause();

          }

        });

        modalVideoElement.addEventListener('play', (e) => {

          modalVideo.classList.add('visual--video-playing');

          e.target.setAttribute('controls', 'controls');

        });

        modalVideoElement.addEventListener('ended', (e) => {

          modalVideo.classList.remove('visual--video-playing');

          e.target.removeAttribute('controls');
          e.target.load();

        });

        modalVideoElement.play();

      }

      const modalClose = modalContainer.querySelector('.visual__close');

      if(modalClose) modalClose.addEventListener('click', close);

      modal.showModal();

    }

    function close() {

      modal.scrollTo(0, 0);
      modal.close();

      queueMicrotask(() => modalContainer.innerHTML = '');

    }

  }

}

export { ready };
