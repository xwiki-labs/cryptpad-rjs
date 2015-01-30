(function (window, jIO, rJS) {
    rJS(window).ready(function (gadget) {
        gadget.jIO = jIO.createJIO({
            type: 'indexeddb',
            database: 'cryptpad'
        })
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
    });
})(window, jIO, rJS);
