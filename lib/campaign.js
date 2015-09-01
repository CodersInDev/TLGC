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

                console.log('create campaign database');
                return reply.redirect('donate');
            }
        }
    }
    ]);

    return next();
};

exports.register.attributes = {
    name: 'Campaign'
};
