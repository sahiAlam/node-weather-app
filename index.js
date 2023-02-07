const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {

  const query = req.body.cityName;
  const key = "e4b5e67cabd71a20071ca30f3c126f4d";
  const unit = "matric";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${key}&units=${unit}`;

// Fetching api data 
  https.get(url, (response) => {
    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const desc = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

      res.write(`<p>The weather is currently ${desc}.</p>`);
      res.write(`<h1>The temparature in ${query} is ${temp} degree celcious</h1>`);
      res.write(`<img src=${imageUrl} >`);
      res.send();
    });
  });
});

// Our Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});