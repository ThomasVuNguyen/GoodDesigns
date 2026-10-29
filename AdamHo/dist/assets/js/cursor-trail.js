const hexCodes = ['#c7f3c6', '#eaff00', '#f5320b', '#948eff', '#c7f3c6', '#dbff00', '#fdceeb', '#0095ff', '#cde0f5', '#fdceeb', '#e362d3', '#01a451'];

    const cursor = document.createElement("div");
    cursor.className = "custom-cursor";
    document.body.appendChild(cursor);

    document.addEventListener("mousemove", (e) => {
        cursor.style.left = `${e.pageX}px`;
        cursor.style.top = `${e.pageY}px`;

        const vectorPoint = document.createElement("div");
        vectorPoint.className = "vector-point";
        document.body.appendChild(vectorPoint);
        vectorPoint.style.left = `${e.pageX}px`;
        vectorPoint.style.top = `${e.pageY}px`;
        vectorPoint.style.backgroundColor = hexCodes[Math.floor(Math.random() * hexCodes.length)];

        const size = Math.random() * 5 + 3;
        vectorPoint.style.width = `${size}px`;
        vectorPoint.style.height = `${size}px`;

        fadeOutVectorPoint(vectorPoint);
    });

    function fadeOutVectorPoint(vectorPoint) {
        setTimeout(() => {
            vectorPoint.style.opacity = "0";
            vectorPoint.addEventListener("transitionend", () => {
                vectorPoint.remove();
            });
        }, 1250);
    }
