console.log("----- TWITTER API EXERCISE -----");

const path = require("path");
const { writeJsonFile, createJsonString } = require("./writeFile");
const { postPara, getPara } = require("./config");
const { makeARequest, getCredentials } = require("./makeARequest");
const chalk = require("chalk");
// const { screenname, numberOfTweets } = require("./config");

//ENTRY POINT
// getHeadlines((successMsg, error) => {
//     if (error) {
//         console.log(chalk.red("OH ohhhhh!:", error));
//         return;
//     }
//     console.log("Congrats, you made it!", successMsg);
// });

//getHeadlines
// get twitter tweets from twitter and save them in a file
function getHeadlines() {
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

//promisified!
// getHeadlines().then(() => {
getTwitterToken()
    .then((token) => {
        getTweets(token)
            .then((tweets) => {
                createJsonString(tweets)
                    .then((jsonString) => {
                        writeJsonFile(jsonString)
                            .then((successMessage) => {
                                console.log(successMessage);
                            })
                            .catch((error) =>
                                console.log(
                                    chalk.red("Error [writeJsonFile]", error)
                                )
                            );
                    })
                    .catch((error) =>
                        console.log(
                            chalk.red("Error [createJsonString]", error)
                        )
                    );
            })
            .catch((error) =>
                console.log(chalk.red("Error [getTweets]", error))
            );
    })
    .catch((error) => console.log(chalk.red("Error [getTwitterToken]", error)));
// });

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
function getTweets(tokenObject) {
    return new Promise((resolve, reject) => {
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
        makeARequest(twitGetParameters, null)
            .then((tweets) => {
                return resolve(tweets);
            })
            .catch((error) => {
                return reject(error);
            });
    });
}
