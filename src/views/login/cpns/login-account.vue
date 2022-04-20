<template>
  <div class="login-account">
    <el-form
      ref="loginFormRef"
      :model="loginForm"
      :rules="rules"
      class="demo-ruleForm"
      @keydown.enter="loginAction"
    >
      <el-form-item prop="userName">
        <el-input v-model="loginForm.userName" placeholder="请输入用户名">
          <template #prefix>
            <el-icon size="16px" class="el-input__icon"><user /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" show-password placeholder="请输入密码">
          <template #prefix>
            <el-icon size="16px" class="el-input__icon"><lock /></el-icon>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
    <div class="remember-password">
      <el-checkbox v-model="isKeepPassword" @change="rememberChange">记住密码</el-checkbox>
    </div>
  </div>
</template>

<script>
import { reactive, ref, onMounted } from 'vue'
import { rules } from '../config/account.config'
import { useStore } from 'vuex'
import { User, Lock } from '@element-plus/icons'
import { setCookie, getCookie, saveCookie, clearCookie } from '../hooks/passwordCookie'
export default {
  components: { User, Lock },
  methods: {
    // keepPassword(event) {
    //   console.log(event)
    // }
  },
  setup() {
    const store = useStore()

    let cookieObj = {}
    const loginForm = reactive({
      userName: '',
      password: ''
    })

    const loginFormRef = ref()

    const isKeepPassword = ref(false)

    onMounted(() => {
      cookieObj = getCookie()
      // console.log(cookieObj)
      loginForm.userName = cookieObj.userName
      loginForm.password = cookieObj.password
    })

    const loginAction = () => {
      // 表单验证
      loginFormRef.value.validate((valid) => {
        if (valid) {
          // 是否记住密码
          saveCookie(isKeepPassword.value, loginForm.userName, loginForm.password, 7)
          // console.log('执行登录操作')
          // 在vuex里面执行登录操作
          store.dispatch('login/accountLoginAction', { ...loginForm })
        }
      })
    }

    const rememberChange = (event) => {
      isKeepPassword.value = event
    }

    return {
      loginForm,
      rules,
      loginFormRef,
      loginAction,
      isKeepPassword,
      rememberChange,
      setCookie,
      getCookie,
      clearCookie
    }
  }
}
</script>

<style lang="less" scoped>
.login-account {
  padding: 20px;
  padding-top: 0;
  padding-left: 20px;

  .remember-password {
    margin-top: -10px;
    margin-bottom: -20px;
    padding-left: 20px;
  }
}
</style>
