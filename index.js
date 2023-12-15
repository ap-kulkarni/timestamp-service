// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
require('dotenv').config()

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:time", (request, response) => {
    let timeString = request.params.time
    let date
    let responseData
    if (/^\d+$/.test(timeString)) {
        date = new Date(Number.parseInt(timeString))
    } else {
        date = new Date(timeString)
    }
    if (isNaN(date.valueOf())) {
        responseData = {error: "Invalid Date"}
    } else {
        responseData = getResponseDataFromDate(date)
    }
    response.json(responseData)
})

app.get("/api", (request, response) => {
    response.json(getResponseDataFromDate(new Date()))
})

function getResponseDataFromDate(date) {
    return {unix: date.valueOf(), utc: date.toUTCString()}
}


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
