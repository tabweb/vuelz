/**
 * Created by Arvinco on 2018/3/31.
 */
var appData = {
    data: function () {
        return {
            sysParam: sysParam,
            urlArgs: '?ver=' + (+new Date()),
            isfirst: 0, // 刷新页面次数
            loading: true,
            ajaxLoading: false,
            //页面
            page: {
                beforeVideo: false,
                videoPage: false,
                home: false,
                page1: false,
                page2: false,
                page3: false,
                page4: false,
                page5: false,
                page6: false,
            },
            //弹窗
            pop: {
                pop1: false,
                pop2: false,
                pop3: false,
                pop4: false,
                pop5: false,
                pop6: false,
                pop7: false,
                pop8: false,
                pop9: false,
                pop10: false,
                pop11: false,
                pop12: false,

                share: false,
                rule: false,
            },
            // 2级弹窗
            popTwo: {
                pop1: false,
                pop2: false,
                pop3: false,
                pop4: false,
                pop5: false,
                pop6: false,
                pop7: false,
                pop8: false,
                pop9: false,
                pop10: false,
                pop11: false,
                pop12: false,

                share: false,
                rule: false,
            },
            // 3级弹窗
            popThree: {
                pop1: false,
                pop2: false,
                pop3: false,
                pop4: false,
                pop5: false,
                pop6: false,
                pop7: false,
                pop8: false,
                pop9: false,
                pop10: false,
                pop11: false,
                pop12: false,

                share: false,
                rule: false,
            },
            gameState: 0,
            //弹窗黑色背景
            popupBg: false,
            popupBgTwo: false,
            popupBgThree: false,
            fAlert: {
                show: false,
                text: "提示"
            },
            popAlert: {
                show: false,
                text: "提示"
            },
            html2canvasDate: '', //截屏海报
            posterImgSrc: '',
            // vic ----------
            imgBase64: '',  //上传图片
            randomNumber: 1,  // 随机数
            optionState: 0,
            show: {
                start: true,
            },
            QRcodetxt: true,
            // 滑动参数 ---------
            moveX: 0,
            moveY: 0,
            startX: 0,
            startY: 0,
            endX: 0,
            endY: 0,
            isSlder: false,
            // gameView.js
            score:0,
            gameInfo:[]
        }
    },
    methods: {
        // 页面切换    app.pageShow('index')
        pageShow: function (id) {
            for (var i in this.page) {
                this.page[i] = i == id ? true : false;
            }
        },
        // 弹窗切换
        popShow: function (id) {
            for (var i in this.pop) {
                this.pop[i] = i == id ? true : false;
            }
            this.popupBg = id ? true : false;
        },
        // 关闭弹窗    app.close()
        close: function () {
            this.popShow();
        },
        // 2级弹窗
        popTwoShow: function (value) {
            for (var i in this.popTwo) {
                this.popTwo[i] = i == value ? true : false;
            }
            this.popupBgTwo = value ? true : false;
        },
        popTwoClose: function (value) {
            this.popTwoShow();
        },
        // 3级弹窗
        popThreeShow: function (value) {
            for (var i in this.popThree) {
                this.popThree[i] = i == value ? true : false;
            }
            this.popupBgThree = value ? true : false;
        },
        popThreeClose: function (value) {
            this.popThreeShow();
        },
        // 错误提示淡入淡出  app.fadeAlert("hellow world",2000)
        fadeAlert: function (text, time) {
            if (this.fadeAlertSetTime) {
                clearTimeout(this.fadeAlertSetTime)
            }
            this.fAlert.show = true;
            this.fAlert.text = text;
            this.fadeAlertSetTime = setTimeout(function () {
                app.fAlert.show = false;
            }, time ? time : 1500);
        },
        // 信息弹窗
        alert: function (text) {
            this.popAlert.show = true;
            this.popAlert.text = text;
            this.popupBg = true;
        },
        // 关闭信息弹窗
        closeAlert: function () {
            var num = 0;
            for (var i in this.pop) {
                if (this.pop[i] == true) {
                    num++
                }
            }
            this.popAlert.show = false;
            if (num < 1) {
                this.popupBg = false;
            }
        },
        // vic------------------------------

        // 页面  1 开始 2 等待 3 答题 4排行榜
        game: function (state, callback) {
            this.gameState = state;
            callback && callback();
        },
        // iScroll init
        iscrollInit: function () {
            setTimeout(function () {
                for(i in iscroll){
                    iscroll[i].refresh();
                }
            }, 300)
        },
        iscrollTo:function(obj){
            [obj.scroll].scrollTo(0,obj.distance,400);
        },

        // 外链跳转
        linkHref: function (url) {
            window.location.replace(url);
            // window.location.href = url;
        },
        //随机数
        randomNum: function (min, max) {
            switch (arguments.length) {
                case 1:
                    return Math.floor(Math.random() * min + 1);
                    break;
                case 2:
                    return Math.floor(Math.random() * (max - min + 1) + min);
                    break;
                default:
                    return 0;
                    break;
            }
        },
        // 数组随机
        arrRandom: function (obj) {
            var arr = obj.arr;
            var len = arr.length - 1;
            for (var i = 0; i < arr.length; i++) {
                var random = app.randomNum(0, len);
                var temp = arr[0];
                arr[0] = arr[random];
                arr[random] = temp;
            }
            return arr;
        },
        // 判断数据是否重复
        arrRepeat: function (arr) {
            var arrStr = JSON.stringify(arr);
            for (var i = 0; i < arr.length; i++) {
                if (arrStr.indexOf(arr[i]) != arrStr.lastIndexOf(arr[i])) {
                    return true;
                }
            };
            return false;
        },
        //arr 排序  arr.sort(app.compare("age"))    arr.sort(app.compare("age")).reverse()
        compare: function (prop) {
            return function (obj1, obj2) {
                var val1 = obj1[prop];
                var val2 = obj2[prop];
                if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
                    val1 = Number(val1);
                    val2 = Number(val2);
                }
                if (val1 < val2) {
                    return -1;
                } else if (val1 > val2) {
                    return 1;
                } else {
                    return 0;
                }
            }
        },
        //arr 去重  app.uniq(arr,'key')
        uniq: function (arr, key) {
            var result = [];
            var obj = {};
            for (var i = 0; i < arr.length; i++) {
                if (!obj[arr[i][key]]) {
                    result.push(arr[i]);
                    obj[arr[i][key]] = true;
                }
            }
            return result;
        },
        // 冒泡排序，
        sortBase:function(){
            for (var i = 0; i < out.length; i++) {
                for (var j = i+1; j < out.length; j++) {
                    if(out[i] > out[j]) {
                        var temp = out[i];
                        out[i] = out[j];
                        out[j] = temp;
                    }
                }
            }
        },
        // date 日期格式化  // new Date().Format("yyyy-MM-dd HH:mm:ss");
        Format: function (fmt) {
            var o = {
                "M+": this.getMonth() + 1, //月份
                "d+": this.getDate(), //日
                "h+": this.getHours(), //小时
                "m+": this.getMinutes(), //分
                "s+": this.getSeconds(), //秒
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                "S": this.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        },
        //倒计时
        countdown: function (obj) {
            var timer = setInterval(function () {
                obj.time--;
                obj && obj.cb && obj.cb(obj.time);
                if (obj.time <= 0) {
                    clearInterval(timer);
                    timer = 0;
                }
            }, obj.timeDown || 1000);
        },
        htmlToDate:function(obj){
            var value = obj.value;
            obj && obj.cb && obj.cb(value);
        },
        // gohome
        goHome: function () {
            app.close();
            app.popTwoClose();
            app.pageShow('home');
        },

        // 页面滑动  .touchBox
        slideStart: function (event) {
            app.moveX = 0;
            app.moveY = 0;
            app.startX = event.touches[0].clientX;
            app.startY = event.touches[0].clientY;

            console.log('app.moveY',app.moveY,'app.startY',app.startY);
        },
        slideMove: function (event) {
            app.moveX = event.touches[0].clientX;
            app.moveY = event.touches[0].clientY;

            console.log('app.moveY',app.moveY);
        },
        slideEnd: function (obj) {
            app.endX = app.moveX - app.startX;
            app.endY = app.moveY - app.startY;

            console.log('app.endY',app.endY,'app.moveY',app.moveY,'app.startY',app.startY);

            if (app.endX < -50 && app.moveX != 0) {
                if (!app.isSlder) {
                    app.fadeAlert('向左滑');
                    obj && obj.cb && obj.cb();
                }
            } else if (app.endX > 50 && app.moveX != 0) {
                if (!app.isSlder) {
                    app.fadeAlert('向右滑');
                    obj && obj.cbd && obj.cbd();
                }
            } else if (app.endY < -50 && app.moveY != 0) {
                if (!app.isSlder) {
                    app.fadeAlert('向上滑');
                    obj && obj.cb && obj.cb();
                }
            } else if (app.endY > 50 && app.moveY != 0) {
                if (!app.isSlder) {
                    app.fadeAlert('向下滑');
                    obj && obj.cbd && obj.cbd();
                }
            }
        },


        // resize 大屏选择 ----------------------
        resize: function (obj) {
            var scale = 1;
            if (window.innerWidth / window.innerHeight >= (2160 / 1040)) {
                scale = window.innerHeight / 2160
            } else {
                scale = window.innerWidth / 1040
            }
            app.bodyStyle = "transform:translate3d(-50%,-50%,0) scale(" + scale + ");-webkit-transform:translate3d(-50%,-50%,0) scale(" + scale + ")"
        },
        // ​使用微信内置地图查看位置 -------------
        openLocation:function(obj) {
            var map = obj.map.split(",");
            var latitude = parseFloat(map[0]),
                longitude = parseFloat(map[1]);
            wx.openLocation({
                latitude:latitude,
                longitude:longitude,
                scale: 12,
                name: obj.name || '',
            });
        },

        // showRank: function (type) {
        //     ajax({
        //         type: 'post',
        //         url: sysParam.ajaxRankingList,
        //         dataType: 'json',
        //         data: {
        //             "is_share": type,  // 0 分数排行榜  1 助力排行榜
        //             "page": this.pageNum,  //获取页数
        //         },
        //         timeout: 15000,maxPageNum
        //         callBack: function (data) {
        //             app.popShow("rank");
        //             if (app.pageNum == 1) {
        //                 app.rankList = data.result_data.total_page_list
        //             } else {
        //                 app.rankList = app.rankList.concat(data.result_data.total_page_list)
        //             }
        //             app.maxPageNum = data.result_data.total_page_nums;
        //
        //             setTimeout(function () {
        //                 rankList.refresh();
        //             }, 100)
        //         },
        //         err:function(){
        //
        //         }
        //     })
        // },

        // extend ----------
        extend: function (target, source) {
            for (var obj in source) {
                target[obj] = source[obj];
            }
            return target;
        },

        // html2canvas  http://html2canvas.hertzen.com
        html2canvas: function () {
            var t_img; // 定时器
            var isLoad = true; // 控制变量
            function isImgLoad(callback) {
                $('.cover').each(function () {
                    if (this.height === 0) {
                        isLoad = false;
                        return false;
                    }
                });
                if (isLoad) {
                    clearTimeout(t_img); // 清除定时器
                    // 回调函数
                    callback();
                } else {
                    isLoad = true;
                    t_img = setTimeout(function () {
                        isImgLoad(callback); // 递归扫描
                    }, 500); // 我这里设置的是500毫秒就扫描一次，可以自己调整
                }
            }


            isImgLoad(function () {
                html2canvas($("#content")[0], {
                    scale: 2,
                    logging: false,
                    useCORS: true
                }).then(function (canvas) {
                    app.html2canvasDate = canvas.toDataURL('image/jpeg', .7);
                    console.log(app.html2canvasDate);
                    obj && obj.cb && obj.cb();
                });

                // html2canvas($("#content"), {
                //     allowTaint: false,
                //     useCORS: true,
                //     onrendered: function (canvas) {
                //         app.html2canvasDate = canvas.toDataURL('image/jpeg', .7);
                //         app.QRcodetxt = false;
                //     }
                // })
            });
        },
        // ClipboardJS
        ClipboardJS: function () {
            var clipboard = new ClipboardJS('.clipboard-btn');
            // console.log(1111,clipboard);
            clipboard.on('success', function (e) {
                console.log(e);
                app.fadeAlert(e.text);
                console.info('Action:', e.action);
                console.info('Text:', e.text);
                console.info('Trigger:', e.trigger);
                e.clearSelection();
            });
            clipboard.on('error', function (e) {
                app.fadeAlert("不支持触屏复制");
                console.error('Action:', e.action);
                console.error('Trigger:', e.trigger);
            });
        },
        // 判断iphoneX
        isIPhoneX: function (fn) {
            var u = navigator.userAgent;
            var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            if (isIOS) {
                if (screen.height == 812 && screen.width == 375) {
                    this.globalData.iphoneX = true;
                } else {
                    this.globalData.iphoneX = false;
                }
            }
        },
        // 绘制新年签
        drawImg: function () {
            var imgs = [
                {id: 'bg', src: sysParam.baseUrl + 'images/poster.jpg' + sysParam.version},
                {id: 'labelImg', src: 'http://res1.i-lz.cn/uploads/addons/record/15198720521379_14669.png'},
                {
                    id: 'qrImg',
                    src: 'http://www.i-lz.cn/qrApi?text=http%3A%2F%2F192.168.22.108%2Fphp%2FewZE7QZ5hkTnXTc8%2Fgame%2Findex%3F_fromwx%3DofIPfjq7_Te6wwb2xA-KgEyMixwo'
                },
                {id: 'userImg', src: sysParam.userImg}
            ];
            console.log('imgs', imgs);
            app.loadImages(imgs, function (img) {
                var canvas = document.createElement('canvas');
                canvas.width = 640;
                canvas.height = 1008;
                var ctx = canvas.getContext('2d');

                console.log('img', img);

                ctx.globalCompositeOperation = "source-over";
                ctx.drawImage(img['bg'], 0, 0, img['bg'].width, img['bg'].height, 0, 0, canvas.width, canvas.height);

                ctx.drawImage(img['labelImg'], 0, 0, img['labelImg'].width, img['labelImg'].height, canvas.width / 2 - img['labelImg'].width / 2, 0, img['labelImg'].width, img['labelImg'].height);

                ctx.font = '24px Arial';
                ctx.textAlign = "center";
                ctx.fillStyle = '#f9e1c9';
                ctx.fillText(sysParam.userName, 320, 840);


                ctx.drawImage(img['qrImg'], 0, 0, img['qrImg'].width, img['qrImg'].height, (canvas.width - 102) / 2, 640, 102, 102);

                var canvas2 = document.createElement('canvas');
                canvas2.width = 78;
                canvas2.height = 78;
                var ctx2 = canvas2.getContext('2d');
                ctx2.drawImage(img['userImg'], 0, 0, img['userImg'].width, img['userImg'].height, 0, 0, 78, 78);
                ctx2.globalCompositeOperation = "destination-in";
                ctx2.fillStyle = '#f9e1c9';
                ctx2.arc(canvas2.width / 2, 39, 39, 0, 2 * Math.PI);
                ctx2.fill();
                var newUserImg = new Image();
                newUserImg.src = canvas2.toDataURL();
                setTimeout(function () {
                    ctx.drawImage(newUserImg, 0, 0, 78, 78, (canvas.width - 78) / 2, 64, 78, 78);
                    app.posterImgSrc = canvas.toDataURL();
                    app.pageShow('sign');
                }, 100);
            })
        },
        //加载资源
        loadImages: function (sources, callback) {
            var count = 0,
                images = [],
                imgNum = 0;
            for (var src in sources) {
                var obj = {};
                imgNum++;
            }
            for (var src in sources) {
                images[sources[src].id] = new Image();
                images[sources[src].id].crossOrigin = "anonymous";
                images[sources[src].id].onload = function () {
                    if (++count >= imgNum) {
                        callback(images);
                    }
                };
                images[sources[src].id].src = sources[src].src;
            }
        },
        // 刷新页面次数
        sessionStorageNum: function () {
            if (!sessionStorage.isfirst) {
                app.isfirst = sessionStorage.isfirst = 1;
            } else {
                sessionStorage.isfirst = (sessionStorage.isfirst >> 0) + 1;
                app.isfirst = sessionStorage.isfirst;
            }
        },
    },
    filters: {
        removeNum: function (value) {
            return value.replace(/[^0-9]/g, '');
        },
        reverseStr: function (value) {
            return value.split('').reverse().join('')
        },
        nochinese: function (value) {
            return value.replace(/[\u4e00-\u9fa5]/g, '')
        },
    },
    directives: {
        noChinese: {
            bind: function (el) {
                var reg = new RegExp("[^\\w\\.\\/]", "ig");
                el.handler = function () {
                    if (el.value.match(reg)) {
                        app.fadeAlert('禁止中文输入,建议切换输入法');
                    }
                    el.value = el.value.replace(reg, '');
                };
                el.addEventListener('input', el.handler)
            },
            unbind: function (el) {
                el.removeEventListener('input', el.handler)
            }
        },
        phoneOnly: {
            bind: function (el) {
                el.handler = function () {
                    el.value = el.value.replace(/[^[1][3,4,5,7,8][0-9]{9}$]/ig, '');
                };
                el.addEventListener('input', el.handler)
            },
            unbind: function (el) {
                el.removeEventListener('input', el.handler)
            }
        }
    }
};

