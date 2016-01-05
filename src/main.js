////////////
//Imports //
////////////

var http = require("http");



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
     * @param  {Promise} httpServer - The resolved HTTP server promise
     * @return {Object}             - The HTTP server object
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
     * @param  {Promise} httpServer - The HTTP server object
     */
    function onFulfilled(httpServer) {
        httpServer.on("request", function (request, response) {
            switch (request.url) {
            case "/error":
                response.writeHead(404, {"Content-type": "text/plain"});
                response.end("Error page");
                break;
            case "/forecast":
                //When user goes to "/forecast..."
                response.writeHead(200, {"Content-type": "text/plain"});
                //Show forecast view
                response.end("Forecast page");
                break;
            default:
                //When user goes to "/"
                response.writeHead(200, {"Content-type": "text/plain"});
                //Show home page
                response.end("Home page");
                break;
            }
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
