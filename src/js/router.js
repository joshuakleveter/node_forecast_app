////////////
//Imports //
////////////

var render = require("./renderer.js");



//////////////////
//Router Module //
//////////////////

/**
 * Handle app routing
 * @param  {http.ClientRequest} request   - Client request
 * @param  {http.ServerResponse} response - Server response
 * @return {http.ServerResponse}          - response object
 */
function route(request, response) {
    switch (request.url) {
        //Home page
        case "/":
            response.writeHead(200, {"Content-type": "text/html"});
            var viewPromise = render.home();
            viewPromise.then(
                function (viewArray) {
                    var view = viewArray.join("");
                    response.write(view);
                    response.end();
                }
            );
            break;
        //Forecast page
        case "/forecast":
            response.writeHead(200, {"Content-type": "text/html"});
            response.write("Forecast page");
            response.end();
            break;
        //CSS Files
        case "/css/main.css":
            response.writeHead(200, {"Content-type": "text/css"});
            //Write CSS file here
            response.end();
            break;
        //404 Errors
        default:
            response.writeHead(404, {"Content-type": "text/html"});
            response.write("404 Error");
            response.end();
            break;
    }
}


///////////////////
//Module Exports //
///////////////////

module.exports.route = route;
