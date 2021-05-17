// exercise 1
//Part 1
//constructor Rectangle
//2 parameters: 1)number "width" 2) number "height"
//1 method: getArea() - parameter: width, height; return: number

function Rectangle(width, height) {
    // console.log("inside Rectangle: " + width + " " + height);
    this.width = width;
    this.height = height;
}

Rectangle.prototype.getArea = function () {
    return this.width * this.height;
};

//Part 2
//constructor Square
//1 parameter: 1) number (width/height)
//1 method: getArea() - same as Rectangle getArea

function Square(width) {
    this.width = width;
    this.height = width;
}

Square.prototype.getArea = Rectangle.prototype.getArea;

//test exercise 1

var rect = new Rectangle(4, 5);
console.log(rect.getArea()); //20

var square = new Square(4);
console.log(square.getArea()); //16

// exercise 2
//write function invertCase
//1 parameter: string
//invert uppercase/lowercase
//return: another string

function invertCase(string) {
    var inverted = "";
    for (var i = 0; i < string.length; i++) {
        var currentCharacter = string.charAt(i);
        //if UPPERCASE --> toLowerCase
        //only works for alphabetic characters
        if (/[A-Z]/.test(currentCharacter)) {
            currentCharacter = currentCharacter.toLowerCase();
        }
        //else lowercase -->toUpperCase
        //only works for alphabetic characters
        else {
            currentCharacter = currentCharacter.toUpperCase();
        }
        inverted += currentCharacter;
    }

    return inverted;
}

//test exercise 2
var message = "Hej Muffin! How has your day been? Let's talk later at 3pm.";
var invertedCasesMessage = invertCase(message);
console.log(invertedCasesMessage);
