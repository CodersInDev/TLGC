exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/donate',
        config: {
            description: 'return the donation form',
            handler: function (request, reply) {

                return reply.view('donate', {donate: true});
            }
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'Donate'
};
