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
