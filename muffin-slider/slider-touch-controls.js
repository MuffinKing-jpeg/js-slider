function _inheritsLoose(t,e){t.prototype=Object.create(e.prototype),_setPrototypeOf(t.prototype.constructor=t,e)}function _setPrototypeOf(t,e){return(_setPrototypeOf=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t})(t,e)}var initTouch=!0,TouchControls=function(t){function e(){return t.apply(this,arguments)||this}_inheritsLoose(e,t);var i=e.prototype;return i._setListener=function(){t.prototype._setListener.call(this),this.container.addEventListener("touchstart",this._swipeStart.bind(this)),this.container.addEventListener("touchend",this._swipeEnd.bind(this)),console.log("Added touch control")},i._swipeStart=function(t){this.swipeStartX=t.changedTouches[0].pageX},i._swipeEnd=function(t){this.swipeEndX=t.changedTouches[0].pageX,this.swipeStartX-this.swipeEndX<-70&&(this.prev(),this.pause()),70<this.swipeStartX-this.swipeEndX&&(this.next(),this.pause())},e}(Slider);