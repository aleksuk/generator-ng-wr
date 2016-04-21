'use strict';
var yeoman = require('yeoman-generator');
var _ = require('lodash');
var toCamelCase = require('../../utils').toCamelCase;
var includeToDependencies = require('../../utils').includeToDependencies;

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
    var path = this['_get' + this.type + 'Path']();

    this.fs.copyTpl(
        this.templatePath('service.js'),
        this.destinationPath(path),
        params
    );

    includeToDependencies.call(this, path);
  },

  _getGeneratorParameters: function () {
    var name = toCamelCase(this.name);
    var moduleName = toCamelCase(this.options.module);

    return {
      defaultName: this.name,
      name: name,
      moduleName: this.config.get('appName') + '.' + _.capitalize(moduleName)
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
