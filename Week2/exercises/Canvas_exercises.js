console.log("Canvas Exercises");

(function () {
    var cnv = document.querySelector("canvas");

    var ctx = cnv.getContext("2d");

    ctx.lineWidth = 5;
    ctx.strokeStyle = "seagreen";
    ctx.fillStyle = "seagreen";
    ctx.beginPath();
    //draw head
    //(x, y, radius, startAngle 0-2*PI, endAngle0-2*PI, anticlockwise)
    //0 is "east"
    ctx.arc(350, 70, 50, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.stroke(); //Now draw!
    ctx.closePath(); //not necessary

    //draw neck &body
    ctx.beginPath();
    ctx.strokeStyle = "tomato";
    ctx.moveTo(350, 120);
    ctx.lineTo(350, 300); //what? Line! Where to? those coordinates!
    ctx.stroke(); //Now draw!

    //draw arms
    ctx.moveTo(350, 150);
    ctx.lineTo(390, 250);
    ctx.moveTo(350, 150);
    ctx.lineTo(310, 250);

    //draw legs
    ctx.moveTo(350, 300);
    ctx.lineTo(390, 500);
    ctx.moveTo(350, 300);
    ctx.lineTo(310, 500);

    ctx.stroke();

    ctx.beginPath();

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
