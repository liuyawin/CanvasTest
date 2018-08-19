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