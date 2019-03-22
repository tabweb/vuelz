/**
 * Created by rey.real on 2017/7/26.
 */

var game;
(function () {
    var WebGL = Laya.WebGL;
    var w = 640, h = 1008;
    Laya.init(w, h, WebGL);
    Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;
    var Stage = Laya.stage;

    var resArr = [];
    for (var i = 0; i < gameRes.imgArr.length; i++) {
        resArr[i] =gameRes.imgArr[i].src + sysParam.version;
    }
    var Loader = laya.net.Loader; //加载资源
    var Handler = laya.utils.Handler;
    var Sprite = Laya.Sprite; //元素
    var Tween = Laya.Tween; //缓动
    var TimeLine = Laya.TimeLine; //时间线
    var Ease = Laya.Ease; //缓动函数
    var Event = laya.events.Event;
    var Text = Laya.Text;
    var SoundManager = Laya.SoundManager; //音效
    var SoundL = Laya.Sound; //音效
    var isGameStart = false;
    //性能显示
    // var Stat = laya.utils.Stat;
    // Stat.show(0, 0);


    var lab = [];

    // 初始化游戏
    var game = (function(){

        var _this,g = function () {
            _this = this;
            this.load();
        };
        //加载资源
        g.prototype.load = function () {
            Laya.loader.load(resArr, Handler.create(this, getLab));
            // Laya.loader.load([
            //     {url:sound.bad,type:Loader.SOUND},
            //     {url:sound.fail,type:Loader.SOUND},
            //     {url:sound.goods,type:Loader.SOUND},
            //     {url:sound.start_game,type:Loader.SOUND},
            //     {url:sound.win,type:Loader.SOUND}]);
            // Sound.load(SoundManager);
            function getLab() {
                for (var i = 0; i < gameRes.imgArr.length; i++) {
                    lab[gameRes.imgArr[i].id] = Loader.getRes(resArr[i])
                }
                this.init()
            }
        };
        g.prototype.init = function () {
            sys.loadingComplete();
            this.prizeInfo={};//奖品信息
            this.isPlayGameBtn = false;//是否点击开始按钮
            var bg = createImg("gameBg");
            var bgAniBox = new createBgAni();
            var myInfo = this.myInfo = new createMyInfo();
            var clipBox = this.clipBox = new createClip();
            var gameBox = this.gameBox = new createPlayer();
            var btnBox = new createButton();
            Stage.addChildren(bg,gameBox.gamebox,clipBox.clipBox,myInfo.infoBox,bgAniBox.bgAniBox,btnBox.btns);
            Laya.timer.frameLoop(15, bgAniBox, bgAniBox.runLoop);

            $("#playGame").on("touchend",function () {
                var type = false;
                app.pageShow();
                app.popShow("timeOut");
                app.timeDownTxt = parseInt(gameConfig.playTimeDown);
                sys.countTime(parseInt(gameConfig.playTimeDown),function (time) {
                    app.timeDownTxt = time.second;
                    if(app.timeDownTxt == 0){
                        app.close();
                        Laya.timer.frameLoop(50, gameBox, function () {
                            if(isOver){
                                return false;
                            }
                            type = !type;
                            gameBox.playerFunc(type);
                        });
                    }
                });
            });
        };

        //开始游戏
        g.prototype.playGame = function () {
            console.log("开始游戏");
            var self = this;
            if(isOver){
                app.popShow("gameOver");
                return false;
            }
            if(game.isPlayGameBtn){
                return false;
            }
            if(gameConfig.goldCount < parseInt(gameConfig.oneChanceGold)){
                app.alert(sysParam.noGameChanceTxt);
                return false;
            }
            game.isPlayGameBtn = true;
            gameConfig.goldCount =parseInt(gameConfig.goldCount)-  parseInt(gameConfig.oneChanceGold);
            game.clipBox.moveToY();
            Tween.to(self, {scaleX: 1.1, scaleY: 1.1}, 100, Ease["sineOut"],Handler.create(this,function () {
                Tween.to(self,{scaleX:1,scaleY:1},100,Ease["sineOut"]);
            }));
            setTimeout(function(){
                game.isPlayGameBtn = false;
            },gameConfig.clipDownTime+gameConfig.clipUpTime+gameConfig.clipStopTime)
            ajax({
                url:sysParam.ajaxStartGameURL,
                data:{},
                callBack:function(res){
                    game.prizeInfo = res.result_data.prizeInfo;
                    game.myInfo.reScore(parseInt(res.result_data.gameNums));
                },
                err:function(res){
                    app.fadeAlert(res.result_msg);
                }
            })
        };

        //结束游戏
        g.prototype.overGame = function () {
            console.log("结束游戏");
            app.popShow("gameOver");
            // isOver = true;
        };

        //我的奖品
        g.prototype.myPrize = function(){
            if(sysParam.isUserInfo == 0){
                app.popShow('userInfo');
            }else{
                app.getPrizeListAjax();
            }
        };

        //活动规则
        g.prototype.showRule = function(){
            app.popShow('rule');
        };

        return new g()
    })();


    //创建游戏角色
    var createPlayer = function () {
        var gamebox = this.gamebox = new Sprite();
        var desk = createImg("desk",w/2,730,1);
        var player = this.player = new Sprite();
        gamebox.addChild(desk);
        gamebox.addChild(player);
    };

    createPlayer.prototype.playerFunc = function (type) {
        var player;
        if(type){
            player = createImg("player1",0,640,1);
            player.pyType=1;
        }else{
            player = createImg("player2",0,640,1);
            player.pyType=2;
        }
        player.pyClipFunc = function () {
            player.x=0;
            player.y=game.clipBox.clipBox.height - 125;
            anim.pause();
            game.clipBox.clipBox.addChild(player);
            setTimeout(function () {
                if(game.prizeInfo.princess.num<=0 &&  player.pyType == 1){
                    isClipOk = false;
                }else if(game.prizeInfo.snowPo.num<=0 && player.pyType == 2){
                    isClipOk = false;
                } else{
                    isClipOk = isClipOkFunc(player.pyType);
                }
                if(isClipOk){
                    submitData(player.pyType);
                    Tween.to(player, {x: 130,y:0,scaleX:0,scaleY:0}, gameConfig.playerOverTime,Ease["backOut"], Handler.create(player, function () {
                        player.visible = false;
                        player.removeSelf(); //清除自己
                    }),gameConfig.clipUpTime/2);
                }else{
                    Tween.to(player, {y:460}, gameConfig.playerOverTime,Ease["bounceOut"], Handler.create(player, function () {
                        player.visible = false;
                        player.removeSelf(); //清除自己
                    }));
                }
            },gameConfig.clipUpTime/2);

        };
        var bounds = player.getBounds();
        player.cx = player.width/2;
        player.width = bounds.width;
        player.height = bounds.height;
        this.player.addChild(player);
        var anim = Tween.to(player, {x: 700}, gameConfig.playerCreateTime,"", Handler.create(this, function () {
            player.visible = false;
            player.removeSelf(); //清除自己
        }));
        Laya.timer.frameLoop(1,this,function () {
            if(!isHit && hitTestObj(player,game.clipBox)){
                isHit = true;
                player.pyClipFunc();
            }
        })
    };



    //创建背景动画
    var createBgAni = function () {
        this.bgAniBox = new Sprite();
        this.lightBg = createImg("lightBg");
        this.bgAni1 = createImg("light");
        this.bgAni2 = createImg("light2");
        this.bgAni2.visible = false;
        this.bgAniBox.addChildren(this.lightBg,this.bgAni1,this.bgAni2);
    };

    createBgAni.prototype.runLoop = function () {
        var self = this;
        self.bgAni1.visible = true;
        self.bgAni2.visible = false;
        setTimeout(function () {
            self.bgAni1.visible = false;
            self.bgAni2.visible = true;
        },50);
    };

    //创建个人信息
    var createMyInfo = function () {
        var infoBox = this.infoBox = new Sprite();
        var bg = createImg("scoreBg",w/2,180,1);
        var fontFamily = "Microsoft YaHei";
        var fontColor = "#141550";
        var fontSize = 24;
        var txtPosY = 170;
        var goldChanceTxt = this.goldChanceTxt = new Text();//金币数量
        var princessCountTxt = this.princessCountTxt = new Text();//夹中公主数量
        var voucherCountTxt = this.voucherCountTxt = new Text();//夹中优惠券数量
        infoBox.addChild(bg);
        goldChanceTxt.pos(145,txtPosY);
        goldChanceTxt.font = fontFamily;
        goldChanceTxt.color = fontColor;
        goldChanceTxt.fontSize = fontSize;
        // goldChanceTxt.bold = true;
        infoBox.addChild(goldChanceTxt);
        this.reScore(gameConfig.goldCount);
        princessCountTxt.pos(400,txtPosY);
        princessCountTxt.font = fontFamily;
        princessCountTxt.color = fontColor;
        princessCountTxt.fontSize = fontSize;
        infoBox.addChild(princessCountTxt);
        this.rePrincess(0);
        voucherCountTxt.bold = true;
        voucherCountTxt.pos(530,txtPosY);
        voucherCountTxt.font = fontFamily;
        voucherCountTxt.color = fontColor;
        voucherCountTxt.fontSize = fontSize;
        voucherCountTxt.bold = true;
        infoBox.addChild(voucherCountTxt);
        this.reVoucher(0);
    };

    //改写金币数
    createMyInfo.prototype.reScore = function (num) {
        this.goldChanceTxt.text = "剩余游戏次数："+num;
        gameConfig.goldCount = num;
        var pos = this.goldChanceTxt.getBounds();
        this.goldChanceTxt.pivot(pos.width / 2 -30, pos.height / 2);
        this.goldChanceTxt.scale(1.2, 1.2);
        Tween.to(this.goldChanceTxt, {scaleX: 1, scaleY: 1}, 100, Ease["sineOut"])
    };

    //改写公主数量
    createMyInfo.prototype.rePrincess = function (num) {
        this.princessCountTxt.text = num;
        app.princessTxt =this.princessCountTxt.text;
        var pos = this.princessCountTxt.getBounds();
        this.princessCountTxt.pivot(pos.width / 2, pos.height / 2);
        this.princessCountTxt.scale(1.2, 1.2);
        Tween.to(this.princessCountTxt, {scaleX: 1, scaleY: 1}, 100, Ease["sineOut"])
    };

    //改写优惠券数量
    createMyInfo.prototype.reVoucher = function (num) {
        this.voucherCountTxt.text = num;
        app.voucherTxt = this.voucherCountTxt.text
        var pos = this.voucherCountTxt.getBounds();
        this.voucherCountTxt.pivot(pos.width / 2, pos.height / 2);
        this.voucherCountTxt.scale(1.2, 1.2);
        Tween.to(this.voucherCountTxt, {scaleX: 1, scaleY: 1}, 100, Ease["sineOut"])
    };

    //创建夹子
    var createClip = function () {
        var clipBox = this.clipBox = new Sprite();
        var rope = createImg("rope",0,0,1);
        var minClipBox = this.minClipBox = new createMinClip();
        clipBox.size(rope.width,rope.height);
        clipBox.y=185;
        clipBox.x=w/2;
        clipBox.cx = -30;
        clipBox.addChild(minClipBox.minClipBox);
        clipBox.addChild(rope);
    };



    createClip.prototype.moveToY = function () {
        this.minClipBox.openClip();
        Tween.to(this.clipBox, {y: 385}, gameConfig.clipDownTime,"", Handler.create(this, function () {
            Tween.to(this.clipBox, {y: 185}, gameConfig.clipUpTime, Ease["sineOut"],Handler.create(this,function () {
                isHit=false;
            }),gameConfig.clipStopTime)
        }));
    };

    //创建小夹子
    var createMinClip = function () {
        var minClipBox = this.minClipBox = new Sprite();
        var leftClip = this.leftClip = createImg("spinLeft",-30,0,0);
        var rightClip = this.rightClip = createImg("spinRight",30,0,0);
        this.leftClip.pivot(50,0);
        this.rightClip.pivot(20,0);
        minClipBox.y = 160;
        minClipBox.addChild(leftClip);
        minClipBox.addChild(rightClip);
    };

    //张开夹子
    createMinClip.prototype.openClip = function () {
        Tween.to(this.leftClip, {rotation: 10}, gameConfig.clipDownTime-150,"", Handler.create(this, function () {
            Tween.to(this.leftClip, {rotation: -10}, gameConfig.clipUpTime/2 +150, Ease["sineOut"])
        }));
        Tween.to(this.rightClip, {rotation: -10}, gameConfig.clipDownTime-150,"", Handler.create(this, function () {
            Tween.to(this.rightClip, {rotation: 10}, gameConfig.clipUpTime/2 +80, Ease["sineOut"])
        }));
    };



    //创建按钮
    var createButton = function () {
        var btns = this.btns = new Sprite();
        var playBtn = createImg("btnStart",w/2,820,1);
        var btnGameOver = createImg("btnGameOver",w/2,910,1);
        var logo = createImg("logo",12,0,0);
        var ruleBtn = createImg('btnRule',306,0,0);
        var prizeBtn = createImg('btnMyPrize',468,0,0);
        btnGameOver.on(Event.CLICK,btnGameOver,game.overGame);
        playBtn.on(Event.CLICK,playBtn,game.playGame);
        ruleBtn.on(Event.CLICK,ruleBtn,game.showRule);
        prizeBtn.on(Event.CLICK,prizeBtn,game.myPrize);
        btns.addChild(btnGameOver);
        btns.addChild(playBtn);
        btns.addChild(ruleBtn);
        btns.addChild(prizeBtn);
        btns.addChild(logo);
    };


    var isOver = false;
    var isHit = false;//是否碰撞
    // 碰撞检测
    function hitTestObj(obj, dobj) {
        var o = {
            x: (obj.x-obj.cx),
            y: obj.y,
            w: obj.width/ parseInt(gameConfig.gameLive),
            h: obj.height/2
        };
        var cb = {
            x: w/2,//夹子的中心点
            y: dobj.clipBox.y,
            w:1,
            h: dobj.clipBox.height - 111
        };

        var px, py;
        px = o.x <= cb.x ? cb.x : o.x;
        py = o.y <= cb.y ? cb.y : o.y;
        // 判断点是否都在两个对象中
        if (px >= o.x && px <= o.x + o.w && py >= o.y && py <= o.y + o.h && px >= cb.x && px <= cb.x + cb.w && py >= cb.y && py <= cb.y + cb.h) {
            return true;
        } else {
            return false;
        }
    }


    //掉落几率
    var isClipOk=false;
    function isClipOkFunc(type) {
        var num = ~~(Math.random()*100)+1;
        if(type == 1){
            if(num> parseInt(gameConfig.probability1)){
                return true;
            }else{
                return false;
            }
        }else{
            if(num> parseInt(gameConfig.probability2)){
                return true;
            }else{
                return false;
            }
        }

    }

    //提交数据
    function submitData(type){
        var currType = "";
        if(type == 1){
            currType = "princess";
        }else{
            currType = "snowPo";
        }
        ajax({
            url:sysParam.ajaxUpGetPrizeURL,
            data:{
                type:currType
            },
            callBack:function(res){
                if(type == 1){
                    game.myInfo.rePrincess(parseInt(game.myInfo.princessCountTxt.text)+parseInt(res.result_data.nums));
                }else{
                    game.myInfo.reVoucher(parseInt(game.myInfo.voucherCountTxt.text)+parseInt(res.result_data.nums));
                }
            },
            err:function(res){
                app.fadeAlert(res.result_msg);
            }
        });
    }

    // 新建一个元件
    function createImg(img, x, y, c) {  //c不填 中心点在左上角 c=1中心点在元素中心
        var Bitmap = new Sprite(), skin = lab[img];
        Bitmap.graphics.drawTexture(skin, 0, 0);
        var regX = skin.width / 2, regY = skin.height / 2;
        if (c == 1) {
            Bitmap.pivot(regX, regY);
        }
        x = x ? x : 0;
        y = y ? y : 0;
        Bitmap.pos(x, y);
        Bitmap.size(skin.width,skin.height);
        return Bitmap
    }

    //名字5位
    function getName(str) {
        var str_length = 0, len = 10, str_len = 0, str_cut = "";
        str_len = str.length;
        for (var i = 0; i < str_len; i++) {
            var a = str.charAt(i);
            str_length++;
            if (escape(a).length > 4) {
                str_length++;
            }
            if (str_length > len) {
                str_cut = str_cut.concat("...");
                return str_cut;
            }
            str_cut = str_cut.concat(a);
        }
        if (str_length <= len) {
            return str;
        }
    }
})();

