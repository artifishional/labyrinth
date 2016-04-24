(function() {
    "use strict";

    var UnitController = function(model, dom) {
        UnitController.super.constructor.call(this, model, dom);
    };

    extend(UnitController, PlayerView);


    UnitController.prototype.handleEvent = function(event) {
        if(event.keyCode == 32) {
            this.model.establish();
        }
        else {
            this.model.move(event.keyCode - 37);
        }
    };


    UnitController.prototype.refresh = function() {
        window.addEventListener("keydown", this);
        UnitController.super.refresh.call(this);
    };


    UnitController.prototype.doModelDestroy = function(model) {
        window.removeEventListener("keydown", this);
        UnitController.super.doModelDestroy.call(this, model);
    };

    window.UnitController = UnitController;

})();