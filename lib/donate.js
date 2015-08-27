exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/donate',
        config: {
            description: 'return the donation form',
            handler: function (request, reply) {

                return reply('This is the donation form');
            }
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'Donate'
};
