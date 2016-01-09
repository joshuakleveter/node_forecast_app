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
function _getFile(filepath) {
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
 * @return {String} - View HTML
 */
function* generateView() {
    var templates = yield Promise.all([
        _getFile("./views/head.html"),
        _getFile("./views/search.html")
    ]);

    var view = "";
    templates.forEach(function (template) {
        view += template;
    });
    return view;
}



/**
 * Handle rendering views
 * @return {Promise} - Promise for view
 */
function render() {
    var generator = generateView();

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

module.exports.home = render;
