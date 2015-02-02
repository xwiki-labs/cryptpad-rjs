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
                return thisGadget.declareGadget('../cryptpad-gadget/index.html', {
                    element: pageElement
                }).then(function (cryptPadGadget) {
                    return cryptPadGadget.setCryptPadLoadedCallback(function (cryptPad) {
                        thisGadget.__element.getElementsByClassName('title')[0].innerHTML = 'CryptPAD: ' + cryptPad.getKey();

                        thisGadget.getDeclaredGadget('session-storage').then(function (sessionStorage) {
                            return sessionStorage.storeSession(cryptPad.getKey(), 'preview');
                        });
                    });
                });
            case 'sessions':
                return thisGadget.declareGadget('../sessions/index.html', {element: pageElement});
            case 'settings':
                return thisGadget.declareGadget('../settings/index.html', {element: pageElement});
        }
    });
})
(window, rJS);
