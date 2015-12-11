'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    this.argument('name', {
      type: String,
      required: true
    });

    this.type = this.types[this.options.type] || 'Module';
  },

  types: {
    component: 'Components',
    directive: 'Directive'
  },

  writing: function () {
    this.fs.copy(
      this.templatePath('view.html'),
      this.destinationPath(this['_get' + this.type + 'Path']()),
      { name: this.name }
    );
  },

  _getDirectivePath: function () {
    var name = this.name;
    return 'src/app/modules/' + this.options.module + '/directives/' + name + '/' + name + '.html';
  },

  _getModulePath: function () {
    return 'src/app/modules/' + this.options.module + '/views/' + this.name + '.html';
  },

  _getComponentsPath: function () {
    return 'src/app/components/' + this.name + '/' + this.name + '.html';
  }
});
