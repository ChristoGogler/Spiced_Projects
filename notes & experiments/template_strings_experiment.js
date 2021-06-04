console.log("****template strings****");

const DOUBLE = '"Double quote!"';
const SINGLE = "'Singe quote!'";
const BACK_TICK = "`Back Tick!`";

console.log(SINGLE, DOUBLE, BACK_TICK);

//Back ticks allow for unescaped new line characters
const ALLOWED = `Line 1 
        Line 2
Line 3`;
console.log("new line/tabulator characters are allowed:" + ALLOWED);
const NOT_ALLOWED = "Line 1 Line 2 Line 3";
console.log("double/single quote doesnt:" + NOT_ALLOWED);

//Interpolation
//reduces the need to build strings through concatenation
// similar to handlebars, but integrated in js

const serveFoodWithSauce = function (food, sauce) {
    return `We added ${sauce} to your ${food}. Bon appetit!`;
};

console.log(serveFoodWithSauce("Pasta", "Carbonara"));
console.log(serveFoodWithSauce("Fries", "Ketchup"));

//tagged template strings

const choosingLanguage = function (stringParts, language, inEsp) {
    if (language == "eng") {
        language = "english";
        inEsp = "(inglés)";
    } else if (language == "de") {
        language = "deutsch";
        inEsp = "(alemán)";
    } else {
        language = "francais";
        inEsp = "(francés)";
    }
    return stringParts[0] + language + inEsp + stringParts[1];
};

console.log(choosingLanguage`This language is ${"eng"} ${"Spanish"}.`);
console.log(choosingLanguage`Diese Sprache ist ${"de"}${"Spanish"}...`);
console.log(choosingLanguage`Ca c'est ${"asföj"}${"Spanish"}...`);
