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
            console.log(chalk.blue("405 - METHOD NOT ALLOWED"));
            response.statusCode = 405;
            response.end();
        }

        //normalise the path
        //to do: make sure user cant get anything thats not in the project folder --> 404
        // console.log(`BEFORE: ${myPath}`);
        let myPath = path.normalize(`${__dirname}/projects${url}`);
        // console.log(`AFTER: ${myPath}`);

        if (!myPath.startsWith(__dirname + "/projects")) {
            console.log(chalk.blue("403 - FORBIDDEN"));
            response.statusCode = 403;
            return response.end();
        }
        // does this file exist? no --> 404 no such file
        fs.stat(myPath, (error, stats) => {
            if (error) {
                console.log(chalk.blue("404 - NOT FOUND*"));
                console.log(chalk.red(`${myPath}`));
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

                    fs.stat(`${myPath}index.html`, (anotherError, stats) => {
                        if (anotherError) {
                            console.log(chalk.blue("404 - NOT FOUND"));
                            console.log(chalk.red(`${myPath}index.html`));
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
                    });
                } else {
                    // no directory --> 200 serve file!
                    response.statuscode = 200;
                    const fileExtension = path.extname(url);
                    console.log(chalk.yellow("url", url));
                    setMyHeader(response, fileExtension);
                    console.log(chalk.blue("200 - OK"));
                    respondThroughPipedStream(fs, myPath, response);
                }
            }
        });
    })
    .listen("8080", () =>
        console.log("---- PORTFOLIO SERVER .... listening .... ----")
    );

const setMyHeader = (response, fileExtension) => {
    console.log(chalk.yellow("ext", fileExtension));
    switch (fileExtension) {
        case ".html":
            response.setHeader("Content-Type", "text/html");
            break;
        case ".css":
            response.setHeader("Content-Type", "text/css");
            break;
        case ".js":
            response.setHeader("Content-Type", "text/javascript");
            break;
        case ".json":
            response.setHeader("Content-Type", "application/json");
            break;
        case ".gif":
            response.setHeader("Content-Type", "image/gif");
            break;
        case ".jpg":
            response.setHeader("Content-Type", "image/jpeg");
            break;
        case ".png":
            response.setHeader("Content-Type", "image/png");
            break;
        case ".svg":
            response.setHeader("Content-Type", "image/svg+xml");
            break;
    }
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
