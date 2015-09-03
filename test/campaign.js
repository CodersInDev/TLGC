require('env2')('.env');
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

it('checks for post request on /campaign endpoint', function (done) {

    var payloadValues = {
        initiatorName: 'Simon',
        email: 'simon.test@test.com',
        leaverName: 'Anita',
        reasonForLeaving: 'new job',
        decision: 'option1',
        age: '18 - 24',
        gender: 'f',
        nameOfRecipient: 'Bob',
        address1: 'London',
        address2: 'Globe Town',
        postCode: 'e543',
        deliveryDate: '27-09-15',
        tc: 'tc',
        giftProposition: 'beer'
    };

    Server.init(0, function (err, server) {

        expect(err).to.not.exist();
        server.inject({
            method: 'POST',
            url: '/campaign',
            payload: payloadValues
        }, function (res) {

            expect(res.statusCode).to.equal(302);
        });


        server.stop(done);
    });
});

it('checks for post request on /campaign endpoint and return to campaign page', function (done) {

    var payloadValues = { deliveryDate: '25-09-15' };

    Server.init(0, function (err, server) {

        expect(err).to.not.exist();
        server.inject({
            method: 'POST',
            url: '/campaign',
            payload: payloadValues
        }, function (res) {

            expect(res.statusCode).to.equal(200);
        });


        server.stop(done);
    });
});

it('checks for Sunday', function (done) {

    var payloadValues = { deliveryDate: '27-09-15' };

    Server.init(0, function (err, server) {

        expect(err).to.not.exist();
        server.inject({
            method: 'POST',
            url: '/campaign',
            payload: payloadValues
        }, function (res) {

            expect(res.statusCode).to.equal(200);
        });


        server.stop(done);
    });
});


it('checks for Monday', function (done) {

    var payloadValues = { deliveryDate: '21-09-15' };

    Server.init(0, function (err, server) {

        expect(err).to.not.exist();
        server.inject({
            method: 'POST',
            url: '/campaign',
            payload: payloadValues
        }, function (res) {

            expect(res.statusCode).to.equal(200);
        });


        server.stop(done);
    });
});
