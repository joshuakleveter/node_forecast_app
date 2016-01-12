////////////
//Imports //
////////////

var forecast = require("./forecast.js");
var fs = require("fs");
var geocode = require("./geocoding.js");
var handlebars = require("handlebars");
var runner = require("./runner.js");



////////////////////
//Renderer Module //
////////////////////

/**
 * Get the contents of a file
 * @param  {String} filepath - Path to file
 * @return {Promise}         - Promise for file data
 */
function getFile(filepath) {
    var filePromise = new Promise(function (resolve, reject) {
        fs.readFile(filepath, "utf8", function (error, data) {
            if (error) reject(error);
            resolve(data);
        });
    });
    return filePromise;
}



/**
 * Generate a view from templates
 * @param  {Array}  - Array of template files in render order
 * @return {String} - View HTML
 */
function* _generateView(templateFiles, options) {
    var templates = yield Promise.all(templateFiles);

    if (options.hasOwnProperty("location")) {
        var location = yield Promise.resolve(geocode.geocode(options.location));
        var forecastData = yield Promise.resolve(forecast.forecast(location.latLong.lat, location.latLong.lng));
        options.address = location.address;
        options.currently = forecastData.currently;
        options.daily = forecastData.daily.data[0];
    }

    var view = "", compiledTemplate;
    templates.forEach(function (template) {
        compiledTemplate = handlebars.compile(template);
        view += compiledTemplate(options);
    });
    return view;
}



/**
 * Handle rendering views
 * @param  {String}  - Name of template to render
 * @param  {Object}  - Options object
 * @return {Promise} - Promise for view
 */
function render(templateName, options) {
    if (options == undefined) {
        options = {};
    }

    var templates = [];
    switch (templateName) {
        case "home":
            templates = [
                getFile("./views/head.html"),
                getFile("./views/search.html")
            ];
            break;
        case "forecast":
            templates = [
                getFile("./views/head.html"),
                getFile("./views/forecast.hbs")
            ];
            break;
        case "error":
            templates = [
                getFile("./views/head.html"),
                getFile("./views/error.hbs"),
                getFile("./views/search.html")
            ];
            break;
    }

    return runner.run(_generateView, templates, options);
}



///////////////////
//Module Exports //
///////////////////

module.exports.css = getFile("./css/main.css");
module.exports.render = render;
