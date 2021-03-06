console.log("Handlebars_exercise.js");
var a = {
    authors: [
        {
            name: "Kahlil Gibran",
            born: 1883,
            died: 1931,
            selectedWritings: [
                "The Prophet",
                "Sand and Foam",
                "The Earth Gods",
            ],
            quote: "We live only to discover beauty. All else is a form of waiting.",
            photo: "https://upload.wikimedia.org/wikipedia/commons/3/34/Kahlil_Gibran_1913.jpg",
        },
        {
            name: "Oscar Wilde",
            born: 1854,
            died: 1900,
            selectedWritings: [
                "The Picture of Dorian Gray",
                "The Importance of Being Earnest",
                "De Profundis",
            ],
            quote: "The bureaucracy is expanding to meet the needs of the expanding bureaucracy.",
            photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Oscar_Wilde_Sarony.jpg/800px-Oscar_Wilde_Sarony.jpg",
        },
        {
            name: "Maya Angelou",
            born: 1928,
            died: 2014,
            selectedWritings: [
                "I Know Why the Caged Bird Sings",
                "Gather Together in My Name",
                "The Heart of a Woman",
            ],
            quote: "I've learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.",
            photo: "https://upload.wikimedia.org/wikipedia/commons/b/b4/Angelou_at_Clinton_inauguration.jpg",
        },
    ],
};
//get the html from the template & compile
var authorsHTML = document.getElementById("authors").innerHTML;
var authorsTemplate = Handlebars.compile(authorsHTML);

//this is the data to populate the template with
var authorsData = authorsTemplate(a);
console.log("DATA", authorsData);

//connect the template with the anchor in the HTML
document.getElementById("writers").innerHTML += authorsData;
