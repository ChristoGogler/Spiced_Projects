(function () {
    console.log("JQuery Sliding Panes");

    var $wrapper = $(".wrapper");
    var $window = $(window);
    var $slider = $wrapper.find(".slider");
    var $before = $wrapper.find(".before");

    // console.log($slider);

    //boolean for the sliding state
    var isSliding = false;
    // isSliding --> true
    $wrapper.on("mousedown", function (event) {
        console.log("click down");
        isSliding = true;
    });
    //when mouseup, isSliding -->false
    $window.on("mouseup", function (event) {
        console.log("click up");
        isSliding = false;
    });
    // register movement on the wrapper
    $wrapper.on("mousemove", function (event) {
        if (isSliding) {
            console.log("moving...");
            var outerWidth = $slider.outerWidth();
            var posX = getPosX(event.clientX, outerWidth);
            $before.css({ width: posX });

            $slider.css({ left: posX });
        }
    });
    function getPosX(clientX, width) {
        var newX = clientX - width;
        var maxX = $(".wrapper").width() - width;
        if (newX >= maxX) {
            newX = maxX;
        }
        return newX;
    }
})();
