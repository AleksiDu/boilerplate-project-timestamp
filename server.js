// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const res = require('express/lib/response');
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

//#1 Timestamp Microservice
app.get("/api", (req, res) => {
  var nowTime = new Date();
  res.json({ 
    "unix": nowTime.getTime(),
    "utc": nowTime.toUTCString()
});
});

app.get("/api/:date_string", (req, res) => { 
  let dateString = req.params.date_string;

  if (parseInt(dateString) > 10000) {
    let unixTime = new Date(parseInt(dateString));
    res.json({ 
      "unix": unixTime.getTime(),
      "utc": unixTime.toUTCString()
    });
  };


  let passed = new Date(dateString);

  if (passed == "Invalid Date"){
    res.json({ error : "Invalid Date"  });
  } else {
    res.json({ 
      unix: passed.getTime(),
      utc: passed.toUTCString()
    });
  };
});

// listen for requests :)
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


