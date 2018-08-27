function Tween(target, toProps, duration, ease){
    this.target = target;
    this._toProps = toProps;
    this.duration = (duration || 1000);
    this.ease = ease;

    this._fromProps = {};

    for (var key in toProps) {
        if (target.hasOwnProperty(key)) {
            this._fromProps[key] = target[key];
        }
    }

    this._startTime = 0;
}

Tween.prototype = {
    constructor: Tween,
    
    //开始动画
    start: function(){
        this._startTime = +(new Date());
        this.add(this);
    },
    //停止动画
    stop: function(){
        this.remove(this);
    },
    //内部渲染
    _render: function(ratio){
        for (var key in this._fromProps) {
            this.target[key] = this._fromProps[key] + (this._toProps[key] - this._fromProps[key]) * ratio;
        }
    },
    //内部更新
    _update: function(time){
        var pastTime = time - this._startTime;
        if (pastTime <= 0) {
            return;
        }
        var ratio = pastTime / this.duration;
        ratio = ratio < 0 ? 0 : ratio > 1 ? 1 : ratio;
        if (ratio === 1) {
            Tween.remove(this);
            return;
        }
        var easeRatio = this.ease ? this.ease(ratio) : ratio;

        this._render(easeRatio);
    },
}

//添加动画
Tween.add = function(tween) {
    if (Tween._tweens.indexOf(tween) === -1) {
        Tween._tweens.push(tween);
    }
}
//移除动画
Tween.remove = function(tween){
    Tween._tweens.splice(Tween._tweens.indexOf(tween), 1);
}
Tween.tick = function(){
    for (var i = 0; i < Tween._tweens.length; i++) {
        Tween._tweens[i]._update(+(new Date()));
    }
}
Tween.to = function(target, toProps, duration, ease){
    var tween = new Tween(target, toProps, duration, ease);
    tween._startTime = +(new Date());
    Tween.add(tween);
}
Tween._tweens = [];