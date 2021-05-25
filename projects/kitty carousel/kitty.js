console.log("Kitty.js Kitty Carousel");
(function () {
    //setup
    var DELAY = 2000;
    var currentSlide = 0;
    var nextSlide = 1;
    var carousel = document.getElementById("carousel1");
    var allSlides = carousel.querySelectorAll(".slide");
    var timeout;
    var pagination = carousel.querySelectorAll(".dot");
    var isAnimating = false;
    // console.log(carousel);
    // console.log(allSlides);

    // function moveSlides
    // 0 parameter
    //do: add onscreen class to next slide and remove from current slide, add exit class to current slide
    //then update/increment the currentslide/nextslide indexes
    //call updatePagination
    //no return
    function moveSlides() {
        //animation starts now
        isAnimating = true;
        // console.log("allSlides", allSlides);
        // console.log("nextSlide", nextSlide);
        // console.log("allSlides[nextSlide]", allSlides[nextSlide]);
        allSlides[nextSlide].classList.add("onscreen");
        allSlides[currentSlide].classList.add("exit");
        allSlides[currentSlide].classList.remove("onscreen");
        updateSlidesIndex();
        updatePagination();
    }

    function updateSlidesIndex() {
        //  - current is always what next was before. (Diego)
        currentSlide = nextSlide;

        if (nextSlide >= allSlides.length - 1) {
            // console.log("IF next:", nextSlide);
            nextSlide = 0;
        } else {
            nextSlide++;
            // console.log("ELSE next:", nextSlide);
            // console.log("ELSE current:", currentSlide);
        }
    }

    //function updatePagination
    //2 parameter: currentDot & nextDot
    //do: remove class current from current dot, add to nextdot
    //no return
    function updatePagination() {
        //loop all dots and remove "current" for all that are not current, add "current" to currentSlide
        pagination.forEach(function (dot, index) {
            //second parameter will force the class name to be added or removed based on the truthiness
            dot.classList.toggle("current", index == currentSlide);
        });
    }

    //add eventlistener: TRANSITIONED
    //when transitioned event happens
    carousel.addEventListener("transitionend", function (event) {
        //ignore if it not contains "exit" class
        if (!event.target.classList.contains("exit")) {
            return;
        }
        // console.log("slide transitioned event", event);
        //otherwise remove "exit" class
        event.target.classList.remove("exit");
        //call moveSlides after delay
        timeout = setTimeout(moveSlides, DELAY);
        //animation stops
        isAnimating = false;
    });

    //add eventlistener: TOUCHMOVE on carousel
    carousel.addEventListener("touchmove", function (event) {
        console.log("touchmove event", event.touches, event.type);
    });

    //add event listener: CLICK & TOUCHSTART on each dot
    //for each dot add a click and touch listener
    pagination.forEach(function (dot, dotIndex) {
        //add event listener: CLICK
        //when clicked on pagination dot
        dot.addEventListener("click", function (event) {
            console.log("click event", dotIndex, event);
            dotClickHandler(dot, dotIndex);
        });
        //add event listener: TOUCH
        //when touch on dot
        dot.addEventListener("touchstart", function (event) {
            console.log("touchstart event", event.touches, event.type);
            event.stopPropagation();
            dotTouchHandler(dot, dotIndex);
        });
    });

    //dot touch HANDLER
    function dotTouchHandler(dot, dotIndex) {
        dotClickHandler(dot, dotIndex);
    }

    // dot click Handler
    function dotClickHandler(dot, dotIndex) {
        //if user clicks on current dot/slide, ignore
        if (dotIndex == currentSlide) {
            return;
        }
        if (isAnimating) {
            return;
        }
        //stop the settimeout method
        clearTimeout(timeout);
        //turn on the highlighter for the clicked dot
        dot.classList.toggle("current");
        //turn it off for the previously highlighted
        pagination[currentSlide].classList.toggle("current");
        //change nextSlide to the clicked Index, so that the next slide will be the one clicked
        nextSlide = dotIndex;
        //call moveslides and immediately move to clicked slide
        moveSlides();
    }

    //initial call moveSlides
    timeout = setTimeout(moveSlides, DELAY);
})();
