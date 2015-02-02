(function (window, rJS) {
    var DEFAULT_URL = 'http://localhost:3000';

    rJS(window).ready(function (gadget) {
        var urlField = gadget.__element.getElementsByClassName('url-field')[0];

        gadget.getDeclaredGadget('session-storage').then(function (sessionStorage) {
            return sessionStorage.getSettings();
        }).then(function (settings) {


            if (settings.url) {
                urlField.value = settings.url;
            }
            else {
                urlField.value = DEFAULT_URL;
            }
        }).fail(function (e) {
            urlField.value = DEFAULT_URL;
        });

        var settingsForm = gadget.__element.getElementsByClassName('settings-form')[0];
        settingsForm.addEventListener('submit', function onSubmit(e) {
            gadget.getDeclaredGadget('session-storage').then(function (sessionStorage) {
                return sessionStorage.storeSettings({url: urlField.value});
            });

            return false;
        });
    })


})(window, rJS);
