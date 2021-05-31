(function () {
    console.log("JSON exercise1");
    var $validateButton = $("#validateButton");
    var $code = $("#code");

    //validateJSON
    //1 parameter: 1) string - user input from textarea
    //do: parse string to JSON object
    //return: JSON object
    function validateJSON(string) {
        return JSON.parse(string);
    }

    //VALIDATEBUTTON CLICK LISTENER
    //grab user input and pass to validateJSON
    $validateButton.on("click", function () {
        console.log("CLICK");
        var JsonString = $code.val();
        var validated;
        try {
            validated = validateJSON(JsonString);
            $code.css("background-color", "lightgreen");
            console.log(validated);
            alert("Great job! Looks good :)");
        } catch (error) {
            $code.css("background-color", "coral");
            alert("You're code has some issues!");
            console.warn("You're code has some issues!", error);
        }
    });
})();
