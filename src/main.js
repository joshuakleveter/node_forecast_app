//Set up a Node.js server on localhost:3000
//When user goes to "/"
    //Show home page
//When user goes to "/forecast..."
    //Show forecast view

////////////
//Imports //
////////////

var http = require("http");



////////
//App //
////////

var serverPromise = new Promise(function (resolve, reject) {
    var httpServer = http.createServer();
    resolve(httpServer);
    reject("There was an error in starting the server!");
}).then(
    function onFulfilled(httpServer) {
        httpServer.listen(3000, "localhost", function () {
            process.stdout.write("The app is running at localhost:3000\n");
        });
        return httpServer;
    }
).then(
    function onFulfilled(httpServer) {
        httpServer.on("request", function (request, response) {
            response.writeHead(200, {"Content-type": "text/plain"});
            response.end("Hello World!");
        });
    }
);

serverPromise.catch(
    function onRejected(error) {
        process.stderr.write(error.message + "\n");
    }
);
