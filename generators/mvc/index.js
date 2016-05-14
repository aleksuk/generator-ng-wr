'use strict';
var yeoman = require('yeoman-generator');
var _ = require('lodash');
var toCamelCase = require('../../utils').toCamelCase;
var includeToDependencies = require('../../utils').includeToDependencies;

module.exports = yeoman.Base.extend({
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
        message: 'Input module name (use "-" for split words, example "test-module")',
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
      done();
    }.bind(this));
  },

  writing: function () {
    this._createService();
    this._createController();
    this._createView();
    this._createStyle();
    this._addRoute();
  },

  _getGeneratorParameters: function () {
    var name = toCamelCase(this.name);

    return {
      defaultName: this.name,
      name: name,
      moduleName: this.props.module,
      capitalizedName: _.capitalize(name)
    };
  },

  _createStyle: function () {
    var name = this.name,
      module = this.props.module;

    this.composeWith('ng-wr:style', {
      args: [name],
      options: {
        module: module
      }
    });
  },

  _createService: function () {
    var name = this.name,
      module = this.props.module;

    this.composeWith('ng-wr:service', {
      args: [name],
      options: {
        module: module
      }
    });
  },

  _createController: function () {
    var name = this.name;

    this.composeWith('ng-wr:controller', {
      args: [name],
      options: {
        module: this.props.module,
        service: (this.props.service) ? true : false
      }
    });
  },

  _createView: function () {
    var name = this.name,
      module = this.props.module;

    this.composeWith('ng-wr:view', {
      args: [name],
      options: {
        module: module
      }
    });
  },

  _addRoute: function () {
    var module = this.props.module;
    var path = this.destinationPath('src/app/modules/' + module + '/' + module + '.module.js');
    var moduleFile = this.fs.read(path);
    var templateStr = this.fs.read(this.templatePath('route.js'));
    var template = _.template(templateStr);
    var strForReplacing = template(this._getGeneratorParameters()) + '            /* injection */';

    moduleFile = moduleFile.replace(/\/\*[\s]*?injection[\s]*?\*\//, strForReplacing);
    this.fs.write(path, moduleFile);
  }
});

