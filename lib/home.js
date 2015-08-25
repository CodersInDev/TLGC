exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/',
        config: {
            description: 'return the home page',
            handler: function (request, reply) {

                reply('This is the home page');
            }
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'Home'
};
