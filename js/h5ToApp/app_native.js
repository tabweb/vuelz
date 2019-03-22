/**
 * https: //app.mixcapp.com/h5/config/native.js
 * Created by liumingjie16 on 2018/4/27.
 */

var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
//终端参数
var platform = '';
if (isAndroid) {
    platform = 'android';
} else if (isiOS) {
    platform = 'iOS';
}
var tokenCallback;
var getUrlDelegate, getTitleDelegate, getContentDelegate, getImgDelegate, getPlatformDelegate, getCallBack;
var getUserInfoCallBack, getLocationInfoCallBack,getIntervalLocationInfoCallBack;

//获取token接口
function getUserToken(callback) {
    //js开始执行
//获取token
    tokenCallback = callback;
    try {
        if (isAndroid) {
            //调用android的方法
            window.AndroidWebInterface.mixcAppGetUserInfo('token', 'getToken');
        } else if (isiOS) {
            //调用ios方法
            window.webkit.messageHandlers.mixcAppGetUserInfo.postMessage(null);
        } else {
            console.log('未知设备');
        }
    } catch (err) {
    }
}
/**
 * app获取到token后会回调getToken方法
 * @param token  用户token
 */
function getToken(token) {
    tokenCallback(token);
}

//弹出app登录页面
function gotoLogin() {
    try {
        if (isAndroid) {
            window.AndroidWebInterface.login();
        } else if (isiOS) {
            window.webkit.messageHandlers.login.postMessage(null);
        }
    } catch (err) {
    }
}

/**
 * 返回上一页面
 */
function close() {
    try {
        if (isAndroid) {
            window.AndroidWebInterface.backMixcHome();
        } else if (isiOS) {
            window.webkit.messageHandlers.onClose.postMessage(null);
        }
    } catch (err) {
    }
}

/**
 * 返回上一页面
 */
function gotoPrePage() {
    try {
        if (isAndroid) {
            window.AndroidWebInterface.onBack();
        } else if (isiOS) {
            window.webkit.messageHandlers.backMixcHome.postMessage(null);
        }
    } catch (err) {
    }
}

/**
 * 设置关闭按钮是否可见
 * @param visibility 1为可见，0为不可见
 */
function setCloseVisibility(visibility) {
    try {
        if (isAndroid) {
            window.AndroidWebInterface.setCloseVisibility(visibility);
        } else if (isiOS) {
            window.webkit.messageHandlers.setCloseVisibility.postMessage({visibility: visibility});
        }
    } catch (err) {
    }
}

function enterNewWebPage(url) {
    try {
        if (isAndroid) {
            window.AndroidWebInterface.enterNewWebPage(url);
        } else if (isiOS) {
            window.webkit.messageHandlers.enterNewWebPage.postMessage({url: url});
        }
    } catch (err) {
    }
}

/**
 * 网页中点击分享 非title分享按钮
 * @param getUrl 获取url js方法
 * @param getTitle  获取title js方法
 * @param getContent 获取content js方法
 * @param getImg 获取 图片js方法
 */
function onShareClick(getUrl, getTitle, getContent, getImg) {
    getUrlDelegate = getUrl;
    getTitleDelegate = getTitle;
    getContentDelegate = getContent;
    getImgDelegate = getImg;
    try {
        if (isAndroid) {
            AndroidWebInterface.onShareClick(getUrlDelegate(), getTitleDelegate(), getContentDelegate(), getImgDelegate());
        } else {
            window.webkit.messageHandlers.onShareClick.postMessage({
                shareUrl: getUrlDelegate(),
                shareTitle: getTitleDelegate(),
                shareImageUrl: getImgDelegate(),
                shareContent: getContentDelegate()
            });
        }
    } catch (err) {
    }
}

/**
 * title bar显示分享按钮
 * @param getUrl 获取url js方法
 * @param getTitle  获取title js方法
 * @param getContent 获取content js方法
 * @param getImg 获取 图片js方法
 */
function showShareButton(getUrl, getTitle, getContent, getImg) {
    getUrlDelegate = getUrl;
    getTitleDelegate = getTitle;
    getContentDelegate = getContent;
    getImgDelegate = getImg;
    if (isAndroid) {
        AndroidWebInterface.setShareContent(getUrlDelegate(), getTitleDelegate(), getContentDelegate(), getImgDelegate());
    } else if (isiOS) {
        window.webkit.messageHandlers.shareButtonShow.postMessage({show: true});
    } else {
        console.log('未知设备');
    }
}

/**
 * app title bar中分享按钮 ios调用方法
 */
