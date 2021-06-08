const fs = require("fs");
const path = require("path");

// logSizes
// 1 parameter: 1) string - current path of folder
//do: log all files/folders recursively
function logSizes(currentFolder) {
    console.log("PATH: ", currentFolder);

    //read directory, withFileTypes: true created dirent object, throws error if cant be read
    fs.readdir(currentFolder, { withFileTypes: true }, function (error, files) {
        if (error) {
            console.log("Oh ohh! ", error);
        }
        // console.log("Yay! ", files);

        //loop over each file in files
        for (const file in files) {
            // console.log("file", files[file]);
            //decide if its a folder or file
            if (files[file].isDirectory()) {
                // log the folder
                console.log("FOLDER: ", files[file]);
                // console.log("FOLDER NAME: ", files[file].name);
                const fullPath = getPath(currentFolder, files[file].name);

                // console.log("FULL PATH: ", fullPath);
                //call recursively
                logSizes(fullPath);
            } else {
                // log the file
                console.log("FILE: ", files[file]);
            }
        }
        currentFolder;
    });
}

function getPath(parent, child) {
    return path.join(parent, child);
}

//kick off
logSizes(".");
