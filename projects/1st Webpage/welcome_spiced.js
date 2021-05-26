console.log("welcome_SPICED.js");

(function () {
    setTimeout(openModalPopup, 1000);

    //add eventlistener to hamburger button
    var hamburgerButton = document.getElementById("hamburgerButton");
    hamburgerButton.addEventListener("click", function (event) {
        event.stopPropagation();
        toggleNavigation();
    });
    //add eventlistener to x button in modal
    var $xButtonListener = $(".cancelButton").on("click", function () {
        console.log("click");
        closeModalPopup();
    });

    function openModalPopup() {
        console.log("in open Modal");

        var $modal = $(".modal").removeClass("hidden");
        console.log($modal);
    }
    function closeModalPopup() {
        var $modal = $(".modal").addClass("hidden");
        console.log($modal);
    }

    function toggleNavigation() {
        var nav = document.querySelector("nav");
        nav.classList.toggle("open");

        document.body.classList.toggle("backdrop");
        hamburgerButton.classList.toggle("clicked");
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
