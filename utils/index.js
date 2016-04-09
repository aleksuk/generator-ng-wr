var _ = require('lodash')

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

exports.toCamelCase = toCamelCase;
