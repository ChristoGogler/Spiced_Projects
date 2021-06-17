const fs = require("fs");

const exporting = {
    writeJsonFile,
    // createJsonString,
    createJsonString2,
    getHeadline,
    getUrl,
};

//export
module.exports = exporting;

//writeJSON
//write a jso file from all the tweets
function writeJsonFile(jsonString) {
    return new Promise((resolve, reject) => {
        console.log("---> writeJSON <---");

        fs.writeFile("headlines.json", jsonString, function (error) {
            if (error) {
                reject(error);
            }
            resolve("Successfully saved headlines.json");
        });
    });
}

//createJsonString---------------------
//create array containing objects containing headlines and link
// function createJsonString(tweets) {
//     return new Promise((resolve, reject) => {
//         console.log("---> createJsonString <---");
//         const array = [];
//         // console.log(tweets);
//         for (const tweet of tweets) {
//             const headline = getHeadline(tweet);
//             const url = getUrl(tweet);
//             const obj = {
//                 headline: headline,
//                 href: url,
//             };
//             array.push(obj);
//         }
//         resolve(JSON.stringify(array, null, 4));
//     });
// }

function createJsonString2(newsSource, tweets) {
    return new Promise((resolve, reject) => {
        console.log("---> createJsonString2 <---");
        console.log();
        const selectedTweets = tweets
            //filter for tweets that have a url
            .filter((tweet) => {
                // console.log("Tweet", tweet.entities.urls.length);
                return tweet.entities.urls.length;
            })
            .map((tweet) => {
                const link = getUrl(tweet);
                return {
                    text: getHeadline(newsSource, tweet),
                    url: link,
                };
            });
        // console.log("selectedTweets", selectedTweets);
        resolve(selectedTweets);
    });
}

//getUrl---------------------
// extract link from tweet
function getUrl(tweet) {
    console.log("---> getUrl <---");
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
function getHeadline(newsSource, tweet) {
    console.log("---> getHeadline <---");
    let headline = tweet.full_text;
    headline = headline.split("http", 1).toString();
    headline = headline.trim();
    headline += ` [${newsSource}]`;

    return headline;
}
