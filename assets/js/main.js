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
});
})();
