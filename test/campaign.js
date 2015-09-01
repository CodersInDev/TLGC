var Code = require('code');
var Lab = require('lab');
var Hapi = require('hapi');

var lab = exports.lab = Lab.script();
var expect = Code.expect;
var it = lab.test;

var Server = require('../lib/index.js');

it('checks the route /campaign returns 200 status code when requested', function (done) {

    Server.init(0, function (err, server) {

        expect(err).to.not.exist();
        server.inject('/campaign', function (res) {

            expect(res.statusCode).to.equal(200);
        });


        server.stop(done);
    });
});

it('checks for post request on /campaign endpoint that returns redirect code 302', function (done) {

    Server.init(0, function (err, server) {

        expect(err).to.not.exist();
        server.inject({
            method: 'POST',
            url: '/campaign'
        }, function (res) {

            expect(res.statusCode).to.equal(302); 
        });


        server.stop(done);
    });
});
