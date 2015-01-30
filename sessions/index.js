(function (window, rJS) {
    rJS(window).ready(function (gadget) {
        gadget.render();
    })

    rJS(window).declareMethod("render", function (options) {
        var thisGadget = this;

        return thisGadget.getDeclaredGadget('session-storage').then(function (sessionStorageGadget) {
            return RSVP.all([sessionStorageGadget, sessionStorageGadget.getSessions()]);
            /* Get sessions returns session objects that must be then fetched... */
        }).then(function (params) {
            var sessionStorageGadget = params[0];
            var result = params[1];


            var rows = result.data.rows;

            /* Create an array that will contain all the promises for fetcing session data... */
            var p = [];
            for (var i = 0; i < rows.length; i++) {
                p.push(sessionStorageGadget.getSession(rows[i].id));
            }

            return RSVP.all(p);
            /* Run them in parallel and collect the results with actual session data */
        }).then(function (result) {

            var sessionListHTML = '';

            for (var i = 0; i < result.length; i++) {
                console.log(result[i]['_id']);
                sessionListHTML = sessionListHTML.concat('<li class="ui-li ui-li-static ui-btn"><a href="#page=cryptpad&key=', result[i]['_id'], '">Session: ', result[i]['_id'], ' - Last opened: ', new Date(result[i].date), '</a></li>\n');
            }

            var sessionListElement = thisGadget.__element.getElementsByClassName('session-list')[0];
            sessionListElement.innerHTML = sessionListHTML;
        });
    });
})(window, rJS);
