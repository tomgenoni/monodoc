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
    data        = require('gulp-data');

// Make package.json
var packageJSON = JSON.parse(fs.readFileSync('./package.json'));

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
        // TODO: Inject this into a div for better styling control.
        // .pipe(insert.append(function(file){
        //     return fs.readFileSync(filepath(file) + 'CHANGELOG.md', 'utf8');
        // }))
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
            basename: "package"
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

// Add in clipboard button to raw code examples
function insertClipboardButton(dom) {
    var preExamples = dom.querySelectorAll('.doc-pre-example');
    for (i = 0; i < preExamples.length; i++) {
        var preExample = preExamples[i];
        var parent = preExample.parentNode;
        var clipboardWrap = dom.createElement("div");

        clipboardWrap.classList.add("doc-clipboard-wrap");
        clipboardWrap.innerHTML = "<button class=doc-clipboard></button><a href='#' class=fiddle-link data-playground=jsfiddle data-playground-from-group=fiddle-code-"+i+" data-playground-resources='https://thumbprint.thumbtack.com/asset/css/thumbprint.min-"+project.version+".css'></a>";
        parent.insertBefore(clipboardWrap, preExample.nextSibling);
    }
    return dom;
}

// Build the single page file from the JSON.
gulp.task('build:examples', function() {
    return gulp.src('./dist/**/index.html')
        .pipe(dom(function(){
            var dom = this;
            renderCodeExamples(dom);
            //insertClipboardButton(dom);
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
                [
                    'copy:index',
                    'copy:assets'
                ]
            );
});
