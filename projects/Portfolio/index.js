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
            console.log(
                chalk.yellow(
                    `.... Processor ${process.pid} in handling the request ....`
                )
            );
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
                        //get the file extension and set the header accordingly
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

    //setMyHeader
    //2 parameter: 1) response, 2) fileExtension of the requested file
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

    //respondThroughPipedStream
    //3 parameters: 1) fs (filesystem), 2) myPath - normalised path, 3) response
    //do: create read stream and connect
    const respondThroughPipedStream = (fs, myPath, response) => {
        const readStream = fs.createReadStream(myPath);
        try {
            readStream.pipe(response);
        } catch (error) {
            console.log(`ERROR piping readStream & response : ${error}`);
            response.statusCode = 404;
            response.end();
            return;
        }
    };
})();
