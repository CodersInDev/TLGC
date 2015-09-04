(function () {

    'use strict';

    $( document ).ready(function () {

        var d = new Date();

        $('.js_year').text(d.getFullYear());

        $( '#datepicker' ).datepicker({
            dateFormat: 'dd-mm-yy'
        });

        $('#datepicker').keypress(function (e) {

            e.preventDefault();
        });


        var validatePostcode = function (postcode) {

            var regPostcode = /^([a-zA-Z]){1}([0-9][0-9]|[0-9]|[a-zA-Z][0-9][a-zA-Z]|[a-zA-Z][0-9][0-9]|[a-zA-Z][0-9]){1}([ ])([0-9][a-zA-z][a-zA-z]){1}$/;
            return regPostcode.test(postcode);
        };

        jQuery.validator.addMethod("validatorPostCode",validatePostcode, "Please specify the correct domain for your documents");

        $('#campaign-create').validate({
            rules: {
                initiatorName: {
                    required: true,
                    minlength: 2
                },
                email: {
                    required: true,
                    email: true
                },
                leaverName: {
                    required: true,
                    minlength: 2
                },
                reasonForLeaving: {
                    required:true
                },
                decision: {
                    required:true
                },
                age: {
                    required:true
                },
                gender: {
                    required:true
                },
                address1: {
                    required: true
                },
                postCode: {
                    required: true,
                    validatorPostCode: true
                },
                deliveryDate: {
                    required: true
                },
                tc: {
                    required: true
                }
            },
            messages: {
                initiatorName: {
                    required: 'Please enter your name',
                    minlength: 'Your name seems a bit short'
                },
                email: {
                    required: 'Please enter your email address',
                    email: 'Please enter a valid email address'
                },
                leaverName: {
                    required: 'Please enter the leaver\'s name',
                    minlength: 'That name seems a bit short'
                },
                reasonForLeaving: {
                    required: 'Please choose reason for leaving'
                },
                decision: {
                    required: 'Please pick who will decide'
                },
                age: {
                    required: 'Please choose age range'
                },
                gender: {
                    required: 'Please choose gender'
                },
                address1: {
                    required: 'Please enter an address'
                },
                postCode: {
                    required: 'Please enter postcode',
                    validatorPostCode: 'Please enter a valid postcode'
                },
                deliveryDate: {
                    required: 'Pick your delivery date'
                },
                tc: {
                    required: 'Please tick terms and condition'

                }
            }
        });

        $('#donation-btn-slide').click(function () {
            $('.formDonate-slide').slideDown();
        });

        var formatDate = function (date) {

            var dateArray = date.split('-');
            var newDate = dateArray[2] + '-' + dateArray[1] + '-' + dateArray[0];
            return  newDate;
        };



        var deliveryOffset = function (userDate) {

            var deliveryDate =  new Date(userDate);
            var offset;
            var closingDate;
            var closingDateText;

            //saturday // friday // thursday
            if (deliveryDate.getDay() === 6 || deliveryDate.getDay() === 5 || deliveryDate.getDay() === 4) {
                offset = 3;

            //Monday // tuesday //wednesday
            } else if (deliveryDate.getDay() === 3 || deliveryDate.getDay() === 2 || deliveryDate.getDay() === 1) {
                offset = 5;
            //sunday
            } else if (deliveryDate.getDay() === 0){
                offset = 4;
            }

            closingDate = new Date(deliveryDate);
            closingDate.setDate(deliveryDate.getDate() - offset);
            return closingDate;
        };

        //generate the closeAt date

        $('#datepicker').on('change', function () {
            var userInputDate = $('#datepicker').val();
            var closeAt = deliveryOffset(formatDate(userInputDate));
            var finalClosingDate = 'Your gift campaign will end on ' + closeAt.toDateString() + ' at 7pm';

            $('#delivery-msg').text(finalClosingDate);
            $('#closeAt').val(closeAt.getDate() + '-' + (closeAt.getMonth() + 1) + '-' + closeAt.getUTCFullYear());
        });

    });
})();
