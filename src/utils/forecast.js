const request = require("request");

const forecast = (latitude, longhitude, callback) => {
  url =
    "https://api.darksky.net/forecast/8333d32d1f045e75ed111d4c3154f19c/" +
    encodeURIComponent(latitude) +
    "," +
    encodeURIComponent(longhitude);

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect weather service", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        body.daily.data[0].summary +
          " It is currently " +
          body.currently.temperature +
          " degrees out. There is a " +
          body.currently.precipProbability +
          "% chance of rain."
      );
    }
  });
};

module.exports = forecast;

// request({ url: apiURL, json: true }, (error, response) => {
//   // console.log(response.body.currently);
//   if (error) {
//     console.log("Unable to connect to weather service");
//   } else if (response.body.error) {
//     console.log("Unable to find location");
//   } else {
//     console.log(
//       response.body.daily.data[0].summary +
//         " It is currently " +
//         response.body.currently.temperature +
//         " degrees out. There is a " +
//         response.body.currently.precipProbability +
//         "% chance of rain."
//     );
//   }
// });

// request({ url: apiURL, json: true }, (error, response) => {
//   if (error) {
//     callback("Unable to connect weather service", undefined);
//   } else if (response.body.error) {
//     callback("Unable to find location", undefined);
//   } else {
//     callback(
//       undefined,
//       response.body.daily.data[0].summary +
//         " It is currently " +
//         response.body.currently.temperature +
//         " degrees out. There is a " +
//         response.body.currently.precipProbability +
//         "% chance of rain."
//     );
//   }
// });
// };
