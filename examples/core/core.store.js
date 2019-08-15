/**
 * Core states will be in global scope even they are in core state module (i.e. not in the
 * isolated namespace) as they should be always appllication-level data accessed by various
 * feature modules.
 *
 * LoginInfo is a very special state that we put in the core state instead of login feature
 * module.
 */

export default {
  namespaced: true,

  state: {
    navCollapsed: false,
    selectedNavItemId: ''
  },

  mutations: {
    selectNavItem(state, payload) {
      state.selectedNavItemId = payload.navId
    },

    toggleNav(state, payload) {
      state.navCollapsed = payload ? payload.collapse : !state.navCollapsed
    }
  }
}
