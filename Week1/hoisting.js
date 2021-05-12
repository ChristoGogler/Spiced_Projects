/* eslint-disable no-unused-vars */
//try out some hoisting situations

//variable declaration, even in strict mode
a = 100;
b = 200;
var a, b;

//function declaration
var result = sum(2, 3);

function sum(a, b) {
    return a + b;
}

// function expression, hoisting not working
const Result = multiply(2, 3);

var multiply = function (a, b) {
    return a * b;
};

// //not working
// const anotherResult = withName(2, 3);

// var multiply = function withName(a, b) {
//     return a * b;
// };
