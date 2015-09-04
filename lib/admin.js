var Redis = require('./redis')(process.env.REDIS_URL);
exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/admin',
        config: {
            description: 'return the home page',
            handler: function (request, reply) {

                var campaigns = [];
                Redis.keys('*', function (err, replies){

                    if (err) {
                        return next(err);
                    }

                    if(replies.length !== 0) {

                        replies.forEach(function (element) {

                            Redis.hgetall(element, function (err, campaign) {

                                campaign.donors = JSON.parse(campaign.donors);
                                campaigns.push(campaign);

                                if(campaigns.length === replies.length) {
                                    return reply.view('admin', {campaigns: campaigns});
                                }

                            });
                        });
                    } else {
                        return reply.view('admin', {campaigns: []});
                    }

                });
            }
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'Admin'
};
