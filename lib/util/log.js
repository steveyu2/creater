const logs = [];
module.exports = {
  push: function() {
    logs.push(arguments);
  },
  done: function() {
    const crrLogs = logs.slice();
    console.log('.');
    if (arguments.length > 0) {
      crrLogs.push(arguments);
    }
    crrLogs.forEach(log => {
      console.log.apply(console, log);
    });
    console.log('.');
  }
};
