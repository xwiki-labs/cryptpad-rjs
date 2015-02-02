(function (window, jIO, rJS) {
    rJS(window).ready(function (gadget) {
        gadget.jIO = jIO.createJIO({
            type: 'indexeddb',
            database: 'cryptpad-sessions'
        });

        gadget.jIOSettings = jIO.createJIO({
            type: 'indexeddb',
            database: 'cryptpad-settings'
        });
    }).declareMethod('info', function () {
        var gadget = this;

        console.log(gadget.jIO);
    }).declareMethod('storeSession', function (key, preview) {
        this.jIO.put({_id: key, date: (new Date()).getTime(), preview: preview}).then(function (response) {
            console.log("Stored session: " + key);
        });
    }).declareMethod('getSessions', function () {
        return this.jIO.allDocs();
    }).declareMethod('getSession', function (id) {
        return this.jIO.get({_id: id});
    }).declareMethod('storeSettings', function (settings) {
        return this.jIOSettings.put({_id: 'cryptPadSettings', url: settings.url});
    }).declareMethod('getSettings', function () {
        return this.jIOSettings.get({_id: 'cryptPadSettings'});
    });
})(window, jIO, rJS);
