(function () {
    const http = require("http");
    const fs = require("fs");
    const path = require("path");
    const portfolio = require("./portfolio");

    const chalk = require("chalk");

    const server = http.createServer();

    server
        .on("request", (request, response) => {
            console.log("---- REQUEST INCOMING ----");
            const { method, url } = request;

            if (method != "GET") {
                // other types (post, put, etc.) should result in a 405 (= method not allowed)
                console.log(chalk.blue("405 - METHOD NOT ALLOWED"));
                response.statusCode = 405;
                response.end();
            }

            let normalisedPath = path.normalize(`${__dirname}/projects${url}`);

            if (url == "/") {
                response.end(portfolio.createTableOfContents());
            }

            if (!normalisedPath.startsWith(__dirname + "/projects")) {
                console.log(chalk.blue("403 - FORBIDDEN"));
                response.statusCode = 403;
                return response.end();
            }
            // does this file exist? no --> 404 no such file
            fs.stat(normalisedPath, (error, stats) => {
                if (error) {
                    console.log(
                        chalk.blue(`404 - NOT FOUND!`),
                        chalk.red(error)
                    );

                    response.statusCode = 404;
                    response.end();
                    return;
                } else {
                    //yes //isDirectory?
                    if (stats.isDirectory()) {
                        //yes //ends in slash?
                        if (
                            normalisedPath.charAt(normalisedPath.length - 1) !==
                            "/"
                        ) {
                            console.log(chalk.blue("302 - REDIRECT"));
                            //no --> 302 redirect to "/"
                            response.statusCode = 302;
                            response.setHeader(`Location`, `${url}/`);
                            response.end();
                            return;
                        }
                        //yes
                        //is there index.html? no --> 404

                        fs.stat(
                            `${normalisedPath}index.html`,
                            (anotherError, stats) => {
                                if (anotherError) {
                                    console.log(
                                        chalk.blue(`404 - NOT FOUND!`),
                                        chalk.red(anotherError)
                                    );
                                    response.statusCode = 404;
                                    response.end();
                                    return;
                                }
                                //yes --> serve index.html
                                respondThroughPipedStream(
                                    fs,
                                    `${normalisedPath}index.html`,
                                    response
                                );
                            }
                        );
                    } else {
                        // no directory --> 200 serve file!
                        const fileExtension = path.extname(url);
                        setMyHeader(response, fileExtension);
                        console.log(chalk.yellow("url", url));
                        console.log(chalk.blue("200 - OK"));
                        respondThroughPipedStream(fs, normalisedPath, response);
                    }
                }
            });
        })
        .listen("8080", () =>
            console.log("---- PORTFOLIO SERVER .... listening .... ----")
        );

    const setMyHeader = (response, fileExtension) => {
        const contentType = {
            ".html": "text/html",
            ".css": "text/css",
            ".js": "text/jacascript",
            ".json": "application/json",
            ".gif": "image/gif",
            ".jpeg": "image/jpeg",
            ".jpg": "image/jpg",
            ".png": "image/png",
            ".svg": "image/svg+xml",
            ".xml": "image/svg+xml",
        };
        response.setHeader(`Content-Type`, contentType[fileExtension]);
    };

    const respondThroughPipedStream = (fs, myPath, response) => {
        const readStream = fs.createReadStream(myPath);
        try {
            readStream.pipe(response);
        } catch (error) {
            //404 - file does not exist
            console.log(`ERROR 404 - No such file! : ${error}`);
            response.statusCode = 404;
            // response.end();
            return; //early return: no such file!
        }
    };
})();
