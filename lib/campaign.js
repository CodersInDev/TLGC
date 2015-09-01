var Shortid = require('shortid');
var Redis = require('./redis.js');

exports.register = function (server, options, next) {

    server.route([{
        method: 'GET',
        path: '/campaign',
        config: {
            description: 'return the campaign page',
            handler: function (request, reply) {

                return reply.view('campaign');
            }
        }
    },
    {
        method: 'POST',
        path: '/campaign',
        config: {
            description: 'create a new campaign',
            handler: function (request, reply) {

                // return reply.redirect('donate');
                var campaign = {
                    creator: request.payload.initiatorName
                };
                var urlId = Shortid.generate();
                Redis.hset('campaign', urlId, JSON.stringify(campaign));
                
                console.log(request.payload);
                return reply.redirect('donate/' + urlId);
            }
        }
    }
    ]);

    return next();
};

exports.register.attributes = {
    name: 'Campaign'
};
