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

//Rectangle prototype: add getarea method
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

//Square prototype: copy getArea from Rectangle prototype
Square.prototype.getArea = Rectangle.prototype.getArea;

//test exercise 1
function testExercise1() {
    var rect = new Rectangle(4, 5);
    console.log(rect.getArea()); //20

    var square = new Square(4);
    console.log(square.getArea()); //16
}
testExercise1();

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
function testExercise2() {
    var message = "Hej Muffin! How has your day been? Let's talk later at 3pm.";
    var invertedCasesMessage = invertCase(message);
    console.log(invertedCasesMessage);
}
testExercise2();

//bonus exercise
//constructor Countdown
//1 parameter: 1) number at which the countdown starts
//1 method: start()
//countdown should be logged to console with 1sec delay between numbers
function Countdown(seconds) {
    this.seconds = seconds;
}

//prototype: add start method
Countdown.prototype.start = function () {
    //what is "this" here? --> Countdown
    //console.log(this);
    var self = this;
    if (self.seconds > -1) {
        setTimeout(function () {
            //what is "this" in here? --> Window
            // console.log(this);
            console.log(self);
            console.log(self.seconds);
            self.seconds--;
            self.start(self.seconds);
        }, 1000);
    }
};

//test bonus exercise
function testBonusExercise() {
    var countdown = new Countdown(6);

    countdown.start();
}
testBonusExercise();
