var gulp = require('gulp');
var concat = require('gulp-concat');
const minifyJS = require('gulp-terser');
const zip = require('gulp-zip');

gulp.task('default', function () {

    return gulp.src('src/*.js')
        .pipe(concat('main.js'))
        .pipe(minifyJS())
        .pipe(gulp.dest(`${__dirname}/dist`));

});

gulp.task('zip', function () {

    return gulp.src(`${__dirname}/dist/**`)
        .pipe(zip('game.zip'))
        .pipe(gulp.dest('zip'))
});