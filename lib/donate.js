
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

                    if (err) {
                        return next(err);
                    }

                    if (campaign !== null) {

                        response.donate = true;
                        campaign.donationPage = 'https://www.theleavinggift.com/donate/' + campaign.urlId;
                        response.campaign = campaign;
                        response.urlId = request.params.urlId;
                        response.campaign.donors = JSON.parse(response.campaign.donors);

                        var closeAtSplit = campaign.closeAt.split("-");
                        var formatDateClose = closeAtSplit[2] + "-" + closeAtSplit[1] + "-" + closeAtSplit[0];
                        var exactClosingTime = new Date(formatDateClose);
                        exactClosingTime.setHours(20);

                        if (Date.now() > exactClosingTime ) {

                            return reply.view('donateClosed', response);
                        }else {

                            return reply.view('donate', response);
                        }

                    }else {
                        return reply.redirect('/');
                    }
                });
            }
        }
    }
    ]);

    return next();
};

exports.register.attributes = {
    name: 'Donate'
};
