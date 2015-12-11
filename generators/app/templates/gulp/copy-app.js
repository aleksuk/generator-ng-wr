var gulp = require('gulp'),
	config = require('./gulp-config.js'),
	path = require('path'),
	relativeDistPath = config.relativeDistPath,
	srcPrefix = config.srcPrefix;;

function copyApp(pathToDist, prefix) {
	return gulp.src([
		path.join(prefix, '/app/**/*')
	])
		.pipe(
		gulp.dest(path.join(pathToDist, '/app'))
	);
}

gulp.task('copy:app', function () {
	copyApp(relativeDistPath, srcPrefix);
});
