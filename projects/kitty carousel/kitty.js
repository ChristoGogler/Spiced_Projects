console.log("Kitty.js Kitty Carousel");
(function () {
    //setup
    var DELAY = 2500;
    var currentSlide = 0;
    var nextSlide = 1;

    var carousel = document.getElementById("carousel1");
    var allSlides = carousel.querySelectorAll(".slide");
    var pagination = carousel.querySelectorAll(".dot");
    console.log(carousel);
    console.log(allSlides);
    function moveKitties() {
        // console.log(
        //     "currentSlide: ",
        //     currentSlide,
        //     slides,
        //     slides[currentSlide]
        // );

        allSlides[nextSlide].classList.add("onscreen");
        allSlides[currentSlide].classList.add("exit");
        allSlides[currentSlide].classList.remove("onscreen");
        updateDots(currentSlide, nextSlide);
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

    function updateDots(currentDot, nextDot) {
        pagination[currentDot].classList.remove("current");
        pagination[nextDot].classList.add("current");
    }

    //add eventlistener
    carousel.addEventListener("transitionend", function (event) {
        console.log("transitioned");
        // console.log("slide:", slides[currentSlide]);
        if (!event.target.classList.contains("exit")) {
            return;
        }
        // console.log("event target", event.target);
        event.target.classList.remove("exit");
        setTimeout(() => moveKitties(), DELAY);
    });
    setTimeout(() => moveKitties(), DELAY);
})();
