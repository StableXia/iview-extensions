/* eslint-disable no-undef */

const path = require('path')
const merge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base.config.js')
const buildService = require('./build.service.js')

const webpackConfig = merge(webpackBaseConfig, {
  devtool: 'source-map',

  mode: 'development',

  entry: {
    index: './src/index.js'
  },

  output: {
    path: path.resolve(__dirname, '../ac-component'),
    filename: 'ac-component.js',
    library: 'ac-component',
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
  }
})

buildService(webpackConfig)
