'use strict';
var yeoman = require('yeoman-generator');
var _ = require('lodash');
var path = require('path');
var toCamelCase = require('../../utils').toCamelCase;
var includeToDependencies = require('../../utils').includeToDependencies;
var injectToInit = require('../../utils').injectToInit;

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    this.argument('name', {
      type: String,
      required: true
    });
  },

  writing: function () {
    var modulePath = 'app/modules/' + this.name + '/';
    var fullPath = 'src/' + modulePath;
    var params = this._getGeneratorParameters();
    var finalPath = fullPath + this.name + '.module.js';

    this.fs.copyTpl(
      this.templatePath('module.js'),
      this.destinationPath(finalPath),
      params
    );

    includeToDependencies.call(this, finalPath);

    this._createService();
    this._createController();
    this._createView();
    this._createStyle();
    injectToInit.call(this);
  },

  _getGeneratorParameters: function () {
    var name = toCamelCase(this.name);

    return {
      defaultName: this.name,
      name: name,
      moduleName: this.config.get('appName') + '.' + _.capitalize(name),
      capitalizedName: _.capitalize(name)
    };
  },

  _createController: function () {
    var name = this.name;

    this.composeWith('ng-wr:controller', {
      args: [name],
      options: {
        module: name,
        service: true
      }
    });
  },

  _createService: function () {
    var name = this.name;

    this.composeWith('ng-wr:service', {
      args: [name],
      options: {
        module: name
      }
    });
  },

  _createView: function () {
    var name = this.name;

    this.composeWith('ng-wr:view', {
      args: [name],
      options: {
        module: name
      }
    });
  },

  _createStyle: function () {
    var name = this.name;

    this.composeWith('ng-wr:style', {
      args: [name],
      options: {
        module: name
      }
    });
  }
});
