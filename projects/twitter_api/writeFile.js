const fs = require("fs");

const exporting = {
    writeJsonFile,
    createJsonString,
    getHeadline,
    getUrl,
};

//export
module.exports = exporting;

//writeJSON
//write a jso file from all the tweets
function writeJsonFile(jsonString, callback) {
    console.log("---> writeJSON <---");
    // let jsonString = createHeadlineArray(tweets);

    //auskommentiert zur Probe
    fs.writeFile("headlines.json", jsonString, function (error) {
        if (error) {
            console.log(error);
            return;
        }
        callback("Successfully saved headlines.json");
    });
}

//createHeadlines---------------------
//create array containing objects containing headlines and link
function createJsonString(tweets, callback) {
    console.log("---> createHeadlineArray <---");
    const array = [];
    // console.log(tweets);
    for (const tweet of tweets) {
        const headline = getHeadline(tweet);
        const url = getUrl(tweet);
        const obj = {
            headline: headline,
            href: url,
        };
        array.push(obj);
    }

    callback(JSON.stringify(array, null, 4));
}

//getUrl---------------------
// extract link from tweet
function getUrl(tweet) {
    // console.log("---> getUrl <---");
    // console.log(tweet.entities.urls);
    if (!tweet.entities) {
        return;
    }
    if (!tweet.entities.urls[0]) {
        return;
    }
    const link = tweet.entities.urls[0].url;
    return link;
}

//getHeadline---------------------
// extract headline text from tweet
function getHeadline(tweet) {
    // console.log("---> getHeadline <---");
    let headline = tweet.full_text;
    headline = headline.split("http", 1).toString();
    headline = headline.trim();

    return headline;
}
