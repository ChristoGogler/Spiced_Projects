console.log("welcome_SPICED.js");

(function () {
    //add eventlistener to hamburger button
    var hamburgerButton = document.getElementById("hamburgerButton");
    hamburgerButton.addEventListener("click", function (event) {
        event.stopPropagation();
        toggleNavigation();
    });

    function toggleNavigation() {
        var nav = document.querySelector("nav");
        nav.classList.toggle("open");
        document.body.classList.toggle("backdrop");
        hamburgerButton.firstElementChild.classList.toggle("close");
    }
    //add eventlistener to esc key
    document.addEventListener("keydown", function (event) {
        if (event.code == "Escape") {
            toggleNavigation();
        }
    });
    //add eventlistener to document click exept nav
    //add eventlistener - when user clicks
    // document.body.addEventListener("click", function (event) {
    //     toggleNavigation();
    // });
    // document.querySelector("nav").addEventListener("click", function (event) {
    //     // event.stopPropagation();
    // });
})();
