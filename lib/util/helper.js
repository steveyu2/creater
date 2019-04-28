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

e.append = (search, { index = 0, lineFeed = false }) => (pc, c) => {
  const str = append(search, pc);
  const lf = lineFeed ? '\n' : '';
  return pc.replace(str, index ? c + lf + str : str + lf + c);
};
