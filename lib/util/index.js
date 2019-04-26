module.exports = {};

module.exports.isObject = obj =>
  Object.prototype.toString.call(obj) === '[object Object]';
module.exports.isString = str => typeof str === 'string';
module.exports.isArray = arr => Array.isArray(arr);
module.exports.isFunction = func => typeof func === 'function';
module.exports.isRegExp = reg =>
  Object.prototype.toString.call(reg) === '[object RegExp]';
