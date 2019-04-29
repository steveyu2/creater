module.exports = {
  config: {
    dir: 'test'
  },
  files: [
    {
      path: 'test_a.js',
      format: [a => a + '5', a => a + '5', a => a + '5']
    }
  ]
};
