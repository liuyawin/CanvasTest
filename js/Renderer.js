function Renderer(ctx){
    this.ctx = ctx;
}
Renderer.prototype = {
    constructor: Renderer,
    render: function (displayObjectArr) {
        if (!this.ctx || typeof this.ctx.drawImage !== 'function') {
            return;
        }

        ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        for (var i = 0, n = displayObjectArr.length; i < n; i++) {
            var displayObject = displayObjectArr[i];

            this.ctx.save();

            this.ctx.translate(displayObject.x, displayObject.y);
            if (displayObject.rotation) {
                this.ctx.rotate(displayObject.rotation);
            }
            this.ctx.translate(-displayObject.pivotX, -displayObject.pivotY);
            this.ctx.drawImage(displayObject.image, 0, 0, displayObject.image.width, displayObject.image.height, 0, 0, 
                displayObject.width || displayObject.image.width, displayObject.height || displayObject.image.height);

            this.ctx.restore();
        }
    }

}