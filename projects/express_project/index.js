//require express module (needs to be installed in the same directory)
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

//instance of express!
const app = express();

app.use(cookieParser());
app.post(
    `/cookie`,
    bodyParser.urlencoded({ extended: false }),
    (request, response, next) => {
        if (request.body.acceptCookie) {
            console.log(`Setting chocolateChip cookie...!`);
            response.cookie("chocolateChip", true);
            // request.cookies.chocolateChip = true;
            response.redirect(request.cookies.desiredUrl);
            return;
        }
        response.redirect("/must-approve-cookie");
    }
);

app.get(`/cookie`, (request, response) => {
    getCookiePage(response);
}).get("/must-approve-cookie", (request, response) => {
    getMustApprovePage(response);
});
app.use(checkCookie)
    //make static content available that is in the "public" folder
    .use(express.static(__dirname + "/public"))
    .use(express.urlencoded({ extended: false }));

app.get(`/`, (request, response) => {
    response.send("HOMEPAGE");
});

//start listening on port
app.listen(8080, () =>
    console.log(`---- EXPRESS SERVER .... listening .... ----`)
);

function setCookie(response, property, value) {
    response.cookie(property, value);
}

function getMustApprovePage(response) {
    response.send(`<!DOCTYPE html>
<html lang="en">
    <head>
        <title>MUST APPROVE</title>
    </head>
    <body>
    <h1>You must approve the cookie!</h1>
    </body>
</html>
`);
}

function getCookiePage(response) {
    response.send(`<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Accept Cookie</title>
    </head>
    <body>
    <form method="post" action="./cookie">
        <label for="acceptCookie">Accept the cookie?</label>
        <input type="checkbox" name="acceptCookie" id="acceptCookie" />
        <button type="submit">Accept</button>
    </form>
    </body>
</html>
`);
}

function checkCookie(request, response, next) {
    console.log("[cookies]", request.cookies);
    setCookie(response, "desiredUrl", request.url);
    desiredUrl = request.url;

    if (request.cookies.chocolateChip) {
        //-->redirect to desired page
        console.log("Welcome back, Buiscuit!");
        console.log("URL", request.url);
        // response.redirect(request.url);
        next();
        return;
    }
    //redirect to "Wanna accept a cookie?"

    response.redirect("/cookie");
}
