const path = require('path');
const fse = require('fs-extra');

const constant = require('../../static/constant');
const errorMsg = require('../../static/errorMsg');

const ut = require('../../lib/util');
const Log = require('../../lib/util/log');

const isTextFile = require('../../lib/util/isTextFile');

function writeFile(path, contentFormat) {
  let type = 'update';
  const isTextFileResult = isTextFile(path);
  if (isTextFileResult !== true) {
    if (isTextFileResult !== false) {
      if (
        typeof ('error: ' + isTextFileResult).indexOf === 'function' &&
        ('error: ' + isTextFileResult).indexOf(
          `no such file or directory, open '${path}'`
        ) !== -1
      ) {
        type = 'create';
      } else {
        return Promise.reject('error: ' + isTextFileResult);
      }
    } else {
      return Promise.reject('error: ', errorMsg.type.textFile);
    }
  }

  if (type === 'create') {
    // console.log('contentFormat()', contentFormat());
    return fse.outputFile(path, contentFormat('') || '');
  } else if (type === 'update') {
    return fse.readFile(path, 'utf8').then(data => {
      return fse.writeFile(path, contentFormat(data) || '', 'utf8');
    });
  }

  return Promise.reject("a 'type' param error  in writeFile function");
}

function handleFile(config, fileOption) {
  const dir = config && config.dir ? config.dir : '';
  let completePath = path.format({
    dir: constant.dir,
    name: dir
  });
  completePath = path.format({
    dir: completePath,
    name: fileOption.path
  });
  const format = fileOption.format;
  const content = fileOption.content;
  let formatFunc = () => '???';

  Log.push('handle file:', completePath);
  Log.push('  -> file path:', completePath);

  if (!format) {
    formatFunc = () => content;
  } else if (ut.isFunction(format)) {
    formatFunc = format;
  }

  return writeFile(completePath, formatFunc);
}
function handleFiles(config, fileOptions) {
  //   index = index !== undefined ? index : 0;
  let loop = Promise.resolve();
  for (let item, i = 0; i < fileOptions.length; i++) {
    item = fileOptions[i];
    loop = loop.then(() => {
      return handleFile(config, item);
    });
  }
  return loop;
}

module.exports = handleFiles;
