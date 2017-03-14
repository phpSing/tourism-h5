import fetch from '../../common/fetch'
import { API_USER_INVEST_DETAIL,API_USER_TRANSFER_DETAIL } from '../../common/api'
import * as types from '../mutation-types'

// initial state
const state = {
  assetDetailData: {},
  translateDetailData: {}
}

// getters
const getters = {
  assetDetailData: state => state.assetDetailData,
  translateDetailData: state => state.translateDetailData
}

// actions
const actions = {
  /*获取投资详情*/
  getInvestDetailData: async ({commit, state}, param) => {
    try {
      const response = await fetch(API_USER_INVEST_DETAIL,param, {method: 'POST'})
      commit(types.GET_INVEST_DETAIL_DATA, response.dataresult)
    } catch (e) {
      console.log(e)
    }
  },
  /*获取变现详情*/
  getTranslateDetailData: async ({commit, state}, param) => {
    try {
      const response = await fetch(API_USER_TRANSFER_DETAIL,param, {method: 'POST'})
      commit(types.GET_TRANSLATE_DETAIL_DATA, response.dataresult)
    } catch (e) {
      console.log(e)
    }
  }
}

// mutations
const mutations = {
  [types.GET_INVEST_DETAIL_DATA] (state, payload) {
    state.assetDetailData = payload
  },
  [types.GET_TRANSLATE_DETAIL_DATA] (state, payload) {
    state.translateDetailData = payload
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
