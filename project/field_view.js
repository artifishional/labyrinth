(function() {
    "use strict";

    var FieldView = function(model, dom) {
        this.blocks = [];
        dom.style.width = model.width * 16 + "px";
        FieldView.super.constructor.call(this, model, dom);
    };

    extend(FieldView, DomView);


    FieldView.prototype.setModel = function(model) {
        if(this.model != model) {
            if(model) {
                model.onChange.on(this.doModelChange, this);
            }
            FieldView.super.setModel.call(this, model);
        }
    };


    FieldView.prototype.doModelChange = function(src) {
        this.blocks.forEach(function (elm) {
            this.dom.removeChild(elm);
        }, this);
        this.blocks = [];
        for(var i = 0, div; i < this.model.item.length; i++) {
            div = document.createElement("div");
            if(this.model.item[i]) {
                div.classList.add("wall");
            }
            else {
                div.classList.remove("wall");
            }
            this.dom.appendChild(div);
            this.blocks.push(div);
        }
    };


    FieldView.prototype.refresh = function() {
        this.doModelChange(this.model);
        FieldView.super.refresh.call(this);
    };


    FieldView.prototype.doModelDestroy = function(model) {
        model.onChange.off(this.doModelChange, this);
        FieldView.super.doModelDestroy.call(this, model);
    };


    FieldView.prototype.refresh = function() {
        this.doModelChange(this.model);
        FieldView.super.refresh.call(this);
    };

    window.FieldView = FieldView;

})();