////////////
//Imports //
////////////




/////////////////////
//Geocoding Module //
/////////////////////

/**
 * Generate lat/long for a given ZIP code
 * @param  {String} zip - ZIP code
 * @return {Object}     - Lat/Long of the given ZIP code
 */
function* geocode(zip) {
    var geocodeJSON = yield Promise.resolve(_geocodeRequest(zip));
    var geocodeResponse = JSON.parse(geocodeJSON);
    return geocodeResponse.results[0].geometry.location;
}



///////////////////
//Module Exports //
///////////////////
