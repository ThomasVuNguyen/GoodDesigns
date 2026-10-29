document.addEventListener('DOMContentLoaded', function() {
    var colors = [
        '#c7f3c6',
        '#eaff00',
        '#f5320b',
        '#948eff',
        '#c7f3c6',
        '#dbff00',
        '#fdceeb',
        '#0095ff',
        '#cde0f5',
        '#fdceeb',
        '#e362d3',
        '#01a451'
    ];
    var isHovered = false;
    var interval;
    var timeout;

    function getRandomColor() {
        return colors[Math.floor(Math.random() * colors.length)];
    }

    function changeTwoRandomColors() {
        const combinedSelectors = '._2up, .oracle-collaborator';
        const items = document.querySelectorAll(combinedSelectors);
        if (items.length < 2) return;

        const index1 = Math.floor(Math.random() * items.length);
        let index2;
        do {
            index2 = Math.floor(Math.random() * items.length);
        } while (index2 === index1);

        items[index1].style.backgroundColor = getRandomColor();
        items[index2].style.backgroundColor = getRandomColor();
    }

    function startColorChange() {
        if (!isHovered) {
            changeTwoRandomColors();
            interval = setInterval(changeTwoRandomColors, 1000);
            setTimeout(() => {
                clearInterval(interval);
                timeout = setTimeout(startColorChange, 60000);
            }, 4000);
        }
    }

    document.body.addEventListener('mouseover', function(event) {
        var target = event.target;
        if (target.matches('._2up, .oracle-collaborator')) {
            isHovered = true;
            target.style.backgroundColor = getRandomColor();
            clearInterval(interval);
            clearTimeout(timeout);
        }
    });

    setTimeout(startColorChange, 10000);
});
