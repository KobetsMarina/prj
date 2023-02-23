const gulp = require('gulp');
const { series, parallel } = require('gulp');
const fileinclude = require('gulp-file-include');
const sass = require('gulp-sass')(require('sass'));
const htmlmin = require('gulp-htmlmin');
const cssnano = require('gulp-cssnano');
const imagemin = require('gulp-imagemin');
const clean = require('gulp-clean');
const browserSync = require('browser-sync').create();
const jsmin = require('gulp-jsmin');
const rename = require('gulp-rename');

function cleanDist() {
    return gulp.src('dist', { read: false, allowEmpty: true })
        .pipe(clean());
}

function fileinc() {
    return gulp.src('app/*.html')

    .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('./dist'));
}

function buildStyles() {
    return gulp.src('./app/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./app/style'));
};

function compileSASS() {
    return gulp.src('./app/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./app/style'))
}

function htmlMin() {
    return gulp.src('dist/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./dist'));
}

function minJS() {
    return gulp.src('app/js/**/*.js')
        .pipe(jsmin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/js'));
}

function csslMin() {
    return gulp.src('./app/style/style.css')
        .pipe(cssnano())
        .pipe(gulp.dest('./dist/style'));
}

function libsCss() {
    return gulp.src('./app/libs/**/*.css')
        .pipe(cssnano())
        .pipe(gulp.dest('./dist/libs'));
}

function libsJs() {
    return gulp.src('app/libs/**/*.js')
        .pipe(jsmin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/libs'));
}

function libs() {
    return gulp.src('app/libs/**/*.*')
        .pipe(gulp.dest('dist/libs'))
}

function imageMin() {
    return gulp.src('app/img/**/*.*')
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.mozjpeg({ quality: 75, progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
                plugins: [
                    { removeViewBox: true },
                    { cleanupIDs: false }
                ]
            })
        ]))
        .pipe(gulp.dest('./dist/img'))
}

function watchCSS() {
    return gulp.watch('./app/scss/**/*.scss', series(buildStyles, csslMin));
}

function watchHTML() {
    return gulp.watch('./app/**/*.html', series(fileinc, htmlMin));
}

function watchJS() {
    return gulp.watch('./app/js/**/*.js*', series(minJS));
}

function watchlibs() {
    return gulp.watch('./app/libs/**/*.*', series(libs));
}


function serve() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });

    watchCSS();
    gulp.watch('./app/scss/**/*.scss').on('change', browserSync.reload);

    watchHTML();
    gulp.watch('./app/**/*.html').on('change', browserSync.reload);

    watchJS();
    gulp.watch('./app/**/*.js').on('change', browserSync.reload);

    watchlibs();
    gulp.watch('./app/libs/**/*.*').on('change', browserSync.reload);


}

exports.fileinc = fileinc;
exports.buildStyles = buildStyles;
exports.htmlMin = htmlMin;
exports.csslMin = csslMin;
exports.imageMin = imageMin;
exports.imageMin = imageMin;
exports.minJS = minJS;
exports.libsCss = libsCss;
exports.libsJs = libsJs;
exports.libs = libs;
exports.clean = cleanDist;

exports.build = series(
    cleanDist,
    fileinc,
    buildStyles,
    htmlMin,
    csslMin,
    minJS,
    libsCss,
    libsJs,
    libs,
    imageMin,
    serve,
)