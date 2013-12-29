
var chai = require('chai');
var expect = chai.expect;

var Geoip = require('../../src/domain/geoip.js')

describe('Geoip', function () {

    it('is exists', function () {
        expect(Geoip).not.to.equal(null);
    });

});
