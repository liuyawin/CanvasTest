function Renderer(ctx){
    this.ctx = ctx;
}

Renderer.prototype = {
    constructor: Renderer,
    render: function (displayObjectArr) {
        if (!this.ctx || typeof this.ctx.drawImage !== 'function') {
            return;
        }

        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        for (var i = 0, n = displayObjectArr.length; i < n; i++) {
            displayObjectArr[i].draw(this.ctx);
        }
    }

}