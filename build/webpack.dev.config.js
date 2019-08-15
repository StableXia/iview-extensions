/* eslint-disable no-undef */

const path = require('path')
const portfinder = require('portfinder')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpackBaseConfig = require('./webpack.base.config.js')
const config = require('../config')

const devWebpackConfig = merge(webpackBaseConfig, {
  mode: 'development',

  entry: {
    main: './examples/index.js'
  },

  devServer: {
    contentBase: '/',
    port: config.dev.port,
    open: true,

    historyApiFallback: {
      rewrites: [
        {
          from: /.*/,
          to: path.posix.join(config.dev.assetsPublicPath, 'index.html')
        }
      ]
    }
  },

  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: '[name].js'
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
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

// portfinder检测当前运行的进程打开了哪些端口，然后webpack-dev-server运行打开服务，如果不做异步可能对应端口号的服务还没起来就去访问会出现-[找不到此网站]-的字样。
module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [
              `Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`
            ]
          }
        })
      )

      resolve(devWebpackConfig)
    }
  })
})
