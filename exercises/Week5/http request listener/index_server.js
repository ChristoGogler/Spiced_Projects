(function () {
    console.log("-----HTTP REQUEST LISTENER-----");

    //requirements
    const http = require("http");

    const server = http.createServer();

    //add request listener
    //also like this: const server = http.createServer((request, response) => {});
    server
        .on("request", (request, response) => {
            const { url, method, headers } = request;
            console.log("---- REQUEST INCOMING ----");
            console.log(`URL: ${url} ---- METHOD: ${method} ----`);
            console.log("HEADERS: ", headers);

            //create empty array to store incoming message chunks
            let body = [];
            request
                .on("data", (chunk) => {
                    body.push(chunk);
                })
                //then turn them into a concatenated string
                .on("end", () => {
                    body = Buffer.concat(body).toString();

                    if (method === "GET") {
                        getHandler(response);
                    } else if (method === "HEAD") {
                        headHandler(response);
                    } else if (method === "POST") {
                        postHandler(body, response);
                    } else {
                        response.statuscode = 405;
                    }
                    console.log(`STATUSCODE: ${response.statuscode}`);
                    response.end();
                })
                //handle request error
                .on("error", (error) => {
                    console.log(`Error receiving request:  ${error}`);
                });
            //handle response error
            response.on("error", (error) => {
                console.log(`Error creating response:  ${error}`);
            });
        })
        //listen on port
        .listen("8080");

    const writeBody = (response) => {
        response.write("<!doctype html>");
        response.write("<html>");
        response.write("<title>Hello World!</title>");
        response.write("<p>Hello World!</p>");
        response.write("</html>");
        response.end();
    };

    const postHandler = (body, response) => {
        console.log(`Body incoming: ${body}`);
        response.statuscode = 302;
        response.setHeader("Location", "/otherpage");
    };

    const headHandler = (response) => {
        response.statuscode = 200;
        response.setHeader("Content-Type", "text/html");
    };

    const getHandler = (response) => {
        response.statuscode = 200;
        response.setHeader("Content-Type", "text/html");
        writeBody(response);
    };
})();
