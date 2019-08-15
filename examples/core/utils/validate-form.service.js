import { coreAssistService } from '$examples/core/utils'

function ipValidator(rule, value, callback) {
  let valueArr = []
  let pass = true // validate pass / fail
  let errorType = 0
  const ERROR_TYPE = {
    IP: 0,
    IP_RANGE: 1
  }
  const errorMessage = {
    [ERROR_TYPE.IP]: 'IP格式错误',
    [ERROR_TYPE.IP_RANGE]: 'IP网段格式错误'
  }

  if (value.indexOf(',') > -1) {
    valueArr = value.split(',')
  } else {
    valueArr.push(value)
  }

  valueArr.forEach(item => {
    if (item.indexOf('/') > -1) {
      const ips = item.split('/')
      const range = parseInt(ips[1], 10)
      if (
        !(coreAssistService.validate.isIp(ips[0]) && range >= 0 && range <= 32)
      ) {
        pass = false
        errorType = ERROR_TYPE.IP_RANGE
      }
    } else if (item.indexOf('-') > -1) {
      const ips = item.split('-')
      if (
        !(
          coreAssistService.validate.isIp(ips[0]) &&
          coreAssistService.validate.isIp(ips[1])
        )
      ) {
        pass = false
        errorType = ERROR_TYPE.IP_RANGE
      }
    } else if (item && !coreAssistService.validate.isIp(item)) {
      pass = false
      errorType = ERROR_TYPE.IP
    }
  })

  if (pass) {
    callback()
  } else {
    callback(new Error(errorMessage[errorType]))
  }
}

function portValidator(rule, value, callback) {
  let valueArr = []
  let pass = true
  let errorType = 0
  const ERROR_TYPE = {
    PORT: 0,
    PORT_RANGE: 1
  }
  const errorMessage = {
    [ERROR_TYPE.PORT]: '端口格式错误',
    [ERROR_TYPE.PORT_RANGE]: '端口范围格式错误'
  }

  if (value.indexOf(',') > -1) {
    valueArr = value.split(',')
  } else {
    valueArr.push(value)
  }
  valueArr.forEach(port => {
    if (port.indexOf('-') > -1) {
      const ports = port.split('-')
      if (
        !coreAssistService.validate.isPort(ports[0]) ||
        !coreAssistService.validate.isPort(ports[1])
      ) {
        pass = false
        errorType = ERROR_TYPE.PORT_RANGE
      }
    } else if (port && !coreAssistService.validate.isPort(port)) {
      pass = false
      errorType = ERROR_TYPE.PORT
    }
  })

  if (pass) {
    callback()
  } else {
    callback(new Error(errorMessage[errorType]))
  }
}

/**
 *  if value === '' || parseFloat(value) > 0 , valid pass.
 *  else valid not pass
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
function nonNegativeNumberValidator(rule, value, callback) {
  let pass = true

  if (value) {
    if (Number.isNaN(Number(value))) {
      pass = false
    } else if (parseFloat(value) < 0) {
      pass = false
    }
  }

  if (pass) {
    callback()
  } else {
    callback(new Error('请输入非负数'))
  }
}

export default {
  ipValidator,
  portValidator,
  nonNegativeNumberValidator
}
