/**
 * Created by Arvinco on 2017/3/28.
 */
var app = new Vue({
    mixins: [appData, txtData],
    el: '#app',
    data:{
        timeTotal:3,

        ajaxGetTemplate_data:{
            "data": [{
                "id": "1",
                "aid": "16463",
                "img": "https:\/\/res1.i-lz.cn\/uploads\/addons\/record\/15292204423847_16463.png",
                "type": "1",
                "template_id": "qc_100215_163930_5",
                "sort": "1",
                "ctime": "1529220334"
            }]
        },
        ajaxGetTemplate_single:{}
    },
    methods: {
        gameTime:function(){
            app.countdown({
                time:app.timeTotal,
                cb:function(time){
                    app.timeTotal --;
                    if(time <= 0){
                        console.log('结束');
                    }
                }
            })
        },

        // 确定
        btnconfirm:function() {
            app.ajaxGetTemplate({
                callback: function () {
                    app.pageShow('page3');
                }
            });
        },

        // ajax 得到模板 V -----------------------
        ajaxGetTemplate: function (obj) {
            ajax({
                type: 'post',
                url: sysParam.ajaxGetTemplate,
                dataType: 'json',
                data: {},
                timeout: 15000,
                callBack: function (data) {
                    app.ajaxGetTemplate_data = data.result_data;
                    obj && obj.cb && obj.cb(data);
                }
            })
        },
    },
    created: function () {
        this.$nextTick(function () {
            function indexInit(){
                app.pageShow('home');
                // app.pageShow('page1');
                // app.popShow('pop2');
                // app.popTwoShow('pop1');
                app.ClipboardJS();
                // pageInit();
            }

            function pageInit() {
                // 是否领取奖品
                if (app.sysParam.myPrize != 0) {
                    app.pageShow('page2');
                }
                // 是否分享页面
                if (app.sysParam.isSharePage == 1) {

                }
                // is 活动结束
                if (+new Date() >= +new Date(sysParam.endParticipation)) {
                    app.fadeAlert('活动结束了');
                    return;
                }

                $("input").on("blur",function () {
                    tr_appResize()
                })
            }

            function init(obj) {
                sys.lazyLoad(".body", function () {
                    sys.loadingComplete();
                    obj && obj.cb && obj.cb();
                });
            }

            window.onload = function () {
                init({
                    cb:function () {
                        indexInit();
                        dataInit();
                    }
                });
            };
        })
    }
});



/*
window.alert = function (msg, title, callback) {
    console.log('重写alert',msg, title, callback);
};
window.alert("重写alert---------")

*/




/*

// 摇一摇  eg: shake.isShake = false;  shakeFun:function(){  }

var shakeMusic = new Howl({
    src: [sysParam.baseUrl + 'audio/music.mp3' + sysParam.version]
});
var Shake = function () {
    function Shake() {
        this.isShake = true;
        this.SHAKE_THRESHOLD = 1000;
        this.x = this.y = this.z = this.last_x = this.last_y = this.last_z = this.last_update = 0;
        this.ismAnim2 = true;
        this.self = this;
        if (window.DeviceMotionEvent) {
            var _this = this;
            window.addEventListener('devicemotion', function (e) {
                _this.deviceMotionHandler(e, _this)
            }, false);
        } else {
            app.fadeAlert("抱歉，您的设备不支持摇一摇功能！");
        }
    }
    Shake.prototype.deviceMotionHandler = function (eventData, _this) {
        //获取含重力的加速度
        var acceleration = eventData.accelerationIncludingGravity;
        // 获取当前时间
        var curTime = new Date().getTime();
        var diffTime = curTime - this.last_update;
        //固定时间段
        if (diffTime > 100) {
            this.last_update = curTime;
            this.x = acceleration.x;
            this.y = acceleration.y;
            this.z = acceleration.z;
            var speed = Math.abs(this.x + this.y + this.z - this.last_x - this.last_y - this.last_z) / diffTime * 10000;
            if (speed > this.SHAKE_THRESHOLD) {
                if (this.ismAnim2) {
                    this.shakeResponse();
                }
            }
            this.last_x = this.x;
            this.last_y = this.y;
            this.last_z = this.z;
        }
    };
    Shake.prototype.shakeResponse = function () {
        var _this = this;
        if (!_this.isShake) {
            _this.isShake = true;
            media.audioPause();
            shakeMusic.play();
            var timer = setTimeout(function () {
                media.audioPlay();
                app.shakeFun();
                clearTimeout(timer);
            },1000);
        }
    };
    return Shake;
}();
var shake = new Shake();


* */


