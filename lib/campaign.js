var Shortid = require('shortid');
var Redis = require('./redis.js');
var Joi = require('joi');

var internals = {};
internals.closeDate = function (userDate) {

    var deliveryDate = userDate ? new Date(userDate) : new Date(); // remove conditional for production
    var offset;
    var closingDate;
    var closingDateText;

    if (deliveryDate.getDay() === 6 || deliveryDate.getDay() === 5 || deliveryDate.getDay() === 4) {
        offset = 3;
    } else if (deliveryDate.getDay() === 3 || deliveryDate.getDay() === 2 || deliveryDate.getDay() === 1) {
        offset = 5;
    } else if (deliveryDate.getDay() === 0){
        offset = 4;
    }

    closingDate = new Date(deliveryDate);
    closingDate.setDate(deliveryDate.getDate() - offset);

    closingDateText = closingDate.toDateString() + ' at 7pm';
    return closingDateText;
};

internals.formatDate = function (date) {

    var dateArray = date.split('-');
    var newDate = dateArray[2] + '-' + dateArray[1] + '-' + dateArray[0];
    return  newDate;
};

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
                    tc: Joi.required()

                };

                if (request.payload.decision === 'youDecide') {

                    schema.giftProposition = Joi.string().min(10).required();
                }

                var validationObject = Joi.validate(request.payload, schema, { abortEarly: false, allowUnknown: true });

                if (!validationObject.error){

                    delete request.payload.tc;
                    var today = new Date();
                    request.payload.createdAt = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
                    request.payload.closedAt = internals.closeDate(internals.formatDate(request.payload.deliveryDate));
                    var urlId = Shortid.generate();
                    Redis.hmset('campaign:'+urlId, request.payload);
                    return reply.redirect('donate/' + urlId);

                }

                validationObject.value.messageError = 'The form contains some errors';
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
