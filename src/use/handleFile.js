const path = require('path');
const fse = require('fs-extra');

const constant = require('../../static/constant');
const errorMsg = require('../../static/errorMsg');

const ut = require('../../lib/util');
const Log = require('../../lib/util/log');

const isTextFile = require('../../lib/util/isTextFile');

function writeFile(path, formats) {
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
  const contentFormat = (_formats, data) => {
    if (Array.isArray(_formats)) {
      return _formats.reduce((result, format) => {
        return format(result) || '';
      }, data);
    } else {
      return _formats(data);
    }
  };

  if (type === 'create') {
    // console.log('contentFormat()', contentFormat());
    return fse.outputFile(path, contentFormat(formats, '') || '');
  } else if (type === 'update') {
    return fse.readFile(path, 'utf8').then(data => {
      return fse.writeFile(path, contentFormat(formats, data) || '', 'utf8');
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
  const currFilePath = path.format({
    dir: completePath,
    name: fileOption.path
  });
  const format = fileOption.format;

  let _content = fileOption.content;
  const otherActions = content => {
    let formatFunc;

    Log.push('  -> file path:', currFilePath);

    if (!format) {
      formatFunc = () => content;
    } else if (ut.isFunction(format)) {
      formatFunc = data => format(data, content);
    } else if (ut.isArray(format)) {
      formatFunc = [...format];
      formatFunc[0] = data => format[0](data, content);
    }

    return writeFile(currFilePath, formatFunc).then(() =>
      Log.push('    :success')
    );
  };
  // content is path
  if (/^@path\:/.test(_content)) {
    const contentFilePath = path.format({
      dir: completePath,
      name: _content.replace('@path:', '')
    });
    return fse
      .readFile(contentFilePath, 'utf8')
      .then(data => otherActions(data));
  } else {
    return otherActions(_content);
  }
}
function handleFiles(config, fileOptions) {
  //   index = index !== undefined ? index : 0;
  let loop = Promise.resolve();

  Log.push('handle file:');

  for (let item, i = 0; i < fileOptions.length; i++) {
    item = fileOptions[i];
    loop = loop.then(() => {
      return handleFile(config, item);
    });
  }
  return loop;
}

module.exports = handleFiles;
