exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/',
        config: {
            description: 'return the home page',
            handler: function (request, reply) {

                return reply.view('home', { home:true });
            }
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'Home'
};
