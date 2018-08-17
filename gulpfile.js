var config = require('./gulp.config')();

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    zip = require('gulp-zip'),
    size = require('gulp-size'),
    inject = require('gulp-inject'),
    del = require('del'),
    browserSync = require('browser-sync').create();

gulp.task('clean', clean);
gulp.task('compile', compile);
gulp.task('compile-watch', ['build'], compileWatch);
gulp.task('build', ['clean', 'compile'], buildZip);
gulp.task('serve', ['build'],  serve);
gulp.task('zip', buildZip);

gulp.task('default', ['build']);

function clean() {
    return del(config.release.index);
}

function compile() {
    return buildIndex();
}

function compileWatch(done) {
    browserSync.reload();
    done();
}

function serve() {
    browserSync.init({
        server: {
            baseDir: config.release.index,
            middleware: function (req, res, next) {
                res.setHeader('Access-Control-Allow-Origin', '*');
                next();
            }
        }
    });

    gulp.watch([
        config.sources.index,
        config.sources.scripts,
        config.sources.stylesheets
    ], ['compile-watch']);

}

function buildIndex() {
    return gulp.src(config.sources.index)
        .pipe(inject(buildScripts(), {relative: false, ignorePath: '/release'}))
        .pipe(gulp.dest(config.release.index))
        .on('error', handleError);
}

function buildScripts() {
    return gulp.src(config.sources.scripts)
        .pipe(concat('main.js'))
        .pipe(uglify().on('error', function(e){
            console.log(e);
        }))
        .pipe(gulp.dest(config.release.scripts));
}

function buildZip() {
    return gulp.src(config.release.index + '/**/*')
        .pipe(zip('offline.zip'))
        .pipe(gulp.dest(''))
        .pipe(size({
            pretty: false
        }));
}

function handleError(err) {
    this.emit('end');
}