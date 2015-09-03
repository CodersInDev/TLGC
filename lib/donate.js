
exports.register = function (server, options, next) {
var Redis = require('./redis.js')(process.env.REDIS_URL);

    server.route([{
        method: 'GET',
        path: '/donate/{urlId}',
        config: {
            description: 'return the donation form',
            handler: function (request, reply) {

                var response = {};
                //get the campaign object
                Redis.hgetall('campaign:' + request.params.urlId, function (err, campaign) {
                    response.donate = true;
                    campaign.donationPage = 'https://tlgc.herokuapp.com/donate/' + campaign.urlId;
                    response.campaign = campaign;
                    response.urlId = request.params.urlId;
                    Redis.hgetall('campaign:' + request.params.urlId + ':donors', function (err, donors) {
                        response.donors = donors;
                        // Redis.end();
                        return reply.view('donate', response);
                    });
                });
            }
        }
    },


    // {
    //     method: 'POST',
    //     path: '/donate/{urlId}',
    //     config: {
    //         description: 'charge the donation fee',
    //         handler: function (request, reply) {
    //
    //             //console.log(request.payload);
    //             //console.log(request.params.urlId);
    //             //save db
    //             var paymentDone = "Payment successfull";
    //             reply.redirect('/donate/'+ request.params.urlId, paymentDone);
    //         }
    //     }
    // }
    ]);

    return next();
};

exports.register.attributes = {
    name: 'Donate'
};
