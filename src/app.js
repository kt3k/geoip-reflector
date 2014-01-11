// app.js

'use strict';

var express = require('express');
var logfmt = require('logfmt');

var GeoipFactory = require('./domain/geoip-factory');


// create express app object
var app = express();


// set logger
app.use(logfmt.requestLogger());


app.use(express.static(__dirname + '/../static'));

app.get('/', function (req, res) {
    res.setHeader('Content-Type', 'application/json');

    var geoip = GeoipFactory.createByRequest(req);
    res.send(geoip.toJson());
});

app.get('/random', function (req, res) {
    res.setHeader('Content-Type', 'application/json');

    var geoip = GeoipFactory.createRandom();
    res.send(geoip.toJson());
});

app.get('/*', function (req, res) {
    res.setHeader('Content-Type', 'application/json');

    res.send(JSON.stringify({error: 'no such endpoint: ' + req.params[0]}));
});

var port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log('Listening on ' + port);
});
