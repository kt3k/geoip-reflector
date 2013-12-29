
var Geoip = module.exports = function (ipAddr, countryCode) {
    'use strict';

    this.ipAddr = ipAddr;
    this.countryCode = countryCode;
};

var pt = Geoip.prototype;

pt.toObject = function () {
    'use strict';

    return {
        ipAddr: this.ipAddr,
        countryCode: this.countryCode
    };
};

pt.toJson = function (replacer, indent) {
    'use strict';

    return JSON.stringify(this.toObject(), replacer, indent);
};
