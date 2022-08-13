const gulp = require('gulp'),
  concat = require('gulp-concat'),
  cssprefix = require('gulp-autoprefixer'),
  browserSync = require('browser-sync').create();
const { series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
// Process `scss` files to `css` and autoprefix them
function style() {
  return gulp
    .src('./assets/css/scss/**/*.scss')
    .pipe(
      sass().on('error', (err) => {
        console.log(
          `Error: ${err.message} on line: ${err.lineNumber} in: ${err.fileName}`,
        );
      }),
    )
    .pipe(
      cssprefix('last 2 versions').on('error', (err) => {
        console.log(
          `Error: ${err.message} on line: ${err.lineNumber} in: ${err.fileName}`,
        );
      }),
    )
    .pipe(sass.sync({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(gulp.dest('./dist/css/'))
    .pipe(browserSync.stream());
}

//Concat `js` files to `main.js` file
function concatMain() {
  return gulp
    .src(['./assets/js/**/*.js'])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./dist/js')) //Prevents infinite loop by excluding the processed `main.js` file
    .pipe(browserSync.stream());
}

exports.style = style;
exports.concatMain = concatMain;

// Watch all the files for changes and stream/reload for changes
function watch() {
  browserSync.init({
    server: {
      baseDir: './',
    },
  });
  gulp.watch('./assets/css/**/*.scss', style);
  gulp.watch('./assets/js/**/*.js', concatMain);
  gulp.watch('./assets/js/**/*.js').on('change', browserSync.reload);
  gulp.watch('./assets/css/**/*.scss').on('change', browserSync.reload);
  gulp.watch('./**/*.html').on('change', browserSync.reload);
}
exports.watch = watch;
exports.default = series(parallel(style, concatMain), watch);
