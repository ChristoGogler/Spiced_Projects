const express = require("express");
const path = require("path");
const { getHeadlines } = require("./index");

const app = express();

app.use(express.static(path.join(__dirname + "ticker")));

app.get("/headlines.json", (request, response) => {
    const promises = [
        getHeadlines("DeutscheWelle", 3),
        getHeadlines("PinkNews", 3),
        getHeadlines("BBCWorld", 3),
    ];

    Promise.all(promises).then((tweets) => {
        console.log("DONE!");
        response.json(tweets.flat());
    });
});
app.listen(8080, () => console.log("Im listening...."));
