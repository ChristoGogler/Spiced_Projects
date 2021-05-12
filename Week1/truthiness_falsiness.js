//truthiness and falsiness
//check all different cases
//what is truthy and what is falsey?
function checkTruthyFalsey(toBeChecked) {
    if (toBeChecked) {
        console.log(typeof toBeChecked);
        console.log(toBeChecked + " is TRUTHY!");
    } else {
        console.log(toBeChecked + " is FALSEY!");
    }
}
//make examples for everything

checkTruthyFalsey(1);
checkTruthyFalsey(0);
checkTruthyFalsey(-1);
checkTruthyFalsey(12.5453);
checkTruthyFalsey(15023524534635636n);
checkTruthyFalsey("");
checkTruthyFalsey("adfoif");
checkTruthyFalsey([]);
checkTruthyFalsey([1, 2, 3]);
checkTruthyFalsey({ a: "asd", b: "wer" });
checkTruthyFalsey(function () {});

//conditionals
var amIHungry = true;
var fridgeEmpty = true;

if (amIhungry == true) {
    getGroceries();
}

if (fridgeEmpty == true) {
    getGroceries();
}

//also possible
if (amIhungry) {
    getGroceries();
}

//also possible
if (amIhungry && fridgeEmpty) {
    getGroceries();
}

console.log("adfadg");

function getGroceries() {}

//for loops
//for asc/desc
//for...of
//for...in
