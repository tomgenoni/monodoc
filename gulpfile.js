var gulp        = require('gulp'),
    markdown    = require('gulp-markdown'),
    marked      = require('marked'),
    insert      = require('gulp-insert'),
    fs          = require('fs'),
    del         = require('del'),
    wrap        = require('gulp-wrap'),
    debug        = require('gulp-debug'),
    sass        = require('gulp-sass'),
    runSequence = require('run-sequence');
    rename      = require('gulp-rename'),
    concat_json = require('gulp-concat-json'),
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

function getVersion(path) {
    var obj = JSON.parse(fs.readFileSync('../thumbprint-ui/packages/' + path + '/package.json', 'utf8'));
    var version = '/' + obj.version;
    return version;
}

//------------------------------------------------------------------------//

// Builds the documentation from all the readme files files in the source.
gulp.task('build:packages', function () {
    return gulp.src('../thumbprint-ui/packages/*/README.md')
        // Append the changelog to the readme. TODO: try 'request'
        .pipe(insert.append(function(file){
            return fs.readFileSync(filepath(file) + 'CHANGELOG.md', 'utf8');
        }))
        // Pull the date from the package.json file for use by 'gulp-wrap'
        .pipe(data(function(file) {
            return {
                'packageJSON': require(filepath(file) + 'package.json')
            }
        }))
        .pipe(markdown())
        .pipe(wrap({
            src: './template/package.tpl'
        }))
        .pipe(rename(function(path, file) {
            path.dirname += getVersion(path.dirname); // Append version to directory path.
            path.basename = 'index'; // Change the file to index.html
        }))
        .pipe(gulp.dest('./dist'));
});

// Builds the CSS required by that package.
gulp.task('build:packages:sass', function () {
    return gulp.src('../thumbprint-ui/packages/*/_index.scss')
        .pipe(rename({
            basename: "index"
        }))
        .pipe(sass())
        .pipe(rename(function(path) {
            path.dirname += getVersion(path.dirname); // Append version to directory path.
        }))
        .pipe(gulp.dest('./dist'));
});

//------------------------------------------------------------------------//

// Combine the JSON files into a single json file for use by index.js
gulp.task('build:indexJSON', function () {
    return gulp.src('../thumbprint-ui/packages/*/package.json')
        .pipe(concat_json('index.json'))
        .pipe(gulp.dest('dist'));
});

//------------------------------------------------------------------------//

gulp.task('copy:index:js', function() {
    return gulp.src('./assets/index.js')
        .pipe(gulp.dest('dist'));
});

gulp.task('copy:index:css', function() {
    return gulp.src('./assets/index.css')
        .pipe(gulp.dest('dist'));
});

gulp.task('copy:index', function() {
    return gulp.src('./template/index.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('build:preclean', function(cb) {
    return del(['dist'], cb);
});

//------------------------------------------------------------------------//

gulp.task('build', function(callback) {
    runSequence('build:preclean',
                'build:packages',
                'build:packages:sass',
                'build:indexJSON',
                ['copy:index:js','copy:index','copy:index:css']
                );
});
