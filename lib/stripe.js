exports.register = function (server, options, next) {

    server.route({
        method: 'POST',
        path: '/stripe',
        config: {
            description: 'stripe payment',
            handler: function (request, reply) {

                return reply('Payment done');
            }
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'stripePayment'
};
