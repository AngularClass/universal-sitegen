const webpack = require('webpack')
const path = require('path')

const root = (_path) => {
  return path.resolve(__dirname, _path)
}

const excludeNodeModules = require('webpack-node-externals')

module.exports = (envOptions = {}) => {
  return ({
    entry: root('./src/index.ts'),
    output: {
      path: root('dist'),
      filename: 'bundle.js',
      libraryTarget: 'commonjs2'
    },
    target: 'node',
    externals: [excludeNodeModules()],
    resolve: {
      extensions: ['.ts', '.js', '.html', '.scss', '.css'],
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          loaders: [
            {
              loader: 'awesome-typescript-loader',
              options: {
                declaration: false
              }
            },
            'angular2-template-loader'
          ],
          exclude: [/node_modules/, /\.spec\.ts$/]
        },
        {
          test: /\.html$/,
          loader: 'raw-loader'
        }
      ]
    }
  })
}
