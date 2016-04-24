(function() {
    "use strict";

    var Field = function(width, height) {
        this.width = width;
        this.height = height;
        this.item = [];
        Field.super.constructor.call(this);
        this.replace();
    };

    extend(Field, Model);


    Field.prototype.get = function(x, y) {
        return this.item[y * this.width + x];
    };


    Field.prototype.set = function(x, y, value) {
        return this.item[y * this.width + x] = value;
    };


    Field.prototype.replace = function() {
        this.item = [];
        for(var i = this.width * this.height; i--;) {

            if(i % this.width == 0 || i % this.width == this.width-1) {
                this.item.push(1);
            }

            else if((i / this.width|0) == 0 || (i / this.width|0) == this.height-1) {
                this.item.push(1);
            }

            else {
                this.item.push(Math.random()*12 > 9);
            }

        }
        this.onChange.emit(this);
    };


    window.Field = Field;

})();