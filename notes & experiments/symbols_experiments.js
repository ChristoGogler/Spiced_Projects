console.log("***Symbols***");

//creating a symbol
const symbol1 = Symbol();
console.log(symbol1);
//with a string
const symbol2 = Symbol("abc");
console.log(symbol2);
//cant use 'new Symbol()' -- error

//what are they for?
//they are unique . no symbol is like another.
//more security: less likely to be overwritten
//cant be accessed from outside of their scope
//used to name properties for objects

let obj = {
    prop1: "some string",
    prop2: "another string",
    [symbol1]: "yet another string",
};
console.log(obj);
//this is how you access it with [] brackets
console.log(obj.prop1, obj[symbol1]);
// doesnt show up when looped through the properties
