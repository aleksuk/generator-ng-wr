'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
var path = require('path');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    this.argument('name', {
      type: String,
      required: true
    });

    this.log(this.options);
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
  },

  _getGeneratorParameters: function () {
    return {
      name: this.name,
      moduleName: this.config.get('appName') + '.' + _.capitalize(this.name),
      capitalizedName: _.capitalize(this.name)
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
  }
});
