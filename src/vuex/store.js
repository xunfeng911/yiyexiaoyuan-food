import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
// import * as actions from './actions.js'
// import * as getters from './getters.js'
import syusr from './module/syusr.js'
import synav from './module/synav.js'
import symes from './module/symes.js'

export default new Vuex.Store({
  // actions,
  // getters,
  modules: {
    syusr,
    synav,
    symes
  }
})
