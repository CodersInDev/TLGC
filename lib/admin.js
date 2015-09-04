var Redis = require('./redis')(process.env.REDIS_URL);
exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/admin',
        config: {
            description: 'return the home page',
            handler: function (request, reply) {

               return reply.view('login');
            }
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'Admin'
};
