(function() {
    "use strict";

    var GirlView = function(model, dom) {
        GirlView.super.constructor.call(this, model, dom);
    };

    extend(GirlView, UnitView);

    window.GirlView = GirlView;

})();
