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

function logType(data) {
    var type = typeof data;
    //undefined

    if (type == "undefined") {
        console.log(logStrings[0]);
    }

    //number
    else if (type == "number") {
        //NaN
        if (isNaN(data)) {
            console.log(logStrings[3]); //NaN
        } else {
            console.log(logStrings[2]); //number
        }
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
        if (data === null) {
            console.log(logStrings[1]); //null
        } else if (Array.isArray(data)) {
            console.log(logStrings[9]); //Array
        } else {
            console.log(logStrings[8]); //object
        }
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

//exercise 2

var a = {
    Berlin: "Germany",
    Paris: "France",
    "New York": "USA",
};

var b = {};

for (var prop in a) {
    b[a[prop]] = prop;
    //console.log(prop);
    //console.log(a[prop]);
    console.log(b);
}

//exercise 3

for (var i = 10; i > 0; i--) {
    console.log(i);
}
