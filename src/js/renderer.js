////////////
//Imports //
////////////

var fs = require("fs");



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
function* _generateView(templateFiles) {
    var templates = yield Promise.all(templateFiles);

    var view = "";
    templates.forEach(function (template) {
        view += template;
    });
    return view;
}



/**
 * Handle rendering views
 * @param  {String}  - Name of template to render
 * @return {Promise} - Promise for view
 */
function render(templateName) {
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
                getFile("./views/error.html"),
                getFile("./views/search.html")
            ];
            break;
    }

    var generator = _generateView(templates);

    var templatePromise = generator.next().value;
    templatePromise.then(
        function onFulfilled(templates) {
            var view = generator.next(templates).value;
            return view;
        }
    );
    return Promise.resolve(templatePromise);
}



///////////////////
//Module Exports //
///////////////////

module.exports.css = getFile("./css/main.css");
module.exports.error = render("error");
module.exports.forecast = render("forecast");
module.exports.home = render("home");
