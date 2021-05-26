console.log("welcome to jQuery Ticker", $);

(function () {
    //set up some variables
    var $headlines = $("#headlines");
    console.log("headlines", $headlines);
    var $links = $headlines.children("a");
    var $currentPositionOfHeadlines = $headlines.offset().left;
    var animationId;
    var SPEED = 2;

    //function call to move the links on the screen
    moveLinks();
    //function call to add event listerners
    addHoverEffectToLinks();

    //move the links on the screen
    function moveLinks() {
        console.log("current Pos", $currentPositionOfHeadlines);
        $currentPositionOfHeadlines -= SPEED;
        // console.log("current Pos", $currentPositionOfHeadlines);
        if ($currentPositionOfHeadlines <= -$links.eq(0).offsetWidth) {
            $currentPositionOfHeadlines += $links.eq(0).offsetWidth;
            $headlines.append($links.eq(0));
        }

        //change position of headlines to new (current)position
        //dont forget the unit "px"
        $headlines.css({ left: $currentPositionOfHeadlines + "px" });
        //also possible:
        // document.getElementById("headlines").style.left =
        //     currentPositionOfHeadlines + "px";

        animationId = requestAnimationFrame(moveLinks);
    }

    //add event listerners/handlers
    function addHoverEffectToLinks() {
        console.log("Links", $links);
        //eventlistener mouseenter
        $links.on("mouseenter", function () {
            console.log("Mouseenter occurred");
            $(this).css({ color: "blue", textDecoration: "underline 2px" });
            cancelAnimationFrame(animationId);
        });
        //eventlistener mouseexit
        $links.on("mouseleave", function () {
            console.log("Mouseleave occurred");
            $(this).css({ color: "black", textDecoration: "none" });
            moveLinks();
        });
    }
})();
