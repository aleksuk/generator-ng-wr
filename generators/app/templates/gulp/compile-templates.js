var gulp = require('gulp'),
	config = require('./gulp-config.js'),
	path = require('path'),
	templateCache = require('gulp-angular-templatecache'),
	relativeDistPath = config.relativeDistPath,
	srcPrefix = config.srcPrefix;

function compileTemplates(pathTO, prefix) {
	return gulp.src(
		path.join(prefix, '/app/**/*.html')
	)
		.pipe(templateCache({
			root: 'app',
			module: 'ELearning'
		}))
		.pipe(
		gulp.dest(path.join(pathTO, '/app'))
	);
}

gulp.task('compile:templates', function () {
	compileTemplates(relativeDistPath, srcPrefix);
});
