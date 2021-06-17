const express = require("express");
const path = require("path");
const { getHeadlines, getTwitterToken, getTweets } = require("./index");
const { createJsonString2 } = require("./writeFile");

const app = express();

app.use(express.static(path.join(__dirname + "/ticker")));
console.log(path.join(__dirname + "/ticker"));

app.get("/headlines.json", (request, response) => {
    getTwitterToken().then((token) => {
        const promises = [
            getTweets("DeutscheWelle", 3, token).then((tweets) => {
                return createJsonString2("DeutscheWelle", tweets);
            }),
            getTweets("PinkNews", 3, token).then((tweets) => {
                return createJsonString2("PinkNews", tweets);
            }),
            getTweets("BBCWorld", 3, token).then((tweets) => {
                return createJsonString2("BBCWorld", tweets);
            }),
        ];

        Promise.all(promises).then((tweets) => {
            console.log("DONE!");
            response.json(tweets.flat());
        });
    });
});

app.listen(8080, () => console.log("Im listening...."));
