console.log("---------Map Sizes exercise Part 2---------");
const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "files");

function mapSizes(currentFolder) {
    const folderContents = fs.readdirSync(currentFolder, {
        withFileTypes: true,
    });
    //create object & add properties
    const object = {};

    //loop
    folderContents.forEach((item) => {
        const fullPath = path.join(currentFolder, item.name);

        let propName = item.name;

        //Folder
        if (item.isDirectory()) {
            // //call recursively
            object[propName] = mapSizes(fullPath);
            return;
        }
        //File
        const { size } = fs.statSync(fullPath);
        object[propName] = size;
    });

    //not working!
    // for (const item in folderContents) {
    //     const fullPath = path.join(currentFolder, folderContents[item].name);

    //     let propName = folderContents[item].name;

    //     //Folder
    //     if (folderContents[item].isDirectory()) {
    //         // //call recursively
    //         object[propName] = mapSizes(fullPath);
    //     }
    //     //File
    //     const { size } = fs.statSync(fullPath);
    //     object[propName] = size;
    // }

    return object;
}

//kick off
const o = mapSizes(root);
// console.log(o);
const JSONString = JSON.stringify(o, null, 4);
fs.writeFileSync("myFile.json", JSONString);
// console.log("JSONString: ", JSONString);
