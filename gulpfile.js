const gulp = require('gulp'),
    sass = require('gulp-sass'),
    pug = require('gulp-pug'),
    plumber = require('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create();

gulp.task('sass', ()=> 
    gulp.src('./dev/sass/*.sass')
    .pipe(sass({
        outputStyle: 'nested', 
        sourceComments: false // Comments in the css where the property is in sass
    }).on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('./dist/css'))
);

gulp.task('pug', ()=> 
    gulp.src('./dev/views/**/*.pug')
        .pipe(plumber())
        .pipe(pug({
            pretty: true,
            basedir: __dirname + '/dev/views/'
        }))
        .pipe(gulp.dest('./dist'))
);

gulp.task('default', () => {
    browserSync.init({
        server: './dist'
    });
    gulp.watch('./dev/sass/*.sass', ['sass']).on('change', browserSync.reload);
    gulp.watch('./dev/views/**/*.pug', ['pug']).on('change', browserSync.reload);
    gulp.watch('./dist/js/**/*.js', ['pug']).on('change', browserSync.reload);
});