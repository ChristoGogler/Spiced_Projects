//exercise 1
//2 parameters: 1)obj/arr 2)callback
//return: -
function each(objOrArr, callback) {
    //check if object or array
    var isArray = Array.isArray(objOrArr);
    console.log("isArray = " + isArray);
    if (isArray) {
        //array: loop over arr
        for (var i = 0; i < objOrArr.length; i++) {
            //callback(value,index)
            callback(objOrArr[i], i);
        }
    } else {
        //obj: loop over props
        for (var prop in objOrArr) {
            //callback(value, props)
            callback(objOrArr[prop], prop);
        }
    }
}

//test exercise 1
function testExercise1() {
    each(
        {
            a: 1,
            b: 2,
        },
        function (val, name) {
            console.log("The value of " + name + " is " + val);
        }
    ); // logs 'the value of a is 1' and 'the value of b is 2'

    each(["a", "b"], function (val, idx) {
        console.log("The value of item " + idx + " is " + val);
    }); // logs 'the value of item 0 is a' and 'the value of item 1 is b'
}

testExercise1();

//exercise 2
//1 parameter: 1)array
//return: another array

function safeReverse(array) {
    //copy array
    var sliced = array.slice();
    var reversedArray = [];
    //loop over array
    for (var i = 0; i < array.length; i++) {
        reversedArray.push(sliced.pop());
    }

    return reversedArray;
}

//test exercise 2
function testExercise2() {
    var testArray; //declaration
    //test cases
    testArray = safeReverse([1, 2, 3, 4, 5, 6, 7, 8]);
    console.log(testArray);
    testArray = safeReverse(["a", "b", "c", "d", "e", "f", "g"]);
    console.log(testArray);
    testArray = safeReverse([1, "a", 2, "b"]);
    console.log(testArray);
    testArray = safeReverse([1, 2, undefined, null, 3, 4]);
    console.log(testArray);
}

testExercise2();

//exercise 3
//1 parameter: 1) array of numbers
//do: filter for numbers that are smaller than 0
//return: another array
function getLessThanZero(numbers) {
    var negativeNumbers; //declaration
    negativeNumbers = numbers.filter(function (val) {
        return val < 0;
    });

    return negativeNumbers;
}

//test exercise 3
function testExercise3() {
    var testArray; //declaration
    //test cases
    testArray = getLessThanZero([1, 2, -1, -90, 10]); //[-1, -90]
    console.log(
        "[-1, -90] ---- " + testArray + " ---- Length: " + testArray.length
    );
    testArray = getLessThanZero([1, 2]); //[]
    console.log(testArray);
    console.log("[] ---- " + testArray + " ---- Length: " + testArray.length);
}
testExercise3();
