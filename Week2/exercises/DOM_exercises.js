console.log("DOM Selectors Exercise");

//exercise 1
//write function
//find all the elements matching a selector
//change their style to italic, underline & bold
function findAndChange(selector) {
    var elements = document.querySelectorAll(selector);

    for (var i = 0; i < elements.length; i++) {
        elements[i].innerHTML += " Yummy!";
        elements[i].style.fontWeight = "bold";
        elements[i].style.textDecoration = "underline";
        elements[i].style.fontStyle = "italic";
    }
}

//test exercise 1
function testFindAndChange() {
    findAndChange("h1"); //tag
    findAndChange("#offer"); //id
    findAndChange(".button"); //class
}

testFindAndChange();

//exercise 2 -
//write function
//parameter: string className
//return: array with all the elements with that class

function getAllElements(className) {
    var elementsArray = [];

    var elements = document.getElementsByClassName(className);
    for (var i = 0; i < elements.length; i++) {
        elementsArray.push(elements[i]);
    }
    console.log(elementsArray);
    if (elementsArray.length == 0) {
        alert("No such class: " + className);
    }
    return elementsArray;
}
// test exercise 2
function testGetAllElements() {
    //test cases
    var isArray;
    isArray = Array.isArray(getAllElements("option"));
    // isArray = Array.isArray(getAllElements("justinbieber"));
    console.log(isArray);
}
testGetAllElements();
