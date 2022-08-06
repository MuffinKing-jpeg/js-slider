// eslint-disable-next-line no-unused-vars
const allControls = true;

// eslint-disable-next-line no-unused-vars, no-undef
class AllControls extends Slider {
  _setListener() {
    super._setListener();
    this.container.addEventListener('touchstart', this._swipeStart.bind(this));
    this.container.addEventListener('touchend', this._swipeEnd.bind(this));
    document.addEventListener('keydown', this._pressKey.bind(this));
    console.log('Added keys and touch control');
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
  _pressKey(e) {
    if (e.code === this.CODE_LEFT_ARROW) {
      this.prev();
      this.pause();
    }
    if (e.code === this.CODE_RIGHT_ARROW) {
      this.next();
      this.pause();
    }
    if (e.code === this.CODE_SPACE) this.isPlaying ? this.pause() : this.play();
  }
}
