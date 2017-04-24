var gulp        = require('gulp'),
    hbs = require('gulp-hbs');

gulp.task('foo', function () {
    gulp.src('./app/assets/js/packages.json')
        .pipe(hbs('./app/templates/package.hbs'))
        .pipe(gulp.dest('html'));
});
