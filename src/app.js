const path = require("path");
const express = require("express"); //npm
const hbs = require("hbs");
const app = express();
const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");
// console.log(__dirname);
// console.log(__filename);
// console.log(path.join(__dirname, "../public"));

//Define path Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars and engine
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", { title: "Weather", name: "Lorenzo" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About me", name: "Lorenzo" });
});

app.get("/help", (req, res) => {
  res.render("help", { title: "Help", name: "Lorenzo" });
});

// app.get("", (req, res) => {
//   res.send("<h1>Hello express!</h1>");
// });

//app.com
//app.com/help
//app.com/about

// app.get("/help", (req, res) => {
//   res.send([{ name: "Andrew" }, { name: "Sarah" }]);
// });
//
// app.get("/about", (req, res) => {
//   res.send("<h1 style='color:pink;'>About page</h1>");
// });

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "You must provide a address term" });
  }
  console.log(req.query);

  geocode(
    req.query.address,
    (error, { latitude, longhitude, placename } = {}) => {
      if (error) {
        return res.send({ error: error });
      }
      forecast(latitude, longhitude, (error, forecastData) => {
        if (error) {
          return res.send({ error: error });
        }
        res.send({
          forecast: forecastData,
          location: placename,
          address: req.query.address
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({ error: "You must provide a search term." });
  }
  console.log(req.query.search);
  res.send({ products: [] });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Lorenzo",
    errorMessage: "Help article not found."
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Lorenzo",
    errorMessage: "Page not found. "
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
