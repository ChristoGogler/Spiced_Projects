//this keyword
//refers to the object to which the function belongs

var frenchPress = {
    model: "French Delux",
    beverage: "Black coffee",
    getModel: function () {
        console.log("This model is a " + this.model + ".");
    },
};

// 2 ways to access getModel method
frenchPress.getModel(); //This model is a French Delux.
frenchPress["getModel"](); //This model is a French Delux.

//constructor
function CoffeeMaker(model, beverage) {
    this.model = model;
    this.beverage = beverage;
}

//prototype function
CoffeeMaker.prototype.makeCoffee = function () {
    console.log(this);
    console.log("This Coffee Maker makes " + this.beverage + ".");
};

CoffeeMaker.prototype.pourCoffee = function () {
    console.log(this);
    console.log("There you go - enjoy your " + this.beverage + ".");
};

new CoffeeMaker("Bialetti", "Mocha").makeCoffee();

//
var karlsbader = {
    model: "Karlsbader Kanne",
    beverage: "Pour Over",
    makeBeverage: function () {
        console.log(this); //refers to Window
        console.log("Making a " + this.beverage); //beverage not a prop of Window/global object--> undefined
    },
};

var fn = karlsbader.makeBeverage;

fn(); //undefined

//scope of this
CoffeeMaker.prototype.WaitForPour = function () {
    console.log(this); //this = CoffeeMaker

    var coffeeMaker = this; //var self, var _this
    setTimeout(function () {
        console.log(this); //this = Window
        coffeeMaker.pourCoffee();
    }, 1000);
};

new CoffeeMaker("Hario", "Filter Coffee").WaitForPour(); //There you go - enjoy your Filter Coffee.

//new ES6 ways: arrow function ()=>
CoffeeMaker.prototype.WaitForPour = function () {
    setTimeout(() => {
        //points to the object instanceof CoffeeMaker
        this.pourCoffee();
    }, 2000);
};

new CoffeeMaker("AeroPress", "Long Black").WaitForPour(); //There you go - enjoy your Long Black.

//bind() method
CoffeeMaker.prototype.WaitForPour = function () {
    setTimeout(
        function () {
            this.pourCoffee();
        }.bind(this),
        2000
    ); //bind to the object instanceof CoffeeMaker
};

new CoffeeMaker("AeroPress", "Long Black").WaitForPour(); //There you go - enjoy your Long Black.

//call and apply
//give object as parameter
//this refers to object within call()

var coffee = {
    name: "Cappuccino",
    offerCoffee: function (coffee1, coffee2) {
        console.log(
            "What can I get you: " +
                coffee1 +
                ", " +
                coffee2 +
                " or " +
                this.name +
                "?"
        );
    },
};

coffee.offerCoffee("Espresso", "Latte"); //What can I get you: Espresso, Latte or Cappuccino?
//with call() method
coffee.offerCoffee.call({ name: "Café au lait" }, "Espresso", "Latte"); //What can I get you: Espresso, Latte or Café au lait?
//with apply() method -- last two parameters in array
coffee.offerCoffee.apply({ name: "Ca Phe Truong" }, ["Espresso", "Latte"]); //What can I get you: Espresso, Latte or Ca Phe Truong?
