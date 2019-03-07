module.exports = (themePath) => ({
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
        root: `${themePath}/src`
      }),
    ]
  }
});
