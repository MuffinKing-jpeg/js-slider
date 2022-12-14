// eslint-disable-next-line no-unused-vars
const initTouch = true;

// eslint-disable-next-line no-unused-vars, no-undef
class TouchControls extends Slider {
  _setListener() {
    super._setListener();
    this.container.addEventListener('touchstart', this._swipeStart.bind(this));
    this.container.addEventListener('touchend', this._swipeEnd.bind(this));
    console.log('Added touch control');
  }

  _swipeStart(e) {
    this.swipeStartX = e.changedTouches[0].pageX;
  }

  _swipeEnd(e) {
    this.swipeEndX = e.changedTouches[0].pageX;
    if (this.swipeStartX - this.swipeEndX < -70) {
      this.prev();
      this.pause();
    }
    if (this.swipeStartX - this.swipeEndX > 70) {
      this.next();
      this.pause();
    }
  }
}
