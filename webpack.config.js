const webpack = require('webpack')
const path = require('path')

const root = (_path) => {
  return path.resolve(__dirname, _path)
}

const moduleExternals = require('webpack-node-externals')

module.exports = (envOptions = {}) => {
  return ({
    entry: root('./src/index.ts'),
    output: {
      path: root('dist'),
      filename: 'universal-sitegen.js'
    },
    target: 'node',

    externals: [moduleExternals({
      whitelist: [
        'progress',
        'chalk',
        'prettysize'
      ]
    })],
    resolve: {
      extensions: ['.ts', '.js'],
      alias: {
        progress: 'progress',
        chalk: 'chalk',
        prettysize: 'prettysize'
      }
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          loaders: [{
            loader: 'awesome-typescript-loader',
            options: {
              configFileName: root('tsconfig.json')
            }
          }],
          exclude: [/node_modules/, /\.spec\.ts$/]
        },
        {
          test: /\.html$/,
          loader: 'raw-loader'
        }
      ]
    },
    plugins: [
      new webpack.ContextReplacementPlugin(
        /angular(\\|\/)core(\\|\/)@angular/
         // location of your src
        // {
        //   // your Angular Async Route paths relative to this root directory
        // }
      )
    ]
  })
}
