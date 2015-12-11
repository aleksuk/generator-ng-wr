'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');

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
    var params = this._getGeneratorParameters();

    this.fs.copyTpl(
        this.templatePath('service.js'),
        this.destinationPath(this['_get' + this.type + 'Path']()),
        params
    );
  },

  _getGeneratorParameters: function () {
    return {
      name: this.name,
      moduleName: this.options.module
    };
  },

  _getDirectivePath: function () {
    var name = this.name;
    return 'src/app/modules/' + this.options.module + '/directives/' + name + '/' + name + '.service.js';
  },

  _getModulePath: function () {
    return 'src/app/modules/' + this.options.module + '/services/' + this.name + '.service.js';
  },

  _getComponentsPath: function () {
    return 'src/app/components/' + this.name + '/' + this.name + '.service.js';
  }
});
