/* global process, require */
var gulp = require('gulp'),
	path = require('path'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	del = require('del'),
	shell = require('gulp-shell'),
	config = require('./gulp/gulp-config'),
	relativeDistPath = config.relativeDistPath,
	requireDir = require('require-dir'),
	livereload = require( 'gulp-livereload'),
	environment = process.env.ENV;

requireDir('gulp');

gulp.task('sass:production', function () {
	gulp.src('./src/assets/scss/main.scss')
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(gulp.dest(path.join(relativeDistPath, '/assets/css')));
});

gulp.task('clean:dist', function () {
	del.sync(relativeDistPath);
});

gulp.task('development', [
	'clean:dist',
	'copy:libs',
	'watch',
	'include:development',
	'server:start'
]);

gulp.task('mobile-development', [
	'clean:libs-mobile',
	'copy:libs-mobile',
	'watch-mobile',
	'include:mobile-development'
]);

gulp.task('build:development', [
	'clean:dist',
	'copy:libs-build',
	'copy:mobile-libs-build',
	'copy:app-build',
	'copy:mobile-build',
	'copy:config-production',
	'sass:development-build',
	'sass:development-mobile',
	'include:developmentCompiled',
	'include:developmentMobileCompiled'
]);

gulp.task('build:development-test', [
	'clean:dist',
	'copy:libs-build',
	'copy:mobile-libs-build',
	'copy:app-build',
	'copy:mobile-build',
	'copy:config-production-test',
	'sass:development-build',
	'sass:development-mobile',
	'include:developmentCompiled',
	'include:developmentMobileCompiled'
]);



gulp.task('build:mobile-development', [
	'clean:dist',
	'copy:mobile-libs-build',
	'copy:mobile-build',
	'sass:mobile-development-build',
	'include:developmentMobileCompiled'
]);

gulp.task('npmInstall', shell.task('npm i'));

gulp.task('dependency', ['npmInstall', 'bowerInstall', 'mobile-dependency']);
gulp.task('mobile-dependency', ['bowerInstallMobile', 'npmInstall']);

gulp.task('default', ['development']);
