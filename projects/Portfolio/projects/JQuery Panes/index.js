(function () {
    console.log("JQuery Sliding Panes");

    var $wrapper = $(".wrapper");
    var $window = $(window);
    var $slider = $wrapper.find(".slider");
    var $before = $wrapper.find(".before");

    //boolean for the sliding state
    var isSliding = false;

    //Eventlistener: MOUSEDOWN
    // isSliding --> true
    $wrapper.on("mousedown", function (event) {
        console.log("click down");
        isSliding = true;
    });
    //Eventlistener: MOUSEDOWN on the window
    //when mouseup, isSliding -->false
    $window.on("mouseup", function (event) {
        console.log("click up");
        isSliding = false;
    });
    //Eventlistener: MOUSEDOWN
    // register movement on the wrapper
    $wrapper.on("mousemove", function (event) {
        //only if true
        if (isSliding) {
            console.log("moving...");
            //width of the slider
            var outerWidth = $slider.outerWidth();
            //get the new position for slider on x axis
            var posX = getPosX(event.clientX, outerWidth);

            $before.css({ width: posX });
            $slider.css({ left: posX });
        }
    });

    //get the new position for x
    //2 parameter: 1) clientX (current position of cursor, 2) width of the slider
    //return: the new position x
    function getPosX(cursorPosition, sliderWidth) {
        var newX = cursorPosition - sliderWidth;
        //maxX is the maximum position for the slider
        var maxX = $(".wrapper").width() - sliderWidth;
        if (newX >= maxX) {
            newX = maxX;
        }
        return newX;
    }
})();
