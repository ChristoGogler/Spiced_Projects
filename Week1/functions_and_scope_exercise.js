//exercise 1
function sum() {
    var result = 0;
    for (var i = arguments.length; i > 0; i--) {
        // console.log(arguments[i - 1]);
        result += arguments[i - 1];
        // console.log(result);
    }
    // console.log("End result = " + result);
    return result;
}

//test exercise 1
function testExercise1() {
    sum(5, 10); //15
    sum(5, 10, 15); //30;
    sum(5, 10, 15, 100, 200); //330
}
testExercise1(); //call function to test

//exercise 2
function waitThenDo(func) {
    console.log("Please hold!");
    setTimeout(func, 1500);
}

var func = function () {
    console.log("Why am I waiting?");
};

waitThenDo(func);

//exercise 3
function returnABigNumber(number) {
    console.log(number);
    // console.log(typeof number);

    if (isNaN(number) || number <= 0) {
        console.log("enter 1st condition - number: " + number);
        console.log("ERROR");
        return "ERROR";
    } else {
        // console.log("enter 2nd condition");
        while (number < 1000000) {
            number *= 10;
            // console.log("inside while: " + number);
        }
        console.log("exit 2nd condition - number: " + number);
        return number;
    } //
}

function testExercise3() {
    returnABigNumber(-1); //smaller than 0

    returnABigNumber(0); //0

    returnABigNumber(NaN); //not a number
    returnABigNumber(function () {
        console.log("this shouldn't happen!");
    }); //not a number
    returnABigNumber(new Array("This ", "is ", "wrong! ")); //not a number
    returnABigNumber("asd"); //not a number

    returnABigNumber(1); //will be multiplied
    returnABigNumber(1.123); //will be multiplied
    returnABigNumber(123); //will be multiplied
    returnABigNumber("555"); //will automatically be parsed to number, will be multiplied

    returnABigNumber(123982398643); //will be returned as is
}
testExercise3(); //call function to test
