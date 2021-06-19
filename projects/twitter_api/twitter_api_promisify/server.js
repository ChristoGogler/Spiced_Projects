const express = require("express");
const path = require("path");
const { getHeadlines, getTwitterToken, getTweets } = require("./index");
const { createJsonString2 } = require("./writeFile");

const app = express();

app.use(express.static(path.join(__dirname + "/ticker")));
// console.log(path.join(__dirname + "/ticker"));

app.get("/headlines.json", (request, response) => {
    getTwitterToken().then((token) => {
        const promises = [
            getTweets("DeutscheWelle", 5, token).then((tweets) => {
                return createJsonString2("DeutscheWelle", tweets);
            }),
            getTweets("PinkNews", 5, token).then((tweets) => {
                return createJsonString2("PinkNews", tweets);
            }),
            getTweets("BBCWorld", 5, token).then((tweets) => {
                return createJsonString2("BBCWorld", tweets);
            }),
        ];

        Promise.all(promises).then((tweets) => {
            // console.log("DONE!");
            const flattedTweets = 
            
            tweets.flat();
            // console.log("tweets:", tweets);
            const chronologicalTweets = flattedTweets.sort((a,b) => {
                const dateA = new Date(a.created_at);
                const dateB = new Date(b.created_at);
                if(dateA < dateB){
                    return 1;
                    
                }
                return -1;

            });
            // console.log("tweets:", chronologicalTweets);
            response.json(chronologicalTweets);
        });
    });
});

app.listen(8080, () => console.log("Im listening...."));
