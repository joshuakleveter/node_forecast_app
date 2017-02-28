////////////
//Imports //
////////////

var http = require("http");
var router = require("./js/router.js");



////////
//App //
////////

var httpServer = http.createServer()
.listen(3000, "localhost", function() {
    process.stdout.write(`The app is running at ${httpServer.address().address}:${httpServer.address().port}`);
})
.on("request", function(request, response) {
    router.route(request, response);
})
.on("error", function(error) {
    process.stderr.write(`${error.message}\n`);
});