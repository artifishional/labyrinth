(function() {
    "use strict";

    var STEP_TIME = 200;

    /**
     * @param {Field} field
     * @param x
     * @param y
     * @constructor
     */
    var Player = function(field, x, y) {
        this.girls = [];
        this.maxGirls = 7;
        this.onEstablish = Event();
        this.onGirlsChange = Event();
        Player.super.constructor.call(this, field, x, y);
        this.stepTime = STEP_TIME;
        this._level = 1;
    };

    extend(Player, Unit);


    Player.prototype.establish = function() {
        if(this.field.get(this.x, this.y) != 2) {
            if(this.girls.length < this.maxGirls) {
                this.onEstablish.emit(this, this.createGirl());
            }
        }
        else {
            this.girls.find(function(elm) {
                return elm.x == this.x && elm.y == this.y
            }, this).destroy();
        }
    };


    Object.defineProperty(Player.prototype, "level", {
        get: function() {
            return this._level;
        },
        set: function(value) {
            this.stepTime /=  1.02;
            this._level = value;
        }
    });


    Player.prototype.createGirl = function() {
        var unit = new Girl(this.field, this.x, this.y);
        unit.onDestroy.on(this.doGirlDestroy, this);
        this.girls.push(unit);
        this.onGirlsChange.emit(this, this.girls);
        return unit;
    };


    Player.prototype.clear = function() {
        this.x = 2;
        this.y = 2;
        this.girls.slice(0).forEach(function (elm) {
            elm.destroy();
        });
        this.onChange.emit(this);
    };


    Player.prototype.move = function(code) {
        if(this.field.get(this.x, this.y) == 3) {
            this.field.set(this.x, this.y, 0);
        }
        Player.super.move.call(this, code);
        if(!this.field.get(this.x, this.y)) {
            this.field.set(this.x, this.y, 3);
        }
    };


    Player.prototype.doGirlDestroy = function(src) {
        src.onDestroy.off(this.doGirlDestroy, this);
        this.girls.remove(src);
        this.onGirlsChange.emit(this, this.girls);
        if(src.x == this.x && src.y == this.y) {
            this.field.set(this.x, this.y, 3);
        }
    };


    Player.prototype.destroy = function() {
        this.girls.slice(0).forEach(function (elm) {
            elm.destroy();
        });
        Player.super.destroy.call(this);
    };

    window.Player = Player;

})();