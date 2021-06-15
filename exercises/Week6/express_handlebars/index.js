//requirements
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const handleBars = require("express-handlebars");
const path = require("path");

//get json data!
//console.log(__dirname);
const projects = require(path.join(__dirname, "public/data/projects.json"));
//console.log(typeof projects);
const cats = require(path.join(__dirname, "public/data/cats.json"));

//set up handlebars as template engine
app.engine("handlebars", handleBars());
app.set("view engine", "handlebars");

//make static content available that is in the "public" folder
app.use(express.static(path.join(__dirname + "/public")));

//get the overview page
app.get("/", (request, response) => {
    response.render("portfolio", {
        layout: "main",
        style: "./css/portfolio.css",
        title: "Portfolio",
        projects,
    });
})
    //get the individual project description page
    .get(`/project/:project_name`, (request, response) => {
        const { project_name } = request.params;

        let project;
        console.log("Project name", project_name);
        // find the project that matches projName in the projects array
        for (const element of projects) {
            console.log(element.directory);
            if (element.directory === project_name) {
                project = element;
                console.log(`...rendering ${project}`);
                // if no matching project is found, send 404
                response.render("singleproject", {
                    layout: "main",
                    style: "../css/single.css",
                    title: "Project Title",
                    project,
                    projects,
                });
                return;
            }
        }
        console.log("couldnt find anything! 404!");
        response.sendStatus(404);
        return;
    })
    //get the test page with cats
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
