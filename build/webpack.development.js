const merge = require('webpack-merge');
const common = require('./webpack.common');
const postcss = require('./postcss');
const utils = require('./utils');
const themePath = utils.getThemePath(utils.parseParams(process.argv).theme);

module.exports = merge([
  common,
  {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            { loader: 'style-loader' },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 0
              }
            },
            postcss(themePath)
          ]
        }
      ]
    }
  }
]);
