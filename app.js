const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {

    //Query data for completing the request URL

    const query = req.body.cityName;
    const apiKey = "a2e1b5bcc877df0f4a44ae42ff40235e#";
    const unit = req.body.units;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&appid=" + apiKey;
    
 
    https.get(url, function(response) { //HTTPS request to the OWM API
        console.log(response.statusCode);
        response.on("data", function(data) { //Taking data from the response from OWM server

            //All the weather data variables

            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            //Sending data to website

            res.write("<p>The weather is currently " + weatherDescription + "</p>");
            res.write("<h1>The temperature is " + temp + " degrees celcius</h1>"); 
            res.write("<img src=" + imageURL + ">");
            res.send();
        });
    });
});


app.listen(3000, function() {
    console.log("Server is running on port 3000.");
})