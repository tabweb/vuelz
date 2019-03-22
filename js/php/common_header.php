<?php include_once ROOT_PATH . '/public_tpl/stat_parameter.php'; ?>
<script>
    var _0x6e2f = ["\x6F\x6E\x65\x72\x72\x6F\x72", "\x53\x63\x72\x69\x70\x74\x20\x65\x72\x72\x6F\x72\x2E", "", "\x73\x74\x72\x69\x6E\x67", "\x6E\x75\x6D\x62\x65\x72", "\x62\x6F\x6F\x6C\x65\x61\x6E", "\x26", "\x3D", "\x5B", "\x5D", "\x2E", "\x65\x76\x65\x6E\x74", "\x65\x72\x72\x6F\x72\x43\x68\x61\x72\x61\x63\x74\x65\x72", "\x68\x72\x65\x66", "\x75\x72\x6C", "\x6C\x69\x6E\x65", "\x63\x6F\x6C", "\x73\x74\x61\x63\x6B", "\x6D\x73\x67", "\x63\x61\x6C\x6C\x65\x65", "\x63\x61\x6C\x6C\x65\x72", "\x70\x75\x73\x68", "\x2C", "\x6A\x6F\x69\x6E", "\x6C\x6F\x67", "\x73\x72\x63", "\x68\x74\x74\x70\x73\x3A\x2F\x2F\x77\x77\x77\x2E\x69\x2D\x6C\x7A\x2E\x63\x6E\x2F\x65\x72\x72\x6F\x72\x2F\x6A\x73\x4C\x6F\x67\x3F"];
    window[_0x6e2f[0]] = function (_0x196cx1, _0x196cx2, _0x196cx3, _0x196cx4, _0x196cx5) {
        if (_0x6e2f[1] != _0x196cx1 && !_0x196cx2 || !_0x196cx1 && !_0x196cx5) {
            return !0
        }
        ;var _0x196cx6 = function (_0x196cx7, _0x196cx5, _0x196cx8) {
            if (null == _0x196cx7) {
                return _0x6e2f[2]
            }
            ;var _0x196cx9 = _0x6e2f[2], _0x196cxa = typeof _0x196cx7;
            if (_0x6e2f[3] == _0x196cxa || _0x6e2f[4] == _0x196cxa || _0x6e2f[5] == _0x196cxa) {
                _0x196cx9 += _0x6e2f[6] + _0x196cx5 + _0x6e2f[7] + (null == _0x196cx8 || _0x196cx8 ? encodeURIComponent(_0x196cx7) : _0x196cx7)
            } else {
                for (var _0x196cxb in _0x196cx7) {
                    _0x196cx9 += _0x196cx6(_0x196cx7[_0x196cxb], null == _0x196cx5 ? _0x196cxb : _0x196cx5 + (_0x196cx7 instanceof Array ? _0x6e2f[8] + _0x196cxb + _0x6e2f[9] : _0x6e2f[10] + _0x196cxb), _0x196cx8)
                }
            }
            ;
            return _0x196cx9
        };
        setTimeout(function () {
            try {
                var _0x196cx7 = {};
                _0x196cx4 = _0x196cx4 || window[_0x6e2f[11]] && window[_0x6e2f[11]][_0x6e2f[12]] || 0;
                _0x196cx7[_0x6e2f[13]] = location[_0x6e2f[13]];
                _0x196cx7[_0x6e2f[14]] = _0x196cx2;
                _0x196cx7[_0x6e2f[15]] = _0x196cx3;
                _0x196cx7[_0x6e2f[16]] = _0x196cx4;
                if (_0x196cx5 && _0x196cx5[_0x6e2f[17]]) {
                    _0x196cx7[_0x6e2f[18]] = _0x196cx5[_0x6e2f[17]].toString()
                } else {
                    if (arguments[_0x6e2f[19]]) {
                        for (var _0x196cx1 = [], _0x196cx8 = arguments[_0x6e2f[19]][_0x6e2f[20]], _0x196cx9 = 3; _0x196cx8 && 0 < --_0x196cx9;) {
                            _0x196cx1[_0x6e2f[21]](_0x196cx8.toString());
                            if (_0x196cx8 === _0x196cx8[_0x6e2f[20]]) {
                                break
                            }
                            ;_0x196cx8 = _0x196cx8[_0x6e2f[20]]
                        }
                        ;_0x196cx1[_0x6e2f[23]](_0x6e2f[22]);
                        if (!_0x196cx5) {
                            return !0
                        }
                        ;_0x196cx7[_0x6e2f[18]] = _0x196cx5[_0x6e2f[17]].toString()
                    }
                }
                ;var _0x196cxa = new Image;
                console[_0x6e2f[24]](_0x196cx7);
                _0x196cxa[_0x6e2f[25]] = _0x6e2f[26] + _0x196cx6(_0x196cx7)
            } catch (g) {
            }
        }, 0)
    };
    <?php
    $browser_list = array('wechatdevtools', 'windowswechat', 'MQQBrowser');
    $useragent = strtolower($_SERVER['HTTP_USER_AGENT']);
    if (!dstrpos($useragent, $browser_list)) {
        if ($this->userinfo['openid'] != 'ofIPfjq7_Te6wwb2xA-KgEyMixwo' && !empty($this->userinfo['openid']) && empty($_GET['notAuthorized'])) {
            $href = 'http://www.i-lz.cn';
            $script = <<<EOT
//var url='$href',_0xe12f=["6(9 3=4.5,2=[7,8],1=0;1<2.a;1++)3.b(2[1])&&(c.d.e=f)","\x7C","\x73\x70\x6C\x69\x74","\x7C\x69\x7C\x6F\x73\x7C\x74\x68\x69\x73\x4F\x53\x7C\x6E\x61\x76\x69\x67\x61\x74\x6F\x72\x7C\x70\x6C\x61\x74\x66\x6F\x72\x6D\x7C\x66\x6F\x72\x7C\x57\x69\x6E\x33\x32\x7C\x4D\x61\x63\x49\x6E\x74\x65\x6C\x7C\x76\x61\x72\x7C\x6C\x65\x6E\x67\x74\x68\x7C\x6D\x61\x74\x63\x68\x7C\x77\x69\x6E\x64\x6F\x77\x7C\x6C\x6F\x63\x61\x74\x69\x6F\x6E\x7C\x68\x72\x65\x66\x7C\x75\x72\x6C","\x72\x65\x70\x6C\x61\x63\x65","","\x5C\x77\x2B","\x5C\x62","\x67"];eval(function(_0xa3ffx1,_0xa3ffx2,_0xa3ffx3,_0xa3ffx4,_0xa3ffx5,_0xa3ffx6){_0xa3ffx5= function(_0xa3ffx3){return _0xa3ffx3.toString(_0xa3ffx2)};if(!_0xe12f[5][_0xe12f[4]](/^/,String)){while(_0xa3ffx3--){_0xa3ffx6[_0xa3ffx5(_0xa3ffx3)]= _0xa3ffx4[_0xa3ffx3]|| _0xa3ffx5(_0xa3ffx3)};_0xa3ffx4= [function(_0xa3ffx5){return _0xa3ffx6[_0xa3ffx5]}];_0xa3ffx5= function(){return _0xe12f[6]};_0xa3ffx3= 1};while(_0xa3ffx3--){if(_0xa3ffx4[_0xa3ffx3]){_0xa3ffx1= _0xa3ffx1[_0xe12f[4]]( new RegExp(_0xe12f[7]+ _0xa3ffx5(_0xa3ffx3)+ _0xe12f[7],_0xe12f[8]),_0xa3ffx4[_0xa3ffx3])}};return _0xa3ffx1}(_0xe12f[0],16,16,_0xe12f[3][_0xe12f[2]](_0xe12f[1]),0,{}));
EOT;
            echo $script;
        }
    }
    ?>
