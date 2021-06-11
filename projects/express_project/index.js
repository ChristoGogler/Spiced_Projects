//require express module (needs to be installed in the same directory)
const express = require("express");
const cookieParser = require("cookie-parser");
//instance of express!
const app = express();

const helloWorld = "Hello World!";
//make static content available that is in the "public" folder
app.use(express.static(__dirname + "/public"))
    .use(express.urlencoded({ extended: false }))
    .use(cookieParser())
    //specify response in case of get method for specific urlpath

    .get(`/`, (request, response) => {
        response.send("bäm!");
    })
    .get("/test", (request, response) => {
        console.log("[cookies]", request.cookies);

        if (request.cookies.beenHereBefore) {
            response.send("Welcome back, Gorgeous!");
            return;
        }
        response.cookie("beenHereBefore", true);
        response.send("Welcome Gorgeous!");
    })
    .get(`/hello/world`, (request, response) => {
        //this will set header, end response etc automatically
        response.send(`
    <!doctype html>
    <html>
        <head>
            <title>${helloWorld}</title>
        </head>
        <body>
            <p>${helloWorld}</p>
        </body>
    </html>
    `);
        //no response.end() needed!
    })

    //start listening on port
    .listen(8080, () =>
        console.log(`---- EXPRESS SERVER .... listening .... ----`)
    );
