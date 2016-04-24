(function() {
    "use strict";

    /**
     * @param {Field} field
     * @param {Unit} unit
     * @constructor
     */
    var Bot = function(field, unit) {
        this.field = field;
        this.unit = unit;
        this.onHunting = Event();
        unit.onReady.on(this.doReady, this);
        unit.onChange.on(this.doChange, this);
        unit.onDestroy.on(this.doUnitDestroy, this);
        Bot.super.constructor.call(this);
        this.doReady(this.unit, false);
    };

    extend(Bot, Model);


    Bot.prototype.doReady = function(src) {
        if(this.end) {}
        else {

            var cur = Math.random() * 10|0;
            if(cur > 5) {
                this.unit.move(cur-6);
            }
            else {
                this.unit.forward();
            }

        }
    };


    Bot.prototype.doUnitDestroy = function(unit) {
        unit.onReady.off(this.doReady, this);
        unit.onChange.off(this.doChange, this);
        unit.onDestroy.off(this.doUnitDestroy, this);
    };


    Bot.prototype.doChange = function(src) {
        var value = this.field.get(src.x, src.y);
        if(value == 2) {
            this.end = true;
            this.destroy();
            this.unit.destroy();
        }
        else if(value == 3) {
            this.onHunting.emit(this);
        }
    };

    window.Bot = Bot;

})();