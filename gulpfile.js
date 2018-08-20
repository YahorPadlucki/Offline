var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('default', function() {

    var JS_SOURCES = [
        'src/main.js',
        'src/player.js'
    ];

    return gulp.src(JS_SOURCES)
        .pipe(concat('main.js'))
        // .pipe(uglify())
        .pipe(gulp.dest(`${__dirname}/dist`));


});