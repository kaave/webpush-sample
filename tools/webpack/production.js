const
  webpack = require('webpack'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const config = require('./base');

const plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': '\'production\''
  }),
  new webpack.LoaderOptionsPlugin({ debug: false }),
  new CopyWebpackPlugin(
    [{ from: './source/index.html' }],
    { ignore: ['.DS_Store'] }
  ),
  new UglifyJSPlugin()
];
const devtool = false;

module.exports = Object.assign({}, config.webpack, {
  cache: false,
  plugins,
  devtool
});
