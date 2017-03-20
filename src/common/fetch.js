import Fetch from 'isomorphic-fetch'
import { objToQuery } from './helper'
import Cookie from 'js-cookie'

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

	const options = Object.assign({}, config, opt);

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

	return json
}

export default fetch
