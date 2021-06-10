(function () {
    const http = require("http");
    const fs = require("fs");
    const path = require("path");

    function createTableOfContents() {
        let htmlString;

        const folderContents = fs.readdirSync("./projects", {
            withFileTypes: true,
        });

        //create object & add properties
        htmlString =
            "<!doctype html><html><head><title>Portfolio - All Projects</title></head><body><ul>";
        //loop
        folderContents.forEach((item) => {
            const { name: link } = item;
            if (item.isDirectory()) {
                htmlString += `<li><a href="./${link}/" >${link}</a></li>`;
            }
        });
        htmlString += "</ul></body></html>";
        return htmlString;
    }

    createTableOfContents();
    //this is defining the package that will be exported
    const exporting = {
        createTableOfContents,
    };

    //export
    module.exports = exporting;
})();
