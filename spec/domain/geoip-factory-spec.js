
var chai = require('chai');
var expect = chai.expect;

var describe = global.describe;
var it = global.it;

var GeoipFactory = require('../../src/domain/geoip-factory.js');
var Geoip = require('../../src/domain/geoip.js');

describe('GeoipFactory', function () {
    'use strict';

    it('exists', function () {

        expect(GeoipFactory).not.to.be.null;

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

            expect(geoip).not.to.be.null;
            expect(geoip).to.be.an.instanceof(Geoip);

            expect(geoip.toObject()).to.deep.equal({
                ipAddr: '210.0.0.0',
                countryCode: 'AU'
            });

        });
    });

    var RE_IPV4 = /(\d+).(\d+).(\d+).(\d+)/;

    var isIpv4 = function (ip) {
        var match = RE_IPV4.exec(ip);

        if (match == null) {
            return false;
        }

        var a0 = +match[1];
        var a1 = +match[2];
        var a2 = +match[3];
        var a3 = +match[4];

        return 0 <= a0 && a0 <= 255 && 0 <= a1 && a1 <= 255 && 0 <= a2 && a2 <= 255 && 0 <= a3 && a3 <= 255;
    };

    describe('generateRandomAddress', function () {


        it('generates random ip address string', function () {
            var a = GeoipFactory.generateRandomAddress();
            var b = GeoipFactory.generateRandomAddress();

            expect(isIpv4(a)).to.be.true;
            expect(isIpv4(b)).to.be.true;

            // this expectation is 99.99999999999999999457% ok
            expect(a).not.to.equal(b);
        });
    });

    describe('createRandom', function () {

        it('creates Geoip objects by generated random ip address', function () {

            var req = {};
            req.header = function () {
                return '210.0.0.0';
            };

            var geoip = GeoipFactory.createRandom();

            expect(geoip).not.to.be.null;
            expect(geoip).to.be.an.instanceof(Geoip);

            expect(isIpv4(geoip.toObject().ipAddr)).to.be.true;
            expect(geoip.toObject().countryCode).not.to.be.null;

        });

    });

});


