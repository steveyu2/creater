const Log = require('../../lib/util/log');
const ut = require('../../lib/util');

const helpString = ` config type:
    file path: string
    {
      config?: {
        dir?: file path
      },
      files: [
        {
          path: file path
          format?: (beforeContent, content) => content // beforeContent value = create? '' : content
          content: string | file path(eg. "@path:22.js" distinguish normal string)
        }
      ]
    }`;

module.exports = function(options) {
  let state = true;
  if (ut.isObject(options)) {
    // config
    if (ut.isObject(options.config) || options.config === undefined) {
      if (
        options.config.dir !== undefined &&
        !ut.isString(options.config.dir)
      ) {
        state = false;
        Log.push(`config.dir is string type `);
      }
    } else {
      state = false;
      Log.push(`config is object type `);
    }
    if (ut.isArray(options.files)) {
      for (let i = 0, item; i < options.files.length; i++) {
        item = options.files[i];
        console.log('item.format', item.format);
        if (ut.isObject(item)) {
          if (
            ut.isString(item.path) &&
            ut.isString(item.content) &&
            (item.format === undefined || ut.isFunction(item.format))
          ) {
            continue;
          }
        }
        Log.push(`files[${i}] has some error`);
        state = false;
        break;
      }
    }
  }
  if (!state) {
    Log.push(helpString);
  }
  return state;
};
