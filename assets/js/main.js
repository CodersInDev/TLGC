
(function () {

    'use strict';

    $( document ).ready(function () {

        console.log( 'ready!' );
        var d = new Date();
        $('.js_year').text(d.getFullYear());

         $('#campaign-create').validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                email: {
                    required: true,
                    email: true
                },
                phone: {
                    required: true,
                    digits: true,
                    minlength: 7
                },
                message: {
                    required: true,
                    minlength: 20
                }
            },
            messages: {
                name: {
                    required: "Please enter your name",
                    minlength: "Your name seems a bit short"
                },
                email: {
                    required: "Please enter your email address",
                    email: "Please enter a valid email address"
                },
                phone: {
                    required: "Please enter your phone number",
                    digits: "Please enter a valid phone number",
                    minlength: "Your phone number seems a bit short"
                },
                message: {
                    required: "Please enter your message",
                    minlength: "Your message seems a bit short. Please enter at least 20 characters"
                }
            }
        });
    });

})();
