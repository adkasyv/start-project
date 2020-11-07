const {src, dest, series, watch} = require('gulp')
const stylus = require('gulp-stylus')
const csso = require('gulp-csso')
const pug = require('gulp-pug')
const include = require('gulp-file-include')
const htmlmin = require('gulp-htmlmin')
const del = require('del')
const concat = require('gulp-concat')
const autoprefixer = require('gulp-autoprefixer')
const sourcemaps = require('gulp-sourcemaps')
const sync = require('browser-sync').create()

function html() {
    return src('src/pug/index.pug')
        .pipe(pug())
        .pipe(include({
            prefix: '@@'
        }))
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(dest('dist'))
}

function styl() {
    return src('src/stylus/main.styl')
        .pipe(sourcemaps.init())
        .pipe(stylus())
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(csso())
        .pipe(concat('style.css'))
        .pipe(sourcemaps.write('./'))
        .pipe(dest('dist/css'))
}

// scripts
function scripts() {
    return src('src/js/app.js')
        .pipe(dest('dist/js'))
}


// img
function img() {
    return src('src/accepts/img/**/*')  
        .pipe(dest('dist/img/'));
}

// fonts
function fonts() {
    return src('src/accepts/fonts/**/*')  
        .pipe(dest('dist/fonts/'));
}


function clear() {
    return del('dist')
}

function serve() {
    sync.init({
        server: './dist'
    })

    watch('src/**/*.pug', series(html)).on('change', sync.reload, serve)
    watch('src/stylus/**/*.styl', series(styl)).on('change', sync.reload, serve)
    watch('src/app.js', series(scripts)).on('change', sync.reload, serve)
    watch('src/accepts/img/**/*', series(img)).on('change', sync.reload, serve)
    watch('src/accepts/fonts/**/*', series(fonts)).on('change', sync.reload, serve)
}


exports.build = series(clear, styl, html)
exports.serve = series(clear, styl, img, fonts, html, scripts, serve)
exports.clear = clear