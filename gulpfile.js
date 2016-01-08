var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require("gulp-util");
var connect = require('gulp-connect');

var webpack = require('gulp-webpack');
var webpackConfig = require('./webpack.config.js');

var url = require('openurl');

gulp.task('default', ['scripts', 'html', 'sass', 'connect', 'watch', 'open']);

gulp.task('open', function() {
	return url.open('http://localhost:8080');
})

gulp.task('watch', function () {
	gulp.watch(['./src/*.html'], ['html']);
	gulp.watch(['./src/**/*.js'], ['scripts']);
	gulp.watch(['./src/sass/**/*.scss', './src/sass/*.scss'], ['sass']);
});

gulp.task('scripts', function() {
	return gulp.src('./src/js/app.js')
		.pipe(webpack(webpackConfig))
		.pipe(gulp.dest('./dist/js'))
		.pipe(connect.reload());
});

gulp.task('sass', function () {
	return gulp.src('./src/sass/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./dist/css'))
		.pipe(connect.reload());
});

gulp.task('html', function() {
	gulp.src('./src/*.html')
		.pipe(gulp.dest('./dist'))
		.pipe(connect.reload());
});

gulp.task('connect', function() {
	connect.server({
		root: 'dist',
		livereload: true
	});
});
