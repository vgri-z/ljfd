<template>
  <div class="login-content">
    <div class="form-title">
      <h3><span>垃圾发电危险源管理</span></h3>
    </div>
    <div class="login-form">
      <div class="content-title">用户登录</div>
      <login-account ref="loginAccountRef" />
      <div class="btn">
        <el-button class="login-btn" type="primary" @click="handleLogin"> 登录 </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import LoginAccount from './login-account.vue'
import { ref } from 'vue'
export default {
  components: { LoginAccount },
  setup() {
    const loginAccountRef = ref()

    // 登录
    const handleLogin = () => {
      loginAccountRef.value.loginAction()
    }

    return {
      handleLogin,
      loginAccountRef
    }
  }
}
</script>

<style lang="less" scoped>
.login-content {
  // display: flex;
  // width: 340px;
  // height: 300px;
  // background: #0ff;

  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);

  .form-title {
    font-size: 24px;
    letter-spacing: 3px;
    text-align: center;
    // color: #0059b3;
    color: #fff;
  }

  .login-form {
    width: 300px;
    padding: 15px;
    background: #fff;
    border-radius: 8px;
    margin: 0 auto;
    .content-title {
      color: #1e8aff;
      font-family: '微软雅黑';
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
    }

    .btn {
      padding: 0 20px;
      .login-btn {
        width: 100%;
      }
    }
  }
}
</style>
