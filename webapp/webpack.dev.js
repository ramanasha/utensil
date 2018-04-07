const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    contentBase: BUILD_DIR,
    disableHostCheck: true,
    proxy: { '/api': 'http://localhost:8080' },
    historyApiFallback: true,
  },
  devtool: 'eval-source-map',
  plugins: [
    new webpack.NamedModulesPlugin(),
  ],
});
