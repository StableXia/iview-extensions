/* eslint-disable no-undef */

const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpackBaseConfig = require('./webpack.base.config.js')
const buildService = require('./build.service.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const webpackConfig = merge(webpackBaseConfig, {
  mode: 'production',

  entry: {
    main: './examples/index.js'
  },

  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: '[name].js'
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html'
    }),

    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: 'static',
        ignore: ['.*']
      }
    ])
  ]
})

buildService(webpackConfig)
