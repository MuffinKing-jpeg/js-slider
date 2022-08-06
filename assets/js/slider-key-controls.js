// eslint-disable-next-line no-unused-vars
const initKeys = true;


// eslint-disable-next-line no-undef, no-unused-vars
class KeyControls extends Slider {
  _setListener() {
    super._setListener();
    document.addEventListener('keydown', this._pressKey.bind(this));
    console.log('Added keys control');
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
