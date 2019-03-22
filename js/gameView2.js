/**
 * Created by Arvinco on 2016/8/10.
 */
var game, Sound, SoundManager;
$(function () {
    var WebGL = Laya.WebGL;
    var w = 640, h = 1030;
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
    var Animation = Laya.Animation;
    SoundManager = Laya.SoundManager; //音效
    Sound = Laya.Sound; //音效
    var isGameStart = false;
    var isPause = false;
    //性能显示
    // var Stat = laya.utils.Stat;
    // Stat.show(0, 1008);
    var resArr = [];
    for (var i = 0; i < res.length; i++) {
        resArr[i] = {};
        resArr[i].url = res[i].src + sysParam.version;
        if (res[i].src.indexOf("json") != -1) {
            resArr[i].type = Loader.ATLAS
        } else if (res[i].src.indexOf("mp3") != -1) {
            resArr[i].type = Loader.SOUND
        } else {
            resArr[i].type = Loader.IMAGE
        }

    }
    var lab = [];
    var metre = 0;
    var isPlaying = false;
    var isStop = false;
    var thingsLength = 0;


    // 初始化游戏
    game = (function () {
        var _this, g = function () {
            _this = this;
            this.load();
            this.roadLine = 785;
            this.speed = 4
        };
        //加载资源
        g.prototype.load = function () {
            Laya.loader.load(resArr, Handler.create(this, getLab));
            $(".gameView").prepend($("#layaContainer"));

            function getLab() {
                for (var i = 0; i < res.length; i++) {
                    if (resArr[i].type == Loader.IMAGE) {
                        lab[res[i].id] = Loader.getRes(resArr[i].url)
                    } else {
                        lab[res[i].id] = resArr[i].url
                    }
                }
                this.init();
                sys.lazyLoad(".body", function () {
                    sys.loadingComplete();
                });
            }
        };
        g.prototype.init = function () {

            var bg = createImg("bg");
            Stage.addChild(bg);
            this.createBg();
            this.thingsArr = [];
            this.thingsBoxBottom = new Sprite();
            Stage.addChild(this.thingsBoxBottom);

            this.createPlayer();

            this.thingsBox = new Sprite();
            Stage.addChild(this.thingsBox);

            this.thingsBoxTop = new Sprite();
            Stage.addChild(this.thingsBoxTop);

        };

        g.prototype.start = function () {
            this.thingsArr = [];
            this.thingsBox._childs =[];
            this.thingsBoxTop._childs =[];
            this.thingsBoxBottom._childs =[];
            metre = 0;
            thingsLength = 0;
            app.gameTimes=1;
            isPlaying = true;
            this.isFirstFire=false;
        };
        g.prototype.rePlay=function(){
            this.thingsArr = [];
            this.thingsBox._childs =[];
            this.thingsBoxTop._childs =[];
            this.thingsBoxBottom._childs =[];
            metre = 0;
            thingsLength = 0;
            app.gameTimes=1;
            isPlaying = true;
            isStop = false;
            app.score=0;
            app.scoreShow=[0];
            app.socreData="";
            this.bearReset();
            this.isFirstFire=false;
        };
        g.prototype.gameOver = function () {
            if(game.jumpAnim){
                Tween.clear(game.jumpAnim);
            }
            if(game.jumpAnimShadow){
                Tween.clear(game.jumpAnimShadow);
            }
            app.gameOver();
            isPlaying = false;
            isStop = true;
        };
        g.prototype.play = function () {
            isStop = false;
        };
        g.prototype.content = function () {
            isStop = false;
            isPlaying=true;
            this.bearReset();
            this.thingsBox._childs =[];
            this.thingsBoxTop._childs =[];
            this.thingsBoxBottom._childs =[];
        };
        g.prototype.stop = function () {
            isStop = true;
        };

        g.prototype.createBg = function () {

            var bgList = [
                {name: "mountain", force: 0.5, ry: 548},
                {name: "architecture", force: 0.7, ry: 553},
                {name: "road", force: 1, y: 548},
                {name: "late", force: 1.4, ry: 1030},
            ];
            var bgArr = [];

            function createBgObj(obj) {
                var sprite = createImg(obj.name, 0, 0);
                var spriteY = 0;

                var spritePos = sprite.getBounds();
                if (obj.ry) {
                    spriteY = obj.ry - spritePos.height;
                } else {
                    spriteY = obj.y
                }
                sprite.width = spritePos.width - 5;
                sprite.y = spriteY;

                var sprite2 = createImg(obj.name, sprite.width, spriteY);
                sprite2.width = sprite.width;
                sprite.force = obj.force;
                sprite2.force = obj.force;
                bgArr.push(sprite, sprite2);
                Stage.addChildren(bgArr[bgArr.length - 2], bgArr[bgArr.length - 1])
            }

            for (var i in bgList) {
                createBgObj(bgList[i])
            }

            this.bgRun = function () {
                Laya.timer.frameLoop(1, this, run);
            };
            this.bgStop = function () {
                Laya.timer.clear(this, run);
            };

            function run() {
                if (!isStop) {
                    if (isPlaying) {
                        metre += game.speed;
                    }
                    game.createThinks(Math.floor(metre));
                    for (var i=0,l=bgArr.length; i<l;i+=2) {
                        moveBg(bgArr[i],bgArr[i+1])
                    }
                    for (var i in game.thingsBox._childs) {
                        moveThinks(game.thingsBox._childs[i], i)
                    }
                    for (var i in game.thingsBoxTop._childs) {
                        moveThinks(game.thingsBoxTop._childs[i], i)
                    }
                    for (var i in game.thingsBoxBottom._childs) {
                        moveThinks(game.thingsBoxBottom._childs[i], i)
                    }
                }

            }

            function moveThinks(obj) {
                if (obj.x <= -(obj.width + w) && obj.visible) {
                    obj.visible = false;
                    obj.die();
                    obj = null;
                } else {
                    obj.x -= game.speed;
                }
            }
            //背景循环
            function moveBg(obj,obj2) {
                var objForce;
                if (obj.force) {
                    objForce = obj.force * game.speed
                } else {
                    objForce = game.speed;
                }
                obj.x -= objForce;
                obj2.x -= objForce;

                if (obj.x <= -obj.width ) {
                    obj.x = obj2.x+obj.width
                }
                if (obj2.x <= -obj.width) {
                    obj2.x = obj.x+obj.width
                }
            }

            this.bgRun();
        };

        g.prototype.createPlayer = function () {
            var player = this.player = new Sprite();
            var bear = this.bear = new Sprite();
            // var bear1 =new Animation();
            // bear1.loadAtlas(lab["pla"]);
            // var bear2 =new Animation();
            // bear2.loadAtlas(lab["plb"]);
            // var bear3 =new Animation();
            // bear3.loadAtlas(lab["plc"]);
            // bear1.interval =bear2.interval=bear3.interval=100;
            // bear1.y =bear2.y=bear3.y=0;
            // bear1.x=0;
            // bear2.x=200;
            // bear3.x=300;
            // bear1.play();
            // bear2.play();
            // bear3.play();


            this.bearArr=[];
            for(let i=1;i<4;i++){
                this.bearArr[i-1] = new Animation();
                this.bearArr[i-1].loadAtlas(lab["pl"+i]);
                this.bearArr[i-1].interval=150;
                this.bearArr[i-1].play();
                // this.bearArr[i-1].visible=false;
                bear.addChildren(this.bearArr[i-1]);
            }
            // bear.addChildren(bear1,bear2,bear3);
            var bearPos = this.bearArr[0].getBounds();
            // var bearShadow = createImg("bearShadow", 0, 0, 1);
            // player.addChildren(bearShadow, bear);

            player.addChild(bear);
            bear.x =100;
            var bearY = this.roadLine - bearPos.height;
            bear.y = bearY;
            bear.reY= bearY;
            bear.width = bearPos.width;
            bear.height = bearPos.height;

            // bearShadow.y = this.roadLine - 5;
            // bearShadow.x = 100 + bearShadow.getBounds().width / 2;
            Stage.addChild(player);
            this.changePlayer=function(num){
                for(var i=0; i<3;i++){
                    game.bearArr[i].visible=false
                }

                game.bearArr[num].visible = true;
            };
            this.changePlayer(0);
            var jumpHeight = bearY - bearPos.height * 2.5;
            // console.log(bearY-jumpHeight+bear.getBounds().height)
            var jumpIng = false;
            var jumpTime = 600;
            this.jump = function () {
                if (!jumpIng && isPlaying && !isStop) {
                    jumpIng = true;
                    game.jumpAnim = Tween.to(bear, {y: jumpHeight}, jumpTime, Ease.sineOut, Handler.create(this, function () {
                        game.jumpAnim = Tween.to(bear, {y: bearY}, jumpTime, Ease.sineIn, Handler.create(this, function () {
                            jumpIng = false
                        }))
                    }));
                    // game.jumpAnimShadow = Tween.to(bearShadow, {
                    //     scaleX: .6,
                    //     scaleY: .6,
                    //     alpha: .5
                    // }, jumpTime, Ease.sineOut, Handler.create(this, function () {
                    //     game.jumpAnimShadow= Tween.to(bearShadow, {scaleX: 1, scaleY: 1, alpha: 1}, jumpTime, Ease.sineIn)
                    // }))
                }
            };
            this.bearReset = function(){
                Tween.to(bear, {y: bearY}, jumpTime, Ease.sineIn, Handler.create(this, function () {
                    jumpIng = false
                }));
                // Tween.to(bearShadow, {scaleX: 1, scaleY: 1, alpha: 1}, jumpTime, Ease.sineIn)
            };
            Stage.on(Event.MOUSE_DOWN, this, this.jump)

        };

        g.prototype.createThinks = function (metre) {
            if (metre > thingsLength) {
                var isCreate = false;
                for (var i = levels.length - 1; i >= 0; i--) {
                    if (metre > levels[i].levelLength && !isCreate) {
                        isCreate = true;
                        game.speed = levels[i].speed;
                        if (Math.random() <= levels[i].emptyProbability) {
                            thingsLength += Math.floor(Math.random() * (levels[i].emptyMaxWidth - levels[i].emptyMinWidth) + levels[i].emptyMinWidth)
                        } else {
                            var levelType = Math.floor(levels[i].combination.length * Math.random());
                            thingsLength += levels[i].combination[levelType].width;
                            game.createCombination(levels[i].combination[levelType].things)
                        }
                    }
                }
            }
        };
        g.prototype.createCombination = function (arr) {
            for (var i in arr) {
                switch (arr[i].type) {
                    case "coin":
                        this.createCoin(arr[i]);
                        break;
                    case "bigfire":
                        this.createBigFire(arr[i]);
                        break;
                    case "smallfire":
                        this.createSmallFire(arr[i]);
                        break;
                    case "pit":
                        this.createPit(arr[i]);
                        break;
                }
            }
        };
        g.prototype.createCoin = function (obj) {
            var coin = createImg("coin", obj.x, this.roadLine - obj.y, 2);
            var coinWidth = coin.getBounds().width / 2;
            coin.x = w + obj.x;
            coin.isHit = false;

            coin.over = function () {
                if (!coin.isHit) {
                    app.score = (parseInt(app.score) + 10).toString();
                    if(!game.isFirstFire&& app.score>= parseInt(sysParam.circusTitle[0].score)){
                        game.isFirstFire= true;
                        app.designation=true;
                        app.designationPop=true;
                        setTimeout(function () {
                            app.designationPop=false;
                        },2500)
                    }
                    app.scoreShow = [];
                    for (var i in app.score) {
                        app.scoreShow.push(app.score[i])
                    }
                    coin.isHit = true;
                    Tween.to(coin, {
                        y: coin.y - 50,
                        scaleX: 1.2,
                        scaleY: 1.2
                    }, 200, Ease.sineOut, Handler.create(this, function () {
                        Tween.to(coin, {alpha: 0, y: coin.y + 50, scaleX: .8, scaleY: .8}, 200, Ease.sineIn)
                    }));
                }
            };
            coin.die = function () {
                coin.removeSelf();
                Laya.timer.clear(this, hit);
            };

            Laya.timer.frameLoop(1, this, hit);

            function hit() {

                if (!coin.isHit && hitTestObj(game.bear, coin)) {
                    coin.over();
                    app.socreData+=(new Date()).valueOf();



                    Laya.timer.clear(this, hit);
                }
            }

            game.thingsBox.addChild(coin)
        };
        g.prototype.createPit = function (obj) {
            var pit = createImg("pit", obj.x, this.roadLine - obj.y, 2);
            var pit2 = createImg("pit2", obj.x, this.roadLine - obj.y, 2);

            pit.x =pit2.x = w  + obj.x;
            pit.isHit = false;

            pit2.visible =false;

            Laya.timer.frameLoop(1, this, hit);
            pit.die =function () {
                pit.removeSelf();
                Laya.timer.clear(this, hit);
                Laya.timer.clear(this, anim);
            };
            pit2.die =function () {
                pit2.removeSelf();
            };

            Laya.timer.frameLoop(20, this, anim);
            var animState= false;
            function anim() {
                if(animState){
                    animState=false
                }else {
                    animState=true;
                }
                pit.visible=animState;
                pit2.visible=!animState;
            }
            function hit() {

                if (!pit.isHit && (hitTestObj(game.bear, pit)||hitTestObj(game.bear, pit2))) {
                    Laya.timer.clear(this, hit);
                    pit.isHit = true;
                    app.socreData+=(new Date()).valueOf()+"pitDie";
                    game.gameOver();
                }
                if(!pit.isHit&& game.bear.x> pit.x&&game.bear.y<game.bear.reY){
                    pit.isHit = true;
                    console.log("跳过火盆")
                }
            }

            game.thingsBox.addChildren(pit,pit2)
        };
        g.prototype.createBigFire = function (obj) {
            var fire1L = createImg("bigFire1L", obj.x, this.roadLine - obj.y, 2);
            var fire1R = createImg("bigFire1R", obj.x, this.roadLine - obj.y, 2);
            var fire2L = createImg("bigFire2L", obj.x, this.roadLine - obj.y, 2);
            var fire2R = createImg("bigFire2R", obj.x, this.roadLine - obj.y, 2);

            var fireWidth = fire1L.getBounds().width / 2;
            fire1L.x = fire1R.x = fire2L.x = fire2R.x = w  + obj.x;
            fire1L.isHit = false;

            var fireW = 30, fireH = 45;
            var fireBox1 = new Sprite();

            // fireBox1.graphics.drawRect(0, 0, fireW, fireH, "#ffff00");
            fireBox1.size(fireW, fireH);
            fireBox1.width = fireW;
            fireBox1.height = fireH;
            fireBox1.pivot(fireW / 2, fireH);
            fireBox1.x = fire1L.x;
            fireBox1.y = fire1L.y;

            var fireBox2 = new Sprite();
            // fireBox2.graphics.drawRect(0, 0, fireW, fireH, "#ffff00");
            fireBox2.size(fireW, fireH);
            fireBox2.width = fireW;
            fireBox2.height = fireH;
            fireBox2.pivot(fireW / 2, fireH);
            fireBox2.x = fire1L.x;
            fireBox2.y = fire1L.y - fire1L.getBounds().height + fireH;

            Laya.timer.frameLoop(1, this, hit);
            Laya.timer.frameLoop(10, this, anim);
            var animState= false;
            function anim() {
                if(animState){
                    animState=false
                }else {
                    animState=true;
                }
                fire1L.visible=animState;
                fire1R.visible=animState;
                fire2L.visible=!animState;
                fire2R.visible=!animState;
            }

            function hit() {
                if (!fireBox1.isHit && (hitTestObj(game.bear, fireBox1) || hitTestObj(game.bear, fireBox2))) {
                    Laya.timer.clear(this, hit);
                    fireBox1.isHit = true;
                    app.socreData+=(new Date()).valueOf()+"bigFireDie";
                    game.gameOver();
                }

                if(!fireBox1.isHit&& game.bear.x> fireBox1.x&&game.bear.y<fireBox1.y){
                    fireBox1.isHit = true;


                    console.log("穿过大火圈")
                }
            }
            fireBox1.die =function () {
                fireBox1.removeSelf();
                Laya.timer.clear(this, hit);
                Laya.timer.clear(this, anim);
            };
            fireBox2.die =function () {
                fireBox2.removeSelf();
            };

            fire1L.die =function () {
                fire1L.removeSelf();
            };
            fire2L.die =function () {
                fire1L.removeSelf();
            };
            fire1R.die =function () {
                fire1L.removeSelf();
            };
            fire2R.die =function () {
                fire1L.removeSelf();
            };


            game.thingsBox.addChildren(fireBox1, fireBox2);
            game.thingsBoxBottom.addChildren(fire1L, fire2L);
            game.thingsBoxTop.addChildren(fire1R, fire2R);
        };
        g.prototype.createSmallFire = function (obj) {
            var fire1L = createImg("smallFire1L", obj.x, this.roadLine - obj.y, 2);
            var fire2L = createImg("smallFire2L", obj.x, this.roadLine - obj.y, 2);
            var fire1R = createImg("smallFire1R", obj.x, this.roadLine - obj.y, 2);
            var fire2R = createImg("smallFire2R", obj.x, this.roadLine - obj.y, 2);

            var fireWidth = fire1L.getBounds().width / 2;
            fire1L.x = fire1R.x = fire2L.x = fire2R.x = w  + obj.x;
            fire1L.isHit = false;

            var fireW = 20, fireH = 30;
            var fireBox1 = new Sprite();

            // fireBox1.graphics.drawRect(0, 0, fireW, fireH, "#ffff00");
            fireBox1.size(fireW, fireH);
            fireBox1.width = fireW;
            fireBox1.height = fireH;
            fireBox1.pivot(fireW / 2, fireH);
            fireBox1.x = fire1L.x;
            fireBox1.y = fire1L.y;

            var fireBox2 = new Sprite();
            // fireBox2.graphics.drawRect(0, 0, fireW, fireH, "#ffff00");
            fireBox2.size(fireW, fireH);
            fireBox2.width = fireW;
            fireBox2.height = fireH;
            fireBox2.pivot(fireW / 2, fireH);
            fireBox2.x = fire1L.x;
            fireBox2.y = fire1L.y - fire1L.getBounds().height + fireH;
            Laya.timer.frameLoop(1, this, hit);
            Laya.timer.frameLoop(10, this, anim);
            var animState= false;
            function anim() {
                if(animState){
                    animState=false
                }else {
                    animState=true;
                }
                fire1L.visible=animState;
                fire1R.visible=animState;
                fire2L.visible=!animState;
                fire2R.visible=!animState;
            }

            function hit() {
                if (!fireBox1.isHit && (hitTestObj(game.bear, fireBox1) || hitTestObj(game.bear, fireBox2))) {
                    Laya.timer.clear(this, hit);
                    fireBox1.isHit = true;
                    app.socreData+=(new Date()).valueOf()+"smallFireDie";
                    game.gameOver();
                }
                if(!fireBox1.isHit&& game.bear.x> fireBox1.x&&game.bear.y<fireBox1.y){
                    fireBox1.isHit = true;

                    console.log("穿过小火圈")
                }
            }
            fireBox1.die =function () {
                fireBox1.removeSelf();
                Laya.timer.clear(this, hit);
                Laya.timer.clear(this, anim);
            };
            fireBox2.die =function () {
                fireBox2.removeSelf();
            };

            fire1L.die =function () {
                fire1L.removeSelf();
            };
            fire2L.die =function () {
                fire1L.removeSelf();
            };
            fire1R.die =function () {
                fire1L.removeSelf();
            };
            fire2R.die =function () {
                fire1L.removeSelf();
            };


            game.thingsBox.addChildren(fireBox1, fireBox2);
            game.thingsBoxBottom.addChildren(fire1L, fire2L);
            game.thingsBoxTop.addChildren(fire1R, fire2R);
        };

        return new g()
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
            x=x+regX
        } else if (c == 2) {
            Bitmap.pivot(regX, skin.height);
            x=x+regX
        }

        Bitmap.pos(x, y);
        return Bitmap
    }
});




