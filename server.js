// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
// var moment = require('moment')

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const { ISO_8601 } = require('moment');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

let dateConvertedObj = {}

app.get('/api', (req, res) => {
  dateConvertedObj.unix = new Date().getTime()
  dateConvertedObj.utc = new Date().toUTCString()
  res.json(dateConvertedObj)
})

app.get("/api/:date", (req, res) => {
  let input = req.params.date
  let isNum = /^\d+$/.test(input)

  // if (isNum) {
  //   dateConvertedObj.unix = new Date(pasrseInt(input)).getTime()
  //   dateConvertedObj.utc = new Date(parseInt(input)).toUTCString()
  // }

  if (isNum) {
    dateConvertedObj.unix = new Date(parseInt(input)).getTime()
    dateConvertedObj.utc = new Date(parseInt(input)).toUTCString()
  } else if (input.includes('-')) {
    dateConvertedObj.unix = new Date(input).getTime()
    dateConvertedObj.utc = new Date(input).toUTCString()
  } else {
    res.json({ error: 'Invalid Date' })
  }

  // if (input.includes('-')) {
  //   dateConvertedObj.unix = new Date(input).getTime()
  //   dateConvertedObj.utc = new Date(input).toUTCString()
  // } else {
  //   dateConvertedObj.unix = new Date(parseInt(input)).getTime()
  //   dateConvertedObj.utc = new Date(parseInt(input)).toUTCString()
  // }

  if (!dateConvertedObj.unix || !dateConvertedObj.utc) {
    res.json({ error: 'Invalid Date' })
  }

  res.json(dateConvertedObj)
})



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});