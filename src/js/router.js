////////////
//Imports //
////////////

var render = require("./renderer.js");
var runner = require("./runner.js");
var querystring = require("querystring");



//////////////////
//Router Module //
//////////////////

function error404(response) {
    response.writeHead(404, {"Content-type": "text/html"});
    response.write("<h1>404 Error</h1>");
    response.write("Sorry! We were unable to find the requested address");
    response.end();
}



/**
 * Respond with a 500 error
 * @param  {http.ServerResponse} response - Node http.ServerResponse object
 * @param  {Error} error                  - Error object from Promise
 * @return {Undefined}
 */
function error500(response, error) {
    response.writeHead(500, {"Content-type": "text/html"});
    response.write("<h1>500 Error</h1>");
    response.write("<p>Sorry! We encountered the following error:<p>");
    response.write("<p>" + error.message + "</p>");
    response.end();
}



/**
* Handle app routing
* @param  {http.ClientRequest} request   - Client request
* @param  {http.ServerResponse} response - Server response
* @return {http.ServerResponse}          - response object
*/
function* route(request, response) {
    var forecastRegExp = /^\/forecast(\?location\=\w*)?$/i;

    if (request.url == "/") {
        //Home page
        try {
            response.writeHead(200, {"Content-type": "text/html"});
            var home = yield Promise.resolve(render.render("home"));
            response.write(home);
            response.end();
        } catch (error) {
            error500(response, error);
        }
    }
    else if (forecastRegExp.test(request.url)) {
        //Forecast page

        var locationRegExp = /location=\d{5}$/i,
            argsRegExp = /\?\w+.*$/i,
            forecast;

        try {
            response.writeHead(200, {"Content-type": "text/html"});
            //Validate ZIP code:
            if(locationRegExp.test(request.url)) {
                forecast = yield Promise.resolve(render.render("forecast", querystring.parse( argsRegExp.exec(request.url).join("").substr(1) )));
            } else {
                forecast = yield Promise.resolve(render.render("error", {errorMessage: "Please enter a valid 5 digit ZIP code."}));
            }

            response.write(forecast);
            response.end();
        } catch (error) {
            error500(response, error);
        }
    }
    else if (request.url == "/css/main.css") {
        //CSS Files
        try {
            response.writeHead(200, {"Content-type": "text/css"});
            var css = yield Promise.resolve(render.css);
            response.write(css);
            response.end();
        } catch (error) {
            error500(response, error);
        }
    }
    else {
        error404(response);
    }
}



function routeHandler(request, response) {
    runner.run(route, request, response);
}

///////////////////
//Module Exports //
///////////////////

module.exports.route = routeHandler;
