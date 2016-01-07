////////////
//Imports //
////////////

var http = require("http");
var router = require("./js/router.js");



////////
//App //
////////

/**
 * Create an HTTP server
 * @return {Promise} - Node.js HTTP server
 */
var serverPromise = new Promise(function (resolve, reject) {
    var httpServer = http.createServer();
    resolve(httpServer);
    reject("There was an error in starting the server!");
}).then(
    /**
     * If serverPromise is fulfilled
     * Begin listening on localhost:3000
     */
    function onFulfilled(httpServer) {
        //Set up a Node.js server on localhost:3000
        httpServer.listen(3000, "localhost", function () {
            process.stdout.write("The app is running at localhost:3000\n");
        });
        return httpServer;
    }
).then(
    /**
     * Handle any HTTP requests from the client
     */
    function onFulfilled(httpServer) {
        httpServer.on("request", function (request, response) {
            router.route(request, response);
        });
    }
);

/**
 * Catch any errors thrown in the promise chain
 * and log the error to stderr
 */
serverPromise.catch(
    function onRejected(error) {
        process.stderr.write(error.message + "\n");
    }
);
