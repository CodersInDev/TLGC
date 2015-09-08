exports.register = function (server, options, next) {

    server.route({
        method: '*',
        path: '/{p*}',
        config: {
            description: 'return 404 page',
            handler: function (request, reply) {

                return reply.view('error');
            }
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'Error'
};
