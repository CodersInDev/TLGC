var Shortid = require('shortid');
var Redis = require('./redis.js')(process.env.REDIS_URL);
var Joi = require('joi');

var internals = {

    closeDate: function (userDate) {

        var deliveryDate =  new Date(userDate);
        var offset;
        var closingDate;
        var closingDateText;

        // //saturday // friday // thursday
        // if (deliveryDate.getDay() === 6 || deliveryDate.getDay() === 5 || deliveryDate.getDay() === 4) {
        //     offset = 3;
        //
        // //Monday // tuesday //wednesday
        // } else if (deliveryDate.getDay() === 3 || deliveryDate.getDay() === 2 || deliveryDate.getDay() === 1) {
        //     offset = 5;
        // //sunday
        // } else if (deliveryDate.getDay() === 0){
        //     offset = 4;
        // }
        offset = 7;
        closingDate = new Date(deliveryDate);
        closingDate.setDate(deliveryDate.getDate() - offset);

        closingDateText = closingDate.toDateString() + ' at 7pm';
        return closingDateText;
    },

    formatDate: function (date) {

        var dateArray = date.split('-');
        var newDate = dateArray[2] + '-' + dateArray[1] + '-' + dateArray[0];
        return  newDate;
    }
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
                    tc: Joi.required(),
                    giftProposition: Joi.required()
                };

                var validationObject = Joi.validate(request.payload, schema, { abortEarly: false, allowUnknown: true });

                if (!validationObject.error){

                    delete request.payload.tc;
                    var today = new Date();
                    request.payload.createdAt = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
                    request.payload.closedAt = internals.closeDate(internals.formatDate(request.payload.deliveryDate));
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
