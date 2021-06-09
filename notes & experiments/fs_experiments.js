const fs = require("fs");
const path = require("path");

console.log("folder where the js file is", __dirname);

console.log("folder where I run the cmd", process.cwd());

//asynchronous version
fs.readdir(".", (error, files) => {
    if (error) {
        console.log(error);
        return;
    }
    console.log(files);
});

//synchronous version

//with try catch, trying to log files, catching an error

const files = fs.readdirSync(".");
console.log(files);
