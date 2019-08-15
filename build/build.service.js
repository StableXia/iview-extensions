/* eslint-disable no-console */
/* eslint-disable no-undef */

const webpack = require('webpack')
const ora = require('ora')
const rlColor = require('cli-color')

class Message {
  constructor() {}
  error(msg) {
    console.log(rlColor.red.bold(msg))
  }
  warn(msg) {
    console.log(rlColor.yellow(msg))
  }
  notice(msg) {
    console.log(rlColor.blue(msg))
  }
  success(msg) {
    console.log(rlColor.green(msg))
  }
}

const consoleMsg = new Message()

module.exports = function(webpackConfig) {
  return new Promise((reslove, reject) => {
    const spinner = ora('building for production...')
    spinner.start()

    webpack(webpackConfig, (err, status) => {
      spinner.stop()
      if (err) throw err

      process.stdout.write(
        status.toString({
          colors: true,
          modules: false,
          children: false,
          chunks: false,
          chunkModules: false
        })
      )

      if (status.hasErrors()) {
        consoleMsg.error('Build failed with errors.')
        reject()
        process.exit(1)
      }

      consoleMsg.success('Build complete.')
      reslove()
    })
  })
}
