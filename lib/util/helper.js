const ut = require('.');

const e = (module.exports = {});

// pc -> prevContent
// c  -> content
// append
const append = (search, pc) => {
  if (ut.isString(search)) {
    return search;
  } else if (ut.isRegExp(search)) {
    const result = pc.match(search);
    if (result && result[0]) {
      return result[0];
    }
    throw new Error(search.toString() + ' match failed');
  } else {
    return pc;
  }
};
/**
 * append
 * @search string|Regexp
 * @opts.content string
 * @opts.index 1|0 number|boolean default: 0, add before or after
 * @opts.lineFeed  Line feed in the middle
 */
e.append = (search, opts = {}) => (pc, c) => {
  const { content, index = 0, lineFeed = false } = opts;
  c = content || c | '';
  const str = append(search, pc);
  const lf = lineFeed ? '\n' : '';
  return pc.replace(str, index ? c + lf + str : str + lf + c);
};

/**
 * replace
 * @object {key: value}
 *  key string: Previous value
 *  value string: After value
 * @opts.global boolean default: true, Global replacement
 */
e.replace = (object, opts = {}) => content => {
  const { global = true } = opts;
  if (ut.isObject(object)) {
    Object.keys(object).map(perv => {
      if (ut.isString(perv) && ut.isString(object[perv])) {
        if (global && ut.isString(perv)) {
          while (content.indexOf(perv) !== -1) {
            content = content.replace(perv, object[perv]);
          }
        } else {
          content = content.replace(perv, object[perv]);
        }
      }
    });
  }
  return content;
};
/**
 * withPath
 * @path string path
 */
e.withPath = path => {
  if (ut.isString(path)) {
    return `@path:${path}`;
  }
  throw new Error('withPath(path) path must to be string');
};
