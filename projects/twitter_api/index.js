console.log("----- TWITTER API EXERCISE -----");

const writeFile = require("./writeFile");
const { makeARequest, getCredentials } = require("./makeARequest");
const { screenname, numberOfTweets } = require("./config");

//ENTRY POINT
//pass getTweets as callback
getTwitterToken(getTweets);

//getTwitterToken---------------------
//make a POST request and receive a token
function getTwitterToken(callback) {
    console.log("---> getTwitterToken <---");

    const postBody = "grant_type=client_credentials";
    const twitPostParameters = {
        //specify parameters
        method: "POST",
        host: "api.twitter.com",
        path: "/oauth2/token",
        headers: {
            Authorization: getCredentials(),
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
    };
    //call makeARequest and pass callback function that will call getTweets if successful
    makeARequest(twitPostParameters, postBody, (tokenObject, error) => {
        if (error) {
            console.log("Error making POST request to get token ", error);
            return;
        }
        //call getTweets with the received token
        callback(tokenObject);
    });
}

//getTweets---------------------
//make GET request and receive an object of tweets
//authenticate with token
function getTweets(tokenObject) {
    console.log("---> getTweets <---");
    const token = tokenObject[`access_token`];
    const queryString = `?count=${numberOfTweets}&screen_name=${screenname}&tweet_mode=extended&exclude_replies=true`;
    const twitGetParameters = {
        //specify parameters
        method: "GET",
        host: "api.twitter.com",
        path: "/1.1/statuses/user_timeline.json" + queryString,
        headers: {
            Authorization: "Bearer " + token,
        },
    };
    //call makeARequest and pass callback function that will call a function to write a json file if successful
    makeARequest(twitGetParameters, null, (tweets, error) => {
        if (error) {
            console.log("Error making a request for tweets", error);
            return;
        }

        //write a json file
        writeFile.writeJSON(tweets);
    });
}
