function Stage(ctx){
    this.renderer = new Renderer(ctx);
    this.children = [];
}

Stage.prototype = {
    constructor: Stage,
    addChild: function(child){
        this.children.push(child);
    },
    render: function(){
        if (this.update) {
            this.update();
        }
        this.renderer.render(this.children);
        requestAnimationFrame(this.render.bind(this));
    },
}

