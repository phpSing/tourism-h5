import App from './App'
// 页面组件 懒加载
// 邀请 @ timwu
const Invite = resolve => require(['./containers/Invite'], resolve)
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
  { path: '/check', meta: {title: '每日签到'}, component: Check },
  // 邀请 @ timwu
  { path: '/invite', meta: { title: '邀请有礼' }, component: Invite },
  // __TEST__ 测试区
  // { path: '/__TEST__/address-picker', meta: { title: '省市区选择器' }, component: AddressPicker },
  //未找到路由转发回首页
  { path: '*', redirect: '/' },



]
