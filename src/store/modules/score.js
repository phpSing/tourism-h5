import fetch from '../../common/fetch'
import {
  API_SCORE_INDEX,
  API_SCORE_DETAIL,
  API_SCORE_EXCHANGE,
  API_SCORE_RECORD,
  API_MY_SCORE,
  API_SCORE_FOUN_INDEX
} from '../../common/api'
import {
  showAlert,
  showLoading,
  hideLoading
} from '../actions'
import {
  GET_SCORE_INDEX_DATA,
  GET_SCORE_DETAIL_DATA,
  CHANGE_SCORE_DETAIL_BTN_TYPE,
  GET_SCORE_RECORD_DATA,
  SCORE_CHANGE_CODE,
  REST_SCORE_CODE,
  UPDATE_MY_SCORE,
  UPDATE_MY_SCORE_STATUS,
  UPDATE_SCORE_FOUN_DATA,
  UPDATE_SCORE_FOUN_STATUS
} from '../mutation-types'

// initial state
// shape: [{ id, quantity }]
const state = {
  scoreIndexData: [],
  scoreDetailData: {},
  scroeExchangeBtnType: 0, //0:正常，1:确认兑换，2:兑换成功
  scoreRecordData: [],
  scoreChangeCode: 0,
  myScoreData: {},
  myScoreStatus: null,
  scoreFounData: {},
  scoreFounStatus: 0 // 默认未使用
}

// getters
const getters = {
  scoreIndexData: state => state.scoreIndexData,
  scoreDetailData: state => state.scoreDetailData,
  scroeExchangeBtnType: state => state.scroeExchangeBtnType,
  scoreRecordData: state => state.scoreRecordData,
  scoreChangeCode: state => state.scoreChangeCode,
  myScoreData: state => state.myScoreData,
  myScoreStatus: state => state.myScoreStatus,
  scoreFounData: state => state.scoreFounData,
  scoreFounStatus: state => state.scoreFounStatus
}

// actions
const actions = {
  //获取积分商品首页数据
  getScoreIndexData: async ({commit, state}, param) => {
    showLoading({commit, state})
    try {
      const response = await fetch(API_SCORE_INDEX, {page: 1, number: 100}, {method: 'POST'})
      hideLoading({commit, state})
      if (response.status == 1) {
        commit('GET_SCORE_INDEX_DATA', {list: response.dataresult.list})
      }
    } catch (e) {
      console.log(e)
    }
  },
  //获取积分商品详情页数据
  getScroeDetailData: async ({commit, state}, param) => {
    showLoading({commit, state})
    try {
      const response = await fetch(API_SCORE_DETAIL, {pid: param.pid}, {method: 'POST'})
      hideLoading({commit, state})
      if (response.status == 1) {
        commit('GET_SCORE_DETAIL_DATA', {data: response.dataresult})
      }
    } catch (e) {
      console.log(e)
    }
  },
  //改变积分商品详情页alert按钮类型
  scoreExchangeChangeBtnType: async ({commit, state}, param) => {
    commit('CHANGE_SCORE_DETAIL_BTN_TYPE', {type: param.type})
  },
  //积分商品兑换
  scoreDoExchange: async ({commit, state}, {type, ...param}) => {
    showAlert({commit, state}, '')
    commit('CHANGE_SCORE_DETAIL_BTN_TYPE', {type: type})
    showLoading({commit, state})
    try {
      const response = await fetch(API_SCORE_EXCHANGE, param, {method: 'POST'})
      hideLoading({commit, state})
      if (!response.status) {
        showAlert({commit, state}, response.errmsg)
      } else {
        commit('SCORE_CHANGE_CODE', {data: response.status})
        showAlert({commit, state}, '兑换成功！')
      }
    } catch (e) {
      showAlert({commit, state}, '网络发生错误！')
    }
  },
  //重置积分兑换score 
  restScoreCode: async ({commit, state}, param) => {
    commit('REST_SCORE_CODE', { data: param })
  },
  //获取积分商品兑换记录数据
  getScoreRecordData: async ({commit, state}, param) => {
    showLoading({commit, state})
    try {
      const response = await fetch(API_SCORE_RECORD, {page: 1, number: 100}, {method: 'POST'})
      hideLoading({commit, state})
      if (response.status == 1) {
        commit('GET_SCORE_RECORD_DATA', {list: response.dataresult.list})
      }
    } catch (e) {
      console.log(e)
    }
  },
  //我的积分
  getMyScore: async ({commit, state}, param = {}) => {
    let defaultParam = {
      page: 1,
      number: 100,
      status: 0,
    }
    param = Object.assign(defaultParam, param)
    try {
      const response = await fetch(API_MY_SCORE, param, {method: 'POST'})
      commit('UPDATE_MY_SCORE', response.dataresult)
      commit('UPDATE_MY_SCORE_STATUS', param.status)
    } catch (e) {
      console.log(e)
    }
  },
  //我的投资券
  getScoreFounData: async ({commit, state}, param = {}) => {
    let defaultParam = {
      page: 1,
      number: 100,
      status: 0
    }
    param = Object.assign(defaultParam, param)
    try {
      const response = await fetch(API_SCORE_FOUN_INDEX, param, {method: 'POST'})
      commit('UPDATE_SCORE_FOUN_DATA', response.dataresult)
      commit('UPDATE_SCORE_FOUN_STATUS', param.status)
    } catch (e) {
      console.log(e)
    }
  }
}

// mutations
const mutations = {
  [GET_SCORE_INDEX_DATA] (state, { list }) {
    state.scoreIndexData = list
  },
  [GET_SCORE_DETAIL_DATA] (state, { data }) {
    state.scoreDetailData = data
  },
  [CHANGE_SCORE_DETAIL_BTN_TYPE] (state, { type }) {
    state.scroeExchangeBtnType = type
  },
  [GET_SCORE_RECORD_DATA] (state, { list }) {
    state.scoreRecordData = list
  },
  [SCORE_CHANGE_CODE] (state, { data }) {
    state.scoreChangeCode = data
  },
  [REST_SCORE_CODE] (state, { data }) {
    state.scoreChangeCode = data
  },
  [UPDATE_MY_SCORE] (state, payload) {
    state.myScoreData = payload
  },
  [UPDATE_MY_SCORE_STATUS] (state, payload) {
    state.myScoreStatus = payload
  },
  [UPDATE_SCORE_FOUN_DATA] (state, payload) {
    state.scoreFounData = payload
  },
  [UPDATE_SCORE_FOUN_STATUS] (state, payload) {
    state.scoreFounStatus = payload
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
