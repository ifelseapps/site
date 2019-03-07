const path = require('path');
const utils = require('./utils');

const themePath = utils.getThemePath(utils.parseParams(process.argv).theme);

module.exports = {
  entry: `${themePath}/src/bundle.js`,
  output: {
    filename: 'scripts.min.js',
    path: path.resolve(__dirname, '../', themePath, 'static')
  }
};
