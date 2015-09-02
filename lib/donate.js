var Redis = require('./redis.js');

exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/donate/{urlId}',
        config: {
            description: 'return the donation form',
            handler: function (request, reply) {

                Redis.hgetall('campaign:'+request.params.urlId, function (err, response) {

                    response.donate = true;
                    return reply.view('donate', response);
                });
            }
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'Donate'
};
