/**
 * Created by Arvinco on 2016/8/10.
 */
var game, Sound, SoundManager;
$(function () {
    var WebGL = Laya.WebGL;
    var w = 640, h = window.innerHeight;
    Laya.init(w, h, WebGL);
    Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;
    var Stage = Laya.stage;

    var Loader = laya.net.Loader; //加载资源
    var Handler = laya.utils.Handler;
    var Sprite = Laya.Sprite; //元素
    var Tween = Laya.Tween; //缓动
    var TimeLine = Laya.TimeLine; //时间线
    var Ease = Laya.Ease; //缓动函数
    var Event = laya.events.Event;
    var Text = Laya.Text;
    var Animation = Laya.Animation; // vic 待定
    SoundManager = Laya.SoundManager; //音效
    Sound = Laya.Sound; //音效
    var isGameStart = false;
    var isPause = false;
    //性能显示
    // var Stat = laya.utils.Stat;
    // Stat.show(0, 0);

    var resArr = [];
    for (var i = 0; i < res.length; i++) {
        // resArr[i] = res[i].src + sysParam.version;
        resArr[i] = res[i].src;
    }

    var lab = [];
    var px = w / 2 + 180,
        TabelRadius = 65,
        TableHeight = 70,
        py = h / 2 - TableHeight,
        bx = w / 2 + 180,
        by = h / 2,
        direction,
        curBox = 0,
        gameBoxPadding = (h - 1008) / 2,
        isJumpIng = false;

    var jumpTime = 600,
        isDown = false,    // 是否按下
        isStart = true,    // 是否 开始
        hookPosX = 0,      // 爪子定位 x轴
        hookBox_x = res[0].left, // 爪子定位 x定位
        hookstate = 1,     // 1上 2下
        hookDate = {
            x: res[0].left,
            y: res[0].top
        },
        hookArr = [
            {
                s: 1,
                x: 75,
                y: hookDate.y
            }, {
                s: 1,
                x: 245,
                y: hookDate.y
            }, {
                s: 1,
                x: 436,
                y: hookDate.y
            }, {
                s: 2,
                x: 55,
                y: hookDate.y + 195
            }, {
                s: 2,
                x: 235,
                y: hookDate.y + 195
            }, {
                s: 2,
                x: 415,
                y: hookDate.y + 195
            }
        ];

    // 初始化游戏
    game = (function () {
        var _this, g = function () {
            _this = this;
            this.load();
        };
        //加载资源
        g.prototype.load = function () {
            Laya.loader.load(resArr, Handler.create(this, getLab));
            $(".gameView").prepend($("#layaContainer"));
            // Laya.loader.load([
            //     {url: sound.jump, type: Loader.SOUND},
            // ]);

            function getLab() {
                for (var i = 0; i < res.length; i++) {
                    lab[res[i].id] = Loader.getRes(resArr[i]);
                    lab[res[i].id].x = res[i].left;
                    lab[res[i].id].y = res[i].top;
                    lab[res[i].id].w = res[i].width;
                    lab[res[i].id].h = res[i].height;
                    lab[res[i].id].CLICK = res[i].CLICK;
                    lab[res[i].id].MOUSE_DOWN = res[i].MOUSE_DOWN;
                    lab[res[i].id].MOUSE_UP = res[i].MOUSE_UP;
                    lab[res[i].id].MOUSE_OUT = res[i].MOUSE_OUT;
                }
                this.init();

                // sys.lazyLoad(".body", function () {
                //     sys.loadingComplete();
                // });
            }
        };

        g.prototype.init = function () {
            this.render();
            this.gameInit();
        };
        // 渲染 页面
        g.prototype.render = function () {
            var bg = new Sprite();
            bg.graphics.drawRect(0, 0, w, h, "#41003B");  //41003B
            Stage.addChild(bg);
            var gameBox = this.gameBox = new Sprite();
            Stage.addChild(gameBox);

            var bgBack = createImgRes("bg-back");
            bgBack.scaleY = h / 1008;
            var star1 = createImgRes("star1");
            var star2 = createImgRes("star2");
            var btnStart = createImgRes("btn-start");
            Stage.addChildren(bgBack, star1, star2);

            // stageBox
            var stageBox = this.stageBox = createImgRes('stage', 0, lab['stage'].x, lab['stage'].y, 1);
            Stage.addChild(stageBox);
            var stage = createImgRes("stage", 0, 1, lab['stage'].h - lab['stage'].height);
            var doll1 = this.doll1 = createImgRes("doll1", 1);
            var doll2 = this.doll2 = createImgRes("doll2", 1);
            var doll3 = this.doll3 = createImgRes("doll3", 1);
            var doll4 = this.doll4 = createImgRes("doll4", 1);
            var doll5 = this.doll5 = createImgRes("doll5", 1);
            var doll6 = this.doll6 = createImgRes("doll6", 1);
            stageBox.addChildren(
                stage,
                doll1,
                doll2,
                doll3,
                doll4,
                doll5,
                doll6);

            // hooxBox
            var hookBox = this.hookBox = createImgRes('hook-line', 0, lab['hook-line'].x, lab['hook-line'].y, 1);
            Stage.addChild(hookBox);
            var hookLeft = this.hookLeft = createImgRes("hook-left");
            var hookRight = this.hookRight = createImgRes("hook-right");
            var hookLine = this.hookLine = createImgRes("hook-line", 0, lab['hook-line'].w - lab['hook-line'].width, 1);
            hookBox.addChildren(
                hookLeft,
                hookRight,
                hookLine
            );

            // btn box
            var btnbox = createImgRes('btn-back');
            Stage.addChild(btnbox);
            var btnBack = createImgRes("btn-back", 0, 1, 1);
            var btnUp = createImgRes("btn-up");
            var bntRight = createImgRes("btn-right");
            var bntDown = createImgRes("btn-down");
            var btnLeft = createImgRes("btn-left");
            btnbox.addChildren(
                btnBack,
                btnUp,
                bntRight,
                bntDown,
                btnLeft);
            Stage.addChildren(btnStart);
        };

        g.prototype.gameInit = function () {
            this.goLeft = function () {
                if (hookPosX <= -240) {
                    return;
                }
                hookPosX -= 10;
                hookBox_x = lab['hook-line'].x + hookPosX;
                Tween.to(this.hookBox, {x: hookBox_x}, jumpTime / 2, Ease["sineOut"], Handler.create(this, function () {
                    // console.log('hookBox_x',hookBox_x);
                }));
            };
            this.goRight = function () {
                if (hookPosX >= 240) {
                    return;
                }
                hookPosX += 10;
                hookBox_x = lab['hook-line'].x + hookPosX;
                Tween.to(this.hookBox, {x: hookBox_x}, jumpTime / 2, Ease["sineOut"], Handler.create(this, function () {
                    // console.log('hookBox_x',hookBox_x);
                }));
            };
        };
        // 向上
        g.prototype.gameBtnUp = function (obj) {
            if (obj.mouse == "down") {
                hookstate = 1;
                Tween.to(this.hookBox, {
                    scaleY: 1,
                    scaleX: 1
                }, jumpTime / 2, Ease["sineOut"], Handler.create(this, function () {

                }));
            }
        };
        // 向右
        g.prototype.gameBtnRight = function (obj) {
            if (obj.mouse == "down") {  // 按下
                isDown = true;
                Laya.timer.loop(100, this, this.goRight);
            } else if (obj.mouse == "up") {  // 弹起
                if (isDown == true) {
                    isDown = false;
                    Laya.timer.clear(this, this.goRight);
                }
            }
        };
        // 向下
        g.prototype.gameBtnDown = function (obj) {
            if (obj.mouse == "down") {
                hookstate = 2;
                Tween.to(this.hookBox, {
                    scaleY: 1.05,
                    scaleX: 1.05
                }, jumpTime / 2, Ease["sineOut"], Handler.create(this, function () {

                }));
            }
        };
        // 向左
        g.prototype.gameBtnLeft = function (obj) {
            if (obj.mouse == "down") {  // 按下
                isDown = true;
                Laya.timer.loop(100, this, this.goLeft);
            } else if (obj.mouse == "up") {  // 弹起
                if (isDown == true) {
                    isDown = false;
                    Laya.timer.clear(this, this.goLeft);
                }
            }
        };
        // 开始
        g.prototype.gameBtnStart = function () {
            if (isStart == true) {
                isStart = false;
                var _this = this;
                var dolln = createImgRes("doll1");
                var dollIndex;
                var startY = lab['hook-line'].y + lab['stage'].y - 85 / 1008 * h;// + 195
                hookstate == 2 && (startY += 195);
                Tween.to(this.hookBox, {y: startY}, jumpTime / 2, Ease["sineOut"], Handler.create(this, function () {
                    hookArr.forEach(function (value, index) {
                        if (value.s == hookstate && value.x >= (hookBox_x - 40) && value.x <= (hookBox_x + 40)) { // hookstate 1上 2下
                            dollIndex = (index + 1);
                            _this['doll' + (index + 1)].removeSelf();
                            dolln = createImgRes("doll" + (index + 1), 0, lab['hook-left'].x + 15, lab['hook-left'].y);
                            _this.hookBox.addChildren(dolln, _this.hookLeft, _this.hookRight, _this.hookLine);
                        }
                    });
                    Tween.to(_this.hookBox, {y: hookArr[0].y}, jumpTime * 1.5, Ease["sineOut"], Handler.create(this, function () {
                        isStart = true;
                        if (dollIndex) { // 中
                            Tween.to(dolln, {
                                scaleX: 0,
                                scaleY: 0,
                                x: 500,
                                y: 300
                            }, jumpTime / 2, Ease["sineOut"], Handler.create(this, function () {
                                dolln.removeSelf();
                                if (dollIndex) {
                                    _this['doll' + dollIndex] = createImgRes('doll' + dollIndex, 1);
                                    _this['doll' + dollIndex].scaleX = _this['doll' + dollIndex].scaleY = 0;
                                    Tween.to(_this['doll' + dollIndex], {
                                        scaleX: 1,
                                        scaleY: 1
                                    }, jumpTime / 2, Ease["sineOut"], Handler.create(this, function () {
                                        isStart = true;
                                    }));
                                    _this.stageBox.addChildren(_this['doll' + dollIndex]);
                                }
                                app.check = 1;
                                // app.ajaxGetPrize();
                                console.log('中');
                            }));
                        } else {  // 没中
                            app.check = 2;
                            console.log('没中');
                            // app.ajaxGetPrize();
                        }
                    }));
                }));
            }
        };
        return new g();
    })();

    function getData() {
        return (new Date()).valueOf()
    }

    //已知半径，圆心，角度求圆上的点
    function getXY(r, ao, x, y) {
        // r半径,ao角度，圆心 xy
        return {
            x: Math.floor(x + r * Math.cos(ao * 3.14 / 180)),
            y: Math.floor(y + r * Math.sin(ao * 3.14 / 180))
        }
    }

    // 碰撞检测
    function hitTestObj(obj, dobj) {
        var o = {
            x: obj.x + 50,
            y: obj.y + 30,
            w: obj.width - 100,
            h: obj.height - 40
        };
        var dobjPos = dobj.getBounds();
        var d = {
            x: dobj.x - dobjPos.width / 2,
            y: dobj.y - dobjPos.height,
            w: dobj.width,
            h: dobj.height
        };

        var px, py;
        px = o.x <= d.x ? d.x : o.x;
        py = o.y <= d.y ? d.y : o.y;
        // 判断点是否都在两个对象中
        if (px >= o.x && px <= o.x + o.w && py >= o.y && py <= o.y + o.h && px >= d.x && px <= d.x + d.w && py >= d.y && py <= d.y + d.h) {
            return true;
        } else {
            return false;
        }
    }

    //求两点距离角度
    function getLengthAngle(x1, x2, y1, y2) {
        var xDiff = x2 - x1,
            yDiff = y2 - y1;
        return {
            length: Math.ceil(Math.sqrt(xDiff * xDiff + yDiff * yDiff)),
            angle: Math.round((Math.atan2(yDiff, xDiff) * 180) / Math.PI)
        };
    }

    // res.src  res.top  res.left  新建一个元件
    function createImgRes(img, c, x, y, r) {  //c不填 中心点在左上角 c=1中心点在元素中心
        var Bitmap = new Sprite(), skin = lab[img];
        r || Bitmap.graphics.drawTexture(skin, 0, 0);
        Bitmap.size(skin.width, skin.height);
        Bitmap.width = skin.width;
        Bitmap.height = skin.height;
        var regX = skin.width / 2, regY = skin.height / 2;
        Bitmap.center = c;
        x = x ? x : lab[img].x;
        y = y ? y : lab[img].y;
        if (c == 1) {
            Bitmap.pivot(regX, regY);
            x = x + regX;
            y = y + regY;
        } else if (c == 2) {
            Bitmap.pivot(regX, skin.height);
            x = x + regX
        }
        Bitmap.pos(x, y);
        if (lab[img] && lab[img].CLICK) {
            Bitmap.on(Event.CLICK, this, function () {
                lab[img].CLICK(lab[img]);
            });
        }
        if (lab[img] && lab[img].MOUSE_DOWN) {
            Bitmap.on(Event.MOUSE_DOWN, this, function () {
                lab[img].MOUSE_DOWN(lab[img]);
            });
        }
        if (lab[img] && lab[img].MOUSE_UP) {
            Bitmap.on(Event.MOUSE_UP, this, function () {
                lab[img].MOUSE_UP(lab[img]);
            });
        }
        if (lab[img] && lab[img].MOUSE_OUT) {
            Bitmap.on(Event.MOUSE_OUT, this, function () {
                lab[img].MOUSE_OUT(lab[img]);
            });
        }
        return Bitmap
    }

    // 新建一个元件
    function createImg(img, x, y, c) {  //c不填 中心点在左上角 c=1中心点在元素中心
        var Bitmap = new Sprite(), skin = lab[img];
        Bitmap.graphics.drawTexture(skin, 0, 0);
        Bitmap.size(skin.width, skin.height);
        Bitmap.width = skin.width;
        Bitmap.height = skin.height;
        var regX = skin.width / 2, regY = skin.height / 2;
        Bitmap.center = c;
        x = x ? x : 0;
        y = y ? y : 0;
        if (c == 1) {
            Bitmap.pivot(regX, regY);
            x = x + regX
        } else if (c == 2) {
            Bitmap.pivot(regX, skin.height);
            x = x + regX
        }
        Bitmap.pos(x, y);
        return Bitmap
    }
});




