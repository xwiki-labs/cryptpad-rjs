(function (window, rJS, require) {
    var cryptPadLoadedCallback;

    /* Gadget definition */
    rJS(window).ready(function (g) {
        /* We use the explicit requirejs module loading because data-main script attribute in the HTML
         is not taken into account when the gadget is loaded via RenderJS */
        require.config({
            baseUrl: '../lib/cryptpad/www/'
        });

        require(['main'], function (main) {
            var cryptPadURL = 'http://localhost:3000/api/config?cb=' + Math.random().toString(16).substring(2)

            console.log("Starting up cryptpad with relay: " + cryptPadURL);

            main('editor1', cryptPadURL, cryptPadLoadedCallback);
        });
    });

    rJS(window).declareMethod("setCryptPadLoadedCallback", function (callback) {
        cryptPadLoadedCallback = callback;
    });
})(window, rJS, require);
