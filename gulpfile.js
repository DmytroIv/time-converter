'use strict';

const   gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    watch = require('gulp-watch'),
    path = require('path'),
    filter = require('gulp-filter'),
    debug = require('gulp-debug');
//styles
const   postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    atImport = require('postcss-import'),
    mqpacker = require('css-mqpacker'),
    cssnano = require('cssnano');
//js
const babel = require('gulp-babel');

process.env.NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
const isDev = process.env.NODE_ENV === 'development';

/**
 * Returns environment-dependant path
 */
function getDestPath(p) {
    return path.join(app.destBase, (p || ''));
}

function getLoadFileInfo() {
    return require('./loadfile.json');
}

//path
const app = {
    destBase: __dirname
};

app.srcScss = path.join(app.destBase, 'src/scss');
app.destCss = path.join(app.destBase, 'css');
app.srcJs = path.join(app.destBase, 'src/js');
app.destrJs = path.join(app.destBase, 'js');

//compile scss to css
gulp.task('scss', function () {
    return gulp.src('src/scss' + '/**/*.scss')
        .pipe($.plumber())
        // .pipe($.sourcemaps.init())
        .pipe($.sass({
            outputStyle: 'expanded',
            includePaths: ['node_modules/']
        })).on('error', $.sass.logError)
        //adding auto-prefixes, minimization and optimization css
        .pipe(postcss([
            autoprefixer({ browsers: ["last 3 versions", "IE 10"], })
            // atImport(),
            // mqpacker(),
            // cssnano()
        ]))
        .pipe(debug({title: 'compile:'}))
        /*.pipe($.sourcemaps.write('.', {
            includeContent: false
        }))*/
        .pipe(gulp.dest(app.destCss))
        .pipe(filter("**/*.css"))
        .pipe($.livereload());
});

//js task
gulp.task('js', function () {
    return gulp.src('./src/js/**/*.js')
        .pipe(babel({
            presets: ['env'],
            minified: true,
            sourceMaps: 'map'
        }))
        .pipe(gulp.dest(app.destrJs))
        .pipe($.livereload());
});

//gulp watch js, scss files changes
gulp.task('watch', function () {
    $.livereload.listen();

    gulp.watch('src/scss' + '/**/*.scss', gulp.series('scss'));
    gulp.watch('./src/js/*.js', gulp.series('js'));
});

// Dev tools by default
gulp.task('default',
    gulp.series('scss', 'js', gulp.parallel('watch'))
);
