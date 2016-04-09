'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
var path = require('path');
var toCamelCase = require('../../utils').toCamelCase;

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    this.argument('name', {
      type: String,
      required: true
    });
  },

  writing: function () {
    var modulePath = 'app/modules/' + this.name + '/',
        fullPath = 'src/' + modulePath,
        params = this._getGeneratorParameters();

    this.fs.copyTpl(
      this.templatePath('module.js'),
      this.destinationPath(fullPath + '/' + this.name + '.module.js'),
      params
    );

    this._createService();
    this._createController();
    this._createView();
    this._createStyle();
    this._injectIntoInit();
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
        module: name
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
  },

  _injectIntoInit: function () {
    var path = this.destinationPath('src/app/init.js');
    var initFile = this.fs.read(path);
    var name = toCamelCase(this.name);
    var moduleName = this.config.get('appName') + '\.' + _.capitalize(name);
    var strForReplacing = [
      ',\n            \'',
      moduleName,
      '\'/* injection */'
    ].join('');

    if (!(new RegExp(moduleName)).test(initFile)) {
      initFile = initFile.replace(/\/\*[\s]*?injection[\s]*?\*\//, strForReplacing);
    }

    this.fs.write(path, initFile);
  }
});
