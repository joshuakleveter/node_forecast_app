////////////
//Imports //
////////////

var fs = require("fs");



////////////////////
//Renderer Module //
////////////////////

/**
 * Get the contents of a file
 * @param  {String} filepath - Path to file.
 * @return {Promise}         - File promise
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
 * @param  {Array} templateArray - Array of templates in render order
 * @return {String}              - View HTML
 */
function* _generateView(templateArray) {
    var templates = yield Promise.all(templateArray);

    var view = "";
    templates.forEach(function (template) {
        view += template;
    });

    return view;
}



///////////////////
//Module Exports //
///////////////////
