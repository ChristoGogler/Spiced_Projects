(function () {
    console.log("localStorage exercise");

    var textarea = document.querySelector("#textarea1");
    console.log("textarea", textarea);

    //TEXTAREA INPUT LISTENER
    //grab user input and pass to saveToLocalStorage
    textarea.addEventListener("input", saveToLocalStorage);

    //saveToLocalStorage
    // 0 parameter
    //do: save userinput to localstorage
    //no return
    function saveToLocalStorage() {
        console.log("saving");
        localStorage.setItem("userInput", textarea.value);
    }
})();
