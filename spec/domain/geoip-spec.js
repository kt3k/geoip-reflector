
var chai = require('chai');
var expect = chai.expect;

var Geoip = require('../../src/domain/geoip.js');

var describe = global.describe;
var it = global.it;

describe('Geoip', function () {
    'use strict';

    it('is exists', function () {
        expect(Geoip).not.to.equal(null);
    });

    describe('toObject', function () {

        it('returns object representation of the instance', function () {

            var geoip = new Geoip('0.0.0.0', 'AB');

            expect(geoip.toObject()).to.deep.equal({
                ipAddr: '0.0.0.0',
                countryCode: 'AB'
            });

        });
    });

    describe('toJson', function () {

        it('returns json representation of the instance', function () {

            var geoip = new Geoip('0.0.0.0', 'AB');

            expect(geoip.toJson()).to.equal('{"ipAddr":"0.0.0.0","countryCode":"AB"}');

        });
    });

});
