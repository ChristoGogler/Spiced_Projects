console.log("Kitty.js Kitty Carousel");
(function () {
    //setup
    var DELAY = 2000;
    var SWIPEDISTANCE = 150;
    var currentSlide = 0;
    var nextSlide = 1;
    var carousel = document.getElementById("carousel1");
    var allSlides = carousel.querySelectorAll(".slide");
    var timeout;
    var pagination = carousel.querySelectorAll(".dot");
    var isAnimating = false;

    var swipe = {
        startX: null,
        endX: null,
    };

    setupCarousel();

    function setupCarousel() {
        //initial call moveSlides
        timeout = setTimeout(moveSlides, DELAY);
    }

    // function moveSlides
    // 0 parameter
    //do: add onscreen class to next slide and remove from current slide, add exit class to current slide
    //call updateSlidesIndex
    //call updatePagination
    //no return
    function moveSlides() {
        //animation starts now
        isAnimating = true;

        allSlides[nextSlide].classList.add("onscreen");
        allSlides[currentSlide].classList.add("exit");
        allSlides[currentSlide].classList.remove("onscreen");
        updateSlidesIndex();
        updatePagination();
    }

    // function updateSlidesIndex
    // 0 parameter
    //do: update/increment the currentslide/nextslide indexes
    //no return
    function updateSlidesIndex() {
        //  - current is always what next was before. (Diego)
        currentSlide = nextSlide;

        if (nextSlide >= allSlides.length - 1) {
            nextSlide = 0;
        } else {
            nextSlide++;
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

    //add eventlistener: TOUCHSTART on carousel
    carousel.addEventListener("touchstart", function (event) {
        carouselTouchstartEventHandler(event);
    });
    //add eventlistener: TOUCHMOVE on carousel
    carousel.addEventListener("touchmove", function (event) {
        carouselTouchmoveEventHandler(event);
    });
    //add eventlistener: TOUCHEND on carousel
    carousel.addEventListener("touchend", function (event) {
        carouselTouchendEventHandler(event);
    });

    //add event listener: CLICK & TOUCHSTART on each dot
    //for each dot add a click and touch listener
    pagination.forEach(function (dot, dotIndex) {
        //add event listener: CLICK
        //when clicked on pagination dot
        dot.addEventListener("click", function (event) {
            // console.log("click event", dotIndex, event);
            dotClickHandler(dot, dotIndex);
        });
        //add event listener: TOUCH
        //when touch on dot
        dot.addEventListener("touchstart", function (event) {
            //stop bubbling to carousel
            event.stopPropagation();
            dotTouchHandler(dot, dotIndex);
        });
    });

    //DOT TOUCH HANDLER
    function dotTouchHandler(dot, dotIndex) {
        dotClickHandler(dot, dotIndex);
    }

    //TOUCHSTART EVENT HANDLER on carousel
    function carouselTouchstartEventHandler(event) {
        swipe.startX = event.touches[0].pageX;
    }
    //TOUCHMOVE EVENT HANDLER on carousel
    function carouselTouchmoveEventHandler(event) {
        swipe.endX = event.touches[0].pageX;
    }

    //TOUCHEND EVENT HANDLER on carousel
    function carouselTouchendEventHandler(event) {
        //if the slides are currently animating, ignore!
        if (isAnimating) {
            return;
        }
        //if swipe start point minus swipe endpoint is at least 200 register as a swipe
        if (swipe.startX - swipe.endX > SWIPEDISTANCE) {
            //stop the settimeout method
            clearTimeout(timeout);
            moveSlides();
        }
    }

    // DOT CLICK HANDLER
    function dotClickHandler(dot, dotIndex) {
        //if user clicks on current dot/slide, ignore
        if (dotIndex == currentSlide) {
            return;
        }
        //if the slides are currently animating, ignore!
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
})();
