function Loader(){
    this._imgObjArr = [];
    this._imgs = {};
}

Loader.prototype = {
    constructor: Loader,
    add: function(imgObj){
        this._imgObjArr.push(imgObj);
    },
    load: function(callback){
        var _this = this;
        var count = 0;
        for (var i = 0; i < this._imgObjArr.length; i++) {
            var imgObj = this._imgObjArr[i];
            var src = imgObj.src;
            var img = new Image();
            img.onload = function(){
                count++;
                _this._imgs[imgObj.name] = img;
                if (count === _this._imgObjArr.length) {
                    if (callback) {
                        callback();
                    }
                }
            }
            img.onerror = function(){
                count++;
                console.log(src + ' 下载失败');
            }
            img.src = src;
        }
    },
    get: function(key){
        return this._imgs[key];
    },
}