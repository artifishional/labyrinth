(function() {
    "use strict";

    var STEP_TIME = 300;

    /**
     * @param {Field} field
     * @param x
     * @param y
     * @constructor
     */
    var Unit = function(field, x, y) {

        this.stepTime = STEP_TIME;

        this._direction = 2;

        this.onDirectionChange = Event();
        this.onLockedChange = Event();
        this.onReady = Event();

        this._isLocked = false;
        this.field = field;

        Unit.super.constructor.call(this);
        this.x = x;
        this.y = y;
    };

    extend(Unit, Model);


    Object.defineProperty(Unit.prototype, "isLocked", {
        get: function() {
            return this._isLocked;
        },
        set: function(value) {
            value = !!value;
            if(value != this._isLocked) {
                value && setTimeout(this._unlock.bind(this), this.stepTime);
                this._isLocked = value;
                this.onLockedChange.emit(this, value);
                !value && this.onReady.emit(this);
            }
        }
    });


    Object.defineProperty(Unit.prototype, "direction", {
        get: function() {
            return this._direction;
        },
        set: function(value) {
            if(value != this._direction) {
                this._direction = value;
                this.onDirectionChange.emit(this, value);
            }
        }
    });


    Unit.prototype._unlock = function() {
        this.isLocked = false;
    };


    Unit.prototype.forward = function() {
        this.move(this.direction);
    };


    /**
     * code == 0 left
     * code == 1 top
     * code == 2 right
     * code == 3 bottom
     */
    Unit.prototype.move = function(code) {

        if(this.isLocked) return;
        this.direction = code;

        var x = this.x;
        var y = this.y;

        if(code == 0) x-- ;
        else if(code == 1) y--;
        else if(code == 2) x++;
        else if(code == 3) y++;

        if(this.field.get(x, y) == 1) {
            return this.onReady.emit(this);
        }

        this.x = x;
        this.y = y;
        this.isLocked = true;
        this.onChange.emit(this);

    };

    window.Unit = Unit;

})();