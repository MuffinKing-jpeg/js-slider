/* eslint-disable no-undef */

// eslint-disable-next-line no-unused-vars
const initSlider = (p) => {
  if (typeof (allControls) === 'boolean' || (
    typeof (initKeys) === 'boolean' &&
    typeof (initTouch) === 'boolean' &&
    typeof (allControls) === 'boolean'
  )) new AllControls(p);
  if (typeof (initKeys) === 'boolean' &&
    typeof (initTouch) !== 'boolean' &&
    typeof (allControls) !== 'boolean') new KeyControls(p);
  if (typeof (initTouch) === 'boolean' &&
    typeof (initKeys) !== 'boolean' &&
    typeof (allControls) !== 'boolean') new TouchControls(p);
  if (typeof (initTouch) !== 'boolean' &&
    typeof (initKeys) !== 'boolean' &&
    typeof (allControls) !== 'boolean') new Slider(p);
};

// eslint-disable-next-line no-unused-vars
class Slider {
  constructor(p) {
    const settings = {
      ...{
        absolutePath: false,
        parentSelector: '#slider',
        imgPath: './assets/img/',
        controls: true,
        indicators: true,
        localStyle: false,
        stylePath: this.localStyle ? './assets/css/slider.css' :
          'https://raw.githubusercontent.com/MuffinKing-jpeg/js-slider/master/muffin-slider/slider.css',
        firstSlide: 0,
        interval: 5000,
        isPlaying: true,
        inverse: false,
      }, ...p,
    };

    this.INDICATORS_CLASS = '.indicators';
    this.CONTROLS_CLASS = '.controls';

    this.CODE_LEFT_ARROW = 'ArrowLeft';
    this.CODE_RIGHT_ARROW = 'ArrowRight';
    this.CODE_SPACE = 'Space';

    this.errSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 
    256-256S397.4 0 256 0zM232 152C232 138.8 242.8 128 256 128s24 
    10.75 24 24v128c0 13.25-10.75 24-24 24S232 293.3 232 280V152zM256 
    400c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 
    31.44-31.44s31.44 14.08 31.44 31.44C287.4 385.9 273.4 400 256 400z"/>
    </svg>`;

    const makeErr = (txt) => {
      const errMsg = new Error(txt);
      throw errMsg;
    };
    try {
      this.parentSelector = settings.parentSelector;
      this.imgPath = settings.imgPath; // './assets/img/';
      this.stylePath = settings.stylePath; // './assets/css/slider.css';
      this.controls = settings.controls;
      this.indicators = settings.indicators;
      this.isPlaying = settings.isPlaying;
      this.absolutePath = settings.absolutePath;
      this.inverse = settings.inverse;
      this.interval = settings.interval;
      this.slides = p.slides &&
        Array.isArray(p.slides) &&
        p.slides[0] ?
        p.slides : makeErr('No images');
      this.firstSlide = typeof p.firstSlide === 'number' &&
        p.firstSlide <= this.slides ?
        p.firstSlide : 1;
      0 >= settings.firstSlide <= settings.slides.length - 1 ?
        this.activeSlide = settings.firstSlide : this.firstSlide = 0;
      this.container = document.querySelector(this.parentSelector);
      this._appendStyle();
      this._appendParts();
      this._setListener();
      this._startTimer();
    } catch (err) {
      const body = document
        .querySelector('body');
      body.appendChild(this.errConstructor(err));
    }
    console.log(settings);
  }

  errConstructor(txt) {
    const errIco = document.createElement('div');
    errIco.classList.add('error-ico');
    errIco.innerHTML = this.errSvg + txt;
    this.controls = false;
    this.indicators = false;
    console.log(txt);
    return errIco;
  }

  slidesConstructor() {
    const slidesContainer = document.createElement('ul');
    slidesContainer.classList.add('slider__container');
    if (this.slides.length === 1) {
      this.controls = false;
      this.indicators = false;
      this.singleImg = true;
    }
    for (let i = 0; i < this.slides.length; i++) {
      const slide = document.createElement('li');
      const slideImg = document.createElement('img');
      const pos = -i * 100;

      slide.style.left = `${pos}%`;
      this.absolutePath === false ?
        slideImg.setAttribute('src', `${this.imgPath}${this.slides[i]}`) :
        slideImg.setAttribute('src', this.slides[i]);
      slideImg.setAttribute('alt', `${this.slides[i]}`);

      slideImg.classList.add('slide__img');
      i === this.activeSlide ?
        slide.classList.add('slide', 'slide--active') :
        slide.classList.add('slide');
      slide.id = `slide-${i}`;
      slide.appendChild(slideImg);
      slidesContainer.appendChild(slide);
    }
    return slidesContainer;
  }

  controlsConstructor() {
    const controlsContainer = document.createElement('div');
    controlsContainer.classList.add(this.CONTROLS_CLASS.replace('.', ''));
    for (let i = 0; i < 3; i++) {
      const controlItem = document.createElement('div');
      const controlIcon = document.createElement('i');
      const defItemClass = 'controls__item';
      const defIconClass = 'fas';

      switch (i) {
        case 0:
          if (this.controls === true || this.controls === 'prev-next') {
            controlItem.classList.add(defItemClass, 'controls--prev');
            controlIcon.classList.add(defIconClass, 'fa-chevron-left');
          }
          break;
        case 1:
          if (this.controls === true || this.controls === 'play-pause') {
            controlItem.classList.add(defItemClass, 'controls--pause');
            controlIcon.classList.add(defIconClass, `fa-${!this.isPlaying ?
              'play' : 'pause'}`);
            controlIcon.id = 'play-pause';
          }
          break;
        case 2:
          if (this.controls === true || this.controls === 'prev-next') {
            controlItem.classList.add(defItemClass, 'controls--next');
            controlIcon.classList.add(defIconClass, 'fa-chevron-right');
            break;
          }
      }
      controlItem.appendChild(controlIcon);
      controlsContainer.appendChild(controlItem);
    }
    return controlsContainer;
  }

  indicatorsConstructor() {
    const indicatorsContainer = document.createElement('div');
    indicatorsContainer.classList.add(this.INDICATORS_CLASS.replace('.', ''));

    for (let i = 0; i < this.slides.length; i++) {
      const indicator = document.createElement('div');

      indicator.classList.add('indicator');
      if (i === this.activeSlide) indicator.classList.add('indicator--active');
      indicator.id = `indicator-${i}`;
      indicatorsContainer.appendChild(indicator);
    }

    return indicatorsContainer;
  }

  _appendParts() {
    // this.appendStyle();
    this.container.appendChild(this.slidesConstructor());
    if (this.controls) {
      this.container.appendChild(this.controlsConstructor());
    }
    if (this.indicators) {
      this.container.appendChild(this.indicatorsConstructor());
    }
  }

  _appendStyle() {
    const head = document.querySelector('head');
    const styleContainer = document.createElement('style');

    fetch(this.stylePath)
      .then((res) => res.text())
      .then((data) => {
        styleContainer.innerHTML = data;
        head.appendChild(styleContainer);
      });
    document.querySelector(this.parentSelector).style = 'position: relative;';
  }

  _slidesSwitch(n) {
    const currentSlide = document.querySelector(
      `#slide-${this.activeSlide}`,
    );
    const newSlide = document.querySelector(
      `#slide-${n}`,
    );

