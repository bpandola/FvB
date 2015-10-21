/* requestAnimationFrame polyfill */
(function () {

    window.requestAnimFrame = (function () {
        return window.requestAnimationFrame
			|| window.webkitRequestAnimationFrame
			|| window.mozRequestAnimationFrame
			|| window.oRequestAnimationFrame
			|| window.msRequestAnimationFrame
			|| function (callback) {
			    window.setTimeout(callback, 1000 / 60);
			};
    })();

    window.cancelRequestAnimFrame = (function () {
        return window.cancelRequestAnimationFrame
			|| window.webkitCancelRequestAnimationFrame
			|| window.mozCancelRequestAnimationFrame
			|| window.oCancelRequestAnimationFrame
			|| window.msCancelRequestAnimationFrame
			|| window.clearTimeout;
    })();

})();