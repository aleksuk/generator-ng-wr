var _ = require('lodash');
var chalk = require('chalk');

function toCamelCase(str) {
  return str.split('-').map(function (el, i) {
    var result;

    if (i > 0) {
      result = _.capitalize(el);
    } else {
      result = el
    }

    return result;
  }).join('');
}

function getIncludePath(path) {
  return path.replace('src/', '');
}

function includeToDependencies(path) {
  var newPath = getIncludePath(path);
  var dependenciesFile = 'src/dependencies.json';

  var dependencies = this.fs.read(this.destinationPath(dependenciesFile));
  var dependenciesJson = JSON.parse(dependencies);

  if (dependenciesJson.development.js.indexOf(newPath) < 0) {
    dependenciesJson.development.js.push(newPath);

    this.fs.write(dependenciesFile, JSON.stringify(dependenciesJson, null, 2));
    this.log(chalk.green('File will be included: ' + newPath));
  } else {
    this.log(chalk.yellow('File has already included: ' + newPath));
  }
}

function injectToInit() {
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

exports.injectToInit = injectToInit;
exports.includeToDependencies = includeToDependencies;
exports.toCamelCase = toCamelCase;
