const importedURL = require("url");
const importedQuerystring = require("querystring");

//this is defining the package that will be exported
const exporting = {
    logProps,
    getUrlObject,
};

function getUrlObject(url) {
    return importedURL.parse(url);
}

function makeIterable(object) {
    //making it iterable by adding iterator to object props
    object[Symbol.iterator] = function* () {
        for (const key in this) {
            // console.log(key);
            yield this[key];
        }
    };
}

function logProps(object) {
    makeIterable(object);

    //extract the data that we need
    const [protocol, , , host, port, hostname, , , query, pathname, ,] = object;

    //log the data
    console.log("The PROTOCOL is:", protocol);
    console.log("The HOST is:", host);
    console.log("The HOSTNAME is:", hostname);
    console.log("The PORT is:", port);
    console.log("The PATHNAME is:", pathname);
    console.log("The QUERY is:", query);

    //extract the paramaters from query
    const a = importedQuerystring.parse(query);
    const { ...props } = a;
    makeIterable(props);
    for (const prop in props) {
        console.log(`The Value for >${prop}< is >${props[prop]}<`);
    }
}

//export
module.exports = exporting;
