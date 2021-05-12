//global vs local scope

//global scope
var cat;

function feedCat() {
    cat = { name: "Ruby", hungry: false };
    cat.hungry = true;

    catFood = "Tuna";

    var catFood; //hoisting and local scope

    if (hungry) {
        var meal = prepareCatFood(catFood); //meal only lives inside if statement
    }

    //function inside function
    function prepareCatFood(catFood) {
        return catFood;
    }
}
feedCat();

//function expression
var sayHello = function () {
    console.log("hello");
};

//Immediately invoked function expression
//1st step: function call
feedCat();

//2nd step: call the expression that is inside the parenthesis (is still the same function!)
feedCat(); // (feedCat)();

//3rd step: replace feedCat with an anonymous function
(function () {})();

//last step: write code inside the function
(function () {
    console.log("hello!");
})();
