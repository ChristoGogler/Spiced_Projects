console.log("***let and const***");

const string = "const and let are new variable types introduced with ES6.";

//let can be reassigned
let changeableLet;
changeableLet = "Hotdog";
console.log("changeableLet", changeableLet);
changeableLet = "Icecream";
console.log("//changeableLet can be reassigned", changeableLet);

// const is a constant
// needs to be initialised immediately
const NOT_CHANGEABLE_CONST = "Spaghetti";
console.log(
    "//NOT_CHANGEABLE_CONST needs to be initialised immediately",
    NOT_CHANGEABLE_CONST
);

//cannot be reassigned
// NOT_CHANGEABLE_CONST = "Burger";
console.log("NOT_CHANGEABLE_CONST", NOT_CHANGEABLE_CONST);

//multiple declarations/initialisations at once for let
console.log("//Multiple declarations/initialisations at once for let");
let a = "blue",
    b = "green",
    c = "red";
console.log(a, b, c);
// Multiple initialisations at once for const
console.log("//Multiple initialisations at once for const");
const D = 0,
    E = 1,
    F = "true";
console.log(D, E, F);

//scope of let vs var
console.log("***scope of let***");
const isRaining = true;
if (isRaining) {
    let umbrella = "Let only exists inside block.";
    var rainCape = "Var also lives outdise.";
    console.log(umbrella);
}

//umbrella is not known outside of it's block
//console.log(umbrella, rainCape);
console.log(rainCape);

// If i were declared with var, its would have the value of navItems.length when the click handler runs. Because it was declared with let, it is a different variable in each iteration and the function that is created will always use the value it had in that iteration.
// let navItems = document.querySelectorAll(".nav-item");
// let navMenus = document.querySelectorAll(".nav-menu");

// for (let i = 0; i < navItems.length; i++) {
//     navItems[i].addEventListener("click", function () {
//         navMenus[i].classList.add("open");
//     });
// }
