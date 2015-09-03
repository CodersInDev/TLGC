require('env2')('.env');
var Url = require('url');
var Code = require('code');
var Lab = require('lab');


var lab = exports.lab = Lab.script();
var expect = Code.expect;
var it = lab.test;

it('checks the redis connection auth', function (done) {

    var connection  = Url.parse(process.env.REDIS_URL_HEROKU);
    var redis = require('../lib/redis.js')(connection);
    expect(redis.address).to.equal(connection.host);
    done();
    redis.end();
});
