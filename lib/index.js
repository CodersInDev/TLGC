var Hapi = require('hapi');
var Home = require('./home.js');
var Admin = require('./admin.js');
var Auth = require('./auth.js');
var Campaign = require('./campaign.js');
var Donate = require('./donate.js');
var Vision = require('vision');
var Handlebars = require('handlebars');
var Assets = require('./asset.js');
var Inert = require('inert');
var Stripe = require('./stripe');
var ErrorPath = require('./error.js');

var internals = {};

exports.init = function (port, next) {

    var server = new Hapi.Server();
    server.connection({ port: port });

    server.register([Inert, Assets, Vision, Home, Campaign, Donate, Stripe, Admin, Auth, ErrorPath], function (err) {

        if (err) {
            return next(err);
        }

        server.views({
            engines: {
                html: Handlebars
            },
            relativeTo: __dirname + '/../',
            path: 'views',
            layout: true,
            layoutPath: 'views/layouts',
            helpersPath: 'views/helpers',
            partialsPath: 'views/partials'
        });

        server.start( function (err) {

            return next(err, server);
        });
    });
};
