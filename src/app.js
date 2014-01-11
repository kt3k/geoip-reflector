// app.js

var express = require('express');
var logfmt = require('logfmt');

var GeoipFactory = require('./domain/geoip-factory');


// create express app object
var app = express();


// set logger
app.use(logfmt.requestLogger());

app.get('/', function (req, res) {
    'use strict';

    var geoip = GeoipFactory.createByRequest(req);
    res.setHeader('Content-Type', 'application/json');
    res.send(geoip.toJson());
});

app.get('/random', function (req, res) {
    'use strict';

    var geoip = GeoipFactory.createRandom();
    res.setHeader('Content-Type', 'application/json');
    res.send(geoip.toJson());
});

var port = process.env.PORT || 5000;
app.listen(port, function () {
    'use strict';

    console.log('Listening on ' + port);
});
