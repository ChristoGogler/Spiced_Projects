// exercise 1 - countOccurrencesInWords()
//1 parameter: 1) string
//return: object with keys = letters contained, values = occurrences of every letter
function countOccurrencesInWords(word) {
    var occurrences = {};
    var splitWord = word.split("");

    for (var i = 0; i < word.length; i++) {
        var letter = splitWord.shift();
        console.log(i + " + " + letter);
        if (occurrences[letter] == undefined) {
            occurrences[letter] = 1;
        } else {
            occurrences[letter] += 1;
        }
        console.log("occurrences[letter]: " + occurrences[letter]);
    }
    console.log(occurrences);

    return occurrences;
}

//test cases
function testCountOccurrencesInWords() {
    // case 1:
    countOccurrencesInWords("hello");
    // output
    // {
    //     h: 1,
    //     e: 1,
    //     l: 2,
    //     o: 1
    // }

    // case 2:
    countOccurrencesInWords("aaabbac");
    // output
    // {
    //     a: 4,
    //     b: 2,
    //     c: 1
    // }

    // case 3:
    countOccurrencesInWords("");
    // output
    // {}
}
testCountOccurrencesInWords();

// exercise 2 - findInArray()
//2 parameters: 1) array 2) condition
//return: 1st element for which condition(element)is true OR undefined
function findInArray(array, condition) {
    var i = 0;

    //loop over array
    //end if: met condition
    //end if: reached end of array
    //console.log("Array.length: " + array.length);

    //while loop
    while (i < array.length) {
        //check condition
        if (condition(array[i])) {
            return array[i];
        }
        i++;
    }
    return undefined;
}

//test
function testFindInArray() {
    var found;
    // case 1:
    found = findInArray([1, 4, 5], function (element) {
        return element % 2 === 0;
    }); // => 4
    console.log(found);
    // case 2:
    found = findInArray(["Bob", "Alice", "Charlie"], function (name) {
        return name.length > 3;
    }); // => 'Alice'
    console.log(found);

    // case 3:
    var users = [
        {
            name: "Diego",
            age: 30,
        },
        {
            name: "Alice",
            age: 25,
        },
        {
            name: "Bob",
            age: 15,
        },
    ];

    findInArray(users, function (user) {
        return user.age > 30;
    }); // => undefined
}
testFindInArray();

//exercise 3 - stringContains()

//2 parameters: 1) string 2) string
// check if string2 is contained in string1
//return: boolean
function stringContains(containing, contained) {
    //if containing is shorter than contained
    //cant be contained, cause too short
    if (contained.length > containing.length) {
        return false;
    }
    //case insensitivity
    contained = contained.toLowerCase();
    containing = containing.toLowerCase();
    //log strings
    console.log("contained: " + contained);
    // console.log(containing);
    //parse to array
    var containedArray = contained.split("");
    var containingArray = containing.split("");

    //loop over containing array
    for (var i = 0; i < containingArray.length; i++) {
        //loop ocer contained array
        for (var j = 0; j < containedArray.length; j++) {
            if (containedArray[j] != containingArray[i + j]) {
                break;
            }
            return true;
        }
    }
    return false;
}

function testStringContains() {
    var isContained = false;

    isContained = stringContains("diego", "di");
    console.log("Should be true!");
    console.log(isContained);

    isContained = stringContains("di", "Diego");
    console.log("Should be false");
    console.log(isContained);

    isContained = stringContains("hello", "ll");
    console.log("Should be true");
    console.log(isContained);

    isContained = stringContains("good morning", "morning");
    console.log("Should be  true");
    console.log(isContained);

    isContained = stringContains("blabla", "Blabla");
    console.log("Should be  true");
    console.log(isContained);

    isContained = stringContains("hello", " hello");
    console.log("Should be  false");
    console.log(isContained);
}
testStringContains();
