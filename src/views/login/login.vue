<template>
  <div class="login">
    <login-content />
  </div>
</template>

<script>
import LoginContent from './cpns/login-content.vue'
export default {
  components: { LoginContent }
}
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  background: url('../../assets/img/login_bg.png') no-repeat;
  background-size: 100% 100%;
  position: relative;
}
</style>
