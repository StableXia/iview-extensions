import Vue from 'vue'

const isServer = Vue.prototype.$isServer

function addLangFile(lang) {
  if (!isServer) {
    if (typeof window.acComponent !== 'undefined') {
      if (!('langs' in window.acComponent)) {
        window.acComponent.langs = {}
      }
      window.acComponent.langs[lang.ac.locale] = lang
    }
  }
}

const RE_NARGS = /(%|)\{([0-9a-zA-Z_]+)\}/g
function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key)
}

/**
 * template
 * @param {String} string
 * @param {Array} ...args
 * @return {String}
 */
function getLangValue(string, ...args) {
  if (args.length === 1 && typeof args[0] === 'object') {
    args = args[0]
  }

  if (!args || !args.hasOwnProperty) {
    args = {}
  }

  return string.replace(RE_NARGS, (match, prefix, i, index) => {
    let result

    if (string[index - 1] === '{' && string[index + match.length] === '}') {
      return i
    } else {
      result = hasOwn(args, i) ? args[i] : null
      if (result === null || result === undefined) {
        return ''
      }

      return result
    }
  })
}

export { addLangFile, getLangValue }
