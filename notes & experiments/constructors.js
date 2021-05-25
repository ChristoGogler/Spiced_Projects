//constructors

//Hotdog constructor
//name starts with uppercase
function Hotdog(name, isVeggo, sauces) {
    this.name = name;
    this.isVeggo = isVeggo;
    this.sauces = sauces;
}
//prototype
Hotdog.prototype.size = "Standard";
Hotdog.prototype.onions = "crispy and fried";

//create new Hotdog object with parameters
var chilliCheeseHD = new Hotdog("Chilli Cheese", true, [
    "Cheese Sauce",
    "Ketchup",
    "Chilli Sauce",
]);
//and without
var basicHD = new Hotdog();

//add more properties to object
basicHD.name = "Danish";
basicHD.hasPickles = true;
basicHD.sauces = ["Ketchup", "Mustard", "Mayonnaise"];
chilliCheeseHD.cheese = "Cheddar";
chilliCheeseHD.spicy = "extra hot";

console.log(chilliCheeseHD.name);
console.log(basicHD.sauces);
console.log(chilliCheeseHD.onions);
console.log("Size of " + basicHD.name + ": " + basicHD.size);

//live changes
Hotdog.prototype.size = "Extra Bowling King Size";
console.log("Size of " + basicHD.name + ": " + basicHD.size);

//override prototype -->
var curryDog = new Hotdog("Curry Dog", true, ["Curry Sauce", "Ketchup"]);
curryDog.constructor; //constructor: Hotdog
Hotdog.prototype = {};
var kimchiDog = new Hotdog("Kimchi Dog", true, [
    "Ketchup",
    "Soy Sauce",
    "Mayonnaise",
]);
kimchiDog.constructor; // constructor: Object

//instanceof operator
//checks if an object an instance of a certain constructor

chilliCheeseHD instanceof Hotdog; //true

chilliCheeseHD instanceof Object; // true

chilliCheeseHD instanceof Window; //false
