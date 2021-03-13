const request = require("request");

// Forecast request (resuable function) - dynamic location
const forecast = (latitude, longitude, callback) => {
  // URL with dynamic location
  const url = `http://api.weatherstack.com/current?access_key=90d96f2018a13e3da03f03352daa01b5&query=${latitude},${longitude}&units=m`;

  // Reference callback paramter to pass error/data values
  request({ url, json: true }, (err, { body }) => {

    // Destructure res body
    const { error, current } = body

    if (err) {
      // Error message, data undefined
      callback("Connection to WeatherStack unavailable", undefined);
    } else if (error) {
      // Error message, data undefined
      callback("Location could not be found", undefined);
    } else {
      // Error undefined, data string with values
      callback(
        undefined,
        `It is currently ${current.temperature} degrees out, but it feels like ${current.feelslike} degrees. There is a wind speed of ${current.wind_speed}mph. The current humidity is ${current.humidity}%.`
      );
    }
  });
};

module.exports = forecast;
