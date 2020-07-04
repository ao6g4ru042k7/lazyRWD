function screenScale() {
    var resizeEvt =
        "orientationchange" in window ? "orientationchange" : "resize";
    var dom = {
        docRoot: document.body,
    };
    var recalc;
    function isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows CE|iPod|Windows Phone|Symbian|Linux/i.test(
            navigator.userAgent
        );
    }
    function _recalc(needWidth) {
        var clientWidth;
        function __recalc() {
            if (clientWidth <= needWidth) {
                dom.docRoot.style.transform = "scale(" + clientWidth / needWidth + ")";
            } else {
                dom.docRoot.style.transform = "scale(1)";

            }
        }
        return isMobile()
            ? function () {
                clientWidth = window.screen.width;
                __recalc();
            }
            : function () {
                clientWidth = window.innerWidth;
                __recalc();
            };
    }

    return {
        init: function (needWidth) {
            if (recalc) {
                window.removeEventListener(resizeEvt, recalc);
            } else {
                dom.docRoot.style.transformOrigin = "0px 0px";
                dom.docRoot.style.margin = "0px auto";
                dom.docRoot.style.width = needWidth + "px";
            }
            recalc = _recalc(needWidth);
            window.addEventListener(resizeEvt, recalc, false);
            recalc();
        },
        clear: function () {
            window.removeEventListener(resizeEvt, recalc);
            dom.docRoot.style.transformOrigin = null;
            dom.docRoot.style.margin = null;
            dom.docRoot.style.width = null;
            recalc = null;
        },
        start: function () {
            window.addEventListener(resizeEvt, recalc, false);
        },
        stop: function () {
            window.removeEventListener(resizeEvt, recalc);
        },
    };
}

function screenRem() {
    var resizeEvt =
        "orientationchange" in window ? "orientationchange" : "resize";
    var dom = {
        docRoot: document.documentElement,
    };
    var recalc;
    function isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows CE|iPod|Windows Phone|Symbian|Linux/i.test(
            navigator.userAgent
        );
    }
    function _recalc(need) {
        var clientWidth;
        function __recalc() {
            if (need.isBigger || clientWidth <= need.width) {
                dom.docRoot.style.fontSize =
                    (clientWidth / need.width) * need.rem + "px";
            } else {
                dom.docRoot.style.fontSize = need.rem + "px";
            }
        }
        return isMobile()
            ? function () {
                clientWidth = window.screen.width;
                __recalc();
            }
            : function () {
                clientWidth = window.innerWidth;
                __recalc();
            };
    }

    return {
        init: function (need) {
            if (recalc) {
                window.removeEventListener(resizeEvt, recalc);
            }
            recalc = _recalc(need);
            window.addEventListener(resizeEvt, recalc, false);
            recalc();
        },
        clear: function () {
            window.removeEventListener(resizeEvt, recalc);
            dom.docRoot.style.fontSize = null;
            recalc = null;
        },
        start: function () {
            window.addEventListener(resizeEvt, recalc, false);
        },
        stop: function () {
            window.removeEventListener(resizeEvt, recalc);
        },
    };
}
