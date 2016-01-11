////////////
//Imports //
////////////

var https = require("https");



/////////////////////
//Geocoding Module //
/////////////////////

/**
 * Create a Promise for the geocode API request
 * @param  {String} url - URL to Google Maps Geocoding API
 * @return {Promise}    - Promise for API request
 */
function geocodeRequest(url) {
    var apiPromise = new Promise(function (resolve, reject) {
        var request = https.get(url, function (response) {
            var responseBody = "";
            response.on("data", function (data) {
                responseBody += data;
            });
            response.on("end", function () {
                resolve(responseBody);
            });
        });
        request.on("error", function (error) {
            reject(error);
        });
    });
    return apiPromise;
}



/**
 * Get the lat/long of a ZIP code
 * @param  {String} zip - 5 digit ZIP code
 * @return {Promise}    - Lat/Long of ZIP code
 */
function geocode(zip) {
    var apiKey = "AIzaSyAqOAWv-714TAq0SdCwn9BogqzRuhPjA2A";
    var outputType = "json";
    var url = "https://maps.googleapis.com/maps/api/geocode/" + outputType + "?address=" + zip + "&key=" + apiKey;
    geocodeRequest(url)
        .then(
            function onFulfilled(response) {
                var responseJson = JSON.parse(response);
                return responseJson.results[0].geometry.location;
            }
        ).catch(
            function onRejected(error) {
                throw error;
            }
        );
}



///////////////////
//Module Exports //
///////////////////

module.exports.geocode = geocode;
