'use strict';

// Include Gulp & Tools We'll Use
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var bump = require('gulp-bump');
var src = ['paper-date-time-input.html',
           'paper-date-time-input.js',
           'test/*.js',
           'test/*.html'];

//Lint JavaScript
gulp.task('lint', function () {
  return gulp.src(src)
    .pipe($.if('*.html', $.htmlExtract()))
    .pipe($.jshint())
    .pipe($.jscs())
    .pipe($.jscsStylish.combineWithHintResults())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'));
});

gulp.task('bump', function(){
  gulp.src('./bower.json')
  .pipe(bump())
  .pipe(gulp.dest('./'));
});

gulp.task('default', function (callback) {
  runSequence(
    'lint',
    callback);
});

gulp.task('watch', function () {
  gulp.watch(src, ['default']);
});
