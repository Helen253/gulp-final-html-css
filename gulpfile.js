'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');  
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const browsersync = require('browser-sync').create();

const paths = {
    styles: {
        src: 'app/styles/**/*.scss',
        dest: 'build/css'
    },
    html:{
        src: 'app/**/*.html',
        dest: 'build/'
    },
    fonts:{
        src: 'app/fonts/*',
        dest: 'build/fonts'
    },
    images:{
        src:'app/images/*.png',
        dest: 'build/images'
    }
}


function browserSync(done){
    browsersync.init({
        server:{
            baseDir: './build'
        },
        port: 3000
    })
    done();
}

function browserSyncReload(done){
    browsersync.reload();
    done();
}

function styles(){
    return gulp.src(paths.styles.src)
        .pipe(sass().on('error',sass.logError))
        .pipe(cssnano())
        .pipe(autoprefixer())
        .pipe(rename({
            suffix:'.min'
        }))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browsersync.stream())
}

function html(){
    return gulp.src(paths.html.src)
    .pipe(gulp.dest(paths.html.dest))
    .pipe(browsersync.stream())
}

function images(){
    return gulp.src(paths.images.src)
    .pipe(gulp.dest(paths.images.dest))
    // .pipe(browsersync.stream())
}

function fonts(){
    return gulp.src(paths.fonts.src)
    .pipe(gulp.dest(paths.fonts.dest))
    // .pipe(browsersync.stream())
}


function watch(){
    gulp.watch(paths.styles.src, styles)
    gulp.watch(paths.html.src, html)
     gulp.watch(paths.images.src, images)
    gulp.watch(paths.fonts.src, fonts)
    gulp.watch('./app/*.html', gulp.series(browserSyncReload));
}


const build = gulp.parallel(styles, html, fonts, images);

gulp.task('build', build);

gulp.task('default', gulp.parallel(watch, browserSync, build))







// function defaultTask(cb) {
//     console.log('gulp works');
//     cb();
//   }
  
//   exports.default = defaultTask