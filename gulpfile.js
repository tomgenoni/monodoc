var gulp        = require('gulp'),
    markdown    = require('gulp-markdown'),
    insert      = require('gulp-insert'),
    marked      = require('marked'),
    fs          = require('fs'),
    del         = require('del'),
    wrap        = require('gulp-wrap'),
    sass        = require('gulp-sass'),
    rename      = require('gulp-rename'),
    concat_json = require('gulp-concat-json'),
    gutil       = require('gulp-util'),
    data        = require('gulp-data');

var packageTypes = [
    'core',
    'component'
]

// Gets file path from a file in stream.
function filepath(file) {
    var pathArr = file.path.split('/');
    pathArr.pop();
    var path = pathArr.join('/') + '/';
    return path;
}

// Initial step in building the JSON for use by the root index.html
// Builds temporary JSON files
gulp.task('build:typeJSON', function () {
    packageTypes.forEach(function(type, index) {
        return gulp.src(['./src/' + type + '/**/package.json'])
            .pipe(concat_json(index + '-' + type + '-index.json'))
            .pipe(insert.wrap('{"'+type+'":', '}'))
            .pipe(gulp.dest('tmp'));
    });
});

gulp.task('build:indexJSON', function () {
    return gulp.src(['./tmp/*.json'])
        .pipe(concat_json('index.json'))
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', function(cb) {
    del(['tmp'], cb);
});

gulp.task('copy:assets', function() {
    return gulp.src('./assets/**/*')
        .pipe(gulp.dest('dist'));
});

gulp.task('copy:index', function() {
    return gulp.src('./template/index.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('build:packages', function () {
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

gulp.task('build:packages:sass', function () {
    return gulp.src(['./src/**/*.scss'])
        .pipe(insert.prepend(function(file){
            return fs.readFileSync('./assets/core.scss', 'utf8');
        }))
        .pipe(rename(function(path) {
            path.basename = "index"
        }))
        .pipe(sass())
        .pipe(gulp.dest('dist'));
});