// var sound = {
//     opendoorA: new Howl({src: [sysParam.baseUrl + '/audio/opendoorA.mp3' + sysParam.version ]}),
//     opendoorA1: new Howl({src: [sysParam.baseUrl + '/audio/opendoorA.mp3' + sysParam.version ]}),
//     opendoorA2: new Howl({src: [sysParam.baseUrl + '/audio/opendoorA.mp3' + sysParam.version ]}),
// };
// sound.opendoorA.play();


function dataInit() {
    setTimeout(function () {
        var swiper = new Swiper('.swiper-container', {
            // pagination: {
            //     el: '.swiper-pagination',
            // },
            // navigation: {
            //     prevEl: '.swiper-button-prev',
            // },
            // direction: 'vertical',
            // // effect: 'cube',
            // // effect: 'fade',
            // initialSlide: 1,   // 设定初始化时slide的索引。
            // slidesPerView: 'auto', // 设置slider容器能够同时显示的slides数量(carousel模式)。
            // centeredSlides: true,  // active slide会居中，而不是默认状态下的居左。
            // spaceBetween: 0,  //在slide之间设置距离（单位px）。
            // effect: 'coverflow',
            // coverflowEffect: {  // swiper-4.3.3  开门效果
            //     rotate: 0,
            //     stretch: 0,
            //     depth: 520,
            //     modifier: 1,
            //     slideShadows: !0
            // },
            // on: {
            //     slideChangeTransitionEnd: function (a, b, c, d) {
            //         console.log(this.activeIndex); //切换结束时，告诉我现在是第几个slide
            //     },
            // },
        });
        // swiper.slideNext();

        /*

        var video = document.getElementById("video");
        video.addEventListener("playing", function (ev) {
            media.audioPause();
        });

        function jump() {
            video.pause();
            media.audioPlay();
            app.pageShow('home');
        }

        video.addEventListener("ended", function (ev) {
            jump();
        });
        $('.jump').click(function () {
            jump();
        });
        $('.videoPlay').click(function () {
            video.play();
            app.pageShow('videoPage');
        });

        var sh = window.innerHeight;
        if (sh > 1024) {
            var scale = sh / 1024;
            $(".video").css({
                "transform": "translate3d(-50%,-50%,0) scale(" + scale + ")",
                "-webkit-transform": "translate3d(-50%,-50%,0) scale(" + scale + ")"
            })
        }

        */
    }, 1);
}

