import Vue from 'vue'
import Vuex from 'vuex'

import { CoreStoreModule } from '$examples/core'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    CoreStoreModule
  }
})

export default store
