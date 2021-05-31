function askForNumber() {
    var num = prompt("Please enter a number between 1 and 10");
    if (num >= 1 && num <= 10 && num == parseInt(num)) {
        return num;
    }
    throw new Error("Bad number");
}

var germanNumber = translateNumberToGerman();
console.log(germanNumber);
alert(germanNumber);

//translateNumberToGerman
//0 parameters
//do: catch "bad number" exception by askForNumber() and call translateNumberToGerman until valid number has been received, then translate
//return german translation of number called by askForNumber()
function translateNumberToGerman() {
    var number;
    var germanNumbers = {
        1: "eins",
        2: "zwei",
        3: "drei",
        4: "vier",
        5: "fünf",
        6: "sechs",
        7: "sieben",
        8: "acht",
        9: "neuen",
        10: "zehn",
    };

    try {
        number = askForNumber();
        console.log("the received number", number);
        console.log("the german", germanNumbers[number]);
        return germanNumbers[number];
    } catch (error) {
        console.warn(error);
        alert("Only numbers between 1 and 10 are allowed. Try again!");
        return translateNumberToGerman();
    }
}
