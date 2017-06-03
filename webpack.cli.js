const common = require('./webpack.config')
const path = require('path')

const root = (_path) => {
  return path.resolve(__dirname, _path)
}

module.exports = (o = {}) => {
  return Object.assign(common(o), {
    externals: [],
    entry: './cli.ts',
    output: {
      path: root('dist'),
      filename: 'cli.js'
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          loaders: [{
            loader: 'awesome-typescript-loader',
            options: {
              configFileName: root('tsconfig.cli.json')
            }
          }],
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