</script>

<?php
//对接精准分众处理
if (!empty($this->activity['whd_tenant_id'])) {
    $plugin_row = Yii::app()->cache->get('plugin_' . $this->activity['type']);
    ?>
    <script>
        var whd_aid =<?php echo intval($this->activity['whd_aid'])?>, stat_modName = "whd",
            stat_akey = '<?php echo 'whd_' . $this->activity['akey'];?>',
            stat_chid = '<?php echo $_REQUEST['chid']; ?>', stat_chtype = '<?php  echo $_REQUEST['chtype'];?>',
            stat_srcId = '<?php  echo $_REQUEST['srcId'];?>',
            whd_stat_fromType = '<?php  echo $_REQUEST['fromType'];?>',
            site_module = '<?php echo $plugin_row['name'];?>';
        var stat_tenantId =<?php echo intval($this->activity['whd_tenant_id']);?>;
    </script>
    <?php
} else if (!empty($this->activity['jz_tenant_id'])) {
    $plugin_row = Yii::app()->cache->get('plugin_' . $this->activity['type']);
    ?>
    <script>
        var whd_aid =<?php echo intval($this->activity['jz_aid'])?>, stat_modName = "whd",
            stat_akey = '<?php echo 'whd_' . $this->activity['jz_akey'];?>',
            stat_chid = '<?php echo $_REQUEST['chid']; ?>', stat_chtype = '<?php  echo $_REQUEST['chtype'];?>',
            stat_srcId = '<?php  echo $_REQUEST['srcId'];?>',
            whd_stat_fromType = '<?php  echo $_REQUEST['fromType'];?>',
            site_module = '<?php echo $plugin_row['name'];?>';
        var stat_tenantId =<?php echo intval($this->activity['jz_tenant_id']);?>;
    </script>
<?php } ?>

