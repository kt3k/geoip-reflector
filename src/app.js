// app.js

var express = require('express');
var logfmt = require('logfmt');
var geoip = require('geoip-lite');


// create express app object
var app = express();


// set logger
app.use(logfmt.requestLogger());

app.get('/', function(req, res) {

    var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;

    var geo = geoip.lookup(ip);

    var result = {
        ipAddr: ip,
        countryCode: geo != null ? geo.country : null
    };

    res.setHeader('Content-Type', 'application/json');

    res.send(JSON.stringify(result, null, 4));
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
      console.log("Listening on " + port);
});
