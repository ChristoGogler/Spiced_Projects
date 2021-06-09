(function () {
    console.log("-----HTTP REQUEST LISTENER-----");

    //requirements
    const http = require("http");
    const querystring = require("querystring");
    const chalk = require("chalk");

    //get html data via readfile
    // const fs = require("fs");
    // const path = require("path");
    // const html = fs.readFileSync(path.resolve(__dirname, "html.txt"), "utf8");
    // console.log("TXT FILE: ", html);

    //get html data from json file
    const jsonData = require("./html.json");
    const { form, answer } = jsonData;
    // console.log("JSON FILE: ", form, answer);

    const server = http.createServer();

    //add request listener
    //also like this: const server = http.createServer((request, response) => {});
    server
        .on("request", (request, response) => {
            const { method } = request;
            console.log("---- REQUEST INCOMING ----");
            console.log(`METHOD: ${method}`);

            if (method === "GET") {
                getHandler(response);
            } else if (method === "POST") {
                postHandler(request, response);
            } else {
                response.statusCode = 405;
                response.end();
            }
        })
        //listen on port
        .listen("8082");

    const writeBody = (response) => {
        response.write(form);
        response.end();
    };

    const postHandler = (request, response) => {
        let body = [];
        request
            .on("data", (chunk) => {
                body.push(chunk);
            })
            //then turn them into a concatenated string
            .on("end", () => {
                body = Buffer.concat(body).toString();
                postResponse(response, body);
            })
            //handle request error
            .on("error", (error) => {
                console.log(`Error receiving request:  ${error}`);
            });
        //handle response error
        response.on("error", (error) => {
            console.log(`Error creating response:  ${error}`);
        });
    };

    const getHandler = (response) => {
        response.statuscode = 200;
        response.setHeader("Content-Type", "text/html");
        writeBody(response);
    };

    const postResponse = (response, body) => {
        const { color, text } = querystring.parse(body);
        console.log(chalk[color](`TEXT: ${text}`));
        response.statuscode = 200;
        response.setHeader("Content-Type", "text/html");
        response.write(
            `<!doctype html><html><title>${text}</title><a href="/" style="color:${color}">${text}</a></html>`
            //`${answer}`
        );
        response.end();
    };
})();
