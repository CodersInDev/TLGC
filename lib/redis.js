var Url = require('url');
var Redis = require('redis');
var RedisURL = Url.parse( process.env.REDIS_URL );
var Client = Redis.createClient(RedisURL.port, RedisURL.hostname);


if ( RedisURL.auth ) {

    Client.auth( RedisURL.auth.split(':')[1] );
}

Client.on('error', function (err) {

    console.log('Redis error: ' + err);
});

module.exports = Client;
