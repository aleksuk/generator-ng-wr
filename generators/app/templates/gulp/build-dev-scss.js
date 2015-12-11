var gulp = require('gulp'),
	config = require('./gulp-config.js'),
	path = require('path'),
	sass = require('gulp-sass'),
	relativeDistPath = config.relativeDistPath,
	srcPrefix = config.srcPrefix;

function buildDevelopmentSCSS(pathToDist, prefix) {
	return gulp.src(
		path.join(prefix, 'assets/styles/main.scss')
	)
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(path.join(pathToDist, '/assets/styles')));
}

gulp.task('sass:development', function () {
	console.log(relativeDistPath);
	buildDevelopmentSCSS(relativeDistPath, srcPrefix);
});
