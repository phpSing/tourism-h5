<template lang="html">
  <div class="tabs">
    <ul class="list">
      <li v-for="(item, index) in tabsList" :key="item.id" @click="tabSwich(item.id)" :class="[site == item.id ? 'selected' : '']" v-text="item.text"/>
    </ul>
    <div class="line" :style="{width: ((750 / this.tabsList.length) - 60) / 37.5 + 'rem', transform: 'translateX(' + (750/tabsList.length * site + 30)/37.5 +'rem)'}"/>
    <div class="bottom-line"></div>
  </div>
</template>

<script>
export default {
  name: 'Tabs',
  data() {
    return {
      site: 0
    }
  },
  props: {
    tabsList: {
      type: Array,
      default() {
        return []
      }
    },
    swiched: {
      type: Function,
      default() {
        return () => {}
      }
    },
    initSite: {
      type: Number,
      default: 0
    }
  },
  beforeMount() {
    this.site = this.initSite
  },
  methods: {
    tabSwich(id) {
      this.site = id
      this.swiched(id)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../scss/variable";
.tabs{
  position: relative;
}
.list{
  display: flex;
  width: 100%;
  background: #fff;
  li{
    flex: 1;
    line-height: toRem(84px);
    text-align: center;
  }
  .selected{
    color: #f65a24;
  }
}
.line{
  position: absolute;
  left: 0;
  bottom: 0;
  height: toRem(4px);
  background: #f65a24;
  transition: all ease .1s;
  z-index: 5;
}
.bottom-line {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: #e8e8e8;
  transform: scaleY(.5);
  z-index: 3;
}
</style>
