const fs = require("fs");

const exporting = {
    writeJSON,
    createHeadlines,
    getHeadline,
    getUrl,
};

//export
module.exports = exporting;

//writeJSON
function writeJSON(tweets) {
    let jsonString = createHeadlines(tweets);
    console.log("before:", jsonString);
    jsonString = JSON.stringify(jsonString, null, 4);
    console.log("stringified:", jsonString);
    fs.writeFile("headlines.json", jsonString, function (error) {
        if (error) {
            console.log(error);
            return;
        }
        console.log("successfully saved headlines.json");
    });
}

//createHeadlines---------------------
function createHeadlines(tweets) {
    console.log("---> createHeadlines <---");
    const array = [];
    // console.log("TWEET", tweets[0].entities.urls[0].url);
    for (const tweet of tweets) {
        // console.log("TWEET: ", tweet);
        const headline = getHeadline(tweet);
        // console.log(headline);
        const url = getUrl(tweet);
        // console.log(url);
        const obj = {
            headline: headline,
            href: url,
        };
        array.push(obj);
    }
    return array;
}

//getUrl---------------------
function getUrl(tweet) {
    if (!tweet.entities) {
        return;
    }
    const link = JSON.stringify(tweet.entities.urls[0].url);

    return link;
}

//getHeadline---------------------
function getHeadline(tweet) {
    let headline = tweet.full_text;
    headline = headline.split("http", 1).toString();
    headline = headline.trim();

    return headline;
}
