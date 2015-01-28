(function (window, rJS) {
    rJS(window).ready(function (g) {
        g.render();
    }).declareMethod("render", function () {
        var gadget = this;

        return RSVP.all([
            gadget.declareGadget("../cryptpad-gadget/index.html", {element: gadget.__element})
        ]);
    });
})(window, rJS);
