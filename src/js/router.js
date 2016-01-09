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
    var forecastRegExp = /^\/forecast(\?location\=\w*)?$/i;

    if (request.url == "/") {
        //Home page
        response.writeHead(200, {"Content-type": "text/html"});
        var home = render.home;
        home.then(
            function (viewArray) {
                var view = viewArray.join("");
                response.write(view);
                response.end();
            }
        );
    }
    else if (forecastRegExp.test(request.url)) {
        //Forecast page
        response.writeHead(200, {"Content-type": "text/html"});
        var forecast = render.forecast;
        forecast.then(
            function (viewArray) {
                var view = viewArray.join("");
                response.write(view);
                response.end();
            }
        );
    }
    else if (request.url == "/css/main.css") {
        //CSS Files
        response.writeHead(200, {"Content-type": "text/css"});
        var css = render.css;
        css.then(
            function (cssFile) {
                response.write(cssFile);
                response.end();
            }
        );
    }
    else {
        response.writeHead(404, {"Content-type": "text/html"});
        response.write("404 Error");
        response.end();
    }
}


///////////////////
//Module Exports //
///////////////////

module.exports.route = route;
