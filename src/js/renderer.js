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



/**
 * Render view from templates
 * @param  {String} view - Name of view
 * @return {String}      - View HTML
 */
function render(view) {
    switch (view) {
        case "home":
            var templateArray = [
                "./views/head.html";
                "./views/search.html";
            ];
            break;
    }

    var generator = _generateView(templateArray);
    var filePromise = generator.next().value;
    filePromise.then(
        function onFulfilled(files) {
            generator.next(files);
            var view = generator.next().value;
            return view;
        }
    );
}



///////////////////
//Module Exports //
///////////////////

module.exports.home = render("home");
