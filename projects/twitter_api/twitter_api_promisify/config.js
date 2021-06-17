//configurable
const twitterProfileName = "PinkNews";
const numberOfTweets = 10;

//POST REQUEST
const postPara = {
    host: "api.twitter.com",
    path: "/oauth2/token",
    contenttype: "application/x-www-form-urlencoded;charset=UTF-8",
};
//GET REQUEST
const getPara = {
    host: "api.twitter.com",
    path: "/1.1/statuses/user_timeline.json",
    // queryString: `?count=${numberOfTweets}&screen_name=${twitterProfileName}&tweet_mode=extended&exclude_replies=true`,
    contenttype: "application/x-www-form-urlencoded;charset=UTF-8",
};

const exporting = {
    // numberOfTweets,
    postPara,
    getPara,
};

//export
module.exports = exporting;
