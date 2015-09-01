var Hapi = require('hapi');
var Home = require('./home.js');
var Campaign = require('./campaign.js');
var Donate = require('./donate.js');
var Vision = require('vision');
var Handlebars = require('handlebars');
var Assets = require('./asset.js');
var Inert = require('inert');

var internals = {};

exports.init = function (port, next) {

    var server = new Hapi.Server();
    server.connection({ port: port });
    server.register([Inert, Assets, Vision, Home, Campaign, Donate], function (err) {

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
