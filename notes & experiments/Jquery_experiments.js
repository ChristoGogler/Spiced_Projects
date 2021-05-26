(function () {
    // observe what $ is logging
    console.log("welcome to jQuery", $);
})();

console.log("JQuery Experiments");

//select several elements with JQuery selector $
var $title = $("h1");
var $items = $("li");
var $secondItem = $items.eq(1);

$title.css({ color: "pink", textDecoration: "underline" }).text("Candy Land");
$secondItem.css({ color: "tomato" }).append("...with tomato flavour!");
