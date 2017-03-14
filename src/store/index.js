import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import modules from './modules'
import mutations from './mutations'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

export default {
  actions,
  getters,
  state,
  modules,
  mutations,
  strict: debug,
  plugins: [
     createLogger()
  ]
}
