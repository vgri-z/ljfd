import { createStore } from 'vuex'
import login from './login/login'

const store = createStore({
  state() {
    return {
      name: 'vgri'
    }
  },
  mutations: {},
  actions: {},
  modules: {
    login
  }
})

// 初始化vuex，解决用户登录成功后进入首页，刷新页面，导致vuex中token，userInfo，userMenus没有数据的问题
export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

export default store
