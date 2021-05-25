console.log("Canvas Experiments");

(function () {
    var cnv = document.querySelector("canvas");

    var ctx = cnv.getContext("2d");

    ctx.lineWidth = 10;
    ctx.strokeStyle = "tomato";

    ctx.moveTo(200, 50); //go to start point!
    ctx.lineTo(100, 150); //what? Line! Where to? those coordinates!

    ctx.stroke(); //Now draw!

    ctx.beginPath();

    ctx.strokeStyle = "firebrick";

    ctx.moveTo(100, 150); //aren't we already here?

    ctx.lineTo(300, 150);

    ctx.stroke();

    ctx.beginPath();

    ctx.strokeStyle = "sienna";

    ctx.moveTo(300, 150);

    ctx.lineTo(200, 50);

    ctx.stroke();

    ctx.beginPath();

    ctx.fillStyle = "hotpink";

    //(x, y, radius, startAngle 0-2*PI, endAngle0-2*PI, clockwise)
    ctx.arc(350, 350, 45, 0, 1.5 * Math.PI, false);

    ctx.fill();
    ctx.stroke();

    ctx.beginPath();

    ctx.fillRect(0, 0, 40, 80);

    ctx.drawImage(document.querySelector("img"), 100, 350);

    document.addEventListener("dblclick", function () {
        ctx.clearRect(0, 0, 200, 200);
    });

    document.addEventListener("keydown", function (e) {
        if (e.keyCode == 37) {
            // left arrow
        }
    });
})();
