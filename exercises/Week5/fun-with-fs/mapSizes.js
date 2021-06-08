console.log("---------Map Sizes exercise Part 2---------");
const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "files");
let recursion = 1;

function mapSizes(currentFolder) {
    const folder = fs.readdirSync(currentFolder, { withFileTypes: true });

    //create object & add properties
    const object = {};

    //loop
    for (const item in folder) {
        console.log("NAME: ", folder[item].name);
        const fullPath = path.join(currentFolder, folder[item].name);
        // console.log(item, fullPath);
        let propName = folder[item].name;

        //Folder
        //name & children
        if (folder[item].isDirectory()) {
            // //call recursively
            object[propName] = mapSizes(fullPath);
            return;
        }
        //File
        //name & size
        const { size } = fs.statSync(fullPath);
        object[propName] = size;
        console.log("propName", object[propName]);
        console.log("propName", object);
    }
    // console.log(object);
    return object;
}

//kick off
const o = mapSizes(root);
const JSONString = JSON.stringify(o);
console.log("JSONString: ", JSONString);
