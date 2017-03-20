<template>
  <div class="loader">
    <div class="content">
      <i/>
      <p>加载中...</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loader'
}
</script>

<style lang='scss' scoped>
@import "../scss/variable";
.loader{
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.content{
  width: toRem(200px);
  height: toRem(200px);
  background: rgba(0, 0, 0, .4);
  border-radius: 6px;
  overflow: hidden;
  i{
    display: block;
    width: 20px;
	  height: 20px;
    margin: toRem(50px) auto 0;
    background: url(../assets/loading.png) no-repeat center;
    background-size: auto 20px;
    animation: loading 1s steps(12) infinite;
  }
  p{
    margin-top: toRem(20px);
    font-size: toRem(32px);
    text-align: center;
  }
}
@keyframes loading {
  0%{
    background-position: 0 0;
  }
  100%{
    background-position: -240px 0;
  }
}
</style>
