<template>
  <div class="alert">
    <div class="content">
      <h1 v-if="!!title" v-text="title"/>
      <div class="message" v-html="message"/>
      <div class="btn">
        <button v-for="item in buttonList" @click="item.event()" v-text="item.text"/>
      </div>
    <div>
  </div>
</template>

<script>
export default {
  name: 'Alert',
  props: {
    title: {
      type: String,
      default: ''
    },
    message: {
      type: String,
      default: '网络异常'
    },
    buttonList: {
      type: Array,
      default() {
        return [{
          text: '确认',
          event() {}
        }]
      },
      require: true
    }
  }
}
</script>

<style lang='scss' scoped>
@import "../scss/variable";
@mixin nativeBorder($color: #e0e0e0, $direction: to bottom, $size: 100% 1px, $position: left top) {
  background-image: linear-gradient($direction, $color 50%, transparent 50%);
  background-size: $size;
  background-repeat: no-repeat;
  background-position: $position;
}
.alert{
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99999;
  display: flex;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .3);
  align-items: center;
  justify-content: center;
  .content{
    width: toRem(536px);
    background: #fff;
    border-radius: toRem(20px);
    overflow: hidden;
    h1{
      height: toRem(100px);
      font-size: toRem(34px);
      line-height: toRem(100px);
      color: #333;
      text-align: center;
      @include nativeBorder($position: left bottom);
    }
  }
  .message{
    display: flex;
    min-height: toRem(200px);
    padding: toRem(20px) toRem(60px);
    font-size: toRem(26px);
    color: #333;
    text-align: left;
    word-break: break-all;
    justify-content: center;
    align-items: center;
  }
  .btn{
    padding-bottom: toRem(38px);
    text-align: center;
    button{
      display: inline-block;
      width: toRem(178px);
      height: toRem(60px);
      border: 1px solid #f65a24;
      font-size: toRem(26px);
      line-height: toRem(60px);
      color: #00a5e0;
      text-align: center;
      vertical-align: middle;
      &:first-child{
        background: #fff;
        color: #f65a24;
      }
      &:last-child{
        background: #f65a24;
        color: #fff;
      }
      &:last-child:not(:first-child){
        margin-left: toRem(32px);
      }
    }
  }
}
</style>
