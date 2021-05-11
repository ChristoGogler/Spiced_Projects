//exercise 1

/*var dataTypes = [
    "Undefined",
    "Null",
    "Number",
    "NaN",
    "String",
    "Boolean",
    "BigInt",
    "Function",
    "Object",
    "Array",
    "Default",
];*/

var logStrings = [
    "undefined!",
    "null!",
    "number!",
    "not a number!",
    "string!",
    "boolean!",
    "bigint!",
    "function!",
    "object!",
    "array!",
    "I have no idea!",
];

function logType(arg) {
    var type = typeof arg;
    //undefined

    if (type == "undefined") {
        console.log(logStrings[0]);
    }

    //number
    else if (type == "number") {
        //NaN
        if (isNaN(arg)) {
            console.log(logStrings[3]); //NaN
        } else console.log(logStrings[2]); //number
    }

    //string
    else if (type == "string") {
        console.log(logStrings[4]);
    }

    //bool
    else if (type == "boolean") {
        console.log(logStrings[5]);
    }

    //BigInt
    else if (type == "bigint") {
        console.log(logStrings[6]);
    }

    //Function
    else if (type == "function") {
        console.log(logStrings[7]);
    }

    //Object
    else if (type == "object") {
        if (arg === null) {
            console.log(logStrings[1]); //null
        } else if (Array.isArray(arg)) {
            console.log(logStrings[9]); //Array
        } else console.log(logStrings[8]); //object
    }

    //Default...No Idea
    else {
        console.log(logStrings[10]);
    }
}

function testItAll() {
    var types;
    var notdefined;
    logType(notdefined); //undefined
    types = null;
    logType(types); //null
    types = 12.5;
    logType(types); //number
    types = NaN;
    logType(types); //NaN
    types = "hello!";
    logType(types); //string
    types = true;
    logType(types); //boolean
    types = 123456689n;
    logType(types); //bigInt
    types = function () {};
    logType(types); //function
    types = { user: "Babo" };
    logType(types); //object
    types = [1, 2, 3];
    logType(types); //array
    //default
}

testItAll();
