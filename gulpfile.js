var gulp        = require('gulp'),
    markdown    = require('gulp-markdown'),
    marked      = require('marked'),
    insert      = require('gulp-insert'),
    fs          = require('fs'),
    del         = require('del'),
    wrap        = require('gulp-wrap'),
    debug       = require('gulp-debug'),
    sass        = require('gulp-sass'),
    runSequence = require('run-sequence');
    rename      = require('gulp-rename'),
    concat_json = require('gulp-concat-json'),
    prism       = require('prismjs'),
    dom         = require('gulp-dom'),
    replace     = require('gulp-replace'),
    beautify    = require('gulp-beautify'),
    rename      = require('gulp-rename'),
    data        = require('gulp-data');


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

function getColorPath() {
    var obj = JSON.parse(fs.readFileSync('../thumbprint-ui/packages/tp-ui-core-color/package.json', 'utf8'));
    var path = './dist/tp-ui-core-color/' + obj.version;
    return path;
}

function getDirectory(obj) {
    var directory = obj.name.split('/')[1];
    return directory;
}

//------------------------------------------------------------------------//

// Builds the documentation from all the readme files files in the source.
gulp.task('build:packages', function () {
    return gulp.src('../thumbprint-ui/packages/*/README.md')
        // TODO: Inject this into a div for better styling control.
        // .pipe(insert.append(function(file){
        //     return fs.readFileSync(filepath(file) + 'CHANGELOG.md', 'utf8');
        // }))
        // Pull the date from the package.json file for use by 'gulp-wrap'
        .pipe(data(function(file) {
            return {
                'packageJSON': require(filepath(file) + 'package.json'),
                'directory': getDirectory(require(filepath(file) + 'package.json'))
            }
        }))
        .pipe(markdown())
        .pipe(wrap({
            src: './template/package.tpl',
        }))
        .pipe(rename(function(path, file) {
            path.dirname += getVersion(path.dirname); // Append version to directory path.
            path.basename = 'index'; // Change the file to index.html
        }))
        .pipe(gulp.dest('./dist'));
});

// Builds the CSS required by that package.
gulp.task('build:packages:sass', function () {
    return gulp.src('./assets/sass/thumbprint-all.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dist/assets/css/common'));
});


//------------------------------------------------------------------------//

// Converts tp-ui-color-variable sass variable obj into a JSON file
// for easier documentation.
// TODO: convert variables to JSON.
gulp.task('build:color:json', function(){
    gulp.src('../thumbprint-ui/packages/tp-ui-core-color/_index.scss')
        .pipe(replace(/^@import.*;/gm, "")) // remove import statements
        .pipe(replace(/ ?(\/\/ ?.*)/gm, "")) // remove comments
        .pipe(replace(/^\s*\n/gm, "")) // remove blank lines
        .pipe(replace(/\;/g, ",")) // change ; to ,
        .pipe(replace(/([a-zA-Z0-9$\-\#]+)\s*:\s*([a-zA-Z0-9\-\#\$]+ ?[a-zA-Z0-9.,\-\#\'\%\$ ?\(\)]+)/gm, "\"$1\":\"$2\"")) // wrap pairs in quotes
        .pipe(replace(/([a-zA-Z0-9$\-]+) ?:/g, "\"$1\":")) // convert parent variable names
        .pipe(replace(/,"/g, "\",")) // swap comma with last closing quote in pairs
        .pipe(replace(/(.*)(\()$/gm, "$1 {")) // convert ( to { where needed
        .pipe(replace(/^(\s+|)(\))/gm, "$1}")) // convert ) to } where needed
        .pipe(replace(/.*(}),\n$/gm, "$1\n")) // remove final comma
        .pipe(wrap('{\n<%= contents %>}')) // wrap contents in {} for valid JSON
        .pipe(beautify({indent_size: 4})) // indent file
        .pipe(rename('var-color.json'))
        .pipe(gulp.dest('./dist/assets/data'));
});

gulp.task('build:color:template', function(){
    return gulp.src('./assets/package/color/color.html')
        .pipe(gulp.dest(getColorPath()));
});

//------------------------------------------------------------------------//

// Combine the JSON files into a single json file for use by index.js
gulp.task('build:indexJSON', function () {
    return gulp.src('../thumbprint-ui/packages/*/package.json')
        .pipe(concat_json('index.json'))
        .pipe(gulp.dest('dist'));
});

//------------------------------------------------------------------------//

gulp.task('build:preclean', function(cb) {
    return del(['dist'], cb);
});

gulp.task('copy:assets', function() {
    return gulp.src('./assets/**/*')
        .pipe(gulp.dest('dist/assets'));
});

gulp.task('copy:index', function() {
    return gulp.src('./template/index.html')
        .pipe(gulp.dest('dist'));
});

//------------------------------------------------------------------------//

// Show examples from html sources
function renderCodeExamples(dom) {
    var examples = dom.querySelectorAll('.doc-example:not(.no-code)');
    for (i = 0; i < examples.length; i++) {
        var example = examples[i];
        var parent = example.parentNode;
        var pre = dom.createElement("pre");
        var html = example.innerHTML;

        example.setAttribute("data-playground-type", "html");
        example.setAttribute("data-playground-group", "fiddle-code-" + i);

        var code = prism.highlight(html, prism.languages.markup)
        code = code.replace(/^\s{1}/g, ''); // WHY? I can't seem to get rid of the first space.
        code = code.replace(/^\s{4}/gm, ''); // Globally remove indent of 4 spaces.

        pre.classList.add("doc-pre-example");
        pre.innerHTML = '<code>' + code + '</code>'
        parent.insertBefore(pre, example.nextSibling);
    }
    return dom;
}


// Build the single page file from the JSON.
gulp.task('build:examples', function() {
    return gulp.src('./dist/**/index.html')
        .pipe(dom(function(){
            var dom = this;
            renderCodeExamples(dom);
            return dom;
        }))
        .pipe(gulp.dest('./dist' ))
});


//------------------------------------------------------------------------//

gulp.task('build', function(callback) {
    runSequence('build:preclean',
                'build:packages',
                'build:examples',
                'build:packages:sass',
                'build:indexJSON',
                'build:color:template',
                'build:color:json',
                [
                    'copy:index',
                    'copy:assets'
                ]
            );
});
