var Shortid = require('shortid');
var Redis = require('./redis.js')(process.env.REDIS_URL);
var Joi = require('joi');

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

                var schema = {
                    initiatorName: Joi.required(),
                    email: Joi.required(),
                    leaverName: Joi.required(),
                    reasonForLeaving: Joi.required(),
                    decision: Joi.required(),
                    age: Joi.required(),
                    gender: Joi.required(),
                    nameOfRecipient: Joi.required(),
                    address1: Joi.required(),
                    address2: Joi.required(),
                    postCode: Joi.required(),
                    deliveryDate: Joi.required(),
                    tc: Joi.required(),
                    giftProposition: Joi.required()
                };

                var validationObject = Joi.validate(request.payload, schema, { abortEarly: false, allowUnknown: true });

                if (!validationObject.error){

                    delete request.payload.tc;
                    var today = new Date();
                    request.payload.createdAt = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
                    request.payload.totalAmount = 0;
                    var urlId = Shortid.generate();
                    request.payload.urlId = urlId;
                    Redis.hmset('campaign:' + urlId, request.payload);
                    //Redis.end();
                    console.log('before rediare to donate');
                    return reply.redirect('donate/' + urlId);
                }

                // validationObject.value.messageError = 'The form contains some errors';

                return reply.view('campaign', validationObject.value);

            }
        }
    }
    ]);

    return next();
};

exports.register.attributes = {
    name: 'Campaign'
};
