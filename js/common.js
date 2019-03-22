(function () {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame']
            || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function (callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function () {
                    callback(currTime + timeToCall);
                },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
}());

var sys = (function () {
    var _this;
    var s = function () {
        _this = this;
    };
    s.prototype.init = function () {
        this.stopScrolling();
        this.loadCompant = false;
    };

    //渐显显示
    s.prototype.fadeIn = function (id) {
        $(id).css("opacity", 0).show();
        setTimeout(function () {
            $(id).addClass("show");
        }, 1);
    };

    //渐隐关闭
    s.prototype.fadeOut = function (id) {
        this.close($(id))
    };

    s.prototype.lazyLoad = function (obj, fun) {
        var imgArr = [], num = 0;
        $(obj).find("*").each(function () {
            var src = $(this).attr("data-src");
            if (src) {
                imgArr.push(src);
                $(this).attr("src", src);
                $(this).attr("data-src", "");
            } else {
                var img = $(this).css("background-image");
                if (img != "none") {
                    img = img.replace(/("|'|\(|\)|url)/g, "").toString();
                    imgArr.push(img);
                }
            }
        });
        var imgArrNum = imgArr.length;
        if (imgArrNum > 0) {
            $(".loadingLine").show();
            for (var i = 0; i < imgArrNum; i++) {
                var img = new Image();
                img.src = imgArr[i];
                img.onload = function () {
                    loadFun()
                };
                img.onerror = function () {
                    loadFun()
                };

                function loadFun() {
                    if (num < (imgArrNum - 1)) {
                        num++;
                        if (!_this.loadCompant) {
                            var pp = parseInt(num / imgArrNum * 100);
                            $(".loadingLine>div").css("width", pp + "%");
                            $("#load-prg-text").text(pp + "%");
                        }
                    } else {
                        if (!_this.loadCompant) {
                            $(".loadingLine>div").css("width", "100%");
                            $("#load-prg-text").text("100%");
                            _this.loadCompant = true;
                        }
                        if (typeof fun == "function") {
                            fun()
                        }
                    }
                }
            }
        } else {
            if (typeof fun == "function") {
                fun()
            }
        }
    };

    s.prototype.stopScrolling = function (e) {
        document.addEventListener('touchmove', _this.preventDefault, {passive: false});
    };
    s.prototype.openScrolling = function () {
        document.removeEventListener('touchmove', _this.preventDefault);
    };
    s.prototype.preventDefault = function (e) {
        e.preventDefault();
    };
    s.prototype.loadingComplete = function () {
        app.loading = false;
        this.init();
    };
    return new s();
})();

//音频控制
var media = (function () {
    var musicUrl = sysParam.musicUrl,   //音频连接
        musicPlayIco = sysParam.baseUrl + "images/mPlay.png",//播放按钮
        musicPauseIco = sysParam.baseUrl + "images/mPaused.png";//暂停按钮
    if (musicUrl) {
        var img = "<img src='" + musicPlayIco + "' id='musicCtrl' class='mAnim mRb'>";
        $("body").append(img);
        var m = function () {
            this.audio = new Audio();
            this.audio.setAttribute("autoplay", "autoplay");
            this.audio.setAttribute("loop", "loop");
            if (sysParam.musicUrl) {
                this.init();
            }
        };
        m.prototype.init = function () {
            var _this = this;
            this.audio.src = musicUrl;
            this.music = $("#musicCtrl");
            this.music.show();
            this.music.attr("src", musicPlayIco);
            document.onreadystatechange = function () {
                if (document.readyState == "complete" && _this.audio.paused) {
                    _this.audioPlay();
                }
            };
            $("body").one("touchstart", function () {
                _this.audioPlay();
            });
            document.addEventListener("WeixinJSBridgeReady", function () {
                media.audio.play();
            }, false);
            this.music.off().on("click", function () {
                _this.musicCtrl(_this)
            });
        };
        m.prototype.musicCtrl = function (b) {
            if (b.audio.paused) {
                b.audioPlay();
                return;
            }
            b.audioPause();
        };
        m.prototype.audioPlay = function () {
            this.audio.play();
            this.music.attr("src", musicPlayIco);
            this.music.addClass("mAnim");
        };
        m.prototype.changeMusic = function (url) {
            if (this.audio.src != url) {
                this.audio.pause();
                this.audio.src = url;
                this.audio.play();
            }
        };
        m.prototype.audioPause = function () {
            this.audio.pause();
            this.music.attr("src", musicPauseIco);
            this.music.removeClass("mAnim");
        };
        return new m();
    }
})();

function click(obj, fun) {
    return $(obj).off().on("click", fun)
}

function ajax(b) {
    app.ajaxLoading = true;
    if ((b.loadShow || 2) == 1) {  //1隐藏 2显示
        app.ajaxLoading = false;
    }
    $.ajax({
        type: b.type ? b.type : 'post',
        url: b.url,
        dataType: 'json',
        data: b.data ? b.data : "",
        timeout: 15000,
        success: function (data) {
            app.ajaxLoading = false;
            if (data.result_code == 1) {
                if (typeof b.callBack == "function") {
                    b.callBack(data)
                }
            } else {
                if (typeof b.err == "function") {
                    b.err(data);
                } else {
                    app.fadeAlert(data.result_msg);
                }
            }
        },
        error: function (xhr, type) {
            app.ajaxLoading = false;
            alert('网络超时，请刷新后再试！');
        }
    });
}

// todo vic VV------ new Date().Format("yyyy-MM-dd HH:mm:ss");
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

var baseSys = (function () {
    var _this;
    var s = function () {
        _this = this;
    };
    // vic ---
    s.prototype.countTime = function (timeStamp, func) {
        var _timeStamp = timeStamp, timeOutFunc;
        var timeDown = function () {
            if (_timeStamp <= 0) {
                clearTimeout(this.timeOut);
            } else {
                _timeStamp--;
                var day = parseInt(_timeStamp / (24 * 60 * 60));
                var hour = parseInt((_timeStamp - day * 24 * 60 * 60) / 3600);
                var minute = parseInt((_timeStamp - day * 24 * 60 * 60 - hour * 3600) / 60);
                var second = parseInt((_timeStamp - day * 24 * 60 * 60 - hour * 3600 - minute * 60));
                var time = {
                    day: day.length < 2 ? "0" + day : day,
                    hour: hour.length < 2 ? "0" + hour : hour,
                    minute: minute.length < 2 ? "0" + minute : minute,
                    second: second.length < 2 ? "0" + second : second
                };
                func(time);
                timeOutFunc();
            }
        };
        timeOutFunc = function () {
            this.timeOut = setTimeout(timeDown, 1000)
        };
        timeOutFunc();

    };
    s.prototype.countTimeStop = function () {
        if (this.timeOut) {
            clearTimeout(this.timeOut);
        }

    };
    return new s();
}());
var storage = {
    getItem: function (key) {//假如浏览器支持本地存储则从localStorage里getItem，否则乖乖用Cookie
        return window.localStorage ? localStorage.getItem(key) : Cookie.read(key);
    },
    setItem: function (key, val) {//假如浏览器支持本地存储则调用localStorage，否则乖乖用Cookie
        if (window.localStorage) {
            localStorage.setItem(key, val);
        } else {
            Cookie.write(key, val);
        }
    }
};

function isNull(obj) {
    return !obj && typeof(obj) != "undefined" && obj != 0 ? true : false;
}

function isEmptyArr(obj) {
    return JSON.stringify(obj) === '[]' ? true : false;
}

// https://plugin.i-lzhd.com/3uj8QdBvSimvaMep?debug-wintrue=2
function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    console.log(reg);
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}

//提交信息组件
/*
 用户信息
 <form-component v-bind:form="userInfo" @fformsubmit="formSubmit"></form-component>
 * */
/**
 * 提交信息
 * <form-component v-bind:form="checkInfo" @fformsubmit="formSubmit"></form-component>
 * */
Vue.component('form-component', {
    props: ['form'],
    methods: {
        formSubmit: function () {
            this.$emit('fformsubmit')
        }
    },
    template: `<div class="formDiv">
		<p v-for="item in form"><input class="name" v-model="item.val" v-show="item.isShow"/></p>
		<span v-on:click="formSubmit">提交</span>
	</div>`
})

//列表组件
//<rank-list-component v-bind:List="rankList"></rank-list-component>
Vue.component('rank-list-component', {
    props: ['list', 'attrid'],
    methods: {
        checkFun: function (item) {
            this.$emit('fcheckfun', item)
        }
    },
    template: `<div class="listPopContent">
		<div>
			<div v-for="item in list" class="item">
				<img :src="item.userImg" class="userImg" v-show="item.userImg"/>
				<p v-show="item.nickname" class="userName">{{item.nickname}}</p>
				<p v-show="item.prizeName">{{item.prizeName}}</p>
				<p v-show="item.status==0" @click="checkFun(item)">兑换/核销</p>
				<img :src="sysParam.baseUrl+'images/rankPop/ranklist/item/num'+item.rankingnums+'.png'" class="userImg" v-show="item.userImg">
				<p class="rankNum" :class="'num'+item.rankingnums">{{item.rankingnums}}</p>
				<p class="score">{{item.achievement}}</p>
				<p v-show="item.status==1" v-show="item.status">已兑换/已核销</p>
			</div>
		</div>
	</div>`
})


//引导关注
//<follow-component @closep="close"></follow-component>
Vue.component('follow-component', {
    data: function () {
        return {}
    },
    methods: {
        closePop: function () {
            this.$emit('closep')
        }
    },
    template: `<div class="follow ce" id="follow" @click="closePop">
		<img src="images/code.png" class="ce">
	</div>`
})