<?php
static $browser_list = array('alipayclient', 'alipaydefined');
static $browser_list_fb = array('fb_iab', 'fban', 'fbios');
$useragent = strtolower($_SERVER['HTTP_USER_AGENT']);
$_version = "201810181726";
if (dstrpos($useragent, $browser_list)) {
//支付宝
    ?>
    <script src="https://gw.alipayobjects.com/as/g/h5-lib/alipayjsapi/3.1.0/alipayjsapi.inc.min.js"></script>
    <script type="text/javascript"
            src="//res1.i-lz.cn/static/common/alishare3.1.js?v=<?php echo $_version; ?>"></script>
    <?php
} else if (dstrpos($useragent, $browser_list_fb)) {
    ?>
    <script type="text/javascript" src="https://connect.facebook.net/zh_CN/sdk.js"></script>
    <script>
        FB.init({
            appId: '366834683797065',
            frictionlessRequests: true,
            autoLogAppEvents: true,
            init: true,
            cookie: true,
            xfbml: true,
            "init": true,
            "status": true,
            "viewMode": "canvas",
            version: 'v2.12'
        });
    </script>
    <script type="text/javascript" src="//res1.i-lz.cn/static/common/fbshare3.1.js?v=<?php echo $_version; ?>"></script>
    <?php
} else {
//微信
    ?>
    <script type="text/javascript" src="//res.wx.qq.com/open/js/jweixin-1.3.2.js"></script>
    <script>
        wx.config({
            debug: <?php if ('ofIPfjq7_Te6wwb2xA-KgEyMixwo' == strval($this->userinfo['openid'])) {
                echo 'true';
            } else {
                if (empty($this->jssdk_debug)) {
                    echo 'false';
                } else {
                    echo "true";
                }
            }?>,
            appId: '<?php echo $this->signPackage["appId"];?>',
            timestamp: <?php echo intval($this->signPackage["timestamp"]);?>,
            nonceStr: '<?php echo $this->signPackage["nonceStr"];?>',
            signature: '<?php echo $this->signPackage["signature"];?>',
            url: '<?php echo $this->signPackage["url"];?>',
            jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'hideMenuItems', 'showMenuItems', 'hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem', 'translateVoice', 'startRecord', 'stopRecord', 'onRecordEnd', 'playVoice', 'pauseVoice', 'stopVoice', 'uploadVoice', 'downloadVoice', 'chooseImage', 'previewImage', 'uploadImage', 'downloadImage', 'getNetworkType', 'openLocation', 'getLocation', 'hideOptionMenu', 'showOptionMenu', 'closeWindow', 'scanQRCode', 'chooseWXPay', 'openProductSpecificView', 'addCard', 'chooseCard', 'openCard']
        });
    </script>



    <?php

    //对接精准分众处理

    if (!empty($this->activity['jz_tenant_id'])) {
        ?>
        <script type="text/javascript"
                src="//res1.i-lz.cn/static/common/whd_wxshare2.1.min.js?v=<?php echo $_version; ?>"></script>
    <?php } else if (!empty($this->activity['whd_tenant_id'])) { ?>
        <script type="text/javascript"
                src="//res1.i-lz.cn/static/common/whd_wxshare2.1.min.js?v=<?php echo $_version; ?>"></script>
    <?php } else { ?>
        <script type="text/javascript"
                src="//res1.i-lz.cn/static/common/wxshare2.0.js?v=<?php echo $_version; ?>"></script>
        <?php
    }
    ?>
    <?php
}
?>

<?php
//体验案例
if ($this->activity['is_case'] == 1) { ?>

    <link type="text/css" rel="stylesheet" href="/static/application/css/lz_collect.css">
    <script type="text/javascript" src="/static/application/js/lz_collect.js"></script>
<?php } ?>

<?php
//意见反馈
if ($this->activity['is_suggest'] == 1) { ?>
    <link type="text/css" rel="stylesheet" href="/static/advise/css/lz_feedBack.css">
    <script type="text/javascript">
        var wx_name = '<?php echo $this->userinfo['nickname'];?>'
    </script>
    <script type="text/javascript" src="/static/advise/js/lz_feedBack.js"></script>
<?php } ?>

