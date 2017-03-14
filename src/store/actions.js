import * as types from './mutation-types'
import * as apis from '../common/api'
import fetch from '../common/fetch'
import Cookie from 'js-cookie'

export const showLoading = ({commit, state}, param) => {
  commit(types.SHOW_LOADING, param)
}

export const hideLoading = ({commit, state}, param) => {
  commit(types.HIDE_LOADING, param)
}

export const showAlert = ({commit, state}, param) => {
  commit(types.SHOW_ALERT, param)
}

export const hideAlert = ({commit, state}, param) => {
  commit(types.HIDE_ALERT, '')
}

export const login = async ({commit, state}, param) => {

  let res

  try {

    res = await fetch(apis.API_LOGIN, param, {method: 'POST'})

  } catch (e) {
    console.log(e);
    // commit(types.SHOW_ALERT, e)

  } finally {

    if (res.status == 1) {

      let data = res.dataresult

      for (let i = 0; i < Object.keys(data).length; i++) {

        let key = Object.keys(data)[i]

        localStorage.setItem(key, data[key])
        localStorage.setItem('PHPSESSID', data[`session_id`])
        Cookie.set(key, data[key])
        Cookie.set(`PHPSESSID`, data[`session_id`])

      }

      commit(types.GET_LOGIN_INFO, data)
      // commit(types.SHOW_ALERT, '登陆成功')
    }

  }
}
