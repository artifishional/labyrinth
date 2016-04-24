(function() {
    "use strict";

    /**
     * @param {Unit} model
     * @param dom
     * @constructor
     */
    var PlayerView = function(model, dom) {
        this.girls = document.getElementsByClassName("girls")[0];
        this.audio = new Audio('project/hunting.mp3');
        PlayerView.super.constructor.call(this, model, dom);
    };

    extend(PlayerView, MovingView);


    /**
     * @param {Player} model
     */
    PlayerView.prototype.setModel = function(model) {
        if(this.model != model) {
            if(model) {
                model.onGirlsChange.on(this.doGirlsChange, this);
            }
            PlayerView.super.setModel.call(this, model);
        }
    };


    PlayerView.prototype.doGirlsChange = function(src, girls) {
        this.girls.textContent = src.maxGirls - girls.length;
    };


    PlayerView.prototype.doModelDestroy = function(model) {
        model.onGirlsChange.off(this.doGirlsChange, this);
        this.audio.play();
        PlayerView.super.doModelDestroy.call(this, model);
    };

    window.PlayerView = PlayerView;

})();