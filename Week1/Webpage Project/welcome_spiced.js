console.log("welcome_SPICED.js");

(function () {
    //add eventlistener to hamburger button
    var hamburgerButton = document.getElementById("hamburgerButton");
    hamburgerButton.addEventListener("click", toggleNavigation);

    function toggleNavigation() {
        var nav = document.querySelector("nav");
        nav.classList.toggle("open");
    }
})();
