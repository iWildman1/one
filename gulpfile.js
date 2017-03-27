var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var wait = require('gulp-wait');
var browserSync = require('browser-sync');

gulp.task('browser-sync', ['sass'], function() {
    browserSync.init({
        server: {
            baseDir: "app"
        }
    })
})

gulp.task('watch', ['browser-sync'], function() {
    gulp.watch("src/scss/**/*.scss", ['sass']);
    gulp.watch("app/**/*.html").on('change', browserSync.reload);
});

gulp.task('sass', function() {
    return gulp.src('src/scss/*.scss')
        .pipe(wait(100))
        .pipe(plumber())
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}));
})