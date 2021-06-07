console.log("NODE MODULES EXERCISE");

//integrate module
const myModule = require("./myNodeModule.js");

//dissectURL
//no parameters
//do: separate a url passed via cmd line into its parts and log them
//no return
function dissectURL() {
    //get the arguments that were passed through the cmd line
    const [, , ...urlArg] = process.argv;
    const myUrl = urlArg.toString();
    const urlObject = myModule.getUrlObject(myUrl);
    myModule.logProps(urlObject);
}
dissectURL();
