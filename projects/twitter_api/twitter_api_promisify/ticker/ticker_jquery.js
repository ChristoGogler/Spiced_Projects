console.log("AJAX TICKER", $);
const { getHeadlines } = require("../index");

(function () {
    // $.get("/headlines.json", (response) => {
    //     console.log(response);

    //     getHeadlines().then((jsonString) => {
    //         console.log(jsonString);
    //         addLinks(jsonString);
    //     });
    // });
    $.get("../headlines.json", function (response) {
        console.log(response);
        console.log(window.location.hostname);
        addLinks(response);
        initTicker();
    });

    function addLinks(newsArray) {
        var $headlines = $("#headlines");
        // console.log("response length", newsArray);
        // console.log("headlines", $headlines);

        // var headlinesArray = response.headlines;
        // var urlsArray = response.hrefs;
        // console.log("HeadlinesArray", headlinesArray);
        // console.log("urlsArray", urlsArray);

        // urlsArray.forEach((url, index) => {
        //     var aTagElement =
        //         "<a href='" + url + "'>" + headlinesArray[index] + "</a>";
        //     // console.log("<a>", aTagElement);
        //     $headlines.append(aTagElement);
        // });

        for (const news of newsArray) {
            const { headline, href } = news;
            var aTagElement = "<a href='" + href + "'>" + headline + "</a>";
            $headlines.append(aTagElement);
        }
    }

    function initTicker() {
        //set up some variables
        var $headlines = $("#headlines");
        // console.log("headlines", $headlines);
        var $links = $headlines.find("a");
        var $currentPositionOfHeadlines = $headlines.offset().left;
        var linkWidth = $links.eq(0).outerWidth();
        var animationId;
        var SPEED = 2;

        //function call to move the links on the screen
        moveLinks();
        //function call to add event listerners
        addHoverEffectToLinks();

        //move the links on the screen
        function moveLinks() {
            // console.log("current Pos", $currentPositionOfHeadlines);
            $currentPositionOfHeadlines -= SPEED;
            // console.log("current Pos", $currentPositionOfHeadlines);
            if ($currentPositionOfHeadlines < -linkWidth) {
                $currentPositionOfHeadlines += linkWidth;
                $links.eq(0).appendTo($headlines);
                $headlines.append($links.eq(0));
                $links = $headlines.find("a");
                linkWidth = $links.eq(0).outerWidth();
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
            // console.log("Links", $links);
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
    }
})();
