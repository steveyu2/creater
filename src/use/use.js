const path = require('path');

const isTextFile = require('../../lib/util/isTextFile');
const Log = require('../../lib/util/log');

const constant = require('../../static/constant');
// const helpMsg = require('../../static/helpMsg');
const errorMsg = require('../../static/errorMsg');

const configValidate = require('./configValidate');
const handleFileOptions = require('./handleFile');

function validate(fileName) {
  const result = { error: false };

  // fileName：string
  if (typeof fileName !== 'string') {
    Log.push(errorMsg.required.useFilepath);
    result.error = true;
  }

  // 具体路径
  const completePath = path.format({
    dir: constant.dir,
    name: fileName
  });
  result.completePath = completePath;

  Log.push('read config file:');
  Log.push('  -> file path:', completePath);

  // 是否是文本文件
  const isTextFileResult = isTextFile(completePath);
  if (isTextFileResult !== true) {
    if (isTextFileResult !== false) {
      Log.push('error:', isTextFileResult);
    } else {
      Log.push('error:', errorMsg.required.useFilepath);
    }
    result.error = true;
  }

  // js文件
  if (!/\.js$/.test(completePath)) {
    Log.push('error:', errorMsg.required.useFilepath);
    result.error = true;
  }

  return result;
}

function handleError(err) {
  Log.push(err);
}

function main(configFileNamePath) {
  const { error, completePath } = validate(configFileNamePath);
  if (error) return;
  try {
    const createrJson = require(completePath);
    // Validate Config
    if (!configValidate(createrJson)) {
      return;
    }
    const config = createrJson.config || {};
    const fileOptions = createrJson.files || [];
    // for (let item, i = 0; y < fileOptions.length; i++) {
    // item = fileOptions[i];
    return handleFileOptions(config, fileOptions).catch(e => {
      e && Log.push(e);
    });
    // }
  } catch (e) {
    Log.push(e);
  }
}

module.exports = main;
