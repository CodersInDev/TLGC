(function () {
    'use strict';

$( document ).ready(function () {

    var d = new Date();
    $('.js_year').text(d.getFullYear());
    $( "#datepicker" ).datepicker({
        dateFormat: "dd-mm-yy"
    });
    $("#datepicker").keypress(function(e) {
        e.preventDefault();
    });


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
                required: true
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
                required: "Please enter your name",
                minlength: "Your name seems a bit short"
            },
            email: {
                required: "Please enter your email address",
                email: "Please enter a valid email address"
            },
            initiatorName: {
                required: "Please enter leaver name",
                minlength: "Leaver name seems a bit short"
            },
            reasonForLeaving: {
                required: "Please choose reason for leaving"
            },
            decision: {
                required: "Please pick who will decide"
            },
            age: {
                required: "Please choose age range"
            },
            gender: {
                required: "Please choose gender"
            },
            address1: {
                required: "Please enter an address"
            },
            postCode: {
                required: "Please enter post code"
            },
            deliveryDate: {
                required: "Pick your delivery date"
            },
            tc: {
                required: "Please tick terms and condition",
                
            }
        }
    });

    });
})();
