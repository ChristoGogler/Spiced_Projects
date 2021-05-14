//exercise 1
//2 parameters: 1)obj/arr 2)callback
//return:
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
