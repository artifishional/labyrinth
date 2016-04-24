(function() {

    var WIDTH = 37;
    var HEIGHT = 18;

    var Main = function() {
        this.spawnTime = 10000;
        this.crips = [];
        this._score = 0;
        this.onScoreChange = Event();
        this.onLevelChange = Event();
        this.onAddUnit = Event();
        this.field = new Field(WIDTH, HEIGHT);
        this.player = new Player(this.field, 1, 1);
        this.player.onEstablish.on(this.doEstablish, this);
        Main.super.constructor.call(this);
        this.level = 1;
    };

    extend(Main, Model);


    Main.prototype.doEstablish = function(src, unit) {
        this.onAddUnit.emit(this, unit);
    };


    Main.prototype.doTimer = function() {
        var unit = this.createCrip();
        this.onAddUnit.emit(this, unit);
    };


    Main.prototype.doCripDestroy = function(src) {
        this.score += this.level;
        var girl = this.player.girls.find(function(elm) {
            return src.x == elm.x && src.y == elm.y;
        });
        girl && girl.destroy();
        this.crips.remove(src);
        src.onDestroy.off(this.doCripDestroy, this);
        if(!this.crips.length) this.level ++ ;
    };


    Main.prototype.doGameOver = function(src) {
        this.player.destroy();
        clearInterval(this.interval);
    };


    Object.defineProperty(Main.prototype, "level", {
        get: function() {
            return this._level;
        },
        set: function(value) {
            this._level = value;
            clearInterval(this.interval);
            this.spawnTime /= 1.05;
            this.interval = setInterval(this.doTimer.bind(this), this.spawnTime);
            /*setTimeout(function () {
                this.crips[0].destroy();
            }.bind(this), 10000);*/
            setTimeout(this.doTimer.bind(this), 0);
            this.field.replace();
            this.player.clear();
            this.player.level = value;
            this.onLevelChange.emit(this, value);
        }
    });


    Object.defineProperty(Main.prototype, "score", {
        get: function() {
            return this._score;
        },
        set: function(value) {
            this._score = value;
            this.onScoreChange.emit(this, value);
        }
    });


    Main.prototype.createCrip = function() {
        var unit = new Unit(this.field,
            (Math.random() * (WIDTH -6) + 3)|0,
            (Math.random() * (HEIGHT-6) + 3)|0
        );
        unit.onDestroy.on(this.doCripDestroy, this);
        var bot = new Bot(this.field, unit);
        bot.onHunting.on(this.doGameOver, this);
        this.crips.push(unit);
        return unit;
    };

    window.Main = Main;

})();