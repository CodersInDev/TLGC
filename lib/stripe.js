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

                    if (err && err.type === 'StripeCardError') {

                        return reply.view('stripeError', {stripeError: err, donationPage: '/donate/' + request.params.urlId});
                    }

                    if (err) {

                        return reply.view('stripeError', {stripeError: err, donationPage: '/donate/' + request.params.urlId});
                        // return next(err);
                    }

                    var donor ={
                        name: request.payload.name,
                        message: request.payload.message,
                        amount: request.payload.amount
                    };

                    Redis.hgetall ('campaign:' + request.params.urlId, function (err, replie) {

                        if (err) {

                            return next(err);
                        }

                        var totalAmount = Number(replie.totalAmount) + Number(request.payload.amount);
                        Redis.hmset('campaign:' + request.params.urlId, 'totalAmount', totalAmount);
                        var donors = JSON.parse(replie.donors);
                        donors.unshift(donor);
                        donors = JSON.stringify(donors);
                        Redis.hmset('campaign:' + request.params.urlId, 'donors', donors);
                        return reply.redirect('/donate/'+ request.params.urlId);

                    });

                });
            }
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'stripePayment'
};
