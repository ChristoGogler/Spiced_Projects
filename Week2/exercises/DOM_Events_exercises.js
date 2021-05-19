console.log("DOM_Events_exercises JS");

//exercise 1
//change position of an element acoording to the movement of the mouse

//iife (immediately invoked function expression)
(function () {
    var box = document.getElementById("box");

    //add eventlistener
    document.addEventListener("mousemove", documentMousemoveHandler);

    //documentMousemoveHandler
    function documentMousemoveHandler(event) {
        //change style of "position" to "relative", otherwise it wouldnt move with absolute positioning
        box.style.position = "relative";

        //get the half of the width & height of the element/box
        var halfWidth = box.offsetWidth / 2;
        var halfHeight = box.offsetHeight / 2;

        //calculate the new coordinates for the element
        var newX = event.clientX - halfWidth;
        var newY = event.clientY - halfHeight;
        //change style of "top" and "left"
        box.style.left = newX + "px";
        box.style.top = newY + "px";
    }
})();
