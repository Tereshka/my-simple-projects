const { src, dest, parallel } = require('gulp');
const minifyCSS = require('gulp-csso');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');

function html() {
  return src('index.html')
    .pipe(dest('dist'))
}

function css() {
  return src('style/*.css')
    .pipe(minifyCSS())
    // .pipe(concat('app.min.css'))
    .pipe(dest('dist/style'))
}

function js() {
  return src('js/*.js', { sourcemaps: true })
    .pipe(uglify())
    // .pipe(concat('app.min.js'))
    .pipe(dest('dist/js', { sourcemaps: true }))
}

function images() {
  return src('img/*.+(png|jpg|gif|svg)')
  .pipe(imagemin())
  .pipe(dest('dist/img'))
}

function fonts() {
  return src('webfonts/**/*')
  .pipe(dest('dist/webfonts'));
}

exports.js = js;
exports.css = css;
exports.html = html;
exports.images = images;
exports.fonts = fonts;
exports.default = parallel(html, css, js, images, fonts);