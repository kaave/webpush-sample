const
  path = require('path'),
  glob = require('glob'),
  webpack = require('webpack');

module.exports = {
  webpack: {
    entry: {
      app: [
        'babel-polyfill',
        './source/app.js'
      ],
      sw: [
        './source/sw.js'
      ]
    },
    output: {
      path: path.join(__dirname, '..', '..', 'build'),
      filename: '[name].js',
      publicPath: '/'
    },
    resolve: {
      extensions: ['.jsx', '.js']
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: 'babel-loader'
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        }
      ]
    }
  }
};
