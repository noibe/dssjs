var gulp = require('gulp'),
	concat = require('gulp-concat'),
	jshint = require('gulp-jshint'),
	minifycss = require('gulp-minify-css'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify');

var paths = {
	core: 'js/dss.js'
};

gulp.task('dss', function() {
	gulp.src(paths.core)
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(uglify({
			preserveComments: 'some'
		}))
		.pipe(rename({
			extname: '.min.js'
		}))
		.pipe(gulp.dest('dist/js'));
});

gulp.task('watch', function() {
	gulp.watch(paths.core, ['dss']);
});

gulp.task('default', ['watch', 'dss']);