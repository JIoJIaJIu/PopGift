var gulp = require('gulp');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var exec = require('child_process').exec;

var path = require('path');

var OUTPUT = 'build';
var OUTPUT_JS = path.join(OUTPUT, 'js');

gulp.task('default', ['third-parties', 'build', 'templates']);

gulp.task('build', function () {
    gulp.src('frontend/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(gulp.dest(OUTPUT_JS))
        .pipe(rename({extname: '.min.js'}))
        .pipe(uglify())
        .pipe(gulp.dest(OUTPUT_JS))
});

gulp.task('third-parties', function (cb) {
    exec('./node_modules/bower/bin/bower install', cb)
});

gulp.task('templates', function () {
    gulp.src('frontend/index.html')
        .pipe(gulp.dest(OUTPUT))

    gulp.src('frontend/templates/**')
        .pipe(gulp.dest(OUTPUT_JS))
});

gulp.task('watch', function () {
    gulp.watch('frontend/**.html', ['templates']);
    gulp.watch('frontend/**.js', ['build']);
});
