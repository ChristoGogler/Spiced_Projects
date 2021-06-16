console.log("----- TWITTER API EXERCISE -----");

const https = require("https");
const { url } = require("inspector");
const twittersecret = require("./twitter_secret.json");
// console.log(twittersecret);
const writeFile = require("./writeFile");

const parameters = {
    //specify parameters
    method: "GET",
    host: "spicedify.herokuapp.com",
    path: "/spotify?q=madonna&type=artist",
};

//ENTRY POINT
getTwitterToken(getTweets);

//getTwitterToken---------------------
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
    makeARequest(twitPostParameters, postBody, (tokenObject, error) => {
        if (error) {
            console.log("Error making POST request to get token ", error);
            return;
        }
        callback(tokenObject);
    });
}
//getTweets---------------------
function getTweets(tokenObject) {
    console.log("---> getTweets <---");
    console.log("tokenObject:", tokenObject);
    const token = tokenObject[`access_token`];
    // GET /1.1/statuses/user_timeline.json?count=10&screen_name=PinkNews
    //PinkNews

    const queryString =
        "?count=5&screen_name=PinkNews&tweet_mode=extended&exclude_replies=true";
    const twitGetParameters = {
        //specify parameters
        method: "GET",
        host: "api.twitter.com",
        path: "/1.1/statuses/user_timeline.json" + queryString, //?!?!?!
        headers: {
            Authorization: "Bearer " + token,
        },
    };
    makeARequest(twitGetParameters, null, (tweets, error) => {
        if (error) {
            console.log("Error making a request for tweets", error);
            return;
        }

        //write a json file
        writeFile.writeJSON(tweets);
    });
}

// makeRequest---------------------
function makeARequest(parameters, requestBody, callback) {
    console.log("---> makeRequest <---");
    // console.log("PARAMETERS: ", parameters);
    //send request
    const request = https.request(parameters, createBody);
    request.end(requestBody);

    //requestCallback
    function createBody(response) {
        console.log("---> createBody <---");

        // console.log(`RESPONSE HEADERS -----> ${response.headers}`);
        let body = "";
        response.on("data", (part) => {
            return (body += part);
        });
        response.on("end", () => {
            // console.log("Access Token Received : ----->", JSON.parse(body).access_token);
            try {
                const parsedBody = JSON.parse(body);
                // console.log("parsed Body: ", typeof parsedBody, parsedBody);
                callback(parsedBody);
            } catch (error) {
                console.log("ERROR Parsing JSON", error);
            }
        });
    }
}

//getCredentials---------------------
function getCredentials() {
    let concatenatedString = twittersecret.Key + ":" + twittersecret.Secret;
    let base64encodedString =
        Buffer.from(concatenatedString).toString("base64");
    return `Basic ${base64encodedString}`;
}

// getCredentials();
// let credentialstring = getCredentials();
// console.log("credentialstring", credentialstring);
