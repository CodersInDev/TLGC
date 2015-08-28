var Code = require('code');
var Lab = require('lab');
var Hapi = require('hapi');

var lab = exports.lab = Lab.script();
var expect = Code.expect;
var it = lab.test;

var Server = require('../lib/index.js');

it('checks the route /donate returns 200 status code when requested', function (done) {

    Server.init(0, function (err, server) {

        expect(err).to.not.exist();
        server.inject('/donate', function (res) {

            expect(res.statusCode).to.equal(200);
        });

        server.stop(done);
    });
});
