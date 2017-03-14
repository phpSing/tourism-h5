<template lang="html">

  <div class="container-fluid">

    <div class="flex-row">
      <div class="cpt-address-picker">
        <select class="custom-select">
          <option selected>Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
    </div>

    <div class="flex-row">
      <div class="cpt-address-picker">
        <select class="custom-select">
          <option selected>Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
    </div>

    <div class="flex-row">
      <div class="cpt-address-picker">
        <select class="custom-select">
          <option selected>Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
    </div>

  </div>


</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import * as types from '../../store/mutation-types'
import * as apis from '../../common/api'
import fetch from '../../common/fetch'
import 'bootstrap/scss/bootstrap.scss'

export default {
  data () {
    return {
      pcdData: []
    }
  },
  computed: {},
  async mounted () {
    await this.getPCD()
  },
  methods: {
    ...mapActions([

    ]),
    getPCD: async function() {
      let res
      try {

        res = await fetch(apis.API_P_C_D, {

        }, {method: 'POST'})

      } catch (e) {

      } finally {
        console.log('res.dataresult', res.dataresult);
        this.pcdData = res.dataresult
      }
    }
  },
  components: {}
}
</script>

<style lang="scss">
@import '../../scss/variable.scss';

.flex-row {
  margin-top: toRem(60px);
}
</style>
