function Stage(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.renderer = new Renderer(this.ctx);
    this.children = [];
}

Stage.prototype = {
    constructor: Stage,
    addChild: function (child) {
        this.children.push(child);
    },
    render: function () {
        if (this.update) {
            this.update();
        }
        this.renderer.render(this.children);
        requestNextAnimationFrame(this.render.bind(this));
    },
}

