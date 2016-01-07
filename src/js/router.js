////////////
//Imports //
////////////




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
            response.writeHead(200, {"Content-type": "text/plain"});
            response.end("Home page");
            break;
        //Forecast page
        case "/forecast":
            response.writeHead(200, {"Content-type": "text/plain"});
            response.end("Forecast page");
            break;
        //404 Errors
        default:
            response.writeHead(404, {"Content-type": "text/plain"});
            response.end("Error page");
            break;
    }
}


///////////////////
//Module Exports //
///////////////////

module.exports.route = route;
