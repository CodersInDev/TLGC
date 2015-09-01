var Redis = require('./redis.js');

exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/donate/{urlId}',
        config: {
            description: 'return the donation form',
            handler: function (request, reply) {

                var campaign = Redis.hmget('campaign', request.params.urlId, function (err, response) {
                    var json = JSON.parse(response[0]);
                    console.log(json.creator);
                    return reply.view('donate', { donate: true, creator: json.creator });
                });              
            }
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'Donate'
};
