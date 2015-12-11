var gulp = require('gulp'),
	config = require('./gulp-config.js'),
	path = require('path'),
	relativeDistPath = config.relativeDistPath,
	srcPrefix = config.srcPrefix,
	clean = require('gulp-clean');

function copyLibs(pathToDist, prefix) {
	return gulp.src([
		path.join(prefix, 'assets/**/*'),
		path.join('!' + prefix, '/assets/styles/**')
	])
		.pipe(
		gulp.dest(path.join(pathToDist, '/assets'))
	);
}

gulp.task('copy:libs', function () {
	copyLibs(relativeDistPath, srcPrefix);
});
