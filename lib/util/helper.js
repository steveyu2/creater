const ut = require('.');

const e = (module.exports = {});

// bc -> beforeContent
// c  -> content
// append
const append = (search, bc) => {
  if (ut.isString(search)) {
    return search;
  } else if (ut.isRegExp(search)) {
    const result = bc.match(search);
    if (result && result[0]) {
      return result[0];
    }
    throw new Error(search.toString() + ' match failed');
  } else {
    return bc;
  }
};

e.append = (search, { index = 0, lineFeed = false }) => (bc, c) => {
  const str = append(search, bc);
  const lf = lineFeed ? '\n' : '';
  return bc.replace(str, index ? c + lf + str : str + lf + c);
};
