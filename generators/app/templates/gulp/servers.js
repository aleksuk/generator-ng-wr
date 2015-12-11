/* global: require */
var gulp = require('gulp'),
	config = require('./gulp-config.js'),
	desktopPrefix = config.desktopPrefix,
	mobilePrefix = config.mobilePrefix,
	del = require('del'),
	server = require( 'gulp-develop-server'),
	ngConfig = require('gulp-ng-config'),
	shell = require('gulp-shell');

gulp.task( 'server:restart', function() {

	function restart( file ) {
		server.changed( function( error ) {
			if( ! error ) livereload.changed( file.path );
		});
	}
	gulp.watch( [ 'server.js' ] ).on( 'change', restart );
});

gulp.task( 'server:start', function() {
	server.listen( { path: './server.js' } );
});

gulp.task('ng-config-local', function () {
	return configEnv('local');
});

gulp.task('ng-config-production-test', function () {
	return configEnv('production-test');
});

gulp.task('ng-config-production', function () {
	return configEnv('production');
});

gulp.task('server:local-start', shell.task('node rooms.js local', { ignoreErrors: true }));
gulp.task('stop:test-server', shell.task('forever stop test', { ignoreErrors: true }));
gulp.task('start:test-server', shell.task('forever start -a --uid "test" rooms.js production-test', { ignoreErrors: true }));
gulp.task('stop:prod-server', shell.task('forever stop production', { ignoreErrors: true }));
gulp.task('start:prod-server', shell.task('forever start -a --uid "production" rooms.js production', { ignoreErrors: true }));


function configEnv(env) {
	return gulp.src('ng-config.json')
		.pipe(ngConfig('ELearning', {
			wrap: true,
			environment: env,
			createModule: false
		}))
		.pipe(gulp.dest('./'));
}
