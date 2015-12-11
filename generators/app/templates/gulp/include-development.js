var gulp = require('gulp'),
	config = require('./gulp-config.js'),
	path = require('path'),
	htmlReplace = require('gulp-html-replace'),
	dependencies = require(config.dependencies),
	relativeDistPath = config.relativeDistPath,
	srcPrefix = config.srcPrefix;

function replaceSettings(obj, prefix) {
	return gulp.src(
		path.join(prefix, 'index.html')
	)
		.pipe(htmlReplace(obj, {
			keepBlockTags: true,
			keepUnassigned: true
		}))
		.pipe(gulp.dest(relativeDistPath));
}

gulp.task('include:developmentCompiled', ['compile:templates'], function () {
	replaceSettings({
		libs: dependencies.development.libs,
		js: dependencies.development.js,
		css: dependencies.development.css,
		templates: 'app/templates.js'
	}, srcPrefix);
});

gulp.task('include:development', function () {
	replaceSettings({
		libs: dependencies.development.libs,
		js: dependencies.development.js,
		css: dependencies.development.css
	}, srcPrefix);
});
