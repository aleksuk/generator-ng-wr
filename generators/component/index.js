'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    this.argument('name', {
      type: String,
      required: true
    });

    this.prompt({
      type: 'confirm',
      name: 'service',
      message: 'Create service?',
      default: true
    }, function (props) {
      this.props = props;
      done();
    }.bind(this));
  },

  writing: function () {
    var pathConfig = this._getComponentSettings();

    this.rendnerParams = this._getGeneratorParameters(pathConfig.templateUrl);

    this.fs.copyTpl(
      this.templatePath('component.js'),
      this.destinationPath(pathConfig.file),
      this.rendnerParams
    );

    if (this.props.service) {
      this._createService();
    }

    this._createView();
    this._createStyle();
  },

  _getGeneratorParameters: function (templateUrl) {
    var capitalizedName = _.capitalize(this.name);
    return {
      name: this.name,
      capitalizedName: capitalizedName,
      templateUrl: templateUrl,
      moduleName: this.config.get('appName') + '.' + capitalizedName
    };
  },

  _getComponentSettings: function () {
    var name = this.name;

    return {
      templateUrl: 'app/components/' + name + '/' + name + '.html',
      file: 'src/app/components/' + name + '/' + name + '.directive.js'
    }
  },

  _createService: function () {
    var name = this.name;

    this.composeWith('ng-wr:service', {
      args: [name],
      options: {
        module: this.rendnerParams.moduleName,
        type: 'component'
      }
    });
  },

  _createView: function () {
    var name = this.name;

    this.composeWith('ng-wr:view', {
      args: [name],
      options: {
        module: this.rendnerParams.moduleName,
        type: 'component'
      }
    });
  },

  _createStyle: function () {
    var name = this.name;

    this.composeWith('ng-wr:style', {
      args: [name],
      options: {
        module: this.rendnerParams.moduleName,
        type: 'component'
      }
    });
  }
});
