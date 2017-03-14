<template>
  <div class="container-app">
    <div class="router-view">
      <TitleRefresher />
      <transition>
        <router-view></router-view>
      </transition>
    </div>

    <Loader
      v-if="fetching"
    />

  </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
//rebuild fetech prototype
import fetch from './common/fetch'

import Alert from './components/Alert'
import Loader from './components/Loader'
import TitleRefresher from './components/TitleRefresher'

export default {
  created() {
    // 为fetch添加错误处理
    Window.prototype.fetchErrorHandle = this.showAlert
  },
  methods: mapActions([
    'showAlert',
    'hideAlert',
    'showLoading',
    'hideLoading'
  ]),
  computed: mapGetters([
    'fetching',
    'alertMessage'
  ]),
  components: {
    Alert,
    Loader,
    TitleRefresher
  }
}
</script>
<style lang="scss">
@import './scss/common';


</style>
