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
}


///////////////////
//Module Exports //
///////////////////

module.exports.route = route;
