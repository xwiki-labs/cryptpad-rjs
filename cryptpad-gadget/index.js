(function (window, rJS, require) {
    var cryptPadLoadedCallback;

    /* Gadget definition */
    rJS(window).ready(function (gadget) {
        /* We use the explicit requirejs module loading because data-main script attribute in the HTML
         is not taken into account when the gadget is loaded via RenderJS */
        require.config({
            baseUrl: '../lib/cryptpad/www/'
        });

        require(['main'], function (main) {

            gadget.getDeclaredGadget('session-storage').then(function (sessionStorage) {
                return sessionStorage.getSettings();
            }).then(function (settings) {
                var cryptPadURL = 'http://localhost:3000/api/config?cb=' + Math.random().toString(16).substring(2);

                if (settings.url) {
                    cryptPadURL = settings.url + '/api/config?cb=' + Math.random().toString(16).substring(2);
                }

                console.log("Starting up cryptpad with relay: " + cryptPadURL);

                main('editor1', cryptPadURL, cryptPadLoadedCallback);
            });
        });
    });

    rJS(window).declareMethod("setCryptPadLoadedCallback", function (callback) {
        cryptPadLoadedCallback = callback;
    });
})(window, rJS, require);
