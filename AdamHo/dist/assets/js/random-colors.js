document.addEventListener('DOMContentLoaded', function () {
    const hexCodes = ['#c7f3c6', '#eaff00', '#f5320b', '#948eff', '#c7f3c6', '#dbff00', '#fdceeb', '#0095ff', '#cde0f5', '#fdceeb', '#e362d3', '#01a451'];
    
    const textElements = document.querySelectorAll('.displaytitle');
    const randomColor = hexCodes[Math.floor(Math.random() * hexCodes.length)];
    textElements.forEach(function (element) {
      element.style.color = randomColor;
      element.style.borderColor = randomColor;
    });

    // Set background color for .db3 and .db4 elements
    const db3Elements = document.querySelectorAll('.db3');
    const db4Elements = document.querySelectorAll('.db4');
    db3Elements.forEach(function (db3Element) {
      const randomColorDb3 = hexCodes[Math.floor(Math.random() * hexCodes.length)];
      db3Element.style.backgroundColor = randomColorDb3;

      const db4Sibling = db3Element.closest(':scope > * + .db4');
      if (db4Sibling) {
        let randomColorDb4 = hexCodes[Math.floor(Math.random() * hexCodes.length)];
        while (randomColorDb4 === randomColorDb3) {
          randomColorDb4 = hexCodes[Math.floor(Math.random() * hexCodes.length)];
        }
        db4Sibling.style.backgroundColor = randomColorDb4;
      }
    });

    db4Elements.forEach(function (db4Element) {
      if (!db4Element.previousElementSibling || !db4Element.previousElementSibling.classList.contains('db3')) {
        const randomColorDb4 = hexCodes[Math.floor(Math.random() * hexCodes.length)];
        db4Element.style.backgroundColor = randomColorDb4;
      }
    });


    function setColorForElements(elements) {
      elements.forEach(function (element) {
        const randomColor = hexCodes[Math.floor(Math.random() * hexCodes.length)];
        element.style.backgroundColor = randomColor;
      });
    }
    setColorForElements(document.querySelectorAll('.db5'));
    setColorForElements(document.querySelectorAll('.db6'));
    setColorForElements(document.querySelectorAll('.multiplybox'));
    // Check if the viewport width is more than 479px
    if (window.innerWidth > 479) {
        // Set opacity animation for .col-list-item
        const items = document.querySelectorAll('.col-list-item');
        items.forEach((item, index) => {
          item.style.opacity = "0";
          setTimeout(() => {
            item.style.transition = "opacity 125ms ease-out";
            item.style.opacity = "1";
          }, index * 150);
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const indicators = document.querySelectorAll('.circle-indicator');

    const flicker = () => {
        const randomIndex = Math.floor(Math.random() * indicators.length);
        const indicator = indicators[randomIndex];

        indicator.style.opacity = '0';

        let randomTime = (Math.random() * 1 + 1) * 1000;

        setTimeout(() => {
            indicator.style.opacity = '1';

            flicker();
        }, randomTime);
    };
    flicker();
});
