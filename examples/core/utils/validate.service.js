/**
 * Whether the parameter is one of them is one of them
 * @param {String} value
 * @param {Array} validList
 */
function oneOf(value, validList) {
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return true
    }
  }
  return false
}

function typeOf(obj) {
  const [toString] = [Object.prototype.toString]
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  }
  return map[toString.call(obj)]
}

function isEmptyObj(obj) {
  const OBJ = obj || {}
  return !(JSON.stringify(OBJ).length > 2)
}

function hasCharacter(str, cht, start = 0) {
  const chtArr = cht.split(',')
  for (let i = 0; i < chtArr.length; i += 1) {
    if (str.indexOf(chtArr[i], start) !== -1) {
      return true
    }
  }
  return false
}

function isMac(mac) {
  const reg = new RegExp('^([0-9a-fA-F]{2})(([/s:-][0-9a-fA-F]{2}){5})$', 'g')
  return reg.test(mac)
}

/**
 * check if the input string is Ip Address
 * @param { String } ip
 * @return { Boolean }
 */
function isIp(ip) {
  const MAX_IP_VALUE = 256
  let isIpFlag = false
  const ipRegExp = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/
  if (ipRegExp.test(ip)) {
    if (
      RegExp.$1 < MAX_IP_VALUE &&
      RegExp.$2 < MAX_IP_VALUE &&
      RegExp.$3 < MAX_IP_VALUE &&
      RegExp.$4 < MAX_IP_VALUE
    ) {
      isIpFlag = true
    }
  }
  return isIpFlag
}

export default {
  oneOf,
  typeOf,
  isEmptyObj,
  hasCharacter,
  isMac,
  isIp
}
