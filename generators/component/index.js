'use strict';
var yeoman = require('yeoman-generator');
var _ = require('lodash');
var toCamelCase = require('../../utils').toCamelCase;
var includeToDependencies = require('../../utils').includeToDependencies;
var injectToInit = require('../../utils').injectToInit;

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

    includeToDependencies.call(this, pathConfig.file);

    if (this.props.service) {
      this._createService();
    }

    this._createView();
    this._createStyle();
    injectToInit.call(this);
  },

  _getGeneratorParameters: function (templateUrl) {
    var name = toCamelCase(this.name);
    var capitalizedName = _.capitalize(name);

    return {
      name: name,
      capitalizedName: capitalizedName,
      templateUrl: templateUrl,
      moduleName: this.config.get('appName') + '.' + capitalizedName,
      service: this.props.service
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
        module: this.rendnerParams.capitalizedName,
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
