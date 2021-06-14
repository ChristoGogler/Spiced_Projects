const basicAuth = require("basic-auth");

const user = { name: "me", pass: "you" };
const users = {
    user1: { name: "me", pass: "you" },
    user2: { name: "you", pass: "me" },
    user3: { name: "angela", pass: "merkel" },
};

const authenticate = (request, response, next) => {
    console.log("....authenticating....");
    const credentials = basicAuth(request);
    console.log(credentials);
    console.log(user);
    if (
        !credentials ||
        credentials.name != user.name ||
        credentials.pass != user.pass
    ) {
        response.setHeader(
            "WWW-Authenticate",
            'Basic realm="Please enter name and password to enter this page."'
        );
        response.sendStatus(401);
        return;
    }
    next();
};

const exporting = {
    authenticate,
};

//export
module.exports = exporting;
