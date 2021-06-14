//requirements
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const handleBars = require("express-handlebars");
const path = require("path");

const cats = [
    { name: "Kitty", age: 23, available: true },
    { name: "Simba", age: 45, available: false },
    { name: "Minka", age: 12, available: true },
    { name: "Mauzi", age: 32, available: true },
    { name: "Garfield", age: 52, available: false },
];

//set up handlebars as template engine
app.engine("handlebars", handleBars());
app.set("view engine", "handlebars");

//make static content available that is in the "public" folder
app.use(express.static(path.join(__dirname + "/public")));

app.get("/", (request, response) => {
    response.send("ALRIGHT!");
})
    .get("/hello", (request, response) => {
        response.render("hello", {
            layout: "main",
            title: "cat adoption center",
            cats,
        });
    })
    .listen(8080, () => {
        console.log("---- EXPRESS SERVER .... listening .... ----");
    });
