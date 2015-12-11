'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

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
    this.fs.copyTpl(
      this.templatePath('style.scss'),
      this.destinationPath(this['_get' + this.type + 'Path']()),
      { name: this.name }
    );

    this._includeSCSS();
  },

  _getDirectivePath: function () {
    var name = this.name;
    return 'src/app/modules/' + this.options.module + '/directives/' + name + '/' + name + '.scss';
  },

  _getModulePath: function () {
    return 'src/app/modules/' + this.options.module + '/styles/' + this.name + '.scss';
  },

  _getComponentsPath: function () {
    return 'src/app/components/' + this.name + '/' + this.name + '.scss';
  },

  _includeSCSS: function () {
    var scssPath = this.destinationPath('src/assets/styles/main.scss'),
        file = this.fs.read(scssPath),
        includingStr = '@import "../../app/modules/' + this.name + '/styles/' + this.name + '.scss";',
        updatedFile;

    if (!~file.indexOf(includingStr)) {
      updatedFile = file.replace(/\/\* end: modules \*\//, includingStr + '\n/* end: modules */');
      this.fs.write(scssPath, updatedFile);
    } else {
      this.log(
          chalk.yellow(this.name + '.scss has already included!')
      );
    }
  }
});
