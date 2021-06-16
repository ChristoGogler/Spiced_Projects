const fs = require("fs");

const exporting = {
    writeJSON,
    createHeadlines: createHeadlineArray,
    getHeadline,
    getUrl,
};

//export
module.exports = exporting;

//writeJSON
//write a jso file from all the tweets
function writeJSON(tweets) {
    let jsonString = createHeadlineArray(tweets);
    jsonString = JSON.stringify(jsonString, null, 4);
    fs.writeFile("headlines.json", jsonString, function (error) {
        if (error) {
            console.log(error);
            return;
        }
        console.log("successfully saved headlines.json");
    });
}

//createHeadlines---------------------
//create array containing objects containing headlines and link
function createHeadlineArray(tweets) {
    console.log("---> createHeadlines <---");
    const array = [];
    for (const tweet of tweets) {
        const headline = getHeadline(tweet);
        const url = getUrl(tweet);
        const obj = {
            headline: headline,
            href: url,
        };
        array.push(obj);
    }
    return array;
}

//getUrl---------------------
// extract link from tweet
function getUrl(tweet) {
    console.log("---> getUrl <---");
    // console.log(tweet.entities.urls);
    if (!tweet.entities) {
        return;
    }
    console.log("Tweet", tweet.entities);
    if (!tweet.entities.urls[0]) {
        return;
    }
    const link = tweet.entities.urls[0].url;
    console.log(link);
    return link;
}

//getHeadline---------------------
// extract headline text from tweet
function getHeadline(tweet) {
    console.log("---> getHeadline <---");
    let headline = tweet.full_text;
    headline = headline.split("http", 1).toString();
    headline = headline.trim();

    return headline;
}
