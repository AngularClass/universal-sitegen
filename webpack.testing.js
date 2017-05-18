const nodeExternals = require('webpack-node-externals')
const webpack = require('webpack')
const path = require('path')

const config = {
  devtool: 'cheap-module-source-map',
  resolve: {
    extensions: ['.ts', '.js', '.html', '.scss', '.css']
  },
  resolveLoader: {
    moduleExtensions: ['-loader']                                                      
  },
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader', 'angular2-template-loader']
      },
      {
        test: /\.gql$/,
        loader: 'graphql-tag/loader'
      },
      {
        test: /\.html$/,
        loader: 'raw-loader'
      },
      {
        test: /\.scss$/,
        use: [
          'to-string-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        loader: 'null'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'null'
      }
    ]
  }
}

module.exports = config
