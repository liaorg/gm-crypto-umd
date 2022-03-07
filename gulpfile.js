var gulp = require('gulp');
var rename = require('gulp-rename');
var browserify = require('gulp-browserify');
var jshint = require('gulp-jshint');
const babelify = require('babelify'); //es6转es5
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('build', ['lint'], function(){
  return gulp.src('./entry.js')
        .pipe(browserify({
        }))
        .transform(babelify, {
            presets: ["es2015"]
        })
        .pipe(rename('bundle.js'))
        .pipe(gulp.dest('./'))
});

gulp.task('lint', ['jshint'])
gulp.task('jshint', function(){
  return gulp.src(['./*.js', '!./bundle.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
})

/* gulp.task('default', ['build'], function(){
  return gulp.watch(['./*.js', '!./bundle.js'], ['build'])
}) */