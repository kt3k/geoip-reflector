// app.js

var express = require('express');
var logfmt = require('logfmt');
var geoip = require('geoip-lite');


// create express app object
var app = express();


var getRemoteAddress = function (req) {

    var forwarded = req.header('x-forwarded-for');

    if (typeof forwarded === 'string') {
        return forwarded.split(',')[0];
    }

    return req.connection.remoteAddress;
};


// set logger
app.use(logfmt.requestLogger());

app.get('/', function(req, res) {

    var ip = getRemoteAddress(req);

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
