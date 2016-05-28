'use strict';

require('es6-promise').polyfill();


var gulp      = require('gulp'),
    $ = require('gulp-load-plugins')(),  
	runSequence = require('run-sequence'),  
    sass      = require('gulp-sass'),
    lazypipe = require('lazypipe'),
    rimraf = require('rimraf');

//////////////
// Lazy load //
//////////////

var styles = lazypipe()
    .pipe($.sass)
    .pipe($.autoprefixer, 'last 1 version')
    .pipe(gulp.dest, './dist/css');

///////////
// Tasks //
///////////

gulp.task('styles', function () {
    return gulp.src(['./src/sass/*.scss'])
        .pipe(styles());
});


gulp.task('clean:dist', function (cb) {
    rimraf('dist', cb);
});

//Copy hide files
gulp.task('copy:fonts', function () {
    return gulp.src('./src/fonts/*.*')
        .pipe(gulp.dest('dist/fonts'));
});

//If an error on task config, move it !
gulp.task('build', ['clean:dist'], function () {
    runSequence(['styles', 'copy:fonts']);
});

gulp.task('default', ['build'])