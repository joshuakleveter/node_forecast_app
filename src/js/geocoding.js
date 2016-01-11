////////////
//Imports //
////////////

var https = require("https");



/////////////////////
//Geocoding Module //
/////////////////////

/**
 * Make a request to the Google Maps Geocoding API
 * @param  {String} zip - ZIP code to geocode
 * @return {Promise}    - Promise for API response
 */
function _geocodeRequest(zip) {
    var geocodePromise = new Promise(function (resolve, reject) {
        var key = "AIzaSyAqOAWv-714TAq0SdCwn9BogqzRuhPjA2A";
        var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + zip + "&key=" + key;

        var apiRequest = https.get(url, function (response) {
            var responseJSON = "";
            response.on("data", function (data) {
                responseJSON += data;
            });
            response.on("end", function () {
                resolve(JSON.parse(responseJSON));
            });
        });
        apiRequest.on("error", function (error) {
            reject(error);
        });
    });
    return geocodePromise;
}



/**
 * Generate lat/long for a given ZIP code
 * @param  {String} zip - ZIP code
 * @return {Object}     - Lat/Long of the given ZIP code
 */
function* geocode(zip) {
    var geocodeResponse = yield Promise.resolve(_geocodeRequest(zip));
    return geocodeResponse.results[0].geometry.location;
}



///////////////////
//Module Exports //
///////////////////