/*
var timer = setTimeout(function(){ // ele, snowImgs, snowNum, speed, initScale
    var snow = new Snow('.snow-box', sysParam.snowImgs, 30, 30, 1.4);
    clearTimeout(timer);
},300);
*/


var video, iscroll={}; // video.play();
$(function () {
    // iscroll.rule = new IScroll(".rulemain");
    // iscroll.rankList = new IScroll(".rankList ",{
    //      preventDefault:false, //是否屏蔽默认事件。
    // });
    // rankList.on("scrollEnd", function (e) {
    //     if (app.pageNum < app.maxPageNum && this.y == this.maxScrollY) {
    //         app.pageNum++;
    //         app.showRank();
    //     }
    // })

    // iscroll.mapBoxWrap = new IScroll('.mapBoxWrap', {
    //     scrollX: true,
    //     scrollY: true,
    //     freeScroll:true,
    //
    //     preventDefault:false, //是否屏蔽默认事件。
    //     bounce:false,
    //     zoom: true,
    //     mouseWheel: true,
    //     wheelAction: 'zoom',
    //     zoomMax:2,
    //     zoomMin:1,
    //     zoomStart:1,
    //
    // });
    // document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

});


$(function () {
    // 图片上传
    function canvasimgbase64() {
        var stage, pic;
        var square = 900;//上传图片超出宽度压缩
        var canvas = document.getElementById("canvas");
        var WW = window.innerWidth,
            WH = window.innerHeight;
        var cameraInput = document.getElementById("cameraInput");
        var cameraInput1 = document.getElementById("cameraInput1");
        // btn input type:file
        cameraInput.onchange = function () {
            var file = cameraInput.files[0];
            console.log('onchange', file);
            drawOnCanvas(file);
        };

        // #pic
        function drawOnCanvas(file) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var dataURL = e.target.result,
                    canvasPic = document.getElementById('pic'),
                    img = new Image();
                img.onload = function () {
                    var Orientation = 0;
                    EXIF.getData(img, function () {
                        Orientation = EXIF.getTag(this, 'Orientation')
                    });
                    var imageWidth;
                    var imageHeight;
                    var offsetX = 0;
                    var offsetY = 0;
                    var context = canvasPic.getContext('2d');
                    console.log('canvaspic', canvasPic.width, canvasPic.height, square);
                    if (this.width > square) {
                        canvasPic.width = square;
                        canvasPic.height = square;
                        context.clearRect(0, 0, square, square);
                        imageHeight = Math.round(square * this.height / this.width);
                        imageWidth = square;
                        canvasPic.width = imageWidth;
                        canvasPic.height = imageHeight;
                        context.translate((offsetX + imageWidth / 2), (offsetY + imageHeight / 2));
                        switch (Orientation) {
                            case 6:
                                context.rotate(90 * Math.PI / 180);
                                break;
                            case 8:
                                context.rotate(-90 * Math.PI / 180);
                                break;
                            case 3:
                                context.rotate(180 * Math.PI / 180);
                                break;
                        }
                        context.translate(-(offsetX + imageWidth / 2), -(offsetY + imageHeight / 2));
                        context.drawImage(this, offsetX, offsetY, imageWidth, imageHeight);
                    } else {
                        canvasPic.width = this.width;
                        canvasPic.height = this.height;
                        context.clearRect(0, 0, this.width, this.height);
                        context.drawImage(this, offsetX, offsetY, this.width, this.height);
                    }
                    // vic V
                    console.log('width', canvasPic.width, 'height', canvasPic.height);
                    if (canvasPic.width < 293 && canvasPic.height < 385) {
                        $('#pic').width('auto').height('auto');
                    } else if (canvasPic.width >= canvasPic.height) {
                        $('#pic').width('100%').height('auto');
                    } else if (canvasPic.height - canvasPic.width < 50) {
                        $('#pic').width('100%').height('auto');
                    } else {
                        $('#pic').height('100%').width('auto');
                    }
                    // vic A
                    var base64 = canvasPic.toDataURL('image/jpeg', .6);
                    app.imgBase64 = base64;
                    init(base64, canvasPic.width, canvasPic.height);
                };
                img.src = dataURL;
                console.log(dataURL);
            };
            reader.readAsDataURL(file);
        }

        // 初始化  #canvas
        function init(img, w, h) {
            stage = new createjs.Stage(canvas);
            pic = new createjs.Bitmap(img);
            pic.x = canvas.width / 2;
            pic.y = canvas.height / 2;
            pic.regX = w / 2;
            pic.regY = h / 2;
            stage.addChild(pic);
            createjs.Touch.enable(stage);
            stage.enableMouseOver(10);
            stage.mouseMoveOutside = true;
            setTimeout(function () {
                stage.update();
            }, 10);
            var state = 0, move = false;

            $("#canvas").off().on("touchstart", function (e) {
                this.x1 = e.touches[0].pageX;
                this.y1 = e.touches[0].pageY;
                this.ox = pic.x;
                this.oy = pic.y;
                this.os = pic.scaleX;
                this.or = pic.rotation;
                if (e.touches[1]) {
                    this.x2 = e.touches[1].pageX;
                    this.y2 = e.touches[1].pageY;
                    state = 1
                } else {
                    state = 2
                }
                move = true
            }).on("touchmove", function (e) {
                console.log(move, state);
                if (move) {
                    if (state == 1) {
                        var picBoundsC = getLengthAngle(e.touches[0].pageX, e.touches[1].pageX, e.touches[0].pageY, e.touches[1].pageY),
                            picBoundsO = getLengthAngle(this.x1, this.x2, this.y1, this.y2);
                        pic.rotation = picBoundsC.angle - picBoundsO.angle + this.or;
                        pic.scaleX = pic.scaleY = picBoundsC.length / picBoundsO.length * this.os;
                    } else if (state == 2) {
                        pic.x = this.ox + (e.touches[0].pageX - this.x1);
                        pic.y = this.oy + (e.touches[0].pageY - this.y1);
                    }
                    stage.update(event);
                }
            }).on("touchend", function () {
                state = 3;
                move = false;
                stage.update(event);
            });

            $("#getImg").off().on("click", function () {
                var imgNew = new Image();
                // imgNew.src = document.getElementById("canvas").toDataURL('image/jpeg', 1);
                imgNew.src = document.getElementById("pic").toDataURL('image/jpeg', 1);

                $(imgNew).addClass('xiaobai');
                imgNew.onload = function () {
                    $("body").append(imgNew)
                }
            });
        }

        function getLengthAngle(x1, x2, y1, y2) {
            var xDiff = x2 - x1, yDiff = y2 - y1;
            console.log(xDiff, yDiff, x1, x2, y1, y2);
            return {
                length: Math.ceil(Math.sqrt(xDiff * xDiff + yDiff * yDiff)),
                angle: Math.round((Math.atan2(yDiff, xDiff) * 180) / Math.PI)
            };
        }
    };
    // canvasimgbase64();


    // 图片移动放大
    function canvas1imgbase641() {
        var stage, pic;

        //加载资源
        function loadImages(sources, callback) {
            var count = 0,
                images = [],
                imgNum = 0;
            for (var src in sources) {
                var obj = {};
                imgNum++;
            }
            for (var src in sources) {
                images[sources[src].id] = new Image();
                images[sources[src].id].crossOrigin = "anonymous";
                images[sources[src].id].onload = function () {
                    if (++count >= imgNum) {
                        callback(images);
                    }
                };
                images[sources[src].id].src = sources[src].src;
            }
        };
        // 绘制新年签
        var sysParam = {
            baseUrl: 'http://localhost:8082/Dflie/project/vueDemo20180706/',
            version: '?123'
        };

        function drawImg() {
            var imgs = [
                {id: 'bg', src: sysParam.baseUrl + 'images/poster.png' + sysParam.version},
            ];
            loadImages(imgs, function (img) {
                var canvas = document.createElement('canvas');
                canvas.width = $('.poster').width();
                canvas.height = $('.poster').height();
                var ctx = canvas.getContext('2d');
                ctx.globalCompositeOperation = "source-over";
                ctx.drawImage(img['bg'], 0, 0, img['bg'].width, img['bg'].height, 0, 0, canvas.width, canvas.height);
                setTimeout(function () {
                    app.posterImgSrc = canvas.toDataURL('image/jpeg', 1);
                    init(app.posterImgSrc, canvas.width, canvas.height)
                }, 100);
            })
        };

        // 初始化  #canvas1
        function init(img, w, h) {
            var canvas1 = document.getElementById('canvas1');
            stage = new createjs.Stage(canvas1);
            pic = new createjs.Bitmap(img);
            pic.x = canvas1.width / 2;
            pic.y = canvas1.height / 2;
            pic.regX = w / 2;
            pic.regY = h / 2;
            stage.addChild(pic);
            createjs.Touch.enable(stage);
            stage.enableMouseOver(10);
            stage.mouseMoveOutside = true;
            setTimeout(function () {
                stage.update();
            }, 10);
            var state = 0, move = false;

            $("#canvas1").off().on("touchstart", function (e) {
                this.x1 = e.touches[0].pageX;
                this.y1 = e.touches[0].pageY;
                this.ox = pic.x;
                this.oy = pic.y;
                this.os = pic.scaleX;
                this.or = pic.rotation;
                if (e.touches[1]) {
                    this.x2 = e.touches[1].pageX;
                    this.y2 = e.touches[1].pageY;
                    state = 1
                } else {
                    state = 2
                }
                move = true
            }).on("touchmove", function (e) {
                console.log(move, state);
                if (move) {
                    if (state == 1) {
                        var picBoundsC = getLengthAngle(e.touches[0].pageX, e.touches[1].pageX, e.touches[0].pageY, e.touches[1].pageY),
                            picBoundsO = getLengthAngle(this.x1, this.x2, this.y1, this.y2);
                        pic.rotation = picBoundsC.angle - picBoundsO.angle + this.or;
                        pic.scaleX = pic.scaleY = picBoundsC.length / picBoundsO.length * this.os;
                    } else if (state == 2) {
                        pic.x = this.ox + (e.touches[0].pageX - this.x1);
                        pic.y = this.oy + (e.touches[0].pageY - this.y1);
                    }
                    stage.update(event);
                }
            }).on("touchend", function () {
                state = 3;
                move = false;
                stage.update(event);
            });

            $("#getImg").off().on("click", function () {
                var imgNew = new Image();
                // imgNew.src = document.getElementById("canvas1").toDataURL('image/jpeg', 1);
                imgNew.src = document.getElementById("pic").toDataURL('image/jpeg', 1);

                $(imgNew).addClass('xiaobai');
                imgNew.onload = function () {
                    $("body").append(imgNew)
                }
            });
        }

        function getLengthAngle(x1, x2, y1, y2) {
            var xDiff = x2 - x1, yDiff = y2 - y1;
            console.log(xDiff, yDiff, x1, x2, y1, y2);
            return {
                length: Math.ceil(Math.sqrt(xDiff * xDiff + yDiff * yDiff)),
                angle: Math.round((Math.atan2(yDiff, xDiff) * 180) / Math.PI)
            };
        }

        drawImg();
    };
    // canvas1imgbase641();

});