function shareButtonClick() {
    window.webkit.messageHandlers.onShareClick.postMessage({
        shareUrl: getUrlDelegate(),
        shareTitle: getTitleDelegate(),
        shareImageUrl: getImgDelegate(),
        shareContent: getContentDelegate()
    });
}

/**
 * 指定平台分享
 * @param getUrl 获取url js方法
 * @param getTitle  获取title js方法
 * @param getContent 获取content js方法
 * @param getImg 获取 图片js方法
 * @param getPlatform 获取平台 js方法
 * @param callBack 分享成功后需要回调的js方法
 */
function onShareByPlatform(getUrl, getTitle, getContent, getImg, getPlatform, callBack) {
    getUrlDelegate = getUrl;
    getTitleDelegate = getTitle;
    getContentDelegate = getContent;
    getImgDelegate = getImg;
    getPlatformDelegate = getPlatform;
    getCallBack = callBack;
    if (isAndroid) {
        AndroidWebInterface.onShareByPlatform(getUrlDelegate(), getTitleDelegate(), getContentDelegate(), getImgDelegate(), getPlatformDelegate(), getCallBack);
    } else if (isiOS) {
        window.webkit.messageHandlers.onShareByPlatform.postMessage({
            url: getUrlDelegate(),
            shareTitle: getTitleDelegate(),
            imageUrl: getImgDelegate(),
            shareContent: getContentDelegate(),
            platform: getPlatformDelegate()
        });
    } else {
        console.log('未知设备');
    }
}

/**
 * 拨打电话
 * @param phoneNum  电话号码
 */
function callPhone(phoneNum) {
    if (isAndroid) {
        AndroidWebInterface.callPhone(phoneNum);
    } else {
        window.webkit.messageHandlers.callPhone.postMessage({phoneNumber: phoneNum});
    }
}

/**
 * 调起支付方法
 * @param orderNo  订单编号
 * @param payData 支付数据
 * @param payType  支付方式  支付宝3，微信4
 */
function pay(orderNo, payData, payType) {
    if (isAndroid) {
        AndroidWebInterface.requestPay(orderNo, payData, payType);
    } else {
        window.webkit.messageHandlers.requestPay.postMessage({
            orderNo: orderNo,
            payData: payData,
            payType: payType
        })
    }
}

/**
 * 跳到扫码页面  成功后会调js方法responseScan(result)
 */
function onScan() {
    if (isAndroid) {
        window.AndroidWebInterface.requestScan();
    } else if (isiOS) {
        window.webkit.messageHandlers.requestScan.postMessage(null);
    }
}

/**
 * 获取用户其他的数据信息
 */
function requestUserInfo(callback) {
    getUserInfoCallBack = callback;
    try {
        if (isAndroid) {
            window.AndroidWebInterface.requestUserInfo();
        } else if (isiOS) {
            window.webkit.messageHandlers.requestUserInfo.postMessage(null);
        }
    } catch (err) {
        alert(JSON.stringify(err))
    }
}

/**
 * 商品购买页面 优惠券选择页面 优惠券选择
 * @param mAmount  金额
 * @param coupons  优惠券信息
 */
function onCouponSelect(mAmount, coupons) {
    if (isAndroid) {
        AndroidWebInterface.onCouponSelect(mAmount, coupons);
    } else {
        window.webkit.messageHandlers.onCouponSelect.postMessage({mAmount: mAmount, coupons: coupons});
    }
}

/**
 * 获取已经选择的券
 */
function mixcAppGetCoupons() {
    if (isAndroid) {
        window.AndroidWebInterface.mixcAppGetCoupons();
    } else if (isiOS) {
        window.webkit.messageHandlers.mixcAppGetCoupons.postMessage(null);
    }
}

/**
 * 店铺买单
 * @param data 买单json格式数据
 *   activities;
 *  totalAmout;
 *  coupons;
 *  discountType;
 *  payType;
 *  merchantNo;
 *  mallCode;
 */
function onBookOrder(data) {
    if (isAndroid) {
        AndroidWebInterface.onBookOrder(data);
    } else {
        window.webkit.messageHandlers.onBookOrder.postMessage({json: data});
    }
}

/**
 * 店铺点击
 * @param shopJson 店铺数据信息
 */
function onShopClick(shopJson) {
    if (isAndroid) {
        AndroidWebInterface.onShopClick(shopJson);
    } else {
        window.webkit.messageHandlers.onShopClick.postMessage({shopJson: shopJson});
    }
}

/**
 * 公共区域点击错误提示
 * @param errorMsg  提示文案
 */
