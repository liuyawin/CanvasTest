var Ease = (function(){
    var Linear = function(k){
        return k;
    };

    var EaseIn = function(k){
        return Math.pow(k, 2);
    }

    var EaseOut = function (k) {
        return 1 - Math.pow(1 - k, 2)
    }

    var EaseInOut = function(k){
        return k - Math.sin(k * 2 * Math.PI) / (2 * Math.PI);
    }

    var Bounce = function(k){
        return 1 - Math.cos(k * 4 * Math.PI) * (1 - k);
    }
    return {
        Linear: Linear,
        EaseIn: EaseIn,
        EaseOut: EaseOut,
        EaseInOut: EaseInOut,
        Bounce: Bounce,
    }
})();