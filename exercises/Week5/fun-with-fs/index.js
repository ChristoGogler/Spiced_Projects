const fs = require("fs");
const path = require("path");
const root = __dirname;
// logSizes
// 1 parameter: 1) string - current path of folder
//do: log all files/folders recursively
function logSizes(currentFolder) {
    // console.log("PATH: ", currentFolder);
    //console.log("ROOT", root);

    //read directory, withFileTypes: true created dirent object, throws error if cant be read
    fs.readdir(
        currentFolder,
        { withFileTypes: true },
        function (error, folder) {
            if (error) {
                console.log("Oh ohh! ", error);
                return;
            }
            //loop over each file/folder in folders
            for (const item in folder) {
                const fullPath = getPath(currentFolder, folder[item].name);

                //decide if its a folder or file
                //FOLDER
                if (folder[item].isDirectory()) {
                    //call recursively
                    logSizes(fullPath);
                    return;
                }
                //FILE
                fs.stat(fullPath, (error, stats) => {
                    if (error) {
                        console.log("Oh ohh! ", error);
                        return;
                    }
                    const { size } = stats;
                    // log the file
                    console.log(`${getPath(root, fullPath)} : ${size}`);
                });
            }
        }
    );
}

function getPath(parent, child) {
    return path.join(parent, child);
}

//kick off
logSizes(".");
