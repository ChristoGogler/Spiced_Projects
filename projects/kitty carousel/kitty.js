console.log("Kitty.js Kitty Carousel");
(function () {
    //setup
    var DELAY = 5000;
    var currentSlide = 0;
    var nextSlide = 1;

    var carousel = document.getElementById("carousel1");
    var slides = carousel.querySelectorAll(".slides");

    function moveKitties() {
        // console.log(
        //     "currentSlide: ",
        //     currentSlide,
        //     slides,
        //     slides[currentSlide]
        // );

        slides[nextSlide].classList.add("onscreen");
        slides[currentSlide].classList.add("exit");
        slides[currentSlide].classList.remove("onscreen");

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

    function updateDots() {}

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
