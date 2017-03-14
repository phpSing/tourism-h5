import fetch from '../../common/fetch'
import { API_USER_TENDER_RECORD } from '../../common/api'
import * as types from '../mutation-types'

// initial state
const state = {
  investmentData: {}
}

// getters
const getters = {
  investmentData: state => state.investmentData
}

// actions
const actions = {
  getInvestmentData: async ({commit, state}, param) => {
    try {
      const response = await fetch(API_USER_TENDER_RECORD,param, {method: 'POST'})
      commit(types.GET_INVESTMENT_DETAIL_DATA, response.dataresult)
    } catch (e) {
      console.log(e)
    }
  }
}

// mutations
const mutations = {
  [types.GET_INVESTMENT_DETAIL_DATA] (state, payload) {
    state.investmentData = payload
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
