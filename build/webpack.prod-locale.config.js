/* eslint-disable no-undef */

const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const buildService = require('./build.service.js')

process.env.NODE_ENV = 'production'

function createEntry() {
  const files = fs.readdirSync('./src/locale/lang')
  const entry = {}
  files.forEach(file => {
    const name = file.split('.')[0]
    entry[name] = './src/locale/lang/' + file
  })
  return entry
}

const webpackConfig = {
  mode: 'development',
  devtool: 'source-map',
  entry: createEntry(),
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          sourceMap: true
        },
        exclude: /node_modules/
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, '../ac-component/locale'),
    publicPath: '/ac-component/locale/',
    filename: '[name].js',
    library: 'ac-component/locale',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new UglifyJsPlugin({
      parallel: true,
      sourceMap: true
    })
  ]
}

buildService(webpackConfig)
