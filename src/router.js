import App from './App'
// 页面组件 懒加载
// 邀请 @ timwu
const Homepage = resolve => require(['./containers/Homepage'], resolve)
// 详情页-投资协议
// const AgreementInvest = resolve => require(['./containers/AgreementInvest'], resolve)
// 协议 规则
// const Agreement = resolve => require(['./containers/Agreement'], resolve)
// h5假登陆
// const Login = resolve => require(['./containers/Login'], resolve)
// 测试区 － 省市区选择器
// const AddressPicker = resolve => require(['./containers/__TEST__/AddressPicker'], resolve)
// 路由配置
export const routes = [
    // { path: '/__TEST__/address-picker', meta: { title: '省市区选择器' }, component: AddressPicker },
  { path: '/', meta: { title: '首页' }, component: Homepage },
  // __TEST__ 测试区
  // { path: '/__TEST__/address-picker', meta: { title: '省市区选择器' }, component: AddressPicker },
  //未找到路由转发回首页
  { path: '*', redirect: '/' },

]
