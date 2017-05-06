const
  path = require('path'),
  webpack = require('webpack'),
  BrowserSyncPlugin = require('browser-sync-webpack-plugin'),
  CopyWebpackPlugin = require('copy-webpack-plugin');

const config = require('./base');

const plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': '\'development\''
  }),
  new webpack.LoaderOptionsPlugin({ debug: true }),
  new webpack.HotModuleReplacementPlugin(),
  new CopyWebpackPlugin(
    [{ from: './source/index.html' }],
    { ignore: ['.DS_Store'] }
  ),
  new BrowserSyncPlugin(
    {
      host: 'localhost',
      port: '3000',
      files: ['./source/index.html'],
      proxy: 'http://localhost:13000'
    },
    {
      reload: false
    }
  )
];
const devtool = '#inline-source-map';

const entry = {};
Object.keys(config.webpack.entry).forEach(key => (entry[key] = config.webpack.entry[key].concat([
  'webpack-dev-server/client?http://localhost:13000',
  'webpack/hot/only-dev-server'
])));

module.exports = Object.assign({}, config.webpack, {
  cache: true,
  entry,
  plugins,
  devtool,
  devServer: {
    publicPath: config.webpack.output.publicPath,
    port: 13000,
    hot: true,
    historyApiFallback: true
  }
});
