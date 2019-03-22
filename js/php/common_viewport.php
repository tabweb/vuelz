<!-- 适配方案-->
<meta name="viewport" content="user-scalable=no">
<meta id="eqMobileViewport" name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
<script>
    function tr_setViewport(w) {
        var scale = parseInt(window.screen.width) / w,
            a = /Android (\d+\.\d+)/.test(navigator.userAgent) ? 2.3 >= parseFloat(RegExp.$1) ? "width=" + w + ", target-densitydpi=device-dpi" : "width=" + w + ", minimum-scale = " + scale + ", maximum-scale = " + scale + ", target-densitydpi=device-dpi" : "width=" + w + ", user-scalable=no, target-densitydpi=device-dpi";
        document.getElementById('eqMobileViewport').setAttribute("content", a);
    }

    function tr_appResize() {
        tr_setViewport(640);
        setTimeout(function () {
            tr_setViewport(638);
            setTimeout(function () {
                tr_setViewport(640);
            }, 100);
        }, 100);
    }


    tr_setViewport(640);
    //		window.addEventListener('resize', resize, false);
    window.addEventListener('orientationchange', tr_appResize, false);
    var ready = function (callback) {
        var readyRE = /complete|loaded|interactive/;
        if (readyRE.test(document.readyState)) callback();
        else document.addEventListener('DOMContentLoaded', function () {
            callback()
        }, false)
    };

    ready(function () {
        var u = navigator.userAgent;
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        console.log($("input,select,textarea"), 2);
        if (isIOS) {
            var innerHeight = window.innerHeight;
            $("input,select,textarea").on("blur", function () {
                resetView(this)
            });

            function resetView(target) {
                // tr_setViewport(639);
                setTimeout(function () {
                    // tr_setViewport(640);
                    // target.scrollIntoView(false);
                    // window.scrollTo(0, 0);
                    // window.innerHeight = window.outerHeight = innerHeight;
                    document.activeElement.scrollIntoViewIfNeeded(true)
                }, 100);
            }
        }
    })


</script>