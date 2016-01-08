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



///////////////////
//Module Exports //
///////////////////
