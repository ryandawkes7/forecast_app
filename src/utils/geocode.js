const request = require("request");

// Geocode request (resuable function) - dynamic location
const geocode = (address, callback) => {
  // URL with dynamic location
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoicnlhbmRhd2tlcyIsImEiOiJja2NndnMwMzEwbzZnMndscDRjNm56c2ZiIn0.QESLyl_OFcjKPdWPaRUWmw&limit=1`;

  // Reference callback paramter to pass error/data values
  request({ url, json: true }, (error, { body }) => {

    // Destructure res body
    const { features } = body;

    if (error) {
      // Error message, data undefined
      callback("Unable to connect to location services", undefined);
    } else if (features.length == 0) {
      // Error message, data undefined
      callback("Unable to find specified location", undefined);
    } else {
      // Error undefined, data values
      callback(undefined, {
        latitude: features[0].center[1],
        longitude: features[0].center[0],
        location: features[0].place_name,
      });
    }
  });
};

module.exports = geocode
