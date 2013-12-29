
var chai = require('chai');
var expect = chai.expect;

var describe = global.describe;
var it = global.it;

var GeoipFactory = require('../../src/domain/geoip-factory.js');
var Geoip = require('../../src/domain/geoip.js');

describe('GeoipFactory', function () {
    'use strict';

    it('exists', function () {

        expect(GeoipFactory).not.to.equal(null);

    });

    describe('getRemoteAddress', function () {

        it('returns req.header("x-forwarded-for") if x-forwarded-for is set and has one entry', function () {

            var req = {};
            req.header = function (x) {

                if (x === 'x-forwarded-for') {
                    return '0.0.0.0';
                }

            };

            req.connection = {};
            req.connection.remoteAddress = '1.1.1.1';

            expect(GeoipFactory.getRemoteAddress(req)).to.equal('0.0.0.0');

        });

        it('returns req.header("x-forwarded-for").split(",")[0] if x-forwarded-for is set and has multiple entries', function () {

            var req = {};
            req.header = function (x) {

                if (x === 'x-forwarded-for') {
                    return '0.0.0.0,2.2.2.2';
                }
            };

            req.connection = {};
            req.connection.remoteAddress = '1.1.1.1';

            expect(GeoipFactory.getRemoteAddress(req)).to.equal('0.0.0.0');

        });

        it('returns req.connection.remoteAddress if x-forwarded-for is not set', function () {

            var req = {};
            req.header = function () {
                return null;
            };

            req.connection = {};
            req.connection.remoteAddress = '1.1.1.1';

            expect(GeoipFactory.getRemoteAddress(req)).to.equal('1.1.1.1');

        });

    });


    describe('createByRequest', function () {

        it('creates Geoip objects by request object', function () {

            var req = {};
            req.header = function () {
                return '210.0.0.0';
            };

            var geoip = GeoipFactory.createByRequest(req);

            expect(geoip).not.to.equal(null);
            expect(geoip).to.be.an.instanceof(Geoip);

            expect(geoip.toObject()).to.deep.equal({
                ipAddr: '210.0.0.0',
                countryCode: 'AU'
            });

        });
    });

});


