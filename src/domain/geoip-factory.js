
var geoip = require('geoip-lite');
var Geoip = require('./geoip');

exports.getRemoteAddress = function (req) {
    'use strict';

    var forwarded = req.header('x-forwarded-for');

    if (typeof forwarded === 'string') {
        return forwarded.split(',')[0];
    }

    return req.connection.remoteAddress;
};

exports.createByRequest = function (req) {
    'use strict';

    var ip = exports.getRemoteAddress(req);

    var geo = geoip.lookup(ip);
    var countryCode = geo != null ? geo.country : null;

    return new Geoip(ip, countryCode);
};
