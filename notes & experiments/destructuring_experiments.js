console.log("***destructuring***");

//ARRAY
//extracting several values from an ARRAY
const shoppingList = ["oat milk", "beer", "bread", "eggs"];
console.log(shoppingList);

//instead of this
// const oatmilk = shoppingList[0];
// const beer = shoppingList[1];
// const bread = shoppingList[2];
// const eggs = shoppingList[3];
// do this:
let [oatmilk, beer, bread, eggs] = shoppingList;
console.log(oatmilk, beer, bread, eggs);

//only want a few elements?

const [a, b, , d] = shoppingList;
console.log("some shopping", a, b, d);

// let [drinks... , ...food] = shoppingList;
// console.log(drinks, food);
const extShoppingList = ["Hummus", ...shoppingList, "water"];
console.log("extShoppingListRINKS", extShoppingList);
//logs: extShoppingListRINKS [ 'Hummus', 'oat milk', 'beer', 'bread', 'eggs', 'water' ]]

//OBJECT
//---extracting
const sandra = {
    name: "sandra",
    kind: "chicken",
    legs: 2,
    food: "worms",
};

const { name, food } = sandra;
//concatenated
console.log(name + " loves " + food);
//with template strings/back ticks
console.log(`${name} loves ${food}.`);

//---constructing
const myName = "Thomas";
const kind = "chicken";
const legs = 2;
const tfood = "grains";

const thomas = {
    myName,
    kind,
    legs,
    tfood,
    //also functions
    countLegs() {
        console.log(`Hi, Im ${this.myName}. I have ${this.legs} legs.`);
    },
};
console.log(thomas);
thomas.countLegs(); //logs: Hi, Im Thomas. I have 2 legs.

//creating objects with dynamic prop names
function createObjWithProp(name1, name2, val1, val2) {
    return {
        [name1]: val1,
        [name2]: val2,
    };
}

const obj = createObjWithProp("firstName", "lastName", "hello", "kitty");

console.log(obj); // logs: { firstName: 'hello', lastName: 'kitty' }

//... operator with objects

const gabriel = { ...thomas, myName: "Gabriel" };
console.log(gabriel);
gabriel.countLegs(); // logs: Hi, Im Thomas. I have 2 legs.
