const webpack = require('webpack');
const { resolve } = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const BUILD_DIR = resolve(__dirname, 'dist');

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
