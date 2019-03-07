const merge = require('webpack-merge');
const common = require('./webpack.common');
const postcss = require('./postcss');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const utils = require('./utils');

const themePath = utils.getThemePath(utils.parseParams(process.argv).theme);

module.exports = merge([
  common,
  {
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 0
              }
            },
            postcss()
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: `../static/styles.min.css`
      })
    ],
    optimization: {
      minimize: true,
      minimizer: [
        new OptimizeCssAssetsPlugin({
          cssProcessor: require('cssnano'),
          cssProcessorPluginOptions: {
            preset: ['default', { discardComments: { removeAll: true } }],
          },
          canPrint: true
        }),
        new UglifyJsPlugin()
      ]
    }
  }
]);
