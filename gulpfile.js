var gulp     = require('gulp'),
    markdown = require('gulp-markdown'),
    insert   = require('gulp-insert'),
    marked   = require('marked'),
    fs       = require('fs'),
    wrap     = require('gulp-wrap'),
    rename     = require('gulp-rename'),
    data     = require('gulp-data');

function filepath(file) {
    var pathArr = file.path.split('/');
    pathArr.pop();
    var path = pathArr.join('/') + '/';
    return path;
}

gulp.task('build:package', function () {
    return gulp.src(['./src/**/readme.md'])
        .pipe(insert.append(function(file){
            return fs.readFileSync(filepath(file) + 'changelog.md', 'utf8');
        }))
        .pipe(data(function(file) {
            return {
                'packageJSON': require( filepath(file) + 'package.json' )
            }
        }))
        .pipe(markdown())
        .pipe(wrap({
            src: './template/package.tpl'
        }))
        .pipe(rename(function(path) {
            path.basename = "index"
        }))
        .pipe(gulp.dest('dist'));
});
