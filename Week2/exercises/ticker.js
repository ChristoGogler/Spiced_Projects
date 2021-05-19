console.log("loaded: ticker.js");

(function () {
    //set up some variables
    var headlines = document.getElementById("headlines");
    var links = headlines.getElementsByTagName("a");
    console.log("Links", links);
    var currentPositionOfHeadlines = headlines.offsetLeft;
    var animationId;
    var SPEED = 2;

    //function call to move the links on the screen
    moveLinks();
    //function call to add event listerners
    addHoverEffectToLinks();

    //move the links on the screen
    function moveLinks() {
        currentPositionOfHeadlines -= SPEED;

        if (currentPositionOfHeadlines <= -links[0].offsetWidth) {
            currentPositionOfHeadlines += links[0].offsetWidth;
            headlines.appendChild(links[0]);
        }

        //change position of headlines to new (current)position
        //dont forget the unit "px"
        headlines.style.left = currentPositionOfHeadlines + "px";
        //also possible:
        // document.getElementById("headlines").style.left =
        //     currentPositionOfHeadlines + "px";

        animationId = requestAnimationFrame(moveLinks);
    }

    //add event listerners/handlers
    function addHoverEffectToLinks() {
        console.log("Links", links);
        for (var i = 0; i < links.length; i++) {
            //eventlistener mouseenter
            links[i].addEventListener("mouseenter", function () {
                console.log("Mouseenter occurred");
                this.style.color = "blue";
                this.style.textDecoration = "underline 2px";
                cancelAnimationFrame(animationId);
            });
            //eventlistener mouseexit
            links[i].addEventListener("mouseleave", function () {
                console.log("Mouseleave occurred");
                this.style.color = "white";
                this.style.textDecoration = "none";
                moveLinks();
            });
        }
    }
})();
