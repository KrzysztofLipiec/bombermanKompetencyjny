var gulp = require('gulp'),
    connect = require('gulp-connect'),
    historyApiFallback = require('connect-history-api-fallback'),
    coffee = require('gulp-coffee'),
    gutil = require('gulp-util');

gulp.task('connect', function() {
    connect.server({
        root: 'dist/',
        livereload: true,
        middleware: function(connect, opt) {
            return [ historyApiFallback ];
        }
    });
});

gulp.task('html', function () {
    gulp.src('./dist/*.html')
        .pipe(connect.reload());
});

gulp.task('coffee', function() {
    gulp.src('./coffee/**/*.coffee')
        .pipe(coffee({bare: true}).on('error', gutil.log))
        .pipe(gulp.dest('./dist/'))
});

gulp.task('watch', function () {
    gulp.watch(['./dist/**/*'], ['html']);
    gulp.watch(['./coffee/**/*.coffee'], ['coffee']);
});

gulp.task('default', ['connect', 'watch']);
