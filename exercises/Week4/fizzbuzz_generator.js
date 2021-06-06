console.log("fizzbuzz generator");

function* fizzbuzz() {
    for (var i = 1; i <= 100; i++) {
        if (i % 3 == 0 && i % 5 == 0) {
            yield "fizzbuzz";
            // console.log("fizzbuzz");
        } else if (i % 3 == 0) {
            yield "fizz";
            // console.log("fizz");
        } else if (i % 5 == 0) {
            yield "buzz";
            // console.log("buzz");
        } else {
            console.log(i);
        }
    }
}

for (const number of fizzbuzz()) {
    console.log(number);
}
