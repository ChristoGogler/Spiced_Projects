const express = require("express");
const path = require("path");
const { getHeadlines } = require("./index");

const app = express();

app.use(express.static(path.join(__dirname + "ticker")));

app.get("/headlines.json", (request, response) => {
    const tweetRequests = Promise.all([
        getHeadlines("DeutscheWelle"),
        getHeadlines("PinkNews"),
        getHeadlines("BBCWorld"),
    ]);
    tweetRequests.then((tweets) => {
        response.json(tweets.flat());
    });
});
app.listen(8080, () => console.log("Im listening...."));
