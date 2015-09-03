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

                var charge = Stripe.charges.create({
                    amount: request.payload.amount * 100,
                    currency: "gbp",
                    source: stripeToken,
                    description: "The Leaving Gift Company"
                }, function(err, charge) {
                    console.log('charge', charge);
                    if (err && err.type === 'StripeCardError') {
                        reply('Error');
                    }
                    
                    var curentAmountCampaign = Redis.hget(
                        'campaign:' + request.params.urlId,
                        'totalAmount' 
                    , function (err, replies) {
                        console.log('REplies', replies);
                        Redis.hset(
                            'campaign:' + request.params.urlId,
                            'totalAmount',
                            Number(replies) + Number(request.payload.amount)
                        )

                    });

                    reply.redirect('/donate/'+ request.params.urlId);
                });
            }
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'stripePayment'
};
