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

    this.prompt([
      {
        type: 'input',
        name: 'module',
        message: 'Input module name',
        validate: function (module) {
          if (!module) {
            return 'Module name can\'t be empty';
          }

          return true;
        }
      }, {
        type: 'confirm',
        name: 'service',
        message: 'Create service?',
        default: true
      }
    ], function (props) {
      this.props = props;
      this.log(props);
      done();
    }.bind(this));
  },

  writing: function () {
    var pathConfig = this._getDirectiveSettings(),
        params = this._getGeneratorParameters(pathConfig.templateUrl);

    this.fs.copyTpl(
      this.templatePath('directive.js'),
      this.destinationPath(pathConfig.file),
      params
    );


    if (this.props.service) {
      this._createService();
    }

    this._createView();
    this._createStyle();
  },

  _getGeneratorParameters: function (templateUrl) {
    return {
      name: this.name,
      capitalizedName: _.capitalize(this.name),
      templateUrl: templateUrl,
      moduleName: this.config.get('appName') + '.' + this.props.module
    };
  },

  _getDirectiveSettings: function () {
    var name = this.name;
    return {
      templateUrl: 'app/modules/' + this.props.module + '/directives/' + name + '/' + name + '.html',
      file: 'src/app/modules/' + this.props.module + '/directives/' + name + '/' + name + '.directive.js'
    }
  },

  _createService: function () {
    var name = this.name,
        module = this.props.module;

    this.composeWith('ng-wr:service', {
      args: [name],
      options: {
        module: module,
        type: 'directive'
      }
    });
  },

  _createView: function () {
    var name = this.name,
        module = this.props.module;

    this.composeWith('ng-wr:view', {
      args: [name],
      options: {
        module: module,
        type: 'directive'
      }
    });
  },

  _createStyle: function () {
    var name = this.name,
        module = this.props.module;

    this.composeWith('ng-wr:style', {
      args: [name],
      options: {
        module: module,
        type: 'directive'
      }
    });
  }
});
