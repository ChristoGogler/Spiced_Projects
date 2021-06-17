console.log("----- TWITTER API EXERCISE -----");

const path = require("path");
const { createJsonString2 } = require("./writeFile");
const { postPara, getPara } = require("./config");
const { makeARequest, getCredentials } = require("./makeARequest");

const exporting = {
    getTwitterToken,
};
//export
module.exports = exporting;

//ENTRY POINT
getHeadlines(); //add newsources here later as parameter
// .then(() => {
//     console.log("getTwitterToken");
//     getTwitterToken();
// })
// .then((token) => {
//     getTweets(token);
// })
// .then((tweets) => {
//     createJsonString2(tweets);
// })
// .catch((error) => {
//     console.log(error);
// });

//promisified!
getHeadlines().then((data) => console.log("DATA:", data));

function getHeadlines() {
    return new Promise((resolve, reject) => {
        getTwitterToken().then((token) => {
            getTweets(token).then((tweets) => {
                createJsonString2(tweets).then((jsonString) => {
                    resolve(jsonString);
                });
            });
        });
    });
}

//this version is still asynchronous
// function getHeadlines() {
//     return new Promise((resolve, reject) => {
//         getTwitterToken()
//             .then((token) => {
//                 getTweets(token);
//             })
//             .then((tweets) => {
//                 createJsonString2(tweets);
//             })
//             .then((jsonString) => {
//                 resolve(jsonString);
//             })
//             .catch((error) => {
//                 console.log(error);
//             });
//     });
// }

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
