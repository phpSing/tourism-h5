// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'
import { sync } from 'vuex-router-sync'

import App from './App'
import VuexStore from './store'
// import { basePath } from './common/constants'
import { routes } from './router'

Vue.use(Vuex)
Vue.use(Router)

const store = new Vuex.Store(VuexStore)
const router = new Router({
  routes,
  base: '/',
  mode: 'history',
  saveScrollPosition: true
})

router.afterEach((to, from) => {
  // 路由切换更新meta title
  document.title = to.meta.title
  // 更改iframe src fix bug
  if (document.getElementById('title_refresher')) {

    let titleRefresher = document.getElementById('title_refresher')

    titleRefresher.src = '//st.haiziwang.com/static/passport/0.1.1/favicon.ico'

  }

})

sync(store, router)

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
