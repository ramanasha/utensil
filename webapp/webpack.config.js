const { resolve } = require('path');
const webpack = require('webpack');

const BUILD_DIR = resolve(__dirname, 'dist');

module.exports = {
  mode: 'development',
  entry: ['./src/index.jsx'],
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' },
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.scss'],
    alias: {
      common: resolve(__dirname, 'src/common'),
      data: resolve(__dirname, 'src/data'),
    },
  },
  devServer: {
    contentBase: BUILD_DIR,
    disableHostCheck: true,
    proxy: { '/api': 'http://localhost:8081' },
    historyApiFallback: true,
  },
  devtool: 'eval-source-map',
  plugins: [
    new webpack.NamedModulesPlugin(),
  ],
};
