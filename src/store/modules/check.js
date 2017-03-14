import fetch from '../../common/fetch'
import * as types from '../mutation-types'
import * as apis from '../../common/api'
// initial state
// shape: [{ id, quantity }]
const state = {
  rule: {
    rules: '<div class="rule" style="line-height:1.47667rem">',
    title: null
  },
  totalAttend: {
    totalAttendDays: 0,
    totalScores: 0
  },
  isAttendToday: null,
  signIn: [],
  status: 1
}

// getters
const getters = {
  rule: state => state.rule,
  totalAttend: state => state.totalAttend,
  signIn: state => state.signIn,
  isAttendToday: state => state.isAttendToday,
  status: state => state.status
}

// actions
const actions = {
  getCheckIndexData: async ({commit, state}) => {
    try {
      commit(types.SHOW_LOADING)
      const response = await fetch(apis.API_CHECK_INDEX, {}, {method: 'POST'})
      commit(types.HIDE_LOADING)
      commit(types.CHECKSIGN_SUCCESS, { data: {
        rule: {
          rules: response.dataresult.rule.rules,
          title: response.dataresult.rule.title
        },
        totalAttend: {
          totalAttendDays: response.dataresult.totalAttendDays,
          totalScores: response.dataresult.totalScores
        },
        weeks: response.dataresult.weeks,
        isAttendToday: response.dataresult.isAttendToday
      }})
    } catch (e) {
      commit(types.HIDE_LOADING)
      commit(types.SHOW_ALERT, '网络异常！')
    }
  },
  onSignIn: async ({commit, state}) => {
    try {
      commit(types.SHOW_LOADING)
      const response = await fetch(apis.API_CHECK_SIGNIN, {}, {method: 'POST'})
      commit(types.HIDE_LOADING)
      commit(types.CHECKONSIGN_SUCCESS, { data: {
        status: response.dataresult.score
      }})
    } catch (e) {
      commit(types.HIDE_LOADING)
      commit(types.SHOW_ALERT, '网络异常！')
    }
  }
}

// mutations
const mutations = {
  [types.CHECKSIGN_SUCCESS] (state, { data }) {
    state.rule.rules = '<div class="rule" style="line-height:1.47667rem">'
    data.rule.rules.map((value) => {
      let val = value.replace(/(\d+)/g, "<em style='font:bold 0.90667rem Arial, sans-serif;color:#f65a24'>$1</em>")
      state.rule.rules += val + '<br/>' 
    });
    state.rule.rules += '</div>'
    state.rule.title = data.rule.title
    
    state.totalAttend.totalAttendDays = data.totalAttend.totalAttendDays
    state.totalAttend.totalScores = data.totalAttend.totalScores
    state.isAttendToday = data.isAttendToday
    data.weeks.map((value) => {
      state.signIn.push(value.isAttend)
    })
  },
  [types.CHECKONSIGN_SUCCESS] (state, { data }) {
    state.status = data.status
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
