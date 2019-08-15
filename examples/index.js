import Vue from 'vue'
import router from './router/index.js'

import store from './store'
import { navService } from '$examples/core'

// Install components
import acComponent from '../src'
import '../src/styles/main.scss'
Vue.use(acComponent)

new Vue({
  el: '#app',
  router,
  store,
  template: '<router-view></router-view>'
})

/** init the nav id on startup and watch it for changes */
navService.initNavId(router, store)
