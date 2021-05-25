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

    // possible, but also iterates over "hidden" properties
    // for (const property in elements) {
    //     console.log(elements);
    //     console.log(property);
    //     elements[property].innerHTML += " Yummy!";
    // }
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

//exercise 3
//write function
//insert element into the body of current page
// fixed position, z-index of 2147483647, left of 20px, top of 100px, font-size of 200px, contain text 'AWESOME'
function insertElement() {
    //create div element
    var newP = document.createElement("p");

    //change style/properties
    newP.style.zIndex = 2147483647;
    newP.style.position = "fixed";
    newP.style.left = "20px";
    newP.style.top = "100px";
    newP.style.fontSize = "200px";
    newP.innerHTML = "AWESOME";

    //insert into the page
    var insertionPoint = document.getElementsByTagName("h1");
    // console.log(v);
    // console.log(typeof v[0]);
    document.body.insertBefore(newP, insertionPoint[0]);
}

function testInsertElement() {
    insertElement();
}
testInsertElement();
