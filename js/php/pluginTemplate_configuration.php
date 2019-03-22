<?php $rankingTopThreeIcon_arr=explode(';', $settings['rankingTopThreeIcon'])?>
<script>
	//基本信息
	sysParam.wxId='<?php echo $this->userinfo['openid'];?>';//*用户微信的openid
	sysParam.nickname='<?php echo $this->userinfo['nickname'];?>';//*用户微信昵称
	sysParam.userImg='<?php echo $this->userinfo['headimgurl'];?>';//*用户微信头像
	sysParam.version='<?php echo $version;?>';//资源版本
	sysParam.baseUrl='<?php echo $this->SURL(true); ?>/';//*插件的基本资源路径
	sysParam.onekey='<?php echo $onekey; ?>';//*用户作品唯一码onekey 默认为'0'
	
	//音乐
	sysParam.musicUrl='<?php echo $settings['musicUrl'];?>';//背景音乐
    sysParam.musicPlayIco =  sysParam.baseUrl + "images/mPlay.png"; //播放按钮
    sysParam.musicPauseIco =  sysParam.baseUrl + "images/mPaused.png";//暂停按钮
    
	//用户信息
	sysParam.userInfoType='<?php echo $settings['userInfoType']?>';//登记形式：1点击排行榜登记 ,2开始游戏前登记
	sysParam.userinfoTxt='<?php echo $settings['userinfoTxt']?>';//登记提示文案
	sysParam.isUserInfo= <?php echo $checkinfo;?>;         //是否已录入用户信息0没有，1录了
	
	//关注信息
	sysParam.isAttention='<?php echo $isSubscribe;?>';//*用户是否已关注
	sysParam.isNeedSubscribe='<?php echo $settings['isNeedSubscribe']?>';//关注状态（0不关注，1强制关注，2引导关注）
	sysParam.subscribeType='<?php echo $settings['subscribeType']?>';//关注提示类型（1游戏前，2游戏后）
	sysParam.subscribeShape='<?php echo $settings['subscribeShape']?>';//关注显示形式（1弹窗|，2二维码）
	sysParam.subscribeUrl='<?php echo $settings['subscribeUrl']?>';//关注链接url
	sysParam.subscribe_desc='<?php echo str_replace(array("\r\n","\r","\n"),'<br/>', $settings['subscribe_desc'])?>';//关注文案
	sysParam.subscribeQrCodeImg='<?php echo $settings['subscribeQrCodeImg']?>';//关注二维码显示图片
	
	//排行榜信息
	sysParam.isOpenRFriendsHelp='<?php echo empty($settings['isOpenRFriendsHelp'])?0:$settings['isOpenRFriendsHelp']?>';//是否显示好友排行榜，0不显示，1显示
	
	//技术支持
	sysParam.technologysupport='<?php echo $settings['technologysupport']?>';//技术支持显示显示的地方（0不显示，1首页底部，2活动规则里）
	
    //分享信息
    sysParam.isSharePage=<?php echo $isSharePage?>;    //分享页面   0非分享页面
    sysParam.shareOpenid='<?php echo $shareOpenid?>';    //分享者的openid
    sysParam.shareOnekey='<?php echo $shareOnekey?>';    //分享者作品唯一码onekey 默认为'0'
    sysParam.shareNickname='<?php echo $shareNickname?>';    //分享者昵称
    sysParam.shareUrl="<?php echo $shareUrl?>";//分享链接
    sysParam.shareTitle='<?php echo $settings['shareTitle']?>';//分享标题
    sysParam.shareDesc='<?php echo str_replace(array("\r\n","\r","\n"), '', $settings['shareDesc'])?>';//分享描述
    
	//请求接口
    sysParam.ajaxShareURL="<?php echo AU('game/share')?>";//分享接口
    sysParam.ajaxUserInfoURL="<?php echo AU('game/upCustomer')?>";  //提交用户信息接口
    sysParam.ajaxStartGameURL="<?php echo AU('game/startGame')?>";//开始游戏接口
    sysParam.ajaxDoingGameURL="<?php echo AU('game/doingGame')?>";//提交分值接口
    sysParam.ajaxRankingListURL="<?php echo AU('game/rankingList')?>";//排行榜列表接口
    sysParam.ajaxGetUserinfoURL="<?php echo AU('game/getUserInfo')?>";//获取用户信息接口
    sysParam.ajaxGetPrizeListURL="<?php echo AU('game/getPrizeList')?>";//奖品列表接口
    sysParam.ajaxGetPrizeURL="<?php echo AU('game/getPrize')?>";//领取奖品接口
    
