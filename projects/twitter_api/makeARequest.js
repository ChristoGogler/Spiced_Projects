const https = require("https");
const twittersecret = require("./twitter_secret.json");

const exporting = {
    makeARequest,
    getCredentials,
};

//export
module.exports = exporting;

// makeRequest---------------------
function makeARequest(parameters, requestBody, callback) {
    console.log("---> makeRequest <---");
    //send request
    const request = https.request(parameters, createBody);
    request.end(requestBody);

    //createBody
    function createBody(response) {
        console.log("---> createBody <---");
        let body = "";
        response.on("data", (part) => {
            return (body += part);
        });
        response.on("end", () => {
            try {
                const parsedBody = JSON.parse(body);
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