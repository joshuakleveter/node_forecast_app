////////////
//Imports //
////////////

var https = require("https");
var runner = require("./runner.js");



/////////////////////
//Geocoding Module //
/////////////////////

/**
 * Make a request to the Google Maps Geocoding API
 * @param  {String} zip - ZIP code to geocode
 * @return {Promise}    - Promise for API response
 */
function _geocodeRequest(zip) {
    //Create a new Promise for our API request
    var geocodePromise = new Promise(function (resolve, reject) {
        //API Key
        var key = "AIzaSyAqOAWv-714TAq0SdCwn9BogqzRuhPjA2A";
        //API URL
        var url = "https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:" + zip + "&key=" + key;

        //Create a new API request over HTTPS
        var apiRequest = https.get(url, function (response) {
            //Store response data in a string
            var responseJSON = "";
            response.on("data", function (data) {
                //Append data to string
                responseJSON += data;
            });
            response.on("end", function () {
                //Parse JSON string and resolve Promise
                resolve(JSON.parse(responseJSON));
            });
        });
        apiRequest.on("error", function (error) {
            //Reject Promise on error
            reject(error);
        });
    });
    //Return Promise
    return geocodePromise;
}



/**
 * Generate lat/long for a given ZIP code
 * @param  {String} zip - ZIP code
 * @return {Object}     - Lat/Long of the given ZIP code
 */
function* geocode(zip) {
    //Make a geocode API request and wait for it to resolve
    var geocodeResponse = yield Promise.resolve(_geocodeRequest(zip));
    //Get location object from results and return it
    var location = {
        "address": geocodeResponse.results[0].formatted_address,
        "latLong": geocodeResponse.results[0].geometry.location
    };
    return location;
}



/**
 * Handle geocode generator
 * @param  {String} zip - ZIP code
 * @return {Promise}    - Promise for Lat/Long of ZIP code
 */
function geocodeHandler(zip) {
    return runner.run(geocode, zip);
}



///////////////////
//Module Exports //
///////////////////

module.exports.geocode = geocodeHandler;
