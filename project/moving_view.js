(function() {
    "use strict";

    /**
     * @param {Unit} model
     * @param dom
     * @constructor
     */
    var MovingView = function(model, dom) {
        dom.style.animationDuration = model.stepTime / 1000 + "s";
        dom.style.transitionDuration = model.stepTime / 1000 + "s";
        MovingView.super.constructor.call(this, model, dom);
    };

    extend(MovingView, UnitView);


    /**
     * @param {Unit} model
     */
    MovingView.prototype.setModel = function(model) {
        if(this.model != model) {
            if(model) {
                model.onChange.on(this.doModelChange, this);
                model.onDirectionChange.on(this.doDirectionChange, this);
                model.onLockedChange.on(this.doLockedChange, this);
            }
            MovingView.super.setModel.call(this, model);
        }
    };


    MovingView.prototype.doDirectionChange = function(src, direction) {
        this.dom.style.backgroundPositionY = -52 + direction*17 + "px";
    };


    MovingView.prototype.doLockedChange = function(src, isLocked) {
        if(this.model.isLocked) this.dom.classList.add("move");
        else this.dom.classList.remove("move");
    };


    MovingView.prototype.refresh = function() {
        this.doDirectionChange(this.model, this.model.direction);
        MovingView.super.refresh.call(this);
    };


    MovingView.prototype.doModelDestroy = function(model) {
        model.onChange.off(this.doModelChange, this);
        model.onDirectionChange.off(this.doDirectionChange, this);
        model.onLockedChange.off(this.doLockedChange, this);
        MovingView.super.doModelDestroy.call(this, model);
    };

    window.MovingView = MovingView;

})();