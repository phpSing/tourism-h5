import * as types from './mutation-types'

export default {

  [types.SHOW_LOADING] (state, payload) {

    state.fetching = true

  },

  [types.HIDE_LOADING] (state, payload) {

    state.fetching = false

  },

  [types.SHOW_ALERT] (state, payload) {

    state.alertMessage = payload

  },

  [types.HIDE_ALERT] (state, payload) {

    state.alertMessage = ''

  },

  [types.GET_LOGIN_INFO] (state, payload) {

    state.loginInfo = payload

  }


}
