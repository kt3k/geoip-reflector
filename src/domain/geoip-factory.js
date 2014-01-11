
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

/**
 * returns random integer x such that 0 <= x < limit
 *
 * @param {number} limit limit of random value
 * @return {number} random integer x such that 0 <= x < limit
 */
var dice = function (limit) {
    'use strict';

    return Math.floor(Math.random() * limit);
};

exports.generateRandomAddress = function () {
    'use strict';

    return [dice(256), dice(256), dice(256), dice(256)].join('.');
};

exports.createByRequest = function (req) {
    'use strict';

    var ip = exports.getRemoteAddress(req);

    var geo = geoip.lookup(ip);
    var countryCode = geo != null ? geo.country : null;

    return new Geoip(ip, countryCode);
};

exports.createRandom = function () {
    'use strict';

    // get random ipv4 address
    var ip = exports.generateRandomAddress();

    var geo = geoip.lookup(ip);
    var countryCode = geo != null ? geo.country : null;

    return new Geoip(ip, countryCode);
};