    currentSlide.classList.remove('slide--active');
    newSlide.classList.add('slide--active');
    this.indicators === true ?
      this._indicatorSwitch(n, this.activeSlide) : null;
    this.activeSlide = n;
  }

  _indicatorSwitch(n, prev) {
    const currentIndicator = document.querySelector(
      `#indicator-${prev}`);
    const newIndicator = document.querySelector(
      `#indicator-${n}`,
    );
    currentIndicator.classList.remove('indicator--active');
    newIndicator.classList.add('indicator--active');
    this.activeSlide = n;
  }

  _indicatorsHandler(e) {
    const target = e.target;
    if (target.classList.contains('indicator')) {
      const num = +target.id.split('-')[1];
      this.pause();
      this._slidesSwitch(num);
    }
  }

  _startTimer() {
    this.timer = setInterval(() => {
      if (this.isPlaying) this.inverse ? this.prev() : this.next();
    }, this.interval);
  }

  _stopTimer() {
    clearInterval(this.timer);
  }

  pause() {
    this._stopTimer();
    this.isPlaying = false;

    if (this.controls === true || this.controls === 'play-pause') {
      const controlsClass = document.querySelector('#play-pause');
      controlsClass.classList.remove('fa-pause');
      controlsClass.classList.add('fa-play');
    }
  }

  play() {
    this._startTimer();
    this.isPlaying = true;
    if (this.controls === true || this.controls === 'play-pause') {
      const controlsClass = document.querySelector('#play-pause');
      controlsClass.classList.remove('fa-play');
      controlsClass.classList.add('fa-pause');
    }
  }

  prev() {
    const dir = this.activeSlide === 0 ?
      this.slides.length : this.activeSlide;
    this._slidesSwitch(dir - 1);
  }

  next() {
    const dir = this.activeSlide === this.slides.length - 1 ?
      0 : this.activeSlide + 1;
    this._slidesSwitch(dir);
  }

  _controlsHandler(e) {
    const target = e.target;
    if (target.classList.contains('controls--prev') ||
      target.offsetParent.classList.contains('controls--prev')) {
      this.prev();
      this.pause();
    }
    if (target.classList.contains('controls--next') ||
      target.offsetParent.classList.contains('controls--next')) {
      this.next();
      this.pause();
    }
    if (target.classList.contains('controls--pause') ||
      target.offsetParent.classList.contains('controls--pause')) {
      this.isPlaying === true ? this.pause() : this.play();
    }
  }

  _setListener() {
    if (this.indicators === true) {
      const indicatorsContainer = document.querySelector('div.indicators');
      indicatorsContainer.addEventListener(
        'click', this._indicatorsHandler.bind(this),
      );
    }
    if (this.controls !== false) {
      const indicatorsContainer = document.querySelector('div.controls');
      indicatorsContainer.addEventListener(
        'click', this._controlsHandler.bind(this),
      );
    }
  }
}
