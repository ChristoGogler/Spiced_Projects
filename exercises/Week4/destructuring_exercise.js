console.log("destructuring exercises");

//exercise 1 - Write a function that takes an array as an argument and returns a new array containing all of the items that are in the array that was passed in but in reverse order.
const arr1 = ["a", "b", "c", "d", "e", "f", "g"];
const arr2 = ["h", "i", "j", "k", "l", "m", "n"];

function reverseArray(array) {
    const [g, f, e, d, c, b, a] = array;
    return [a, b, c, d, e, f, g];
}
let newArr = reverseArray(arr1);
console.log("arr before", arr1);
console.log("arr after", newArr);

//exercise 2 - Write a function that takes two arrays as arguments and returns a new array containing all of the items in the two arrays passed to it.
function combineArrays(array1, array2) {
    return [...array1, ...array2];
}

newArr = combineArrays(arr1, arr2);
console.log(newArr);

//exercise 3 - Rewrite the following function to use destructuring assignment for the three variables it creates:

function logInfo(city) {
    // const name = city.name;
    // const country = city.country;
    // const numPeople = city.population;
    const { name, country, population: numPeople } = city;

    console.log(
        `${name} is in ${country} and has ${numPeople} inhabitants in it.`
    );
}
//call
logInfo({ name: "Marseille", country: "France", population: 861635 });

//exercise 4 - Pretend that it is 2002 and rewrite the following hipster Javascript so it will work in Internet Explorer 5 and Netscape 4.
//let getNameAndCountry = ({ name, country }) => [name, country];

var leipzig = {
    name: "Leipzig",
    country: "Germany",
};
var paris = {
    name: "Paris",
    country: "France",
};

function getNameAndCountry(city) {
    var arr = [];
    arr.push(city.name);
    arr.push(city.country);
    return arr;
}

// let getRelocatedCity = (city1, city2 = { country: "Germany" }) => {
//     let [, country] = getNameAndCountry(city2);
//     return {
//         ...city1,
//         country,
//     };
// };

function getRelocatedCity(city1, city2) {
    city2.country = "Germany";
    var arr = getNameAndCountry(city2);
    var country = arr[1];
    var obj = {
        city: city1.name,
        country: country,
    };
    return obj;
}
var relocatedCity = getRelocatedCity(paris, leipzig);
console.log(relocatedCity);
