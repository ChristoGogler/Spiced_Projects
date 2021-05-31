(function () {
    console.log("JSON exercise1");
    var $validateButton = $("#validateButton");
    var $code = $("#code");

    function validateJSON(string) {
        return JSON.parse(string);
    }

    $validateButton.on("click", function () {
        console.log("CLICK");
        var JsonString = $code.val();
        var validated;
        try {
            validated = validateJSON(JsonString);
            $code.css("background-color", "lightgreen");
            alert("Great job! Looks good :)");
        } catch (error) {
            $code.css("background-color", "coral");
            alert("You're code has some issues!");
            console.warn("You're code has some issues!", error);
        }
    });
})();
