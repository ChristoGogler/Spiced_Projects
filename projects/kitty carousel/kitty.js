console.log("Kitty.js Kitty Carousel");
(function () {
    //setup
    var DELAY = 2000;
    var currentSlide = 0;
    var nextSlide = 1;
    var carousel = document.getElementById("carousel1");
    var allSlides = carousel.querySelectorAll(".slide");

    var pagination = carousel.querySelectorAll(".dot");
    console.log(carousel);
    console.log(allSlides);

    // function moveSlides
    // 0 parameter
    //do: add onscreen class to next slide and remove from current slide, add exit class to current slide
    //then update/increment the currentslide/nextslide indexes
    //call updatePagination
    //no return
    function moveSlides() {
        console.log("allSlides", allSlides);
        console.log("nextSlide", nextSlide);
        console.log("allSlides[nextSlide]", allSlides[nextSlide]);
        allSlides[nextSlide].classList.add("onscreen");
        allSlides[currentSlide].classList.add("exit");
        allSlides[currentSlide].classList.remove("onscreen");
        updateSlidesIndex();
    }

    function updateSlidesIndex() {
        //  - current is always what next was before. (Diego)
        currentSlide = nextSlide;

        if (nextSlide >= 3) {
            console.log("IF next:", nextSlide);
            nextSlide = 0;
        } else {
            nextSlide++;
            console.log("ELSE next:", nextSlide);
            console.log("ELSE current:", currentSlide);
        }
    }

    //function updatePagination
    //2 parameter: currentDot & nextDot
    //do: remove class current from current dot, add to nextdot
    //no return
    function updatePagination() {
        //loop all dots and remove "current" for all that are not current, add "current" to next
        pagination.forEach(function (dot, index) {
            //second parameter will force the class name to be added or removed based on the truthiness
            dot.classList.toggle("current", index == currentSlide);
        });
    }

    //add eventlistener
    //when transitioned event happens
    carousel.addEventListener("transitionend", function (event) {
        console.log("transitioned");
        //ignore if it not contains "exit" class
        if (!event.target.classList.contains("exit")) {
            return;
        }
        //otherwise remove "exit" class
        event.target.classList.remove("exit");
        //call moveSlides after delay
        setTimeout(function () {
            moveSlides();
            updatePagination();
        }, DELAY);
    });

    //add event listener
    //when clicked on pagination dot
    pagination.forEach(function (dot, dotIndex) {
        dot.addEventListener("click", function (event) {
            event.stopPropagation();
            dot.classList.add("current");
            //change nextSlide to the clicked Index, so that the next slide will be the one clicked
            nextSlide = dotIndex;
        });
    });

    //initial call moveSlides
    setTimeout(function () {
        moveSlides();
        updatePagination();
    }, DELAY);
})();
