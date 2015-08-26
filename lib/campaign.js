exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/campaign',
        config: {
            description: 'return the campaign page',
            handler: function (request, reply) {

                return reply('This is campaign page');
            }
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'Campaign'
};
