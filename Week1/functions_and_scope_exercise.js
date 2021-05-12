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

testExercise1();

//exercise 2

function waitThenDo(func) {
    console.log("Please hold!");
    setTimeout(func, 1500);
}

var func = function () {
    console.log("Why am I waiting?");
};

waitThenDo(func);
