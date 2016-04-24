(function() {

    var MainView = function(model, dom) {
        this.scoreDom = dom.getElementsByClassName("score")[0];
        this.levelDom = dom.getElementsByClassName("level")[0];
        this.filedDom = dom.getElementsByClassName("field")[0];
        this.field = new FieldView(model.field, this.filedDom);
        var player = document.createElement("div");
        player.classList.add("unit");
        player.classList.add("player");
        this.filedDom.appendChild(player);
        new UnitController(model.player, player);
        MainView.super.constructor.call(this, model, dom);
    };

    extend(MainView, DomView);


    /**
     * @param {Main} model
     */
    MainView.prototype.setModel = function(model) {
        if(this.model != model) {
            if(model) {
                model.onAddUnit.on(this.doAddUnit, this);
                model.onScoreChange.on(this.doScoreChange, this);
                model.onLevelChange.on(this.doLevelChange, this);
            }
            MainView.super.setModel.call(this, model);
        }
    };


    MainView.prototype.doScoreChange = function(model, score) {
        this.scoreDom.textContent = score;
    };


    MainView.prototype.doLevelChange = function(model, level) {
        this.levelDom.textContent = level;
    };


    MainView.prototype.doLevelChange = function(model, level) {
        this.levelDom.textContent = level;
    };


    MainView.prototype.doAddUnit = function(src, unit) {

        var crip = document.createElement("div");
        crip.classList.add("unit");
        this.filedDom.appendChild(crip);

        if(unit instanceof Girl) {
            crip.classList.add("girl");
            new GirlView(unit, crip);
        }
        else {
            crip.classList.add("crip");
            new CripView(unit, crip);
        }

    };


    MainView.prototype.doModelDestroy = function(model) {
        model.onAddUnit.off(this.doAddUnit, this);
        model.onLevelChange.off(this.doLevelChange, this);
        model.onScoreChange.off(this.doScoreChange, this);
        MainView.super.doModelDestroy.call(this, model);
    };


    window.MainView = MainView;

})();