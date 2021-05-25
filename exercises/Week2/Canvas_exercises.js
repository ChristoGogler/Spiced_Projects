console.log("Canvas Exercises");

(function () {
    var SPEED = 20;
    var STARTX = 100;
    var STARTY = 150;
    var innerCtx;
    var outerCtx;

    setup();
    function setup() {
        innerCtx = getCanvasContext("innerCanvas", "2d");
        drawOnInnerCanvas(innerCtx);
        outerCtx = getCanvasContext("outerCanvas", "2d");
        drawOnOuterCanvas(STARTX, STARTY);
        addKeyListener();
    }

    function addKeyListener() {
        //add eventlistener
        document.addEventListener("keydown", function (event) {
            if (event.code == "ArrowRight") {
                clearCanvas(outerCtx);
                drawOnOuterCanvas((STARTX += SPEED), STARTY);
            }
            if (event.code == "ArrowLeft") {
                clearCanvas(outerCtx);

                drawOnOuterCanvas((STARTX -= SPEED), STARTY);
            }
        });
    }
    function drawOnInnerCanvas() {
        innerCtx.lineWidth = 5;
        innerCtx.strokeStyle = "seagreen";
        innerCtx.fillStyle = "seagreen";
        innerCtx.beginPath();
        //draw head
        //(x, y, radius, startAngle 0-2*PI, endAngle0-2*PI, anticlockwise)
        //0 is "east"
        innerCtx.arc(70, 70, 50, 0, 2 * Math.PI, false);
        innerCtx.fill();
        innerCtx.stroke(); //Now draw!
        innerCtx.closePath(); //not necessary

        //draw neck &body
        innerCtx.beginPath();
        innerCtx.strokeStyle = "tomato";
        innerCtx.moveTo(70, 120);
        innerCtx.lineTo(70, 300); //what? Line! Where to? those coordinates!
        innerCtx.stroke(); //Now draw!

        //draw arms
        innerCtx.moveTo(70, 150);
        innerCtx.lineTo(110, 250);
        innerCtx.moveTo(70, 150);
        innerCtx.lineTo(30, 250);
        innerCtx.stroke();
        //draw legs
        innerCtx.beginPath();
        innerCtx.strokeStyle = "blue";
        innerCtx.moveTo(70, 300);
        innerCtx.lineTo(110, 500);
        innerCtx.moveTo(70, 300);
        innerCtx.lineTo(30, 500);

        innerCtx.stroke();
    }
    function drawOnOuterCanvas(x, y) {
        outerCtx.beginPath();
        outerCtx.drawImage(document.querySelector("#innerCanvas"), x, y);
    }

    //function clearCanvas
    //1 parameter: 1) canvasContext
    function clearCanvas(ctx) {
        ctx.clearRect(0, 0, 1500, 600);
    }
    //function getCanvasContext
    //2 parameter: 1) string - id of the canvas element, 2) string - contextType (2d, webgl, etc)
    //return: canvas context
    function getCanvasContext(element, context) {
        var cnv = document.getElementById(element);
        return cnv.getContext(context);
    }
})();
