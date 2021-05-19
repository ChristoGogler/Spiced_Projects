console.log("loaded: ticker.js");

animateTicker();

//underline on mouseenter
function addHoverEffectToLinks() {}

function animateTicker() {
    var headlines = document.getElementById("headlines");
    var links = headlines.getElementsByTagName("a");
    var widthOfHeadlines = headlines.offsetWidth;
    var currentPosition = headlines.offsetLeft;
    var animationId;
    var SPEED = 2;

    //console log checks
    // console.log("links", links);
    // console.log("widthOfHeadlines", widthOfHeadlines);
    console.log("offsetLeft", currentPosition);
    console.log(document.getElementById("headlines").style.left);

    moveLinks();

    function moveLinks() {
        currentPosition -= SPEED;
        // console.log("currentPosition:", currentPosition);
        // console.log("-links[0].offsetWidth:", -links[0].offsetWidth);
        if (currentPosition <= -links[0].offsetWidth) {
            currentPosition += links[0].offsetWidth;
            headlines.appendChild(links[0]);
        }

        //change position of headlines to new (current)position
        //dont forget the unit
        document.getElementById("headlines").style.left =
            currentPosition + "px";
        // console.log(document.getElementById("headlines").style.left);
        animationId = requestAnimationFrame(moveLinks);
    }
}
