const request = require("request");

const geoCode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoibG93ZW5jaG8yMiIsImEiOiJjand3MWx4Z3MwZjZnNDRsZ2ZyODB4d3BjIn0.S1kONVPKQzO_AzJ4mS2eYg&limit=1";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location service", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longhitude: body.features[0].center[0],
        placename: body.features[0].place_name
      });
    }
  });
};

module.exports = geoCode;

// const geoURL =
//   "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoibG93ZW5jaG8yMiIsImEiOiJjand3MWx4Z3MwZjZnNDRsZ2ZyODB4d3BjIn0.S1kONVPKQzO_AzJ4mS2eYg&limit=1";
//
// request({ url: geoURL, json: true }, (error, response) => {
//   if (error) {
//     console.log("Unable to connect to the location service.");
//   } else if (response.body.features.length === 0) {
//     console.log("Unable to find the location");
//   } else {
//     const latitude = response.body.features[0].center[1];
//     const longhitude = response.body.features[0].center[0];
//     console.log("Latitude:" + latitude + " Longhitude:" + longhitude);
//   }
// });

// request({ url: geoURL, json: true }, (error, response) => {
//   if (error) {
//     callback("Unable to connect to location service", undefined);
//   } else if (response.body.features.length === 0) {
//     callback("Unable to find location", undefined);
//   } else {
//     callback(undefined, {
//       latitude: response.body.features[0].center[1],
//       longhitude: response.body.features[0].center[0],
//       placename: response.body.features[0].place_name
//     });
//   }
// });
// };
