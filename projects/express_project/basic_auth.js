const basicAuth = require("basic-auth");

// const user = { name: "me", pass: "you" };
const users = {
    user1: { name: "me", pass: "you" },
    user2: { name: "you", pass: "me" },
    user3: { name: "angela", pass: "merkel" },
};

const authenticate = (request, response, next) => {
    console.log("....authenticating....");
    const credentials = basicAuth(request);

    if (!credentials || !check(credentials.name, credentials.pass)) {
        response.setHeader(
            "WWW-Authenticate",
            'Basic realm="Please enter name and password to enter this page."'
        );
        response.sendStatus(401);
        return;
    }
    next();
};

const check = (cname, cpass) => {
    for (const user in users) {
        const { name, pass } = users[user];
        if (cname === name && cpass === pass) {
            console.log("Authentication successful!");
            return true;
        }
    }
    console.log("Access denied!");
    return false;
};

const exporting = {
    authenticate,
};

//export
module.exports = exporting;
