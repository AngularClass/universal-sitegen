const path = require('path');

module.exports = {
  entry: './server.ts',
  resolve: {
    extensions: [
      '.ts',
      '.js'
    ]
  },
  target: 'node',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'server.js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loaders: [
          'awesome-typescript-loader',
          'angular2-template-loader'
        ]
      },
      {
        test: /\.html$/,
        loader: 'raw-loader'
      }
    ]
  }
}
