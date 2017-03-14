<template lang="html">
    <div class="toast-wrapper" :class="{
            show: toast.isShow
        }">
        <div class="toast-body">
            <div class="toast-content">
                {{ toast.content }}
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {

  data () {
    return {}
  },

  computed: mapGetters([
      'toast',
  ]),

  mounted () {
  },

  methods: {
      ...mapActions([
        'hideToast',
    ]),
  },

  components: {}

}
</script>

<style lang="scss">

@import '../scss/_variable.scss';

.toast-wrapper {
    position: fixed;
    display: none;
    flex-direction: row;
    height: 10%;
    width: 100%;
    top:35%;
    left:0;
    right:0;
    background: transparent;
    z-index: 100;
    align-items: center;
    justify-content: center;
    &.show {
        display: flex;
    }
    .toast-body {
        max-width: 70%;
        padding: toRem(20) toRem(30);
        background: #000;
        opacity: .7;
        border-radius: toRem(10);
        .toast-content {
            color: #fff;
        }
    }
}
</style>
