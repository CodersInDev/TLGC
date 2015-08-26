var Code = require('code');
var Lab = require('lab');
var Hapi = require('hapi');

var lab = exports.lab = Lab.script();
var expect = Code.expect;
var it = lab.test;

var Server = require('../lib/index.js');

it('checks the route / returns 200 status code when requested', function (done) {

    Server.init(0, function (err, server) {

        expect(err).to.not.exist();
        server.inject('/', function (res) {

            expect(res.statusCode).to.equal(200);
            expect(res.result).to.equal('This is the home page');
        });


        server.stop(done);
    });
});
