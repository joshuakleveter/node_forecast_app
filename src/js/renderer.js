////////////
//Imports //
////////////

var fs = require("fs");



////////////////////
//Renderer Module //
////////////////////

function _getFile(filepath) {
    var filePromise = new Promise(function (resolve, reject) {
        fs.readFile(filepath, "utf8", function (error, data) {
            if (error) reject(error);
            resolve(data);
        });
    });
    return filePromise;
}



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



function route() {
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

module.exports.home = route;
