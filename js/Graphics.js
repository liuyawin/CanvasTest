function Graphics() {
    this._actions = [];
}

Graphics.prototype = {
    constructor: Graphics,
    lineWidth: 1,
    lineAlpha: 1,
    lineCap: null, //'butt', 'round', 'square'
    lineJoin: null, //'miter', 'round', 'bevel'
    miterLimit: 10,
    hasStroke: false,
    strokeStyle: '0',
    hasFill: false,
    fillStyle: '0',
    fillAlpha: 0,
    /**
     * 指定绘图线条颜色
     */
    lineStyle: function (thickness, lineColor, lineAlpha, lineCap, lineJoin, miterLimit) {
        var addAction = this._addAction;

        addAction.call(this, ['lineWidth', (this.lineWidth = thickness || 1)]);
        addAction.call(this, ['strokeStyle', (this.strokeStyle = lineColor || '0')]);
        addAction.call(this, ['lineAlpha', (this.lineAlpha = lineAlpha || 1)]);
        if (lineCap != undefined) addAction.call(this, ['lineCap', (this.lineCap = lineCap)]);
        if (lineJoin != undefined) addAction.call(this, ['lineJoin', (this.lineJoin = lineJoin)]);
        if (miterLimit != undefined) addAction.call(this, ['miterLimit', (this.miterLimit = miterLimit)]);
        this.hasStroke = true;
        return this;
    },
    /**
     * 指定填充样式和透明度
     */
    beginFill: function (fill, alpha) {
        var addAction = this._addAction;

        addAction.call(this, ['fillStyle', (this.fillStyle = fill)]);
        addAction.call(this, ['fillAlpha', (this.fillAlpha = alpha || 1)]);
        this.hasFill = true;
        return this;
    },
    /**
     * 结束填充
     */
    endFill: function () {
        var addAction = this._addAction;

        if (this.hasStroke) addAction.call(this, ['stroke']);
        if (this.hasFill) addAction.call(this, ['fill']);

        return this;
    },
    /**
     * 开始一个新路径
     */
    beginPath: function () {
        return this._addAction(['beginPath']);
    },
    /**
     * 关闭当前路径
     */
    closePath: function () {
        return this._addAction(['closePath']);
    },
    /**
     * 将当前绘制位置移动到某个点
     */
    moveTo: function (x, y) {
        return this._addAction(['moveTo', x, y]);
    },
    /**
     * 绘制一个圆
     */
    drawCircle: function (x, y, radius) {
        return this._addAction(['arc', x + radius, y + radius, radius, 0, Math.PI * 2, 0]);
    },
    /**
     * 绘制一个矩形
     */
    drawRect: function (x, y, width, height) {
        return this._addAction(['rect', x, y, width, height]);
    },
    /**
     * 绘制当前位置到(x, y)的直线
     */
    lineTo: function (x, y) {
        return this._addAction(['lineTo', x, y]);
    },
    /**
     * 绘制
     */
    _draw: function (ctx) {
        var actions = this._actions, len = actions.length, i;

        ctx.beginPath();
        for (i = 0; i < len; i++) {
            var action = actions[i],
                f = action[0],
                args = action.length > 1 ? action.slice(1) : null;

            if (typeof (ctx[f]) === 'function') {
                ctx[f].apply(ctx, args);
            } else {
                ctx[f] = action[i];
            }

        }
    },
    /**
     * 重写渲染实现
     */
    draw: function(ctx){
        this._draw(ctx);
    },
    /**
     * 清除所有绘制动作并恢复初始状态
     */
    clear: function(){
        this._actions.length = 0;
        this.lineWidth = 1;
        this.lineAlpha = 1;
        this.lineCap = null;
        this.lineJoin = null;
        this.miterLimit = 10;
        this.hasStroke = false;
        this.strokeStyle = '0';
        this.hasFill = false;
        this.fillStyle = '0';
        this.fillAlpha = 1;

        return this;
    },
    /**
     * 添加一个绘制动作
     */
    _addAction: function (action) {
        this._actions.push(action);
        return this;
    },
}