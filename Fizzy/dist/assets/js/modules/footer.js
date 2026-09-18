function ready() {

  const svg = document.querySelector('.svg');

  if(svg) {

    const svgPaths = svg.querySelectorAll('.svg__paths path');

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const audioBuffers = [];
    const audioFiles = [

      "/assets/audio/B3.mp3",
      "/assets/audio/C3.mp3",
      "/assets/audio/D4.mp3",
      "/assets/audio/E3.mp3",
      "/assets/audio/F4.mp3",
      "/assets/audio/G3.mp3"

    ];

    audioFiles.forEach(file => {

      fetch(file)
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
        .then(buffer => audioBuffers.push(buffer));

    });

    svgPaths.forEach(path => {

      path.addEventListener('mouseenter', (e) => {

        if(e.shiftKey && audioBuffers.length) {

          const pathBuffer = audioBuffers[Math.floor(Math.random() * audioBuffers.length)];
          const pathSource = audioContext.createBufferSource();

          pathSource.buffer = pathBuffer;
          pathSource.connect(audioContext.destination);
          pathSource.start(0);

        }

      });

    });

  }

}

export { ready };
