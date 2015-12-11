var gulp = require('gulp'),
	config = require('./gulp-config.js'),
	srcPrefix = config.srcPrefix,
	shell = require('gulp-shell');

function bowerInstall(prefix) {
	return [
		'cd ' + prefix,
		'bower i --allow-root',
		'cd ../'
	].join(' && ');
}

gulp.task('bowerInstall', shell.task([
	bowerInstall(srcPrefix)
]));
