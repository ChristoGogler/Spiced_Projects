console.log("generator function exercise 2");

function* generator(array) {
    let [f, e, d, c, b, a] = array;
    yield [a, b, c, d, e, f];
}

const array = ["a", "b", "c", "d", "e", "f"];

const reverse = generator(array);

console.log("original", array);

const reveredArray = reverse.next(array).value;
console.log("reversed", reveredArray);
console.log("still original", array);
