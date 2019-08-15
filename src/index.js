import { AcApp } from './components/ac-app'
import { AcNav, AcNavGroup, AcNavItem } from './components/ac-nav'
import { AcScrollView } from './components/ac-scroll-view'
import { AcIcon, AcIconTip } from './components/ac-icon'
import { AcTooltip } from './components/ac-tooltip'
import {
  AcAction,
  AcActionBlock,
  AcActionFilling
} from './components/ac-action'
import {
  AcToolbar,
  AcToolbarBlock,
  AcToolbarTitle,
  AcToolbarFilling
} from './components/ac-toolbar'
import { AcDemo } from './components/ac-demo'
import { AcCode } from './components/ac-code'

import locale from './locale/index'

const components = {
  AcApp,
  AcNav,
  AcNavGroup,
  AcNavItem,
  AcScrollView,
  AcIcon,
  AcIconTip,
  AcTooltip,
  AcToolbar,
  AcToolbarBlock,
  AcToolbarTitle,
  AcToolbarFilling,
  AcDemo,
  AcCode,
  AcAction,
  AcActionBlock,
  AcActionFilling
}

const AcComponent = {
  ...components
}

const install = function(Vue, opts = {}) {
  locale.use(opts.locale)
  locale.i18n(opts.i18n)

  Object.keys(AcComponent).forEach(key => {
    Vue.component(key, AcComponent[key])
  })
}

const API = {
  version: '',
  locale: locale.use,
  i18n: locale.i18n,
  install,
  ...components
}

API.lang = code => {
  const langObject = window['lib/locale'].default

  if (code === langObject.ac.locale) {
    locale.use(langObject)
  } else {
    console.log(`The ${code} language pack is not loaded.`)
  }
}

export default API
