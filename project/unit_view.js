(function() {
    "use strict";

    var UnitView = function(model, dom) {
        UnitView.super.constructor.call(this, model, dom);
    };

    extend(UnitView, DomView);


    UnitView.prototype.doModelChange = function(src) {
        this.dom.style.marginTop = 16 * src.y + "px";
        this.dom.style.marginLeft = 16 * src.x + "px";
    };


    UnitView.prototype.refresh = function() {
        this.doModelChange(this.model);
        UnitView.super.refresh.call(this);
    };


    UnitView.prototype.doModelDestroy = function(model) {
        this.dom.parentNode.removeChild(this.dom);
        UnitView.super.doModelDestroy.call(this, model);
    };

    window.UnitView = UnitView;

})();