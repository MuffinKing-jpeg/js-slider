# Usage guide

[*Demo page*](https://muffinking-jpeg.github.io/js-slider/)

## Instalation

**Using `Fontawesome`*
Put in head document this:

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
        crossorigin="anonymous" referrerpolicy="no-referrer" />
<script src="https://raw.githubusercontent.com/MuffinKing-jpeg/js-slider/master/muffin-slider/slider.js" defer></script>
```

In case if you want to use touch or keyboard controls add few more rows:

Keyboard control:

```html
<script src="https://raw.githubusercontent.com/MuffinKing-jpeg/js-slider/master/muffin-slider/slider-key-controls.js" defer></script>
```

Touch controls:

```html
<script src="https://raw.githubusercontent.com/MuffinKing-jpeg/js-slider/master/muffin-slider/slider-touch-controls.js" defer></script>
```

I can't figure out how to make it working just with adding two files , so...
Or both:

```html
<script src="https://raw.githubusercontent.com/MuffinKing-jpeg/js-slider/master/muffin-slider/slider-all-controls.js" defer></script>
```

Or you can install it localy by downloading folder `muffin-slider`.
Now make parrent container for your slider with id `#slider`.

```html
<div id="slider"></div>
```

## Initialization

Drop you images to `./assets/img/` (Path can be chaged)
Put in you `JavaScript` file

```js
initSlider({
    slides: [
        'array.gif',
        'of.webp',
        'image.png',
        'names.jpeg',
        
    ]
})
```

### You can specify more parametrs

* `slides` It's necessary. Must be an array of images names. If you put only one slide, it will works like a still image.
Value: `['array','of','strings']`  

* `imgPath` Path to images folder, useless if `absolutePath: true`.
Default: `./assets/img/`
Value: `'string'`

* `absolutePath` Changing images path to absolute. Using full path `https://picsum.photos/1920/1080` instead of local `./assets/img/`
Default: `false`
Values: `true || false`

* `parentSelector` CSS selector of your slider container
Default: `'#slider'`
Value: `'.css #selector'`

* `controls` Changing visibility of controls elements
Default: `true`
Values: `true || 'prev-next' || 'play-pause' || false`

* `indicators` Changing visibility of indicators elements
Default: `true`
Values: `true || false`

* `localStyle` Unlocks ability to use another path to style
Default: `false`
Values: `true || false`

* `stylePath` Path to style file. Useless if `localStyle: false`
Default: `'./assets/css/slider.css'`
Value: `'./path/to/your.css'`

* `firstSlide` Number of first displayed slide. Counting starts from 0!
Default: `0`
Value: `number`

* `interval` Time duration between slides in `ms`.
Default: `5000`
Value: `number`

* `isPlaying` Changes default state of slider. Paused or not.
Default: `true`
Values: `true || false`

* `inverse` ***LOOK AT ME, I\`M GOING BACKWARDS***
Defautl: `false`
Values: `true || false`

Example:

```js
initSlider({
    imgPath: './assets/slider/img/',
    absolutePath: false, 
    parentSelector: '.container', 
    controls: true,
    indicators: true,
    localStyle: false,
    stylePath: './assets/slider/css/slider.css'
    firstSlide: 0,
    interval: 5000,
    isPlaying: true,
    inverse: false,
    slides: [
        'img_car_in_chinatown.png',
        'img_car.png',
  ],
});
```
