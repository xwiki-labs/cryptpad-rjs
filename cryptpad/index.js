(function (window, rJS) {
    "use strict";

    $.mobile.ajaxEnabled = false;
    $.mobile.linkBindingEnabled = false;
    $.mobile.hashListeningEnabled = false;
    $.mobile.pushStateEnabled = false;

    rJS(window).declareMethod("render", function (options) {
        var thisGadget = this;

        var pageElement = thisGadget.__element.getElementsByClassName('page')[0];
        pageElement.innerHTML = '';

        switch (options.page) {
            case 'cryptpad':
                return thisGadget.declareGadget('../cryptpad-gadget/index.html', {element: pageElement}).then(function (cryptPadGadget) {
                    return cryptPadGadget.setCryptPadLoadedCallback(function (cryptPad) {
                        thisGadget.__element.getElementsByClassName('title')[0].innerHTML = 'CryptPAD: ' + cryptPad.getKey();
                    });
                });
        }
    });
})(window, rJS);
