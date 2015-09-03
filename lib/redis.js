var Url = require('url');
var Redis = require('redis');

var createDbClient = function (url) {

    var RedisURL = Url.parse(url);
    var Client = Redis.createClient(RedisURL.port, RedisURL.hostname);

    if (RedisURL.auth){
        Client.auth(RedisURL.auth.split(':')[1]);
    }
    return Client;
};

module.exports = createDbClient;
