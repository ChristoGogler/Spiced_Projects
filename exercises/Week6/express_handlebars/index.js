//requirements
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const handleBars = require("express-handlebars");
const path = require("path");

//get json data!
console.log(__dirname);
const projects = require(path.join(__dirname, "public/data/projects.json"));
const cats = require(path.join(__dirname, "public/data/cats.json"));

//set up handlebars as template engine
app.engine("handlebars", handleBars());
app.set("view engine", "handlebars");

//make static content available that is in the "public" folder
app.use(express.static(path.join(__dirname + "/public")));

app.get("/", (request, response) => {
    response.render("portfolio", {
        layout: "main",
        style: "portfolio.css",
        title: "Portfolio",
        projects,
    });
})
    .get("/hello", (request, response) => {
        response.render("hello", {
            layout: "main",
            style: "cats.css",
            title: "cat adoption center",
            cats,
        });
    })
    .listen(8080, () => {
        console.log("---- EXPRESS SERVER .... listening .... ----");
    });
