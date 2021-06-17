console.log("----- TWITTER API EXERCISE -----");

const path = require("path");
const { writeJsonFile, createJsonString } = require("./writeFile");
const { postPara, getPara } = require("./config");
const { makeARequest, getCredentials } = require("./makeARequest");
const chalk = require("chalk");
// const { screenname, numberOfTweets } = require("./config");

//ENTRY POINT
getHeadlines((successMsg, error) => {
    if (error) {
        console.log(chalk.red("OH ohhhhh!:", error));
        return;
    }
    console.log("Congrats, you made it!", successMsg);
});

//getHeadlines
// get twitter tweets from twitter and save them in a file
function getHeadlines(callback) {
    getTwitterToken((token, error) => {
        if (error) {
            console.log(chalk.red("Error [getTwitterToken]", error));
        }
        getTweets(token, (tweets, error) => {
            if (error) {
                console.log(chalk.red("Error [getTweets]", error));
            }
            createJsonString(tweets, (jsonString, error) => {
                if (error) {
                    console.log(chalk.red("Error [createJsonString]", error));
                }
                writeJsonFile(jsonString, (successMessage, error) => {
                    if (error) {
                        console.log(chalk.red("Error [writeJsonFile]", error));
                    }
                    callback(successMessage);
                });
            });
        });
    });
}

//getTwitterToken---------------------
//make a POST request and receive a token
function getTwitterToken(callback) {
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
function getTweets(tokenObject, callback) {
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
        callback(tweets);
    });
}
