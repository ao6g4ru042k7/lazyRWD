function screenScale() {
    var resizeEvt = "orientationchange" in window ? "orientationchange" : "resize";
    var dom = {
        docRoot: document.documentElement,
    };
    var recalc;
    function _recalc(needWidth) {
        return function () {
            var clientWidth = dom.docRoot.clientWidth;
            if (clientWidth <= needWidth) {
                dom.docRoot.style.transform = "scale(" + clientWidth / needWidth + ")";
            } else {
                dom.docRoot.style.transform = "scale(1)";
            }
        };
    }
    return {
        init: function (needWidth) {
            if (recalc) {
                window.removeEventListener(resizeEvt, recalc);
            } else {
                dom.docRoot.style.transformOrigin = "0px 0px";
            }
            recalc = _recalc(needWidth);
            window.addEventListener(resizeEvt, recalc, false);
            recalc();
        },
        clear: function () {
            dom.docRoot.style.transformOrigin = null;
            dom.docRoot.style.transform = null;
            window.removeEventListener(resizeEvt, recalc);
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
    var resizeEvt = "orientationchange" in window ? "orientationchange" : "resize";
    var dom = {
        docRoot: document.documentElement,
    };
    var recalc;
    function _recalc(need) {
        return function () {
            var clientWidth = dom.docRoot.clientWidth;
            if (need.isBigger || clientWidth <= need.width) {
                dom.docRoot.style.fontSize = (clientWidth / need.width) * need.rem + "px";
            } else {
                dom.docRoot.style.fontSize = need.rem + "px";
            }
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
            dom.docRoot.style.fontSize = null;
            window.removeEventListener(resizeEvt, recalc);
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
