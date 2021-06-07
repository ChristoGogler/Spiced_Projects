console.log("generator experiments");

//normal functions work with a run to completion concept
//they cannot be stopped midway. they will always be executed from the beginning to the end.
function runToCompletion() {
    console.log("This");
    console.log("only");
    console.log("stops");
    console.log("with");
    console.log("completion.");
    return "finished!";
}
runToCompletion();
//they only stop with a return statement or by throwing an error

//generator functions creates/returns an object
//which can be called an interator object
//generators have a * marker to distinguish them from normal functions

function* generatorFunction() {
    yield "Hello";
    yield "World";
    yield "!";
}

//it has the following methods:

//.next()
//generates the next yield and pauses until the next call
console.log(".NEXT()");
const iterator = generatorFunction();
console.log(iterator.next().value); //logs Hello
console.log(iterator.next()); //logs { value: 'World', done: false }
console.log(iterator.next()); //logs { value: '!', done: true }

//.next(value)
console.log(".NEXT(Value)");
function* nextWithValue() {
    const name = yield "whats your name?";
    const password = yield "Whats your password?";
    yield `Loggin in ${name} with password ${password}!`;
}
const iterator3 = nextWithValue();
console.log(iterator3.next()); //logs Whats your name?
console.log(iterator3.next("Heidi")); //logs Whats your password?
console.log(iterator3.next("12345")); //logs Loggin in Heidi with password 12345!
console.log(iterator3.next());

//.return(value)
console.log(".RETURN(Value)");
const iterator2 = generatorFunction();
console.log(iterator2.next().value); //logs Hello
console.log(iterator2.return("Sabrina")); //logs { value: 'Sabrina', done: true }
console.log(iterator2.next()); //logs { value: undefined, done: true }

//.throw(error)
console.log(".THROW(Error)");
function* generatorTryCatch() {
    while (true) {
        try {
            yield "This works out!";
        } catch (error) {
            console.warn("Error caught: " + error);
        }
    }
}
const iterator4 = generatorTryCatch();
console.log(iterator4.next().value); //logs "This works out!"
iterator4.throw(new Error("This is my error!")); //logs Error caught: Error: This is my error!

//generators with arguments
console.log("generators with arguments");
function* powerSeries(number, power) {
    let base = number;
    while (true) {
        yield Math.pow(base, power);
        base++;
    }
}

const powersOf2 = powerSeries(3, 2);

let result = powersOf2.next();
console.log(result); // logs 9
result = powersOf2.next();
console.log(result); // logs 16
result = powersOf2.next();
console.log(result); // logs 25
