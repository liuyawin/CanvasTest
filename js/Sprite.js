function Sprite(options) {
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.width = options.width || 0;
    this.height = options.height || 0;
    this.rotation = options.rotation || 0;

    this.pivotX = options.pivotX || 0;
    this.pivotY = options.pivotY || 0;

    this.image = options.image;
}

Sprite.prototype = {
    constructor: Sprite,
    draw: function (ctx) {
        ctx.save();

        ctx.translate(this.x, this.y);
        if (this.rotation) {
            ctx.rotate(this.rotation);
        }
        ctx.translate(-this.pivotX, -this.pivotY);
        ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height, 0, 0,
            this.width || this.image.width, this.height || this.image.height);

        ctx.restore();
    }
}