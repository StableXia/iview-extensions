import Vue from 'vue'
import VueRouter from 'vue-router'

import { AcAppMain } from '$examples/core/ac-app-main'
import { modulesRoute } from '$examples/modules'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',

  routes: [
    {
      path: '/M',
      component: AcAppMain,
      redirect: '/icon',
      children: [...modulesRoute]
    },
    {
      /** for any unmatched routes */
      path: '/(.*)',
      redirect: '/M'
    }
  ]
})

export default router
