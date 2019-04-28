const helper = require('./lib/util/helper');

module.exports = {
  config: {
    dir: 'test'
  },
  files: [
    {
      path: 'files/test_1.js',
      format: (beforeContent, content) => beforeContent + content,
      content: '7779'
    },
    {
      path: 'files/test_2.js',
      format: (beforeContent, content) => beforeContent + content,
      content: '@path:temp.js'
    },
    {
      path: 'files/test_3.js',
      format: helper.append(/3/, { index: 1 }),
      content: '66'
    }
  ]
};
