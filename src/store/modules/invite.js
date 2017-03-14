import fetch from '../../common/fetch'
import { API_INVITE_INDEX } from '../../common/api'
import * as types from '../mutation-types'

// initial state
const state = {
  inviteIndexData: {}
}

// getters
const getters = {
  inviteIndexData: state => state.inviteIndexData
}

// actions
const actions = {
  getInviteData: async ({commit, state}, param) => {
    try {
      const response = await fetch(API_INVITE_INDEX, {page: 1, number: 100}, {method: 'POST'})
      commit('UPDATE_INVITE_DATA', response.dataresult)
    } catch (e) {
      console.log(e)
    }
  }
}

// mutations
const mutations = {
  [types.UPDATE_INVITE_DATA] (state, payload) {
    state.inviteIndexData = payload
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
