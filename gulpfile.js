/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
const { task, series, parallel, src, dest, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync');
const postcss = require('gulp-postcss');
const csscomb = require('gulp-csscomb');
const autoprefixer = require('autoprefixer');
const mqpacker = require('css-mqpacker');
const sortCSSmq = require('sort-css-media-queries');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

const PATH = {
  scssFolder: './assets/scss/',
  scssFiles: './assets/scss/**/*.scss',
  scssFile: './assets/scss/style.scss',
  cssFolder: './assets/css/',
  cssFiles: './assets/css/*.css',
  cssFile: './assets/css/style.css',
  htmlFiles: './*.html',
  jsFiles: './assets/js/**/*.js',
  sliderFile: './assets/scss/slider.scss',
  buildFolder: './muffin-slider/',
};

const PLUGINS = [
  autoprefixer({
    overrideBrowserslist: [
      'last 5 versions',
      '> 0.1%',
    ],
    cascade: true,
  }),
  mqpacker({ sort: sortCSSmq }),
];

function scss() {
  return src(PATH.scssFile).
    pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError)).
    pipe(postcss(PLUGINS)).
    pipe(dest(PATH.cssFolder)).
    pipe(browserSync.stream());
}

function scssSlider() {
  return src(PATH.sliderFile).
    pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError)).
    pipe(postcss(PLUGINS)).
    pipe(dest(PATH.cssFolder)).
    pipe(browserSync.stream());
}


function scssDev() {
  return src(PATH.scssFile, { sourcemaps: true }).
    pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError)).
    pipe(postcss(PLUGINS)).
    pipe(dest(PATH.cssFolder, { sourcemaps: true })).
    pipe(browserSync.stream());
}

function comb() {
  return src(PATH.scssFiles).
    pipe(csscomb()).
    pipe(dest(PATH.scssFolder));
}

function syncInit() {
  browserSync({
    server: { baseDir: './' },
    notify: false,
  });
}
function polyBuild() {
  return src(PATH.jsFiles)
    .pipe(babel({
      presets: [
        [
          '@babel/preset-env',
          {
            loose: true,
            modules: false,
            browserslistEnv: '> 0.25% not dead',
          },
        ],
      ],
    }))
    .pipe(uglify())
    .pipe(dest(PATH.buildFolder));
}

function cssBuild() {
  return src(PATH.sliderFile).
    pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError)).
    pipe(postcss(PLUGINS)).
    pipe(dest(PATH.buildFolder));
}

async function sync() {
  browserSync.reload();
}

function watchFiles() {
  syncInit();
  watch(PATH.scssFiles, parallel(scss, scssSlider));
  watch(PATH.htmlFiles, sync);
  watch(PATH.jsFiles, sync);
  // watch(PATH.cssFiles, sync);
}

task('comb', series(comb));
task('scss', series(scss));
task('dev', series(scssDev));
task('watch', watchFiles);
task('build', parallel(polyBuild, cssBuild));
