console.log("generator function exercise 2");

function* generator() {
    let insideArray = yield;
    let [f, e, d, c, b, a] = insideArray;
    yield [a, b, c, d, e, f];
}

const reverse = generator();

const array = ["a", "b", "c", "d", "e", "f"];

console.log(reverse.next().value);

console.log("original", array);
const reveredArray = reverse.next(array).value;
console.log("reversed", reveredArray);
console.log("still original", array);
