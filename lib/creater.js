const commander = require('commander');
const { resolve } = require('path');
const argv = require('minimist')(process.argv.slice(2));
const path = require('path');

const Log = require('./util/log');

const UseTempJson = require('../src/use/use');
const PackageJosn = require('../package.json');

commander
  .version(PackageJosn.version, '-v, --version')
  .description(`${PackageJosn.name} ${PackageJosn.description}`)
  .option('-u, --use', 'use template json');

commander.on('--help', function() {
  // console.log('');
  // console.log('Examples:');
  // console.log('');
  // console.log('    this is an example ');
  // console.log('');
});

commander.parse(process.argv);

// --use
if (commander.use) {
  Promise.resolve(UseTempJson(argv.u || argv.use))
    .then(() => {
      Log.done();
    })
    .catch(() => {
      Log.done();
    });
}