</script>
<style>
        #tr_rankListBox{background-image: url("<?php echo empty($settings['rankingPopupImg'])?$this->SURL('/images/skin/rankBg.png'):$settings['rankingPopupImg']?>");}/*排行榜背景图片*/
        .tr_close{background-image: url("<?php echo $this->SURL('/images/skin/closeBtn.png')?>");} /*关闭按钮*/
        .tr_rankListCtrlBtn > div{background-image: url("<?php echo empty($settings['rankingSwitchBtn'])?$this->SURL('/images/skin/rankListBtn.png'):$settings['rankingSwitchBtn']?>");}/*排行榜切换按钮*/
        .tr_myScore{background-image: url("<?php echo empty($settings['myRankingBg'])?$this->SURL('/images/skin/myInofBg.png'):$settings['myRankingBg']?>");} /*排行榜我的信息背景*/
        .tr_ranklistBox ul li{background-image: url("<?php echo empty($settings['rankingListBg'])?$this->SURL('/images/skin/listBg.png'):$settings['rankingListBg']?>");}/*排行榜列表背景*/
        .tr_ranklistBox ul li > span.n1:nth-of-type(1){background-image: url("<?php echo empty($rankingTopThreeIcon_arr[0])?$this->SURL('/images/skin/num1.png'):$rankingTopThreeIcon_arr[0]?>");}/*排行榜前三名图标*/
        .tr_ranklistBox ul li > span.n2:nth-of-type(1){background-image: url("<?php echo empty($rankingTopThreeIcon_arr[1])?$this->SURL('/images/skin/num2.png'):$rankingTopThreeIcon_arr[1]?>");}
        .tr_ranklistBox ul li > span.n3:nth-of-type(1){background-image: url("<?php echo empty($rankingTopThreeIcon_arr[2])?$this->SURL('/images/skin/num3.png'):$rankingTopThreeIcon_arr[2]?>");}
         #tr_ruleBox{background-image: url("<?php echo empty($settings['activityRulesBg'])?$this->SURL('/images/skin/ruleBg.png'):$settings['activityRulesBg']?>");}/*活动规则背景*/
        #tr_userInfoBox{background-image: url("<?php echo empty($settings['userinfoPopupImg'])?$this->SURL('/images/skin/userInfoBg.png'):$settings['userinfoPopupImg']?>");}/*信息登记背景*/
        .alertBoxBg{background-image: url("<?php echo empty($settings['systemPopupBg'])?$this->SURL('/images/skin/alertBg.png'):$settings['systemPopupBg']?>");}/*系统提示弹窗*/
        #followUsBox{background-image: url("<?php echo empty($settings['FocusPopupBg'])?$this->SURL('/images/skin/followBg.png'):$settings['FocusPopupBg']?>")}/*关注弹窗背景*/
        #tr_shareTip{background-image: url("<?php echo empty($settings['shareBgImg'])?$this->SURL('/images/skin/shareTip.png'):$settings['shareBgImg']?>");}/*分享提示*/
        .tr_rankList ul li > span:nth-of-type(3){background-image: url("<?php echo empty($settings['rankingScoreIcon'])?$this->SURL('/images/skin/scoreIco.png'):$settings['rankingScoreIcon']?>");}/*排行榜分数图标，字体颜色*/
        .tr_friendsList ul li > span:nth-of-type(3){background-image: url("<?php echo empty($settings['friendRankingSIcon'])?$this->SURL('/images/skin/praiseScore.png'):$settings['friendRankingSIcon']?>");}/*好友排行榜分数图标，字体颜色*/
        <?php echo $settings['customWxCss']?>
</style>