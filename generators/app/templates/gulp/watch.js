var gulp = require('gulp'),
	config = require('./gulp-config.js'),
	path = require('path'),
	relativeDistPath = config.relativeDistPath,
	srcPrefix = config.srcPrefix;

function watch(prefix) {
	gulp.watch(
		[
			path.join(prefix, '**/*.scss'),
			'!' + path.join(prefix, 'assets/libs/**')
		],
		['sass:development']
	);
	gulp.watch(
		path.join(prefix, 'app/**/*'),
		{ base: prefix }
	).on('change', function (event) {
			return gulp.src(event.path, { base: prefix })
				.pipe(gulp.dest(relativeDistPath));
		});
}

gulp.task('watch', ['sass:development', 'copy:app'], function () {
	watch(srcPrefix);
});
