module.exports = (themePath) => ({
  loader: 'postcss-loader',
  options: {
    plugins: [
      require('autoprefixer'),
      require('css-mqpacker'),
      require('postcss-import')({
        root: `${themePath}/src`
      }),
    ]
  }
});
