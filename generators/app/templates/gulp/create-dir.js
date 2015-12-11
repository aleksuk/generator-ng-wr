var gulp = require('gulp'),
	config = require('./gulp-config.js'),
	path = require('path'),
	desktopPrefix = config.desktopPrefix,
	relativeDistPath = config.relativeDistPath,
	shell = require('gulp-shell'),
	mobilePrefix = config.mobilePrefix;

gulp.task('createMobileDir', shell.task([
	'cd '+relativeDistPath,
	'rm -r mobile_src',
	'mkdir mobile_src'
].join(' && ')));
