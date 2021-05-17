// exercise 1
//Part 1
//constructor Rectangle
//2 parameters: 1)number "width" 2) number "height"
//1 method: getArea() - parameter: width, height; return: number

function Rectangle(width, height) {
    console.log("inside Rectangle: " + width + " " + height);
    this.width = width;
    this.height = height;
    this.getArea = function () {
        return this.width * this.height;
    };
}

//Part 2
//constructor Square
//1 parameter: 1) number (width/height)
//1 method: getArea() - same as Rectangle getArea

function Square(width) {
    this.width = width;
    this.height = width;
}

Square.prototype.getArea = rect.getArea;

//test exercise 1

var rect = new Rectangle(4, 5);
console.log(rect.getArea()); //20

var square = new Square(4);
console.log(square.getArea()); //16
