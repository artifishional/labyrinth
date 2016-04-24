(function() {
    "use strict";

    var Girl = function(field, x, y) {
        field.set(x, y, 2);
        Girl.super.constructor.call(this, field, x, y);
    };

    extend(Girl, Unit);


    Girl.prototype.destroy = function() {
        this.field.set(this.x, this.y, 0);
        Girl.super.destroy.call(this);
    };

    window.Girl = Girl;

})();