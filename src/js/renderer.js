////////////
//Imports //
////////////

var fs = require("fs");
var handlebars = require("handlebars");



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

    var view = "", compiledTemplate;
    templates.forEach(function (template) {
        debugger;
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
                getFile("./views/forecast.html")
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

    var generator = _generateView(templates, options);

    var templatePromise = generator.next().value;
    var viewPromise = templatePromise.then(
        function onFulfilled(templates) {
            var view = generator.next(templates).value;
            return view;
        }
    );
    return Promise.resolve(viewPromise);
}



///////////////////
//Module Exports //
///////////////////

module.exports.css = getFile("./css/main.css");
module.exports.render = render;
