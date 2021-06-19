const https = require("https");
const twittersecret = require("./twitter_secret.json");

const exporting = {
    makeARequest,
    getCredentials,
};

//export
module.exports = exporting;

// makeARequest---------------------
// make a request to the server with prespecified parameters
function makeARequest(parameters, requestBody) {
    return new Promise((resolve, reject) => {
        console.log("---> makeRequest <---");

        //argument validations
        // validateRequestParameters(parameters, callback, requestBody);

        //send request
        const request = https.request(parameters, createBody);

        request.end(requestBody);

        //createBody
        function createBody(response) {
            console.log(response.headers.status);
            console.log("---> createBody <---");
            let body = "";
            response.on("data", (part) => (body += part));
            response.on("end", () => {
                try {
                    const parsedBody = JSON.parse(body);
                    resolve(parsedBody);
                } catch (error) {
                    reject(new Error("ERROR parsing JSON"));
                }
            });
            request.on("ERROR ", (error) => {
                reject(error);
            });
        }
    });
}

function validateRequestParameters(parameters, callback, requestBody) {
    if (!parameters.method) {
        callback(new Error("missing method parameter"));
        return;
    } else if (parameters.method == "POST") {
        // console.log("post");
        if (!parameters.headers["Content-Type"]) {
            callback(new Error("missing headers.Content-Type parameter"));
            return;
        }
        if (!requestBody) {
            callback(new Error("missing request body"));
            return;
        }
    }
    if (!parameters.host) {
        callback(new Error("missing host parameter"));
        return;
    }
    if (!parameters.path) {
        callback(new Error("missing path parameter"));
        return;
    }
    if (!parameters.headers.Authorization) {
        callback(new Error("missing headers.Authorization parameter"));
        return;
    }
}

//getCredentials---------------------
//get the twitter API credentials from secret json file
function getCredentials() {
    let concatenatedString = twittersecret.Key + ":" + twittersecret.Secret;
    let base64encodedString =
        Buffer.from(concatenatedString).toString("base64");
    return `Basic ${base64encodedString}`;
}
