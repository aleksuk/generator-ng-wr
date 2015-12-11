'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    this.log(yosay(
      'Welcome to the striking ' + chalk.red('generator-ng-wr') + ' generator!'
    ));

    this.argument('appName', {
      type: String,
      required: true
    });

	this.appName = _.capitalize(this.appName);
  },

  writing: function () {
    var templateFiles = [
          'src',
          'bower.json',
          'package.json'
        ],
        copyFiles = [
          'gulp',
          '.gitignore',
          '.bowerrc',
          '.jshintrc',
          'Gulpfile.js',
          'server.js'
        ];

    templateFiles.forEach(function (el) {
      this.fs.copyTpl(
        this.templatePath(el),
        this.destinationPath(el),
        { appName: this.appName }
      );
    }, this);

    copyFiles.forEach(function (el) {
      this.fs.copy(
          this.templatePath(el),
          this.destinationPath(el)
      );
    }, this);

    this.config.set('appName', this.appName);
    this.config.save();
  },

  install: function () {
    this.installDependencies();
  }
});
