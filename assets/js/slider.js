// export default class Slider {
// eslint-disable-next-line no-unused-vars
class Slider {
  slidesConstructor() {
    if (this.slides === 'error') {
      const errIco = document.createElement('div');
      errIco.classList.add('error-ico');
      errIco.innerHTML = this.errSvg + 'No images';
      this.controls = false;
      this.indicators = false;
      return errIco;
    }
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

      slideImg.setAttribute('src', `${this.imgPath}${this.slides[i]}`);
      slideImg.setAttribute('alt', `${this.slides[i]}`);

      slideImg.classList.add('slide__img');
      i === 0 ?
        slide.classList.add('slide', 'active') :
        slide.classList.add('slide');

      slide.appendChild(slideImg);
      slidesContainer.appendChild(slide);
    }
    return slidesContainer;
  }

  controlsConstructor() {
    const controlsContainer = document.createElement('div');
    controlsContainer.classList.add('controls');
    for (let i = 0; i < 3; i++) {
      const controlItem = document.createElement('div');
      const controlIcon = document.createElement('i');
      const defItemClass = 'controls__item';
      const defIconClass = 'fas';

      switch (i) {
        case 0:
          controlItem.classList.add(defItemClass, 'controls__prev');
          controlIcon.classList.add(defIconClass, 'fa-chevron-left');
          break;
        case 1:
          controlItem.classList.add(defItemClass, 'controls__pause');
          controlIcon.classList.add(defIconClass, 'fa-play');
          break;
        case 2:
          controlItem.classList.add(defItemClass, 'controls__next');
          controlIcon.classList.add(defIconClass, 'fa-chevron-right');
          break;
      }
      controlItem.appendChild(controlIcon);
      controlsContainer.appendChild(controlItem);
    }

    return controlsContainer;
  }

  indicatorsConstructor() {
    const indicatorsContainer = document.createElement('div');
    indicatorsContainer.classList.add('indicators');

    for (let i = 0; i < this.slides.length; i++) {
      const indicator = document.createElement('div');
      indicator.classList.add('indicator');
    }

    return indicatorsContainer;
  }

  appendParts() {
    const container = document
      .querySelector(this.parentSelector);

    container.appendChild(this.slidesConstructor());
    if (this.controls) container.appendChild(this.controlsConstructor());
    if (this.indicators) container.appendChild(this.indicatorsConstructor());
  }

  appendStyle() {
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

  constructor(p) {
    this.errSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 
    256-256S397.4 0 256 0zM232 152C232 138.8 242.8 128 256 128s24 
    10.75 24 24v128c0 13.25-10.75 24-24 24S232 293.3 232 280V152zM256 
    400c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 
    31.44-31.44s31.44 14.08 31.44 31.44C287.4 385.9 273.4 400 256 400z"/>
    </svg>`;


    this.parentSelector = p.parentSelector ? p.parentSelector : '#slider';
    this.imgPath = p.imgPath ? p.imgPath : './assets/img/';
    this.stylePath = p.stylePath ? p.stylePath : './assets/css/slider.css';
    this.controls = typeof p.controls === 'boolean' ?
      p.controls : true;
    this.indicators = typeof p.indicators === 'boolean' ?
      p.indicators : true;
    this.slides = p.slides &&
      Array.isArray(p.slides) &&
      p.slides[0] ?
      p.slides : 'error';
    this.firstSlide = typeof p.firstSlide === 'number' &&
      p.firstSlide <= this.slides ?
      p.firstSlide : 1;
    // this.appendStyle();
    this.appendParts();
    console.log();
  }
}
