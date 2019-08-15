/* eslint-disable no-undef */

const path = require('path')

module.exports = {
  dev: {
    port: 6061,
    hot: true,

    assetsSubDirectory: 'static',
    assetsPublicPath: '/'
  },

  build: {
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/'
  }
}
