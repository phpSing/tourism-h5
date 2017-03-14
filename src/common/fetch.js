import Fetch from 'isomorphic-fetch'
import { objToQuery } from './helper'
import Cookie from 'js-cookie'
import * as apis from './api'
import { deviceType, basePath } from './constants'

const config = {
  method: 'GET'
	// credentials: 'include'
}
/**
 * @private
 * [发送fetch请求]
 * @param  {[String]} url     [请求地址]
 * @param  {[Object]} data    [param数据]
 * @param  {[Object]} options [配置参数]
 *   e.g: [String]method, [Object]headers, [String]credentials
 * @return {[Object]}      [请求结果，暂时只支持json格式的请求]
 */
let fetch = async function (url, data, opt) {

  let app = app || window.app

	const options = Object.assign({}, config, opt);

  // 添加公共cookie参数部分
  Cookie.set('session_id','test')
  // 统一检测未登录， 跳转
  if (!Cookie.get('session_id')
      && url != apis.API_LOGIN) {

    if (app) { // app 内
      location.href = '?cmd=login'
    } else {
      location.href = `${basePath}/login/?redirect=${encodeURIComponent(escape(location.href))}`
    }
  }

  // 添加公共cookie参数部分
  let _deviceid_ = Cookie.get('_deviceid_') || '9CFCC450-8F30-486A-BC71-1069FFE619C8'
  let _client_ = Cookie.get('_client_') || 'IOS'
  let _sign_ = Cookie.get('_sign_') || '52e4b794d898bb4e19fe597863646984'
  let session_id = Cookie.get('session_id') || 'test'
  let PHPSESSID = Cookie.get('PHPSESSID') || 'test'

  data = Object.assign(data, {
    _deviceid_,
    _client_,
    _sign_
  })

  if (url != apis.API_LOGIN) {

    data = Object.assign(data, {
      session_id,
      PHPSESSID
    })
  }

	if (options.method.toUpperCase() === 'POST') {
		options.headers = Object.assign({
			"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
		}, options.headers)
		options.body = objToQuery(data)
	} else {
		url = (data && Object.keys(data).length > 0) ? `${url}?${objToQuery(data)}` : url;
	}
	const result = await Fetch(url, options)

  if (result.status != 200) {
    // 错误
    if (__proto__.fetchErrorHandle) {
      __proto__.fetchErrorHandle(json.errmsg || '请求未知错误')
    }
  }

	const json = await result.json()

  if (json.status == 0) {
    if (json.errcode == 'SESSION_EXPIRE') {
      // 登陆
      if (app) { // 线上
        location.href = '?cmd=login'
      } else {
        location.href = `${basePath}/login/?redirect=${encodeURIComponent(escape(location.href))}`
      }
    }
  }

	return json
}

export default fetch