function onPublicClickError(errorMsg) {
    if (isAndroid) {
        AndroidWebInterface.onPublicClickError(errorMsg);
    } else {
        window.webkit.messageHandlers.onPublicClickError.postMessage({errorMsg: errorMsg});
    }
}

/**
 * 申请录音接口
 */
function goApplyRecordVoice() {
    if (isAndroid) {
        try {
            AndroidWebInterface.applyRecordVoice();
            showMessage("AndroidWebInterface.applyRecordVoice(); 调用成功");
        } catch (err) {
            showMessage("AndroidWebInterface.applyRecordVoice(); 调用失败");
        }
    } else if (isiOS) {
        try {
            window.webkit.messageHandlers.applyRecordVoice.postMessage(null);
            showMessage("window.webkit.messageHandlers.applyRecordVoice.postMessage(null); 调用成功");
        } catch (err) {
            showMessage("window.webkit.messageHandlers.applyRecordVoice.postMessage(null); 调用失败");
        }
    }

}

/**
 * 开始录音
 */
function goStartRecord() {
    if (isAndroid) {
        try {
            AndroidWebInterface.startRecord();

            showMessage("AndroidWebInterface.startRecord(); 调用成功");
        } catch (err) {
            showMessage("AndroidWebInterface.startRecord(); 调用失败");
        }
    } else if (isiOS) {
        try {
            window.webkit.messageHandlers.startRecord.postMessage(null);
            showMessage("window.webkit.messageHandlers.startRecord.postMessage(null); 调用成功");
        } catch (err) {
            showMessage("window.webkit.messageHandlers.startRecord.postMessage(null); 调用失败");
        }
    }
}

/**
 * 停止录音接口
 * @param activityId
 * @param postUrl
 */
function goStopRecord(activityId, postUrl) {
    if (isAndroid) {
        try {
            AndroidWebInterface.stopRecord(activityId, postUrl);

            showMessage("AndroidWebInterface.stopRecord(activityId, postUrl); 调用成功");
        } catch (err) {
            showMessage("AndroidWebInterface.stopRecord(activityId, postUrl); 调用失败");
        }
    } else if (isiOS) {
        try {
            window.webkit.messageHandlers.stopRecord.postMessage({"activityId": activityId, "postUrl": postUrl});
            showMessage("window.webkit.messageHandlers.stopRecord.postMessage({\"activityId\":activityId, \"postUrl\":postUrl}); 调用成功");
        } catch (err) {
            showMessage("window.webkit.messageHandlers.stopRecord.postMessage({\"activityId\":activityId, \"postUrl\":postUrl}); 调用失败");
        }
    }


}

function respondUserInfo(info) {
    getUserInfoCallBack(info)
}

function setTitleBarStatus(json) {
    try {
        if (isAndroid) {
            window.AndroidWebInterface.setTitleBarStatus(JSON.stringify(json));
        } else if (isiOS) {
            window.webkit.messageHandlers.setTitleBarStatus.postMessage(json);
        }
    } catch (err) {
    }
}

function requestLocationPOICoordinates(callback) {
    getLocationInfoCallBack = callback;
    try {
        if (isAndroid) {
            window.AndroidWebInterface.requestLocationPOICoordinates();
        } else if (isiOS) {
            window.webkit.messageHandlers.requestLocationPOICoordinates.postMessage(null);
        }
    } catch (err) {
    }
}

function respondLocationPOICoordinates(status, json) {
    getLocationInfoCallBack(status, json)
}

function requestIntervalLocationPOICoordinates(callback) {
    getIntervalLocationInfoCallBack = callback;
    try {
        if (isAndroid) {
            window.AndroidWebInterface.requestIntervalLocationPOICoordinates();
        } else if (isiOS) {
            window.webkit.messageHandlers.requestIntervalLocationPOICoordinates.postMessage(null);
        }
    } catch (err) {
    }
}

function respondIntervalLocationPOICoordinates(status, json) {
    getIntervalLocationInfoCallBack(status, json)
}

function mixcMallExit(){
    try {
        if (isAndroid) {
            window.AndroidWebInterface.mixcMallExit();
        } else if (isiOS) {
            window.webkit.messageHandlers.mixcMallExit.postMessage(null);
        }
    } catch (err) {
    }
}


function setStatusBarStyleDefault(json) {
    try {
        if (isAndroid) {
            window.AndroidWebInterface.setStatusBarStyleDefault(JSON.stringify(json));
        } else if (isiOS) {
            window.webkit.messageHandlers.setStatusBarStyleDefault.postMessage(json);
        }
    } catch (err) {
    }
}