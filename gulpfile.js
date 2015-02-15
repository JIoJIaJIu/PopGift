var gulp = require('gulp');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var exec = require('child_process').exec;

var path = require('path');

var OUTPUT = 'build';
var OUTPUT_JS = path.join(OUTPUT, 'js');

gulp.task('default', ['third-parties', 'build', 'templates', 'static']);

gulp.task('build', function () {
    gulp.src([
        'frontend/js/app.js',
        'frontend/js/services/**/*.js',
        'frontend/js/**/*.js',
        '!frontend/js/third-parties/**/*.js'])

        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(concat('app.js'))
        .pipe(gulp.dest(OUTPUT_JS))
        /*
        .pipe(rename({extname: '.min.js'}))
        .pipe(uglify())
        .pipe(gulp.dest(OUTPUT_JS))
        */
});

gulp.task('third-parties', function (cb) {
    gulp.src('frontend/js/third-parties/*.js')
        .pipe(gulp.dest(path.join(OUTPUT_JS, 'third-parties')))
});

gulp.task('templates', function () {
    gulp.src('frontend/index.html')
        .pipe(gulp.dest(OUTPUT))

    gulp.src('frontend/templates/pages/**')
        .pipe(gulp.dest(path.join(OUTPUT, 'views')) );

    gulp.src('frontend/templates/partials/**')
        .pipe(gulp.dest(path.join(OUTPUT, 'partials')) );
});

gulp.task('static', function () {
    gulp.src('frontend/css/**')
        .pipe(gulp.dest(path.join(OUTPUT, 'css')) );

    gulp.src('frontend/images/**')
        .pipe(gulp.dest(path.join(OUTPUT, 'i')) );

    gulp.src('frontend/data/**')
        .pipe(gulp.dest(path.join(OUTPUT, 'data')) );
});

gulp.task('watch', function () {
    gulp.watch('frontend/templates/**.html', ['templates']);
    gulp.watch('frontend/js/**/*.js', ['build']);
});