var doorAudio = (function () {
    var musicUrl = sysParam.baseUrl + 'audio/opendoorA.mp3' + app.urlArgs;
    console.log(musicUrl);
    var _this;
    var m = function () {
        this.audio = new Audio();
        this.audio.setAttribute("autoplay", "autoplay");
        this.audio.setAttribute("loop", "loop");
        this.init();
    };
    m.prototype.init = function () {
        var _this = this;
        this.audio.src = musicUrl;
    };
    m.prototype.audioPlay = function () {
        this.audio.play();
    };
    m.prototype.audioPause = function () {
        this.audio.pause();
    };
    return new m();
});


// 长按执行
var timeOutEvent = 0;
$(function () {
    $("#html2canvasDate").on({
        touchstart: function (e) {
            timeOutEvent = setTimeout(function () {
                timeOutEvent = 0;
                console.log("长按事件触发发");
            }, 500);
            e.preventDefault();
        },
        touchmove: function () {
            clearTimeout(timeOutEvent);
            timeOutEvent = 0;
        },
        touchend: function () {
            clearTimeout(timeOutEvent);
            if (timeOutEvent != 0) {
                console.log("你这是点击，不是长按");
            }
            return false;
        }
    })
});


/*

    function tr_setViewport(w) {
        var scale = parseInt(window.screen.width) / w, a = /Android (\d+\.\d+)/.test(navigator.userAgent) ? 2.3 >= parseFloat(RegExp.$1) ? "width="+w+", target-densitydpi=device-dpi" : "width="+w+", minimum-scale = " + scale + ", maximum-scale = " + scale + ", target-densitydpi=device-dpi" : "width="+w+", user-scalable=no, target-densitydpi=device-dpi";
        document.getElementById('eqMobileViewport').setAttribute("content",a);
    }
    function tr_appResize() {
        tr_setViewport(640);
        setTimeout(function () {
            tr_setViewport(638);
            setTimeout(function () {
                tr_setViewport(640);
            },100);
        },100);
    }
    tr_setViewport(640);
    //		window.addEventListener('resize', resize, false);
    window.addEventListener('orientationchange', tr_appResize, false);

    $("input").on("blur",function () {
        tr_appResize()
    })

* */



/*

// 强制关注 二维码
$(function () {
    var stare = {
        bg: sysParam.baseUrl + 'images/stare-back.png' + sysParam.version,
        close: sysParam.baseUrl + 'images/stare-btn-close.png' + sysParam.version,
        QRcode: sysParam.baseUrl + 'images/stare-QRcode.png' + sysParam.version,
    };
    $('head').append('<style>.ce{position:absolute;top:0;left:0;right:0;bottom:0;margin:auto}.popupBg{ background: rgba(0,0,0,.7)}.z-index99{z-index: 99;}</style>')
    var wrapDiv = $('<div class="ce z-index99 popupBg"></div>');
    var bg = $('<img class="ce" src="' + stare.bg + '">');
    var QRcode = $('<img class="ce" style="width: 240px;" src="' + stare.QRcode + '">');
    var close = $('<img class="ce" style="top:-430px;right:-400px" src="' + stare.close + '">');
    wrapDiv.append(bg).append(QRcode).append(close);
    $('body').append(wrapDiv);
    close.click(function () {
        wrapDiv.hide();
    });
}());

*/



/*
g.prototype.init = function () {
    Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;
    window.onresize = function () {
        Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;
    };
}
*/



