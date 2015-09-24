/**
 * Created by GG on 15/7/23.
 */

var gulp = require('gulp');
var del = require('del');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');

var path = {
    index: 'src/index.html',
    asset: ['src/**/*', '!src/css/**/*', '!src/js/**/*', '!src/index.html'],
    dest: 'build/'
};

gulp.task('clean', function (cb) {
    del([path.dest], cb);
});

gulp.task('copy', ['clean'], function () {
    return gulp.src(path.asset)
        .pipe(gulp.dest(path.dest));
});

gulp.task('usemin', ['clean'], function () {
    return gulp.src(path.index)
        .pipe(usemin({
            css: [minifyCss()],
            js: [uglify()]
        }))
        .pipe(gulp.dest(path.dest));
});

gulp.task('default', ['copy', 'usemin']);