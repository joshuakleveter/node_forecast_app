////////////
//Imports //
////////////

var https = require("https");
var runner = require("./runner.js");



////////////////////
//Forecast Module //
////////////////////

/**
 * Make request to Dark Sky Forecast API
 * @param  {Number} latitude  - Latitude of location
 * @param  {Number} longitude - Longitude of location
 * @return {Promise}          - Promise for forecast API JSON
 */
function _getForecast(latitude, longitude) {
    var forecastPromise = new Promise(function (resolve, reject) {
        var key = "2015ddf0ed0c9e781880eb63aab3e346";
        var url = "https://api.forecast.io/forecast/" + key + "/" + latitude + "," + longitude;

        var apiRequest = https.get(url, function (response) {
            var responseBody = "";
            response.on("data", function (data) {
                responseBody += data;
            });
            response.on("end", function () {
                resolve(JSON.parse(responseBody));
            });
        });
        apiRequest.on("error", function (error) {
            reject(error);
        });
    });
    return forecastPromise;
}



/**
 * Generator to get forecast data
 * @param  {Number} latitude  - Latitude of location
 * @param  {Number} longitude - Longitude of location
 * @return {Object}           - Object with API response data
 */
function* forecast(latitude, longitude) {
    try {
        return yield Promise.resolve(_getForecast(latitude, longitude));
    } catch (error) {
        throw error;
    }
}



/**
 * Handle forecast generator
 * @param  {Number} latitude  - Latitude of location
 * @param  {Number} longitude - Longitude of location
 * @return {Object}           - API response data
 */
function forecastHandler(latitude, longitude) {
    return runner.run(forecast, latitude, longitude);
}



///////////////////
//Module Exports //
///////////////////

module.exports.forecast = forecastHandler;
