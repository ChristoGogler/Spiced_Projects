console.log("----- TWITTER API EXERCISE -----");

const path = require("path");
const { createJsonString2 } = require("./writeFile");
const { postPara, getPara } = require("./config");
const { makeARequest, getCredentials } = require("./makeARequest");

const exporting = {
    getTwitterToken,
    getHeadlines,
    getTweets,
};
//export
module.exports = exporting;

//ENTRY POINT

function getHeadlines(newsSource, numberOfTweets) {
    return new Promise((resolve, reject) => {
        getTwitterToken()
        .then((token) => {
            return getTweets(newsSource, numberOfTweets, token)})
        .then((tweets) => {
            return createJsonString2(newsSource, tweets);
                });
        });
}


//getTwitterToken---------------------
//make a POST request and receive a token
function getTwitterToken() {
    return new Promise((resolve, reject) => {
        console.log("---> getTwitterToken <---");

        const postBody = "grant_type=client_credentials";
        // console.log("CREDENTIALS: ", getCredentials());
        const twitPostParameters = {
            //specify parameters
            method: "POST",
            host: postPara.host,
            path: postPara.path,
            headers: {
                Authorization: getCredentials(),
                "Content-Type": postPara.contenttype,
            },
        };
        //call makeARequest and pass callback function that will call getTweets if successful
        makeARequest(twitPostParameters, postBody)
            .then((tokenObject) => {
                //call getTweets with the received token
                return resolve(tokenObject);
            })
            .catch((error) => {
                return reject(error);
            });
    });
}

//getTweets---------------------
//make GET request and receive an object of tweets
//authenticate with token
function getTweets(newsSource, numberOfTweets, tokenObject) {
    return new Promise((resolve, reject) => {
        console.log("---> getTweets <---");
        const token = tokenObject[`access_token`];
        const queryString = `?count=${numberOfTweets}&screen_name=${newsSource}&tweet_mode=extended&exclude_replies=true`;
        const twitGetParameters = {
            //specify parameters
            method: "GET",
            host: getPara.host,
            path: path.join(getPara.path + queryString),
            headers: {
                Authorization: "Bearer " + token,
            },
        };
        //call makeARequest and pass callback function that will call a function to write a json file if successful
        makeARequest(twitGetParameters, null)
            .then((tweets) => {
                return resolve(tweets);
            })
            .catch((error) => {
                return reject(error);
            });
    });
}
