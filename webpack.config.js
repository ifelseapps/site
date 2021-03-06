const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const extractPlugin = new MiniCssExtractPlugin({
  filename: '../assets/styles.min.css'
});

const optimizePlugin = new OptimizeCssAssetsPlugin({
  // assetNameRegExp: /\.optimize\.css$/g,
  cssProcessor: require('cssnano'),
  cssProcessorPluginOptions: {
    preset: ['default', { discardComments: { removeAll: true } }],
  },
  canPrint: true
});
const uglifyPlugin = new UglifyJsPlugin();

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: './src/bundle.js',
    output: {
      filename: 'scripts.min.js',
      path: path.resolve(__dirname, 'assets')
    },
    devServer: {
      contentBase: __dirname,
      publicPath: '/assets/',
      compress: true,
      port: 4000
    },
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
            isProduction ? MiniCssExtractPlugin.loader : { loader: "style-loader" },
            { loader: 'css-loader', options: { importLoaders: 0 } },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  require('autoprefixer'),
                  require('css-mqpacker'),
                  require('postcss-custom-media')({
                    extensions: {
                      '--phone': '(min-width: 320px)',
                      '--tablet': '(min-width: 768px)',
                      '--desktop': '(min-width: 1024px)',
                      '--large': '(min-width: 1200px)'
                    }
                  }),
                  require('postcss-import')({
                    root: 'src/'
                  }),
                ]
              }
            }
          ]
        }
      ]
    },
    plugins: [
      ...(isProduction ? [extractPlugin] : []),
    ],
    optimization: {
      minimize: true,
      minimizer: [
        ...(isProduction ? [optimizePlugin, uglifyPlugin] : []),
      ]
    }
  };
};
