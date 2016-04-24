(function() {
    "use strict";

    /**
     * @param {Unit} model
     * @param dom
     * @constructor
     */
    var CripView = function(model, dom) {
        this.audio = new Audio('project/ready.mp3');
        CripView.super.constructor.call(this, model, dom);
    };

    extend(CripView, MovingView);


    CripView.prototype.doModelDestroy = function(model) {
        this.audio.play();
        CripView.super.doModelDestroy.call(this, model);
    };

    window.CripView = CripView;

})();