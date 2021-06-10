(function () {
    const http = require("http");
    const fs = require("fs");
    const path = require("path");

    const chalk = require("chalk");

    const server = http.createServer();

    server
        .on("request", (request, response) => {
            console.log("---- REQUEST INCOMING ----");
            const { method, url } = request;

            if (method != "GET") {
                // other types (post, put, etc.) should result in a 405 (= method not allowed)
                response.statusCode = 405;
                response.end();
            }

            // console.log(`[URL]: ${url}`);
            //normalise the path
            //to do: make sure user cant get anything thats not in the project folder --> 404
            const myPath = path.normalize(`${__dirname}/projects${url}`);
            // console.log(`[MYPATH]: ${myPath}`);

            // does this file exist? no --> 404 no such file
            fs.stat(myPath, (error, stats) => {
                if (error) {
                    console.log(chalk.blue("404 - NOT FOUND"));
                    response.statusCode = 404;
                    response.end();
                    return; //early return: no such file!
                } else {
                    //yes
                    //isDirectory?
                    if (stats.isDirectory()) {
                        //yes
                        //ends in slash?
                        if (myPath.charAt(myPath.length - 1) !== "/") {
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
                            `${myPath}index.html`,
                            (anotherError, stats) => {
                                if (anotherError) {
                                    console.log(chalk.blue("404 - NOT FOUND"));
                                    response.statusCode = 404;
                                    response.end();
                                    return; //early return: no such file!
                                }
                                //yes --> serve index.html
                                respondThroughPipedStream(
                                    fs,
                                    `${myPath}index.html`,
                                    response
                                );
                            }
                        );
                    } else {
                        //no --> 200 serve file!
                        console.log(chalk.blue("200 - OK"));
                        respondThroughPipedStream(fs, myPath, response);
                    }
                }
            });
        })
        .listen("8080", () =>
            console.log("---- PORTFOLIO SERVER .... listening .... ----")
        );
})();

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
