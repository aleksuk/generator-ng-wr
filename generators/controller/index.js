'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
var toCamelCase = require('../../utils').toCamelCase;

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
      this.templatePath('controller.js'),
      this.destinationPath(this['_get' + this.type + 'Path']()),
      params
    );
  },

  _getGeneratorParameters: function () {
    var name = toCamelCase(this.name);
    var moduleName = toCamelCase(this.options.module);

    return {
      name: name,
      capitalizedName: _.capitalize(name),
      moduleName: this.config.get('appName') + '.' + _.capitalize(moduleName)
    };
  },

  _getDirectivePath: function () {
    var name = this.name;
    return 'src/app/modules/' + this.options.module + '/directives/' + name + '/' + name + '.controller.js';
  },

  _getModulePath: function () {
    return 'src/app/modules/' + this.options.module + '/controllers/' + this.name + '.controller.js';
  },

  _getComponentsPath: function () {
    return 'src/app/components/' + this.name + '/' + this.name + '.controller.js';
  }
});
