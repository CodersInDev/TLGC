(function () {
    "use strict";

    $( document ).ready(function() {
        console.log( "ready!" );
        var d = new Date();
        $('.js_year').text(d.getFullYear());
    });

})();