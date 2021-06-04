console.log("****arrow functions***");

console.log("() => {}");
//they have to be initialised to a variable
console.log("//they have to be initialised to a variable");
console.log(`const eatVegetables = () => {
    feelHealthyAndFull();
}`);

// () - holds the arguments
// => - arrow
//{} - holds the methods/calculation etc.

// only one argument
// no () neeed around argument
const printNumberplate = (numberPlate) => {
    return console.log("NumberPlate:", numberPlate);
};
printNumberplate("B-2385-23");

// only one expression
//no curlys and return needed
const callFriend = (friend) => console.log("calling...." + friend);

callFriend("Lina");

//arrow functions have no own "this", this is whatever this is in the scope surrounding them
//arrow functions dont have their own arguments object - they inherit the arguments object from their surrounding scope
let leo = {
    name: "Leo",
    waitThenSayHello: function () {
        setTimeout(() => {
            console.log("Hello, my name is " + this.name);
        }, 1000);
    },
};

leo.waitThenSayHello();

function punctuateArray() {
    console.log(arguments[0]);
    console.log(arguments[1]);
    return console.log(arguments[0].map((str) => str + arguments[1]));
}

punctuateArray(["best", "feature", "ever"], "!"); // [ 'best!', 'feature!', 'ever!' ]
