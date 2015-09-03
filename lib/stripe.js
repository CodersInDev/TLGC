var Stripe = require('stripe')(process.env.STRIPE_KEY);
var Redis = require('./redis.js')(process.env.REDIS_URL);

exports.register = function (server, options, next) {

    server.route({
        method: 'POST',
        path: '/stripe/{urlId}',
        config: {
            description: 'stripe payment',
            handler: function (request, reply) {

                var stripeToken = request.payload.stripeToken;
                console.log('handler function');
                var charge = Stripe.charges.create({
                    amount: request.payload.amount * 100,
                    currency: "gbp",
                    source: stripeToken,
                    description: "The Leaving Gift Company"
                }, function(err, charge) {

                    if (err && err.type === 'StripeCardError') {
                        console.log('error if statemnet')
                        reply('Error');
                    }

                var donor = {
                    name: request.payload.name,
                    message: request.payload.message,
                    amount: request.payload.amount
                };

                Redis.hmset('campaign:' + request.params.urlId + ':donors', donor);
                Redis.end();
                console.log('before redirect');

                return reply.redirect('donate/' + request.params.urlId);
                console.log('after redirect');
                });
                console.log('after function');
            }
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'stripePayment'
};
