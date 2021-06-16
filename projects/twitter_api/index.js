console.log("----- TWITTER API EXERCISE -----");

const path = require("path");
const writeFile = require("./writeFile");
const { postPara, getPara } = require("./config");
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
        host: postPara.host,
        path: postPara.path,
        headers: {
            Authorization: getCredentials(),
            "Content-Type": postPara.contenttype,
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
    const twitGetParameters = {
        //specify parameters
        method: "GET",
        host: getPara.host,
        path: path.join(getPara.path + getPara.queryString),
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
