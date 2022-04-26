import router from '@/router'
import { accountLoginRequest, getCurrentUserInfo, getUserMenus } from '@/service/login/login'
import localCache from '@/utils/cache'
import { mapMenusToRoutes } from '../../utils/map-menu'
import { getCurrentUserFactorys } from '@/service/main/main'
// import { userMenus } from '../../views/main/config/menuList'
// import { ElMessage } from 'element-plus'

const loginModule = {
  namespaced: true,
  state() {
    return {
      tokenInfo: {},
      userInfo: {},
      userMenus: [],
      shipRegCategorys: [],
      identityCards: [],
      userFactory: {}
    }
  },
  getters: {},
  mutations: {
    changeToken(state, payload) {
      state.tokenInfo = payload
    },
    changeUserInfo(state, payload) {
      state.userInfo = payload
    },
    changeShipRegCategory(state, payload) {
      state.shipRegCategorys = payload
    },
    changeIdentityDictTypes(state, payload) {
      state.identityCards = payload
    },
    changeUserMenus(state, payload) {
      state.userMenus = payload
      // 动态添加路由
      const routes = mapMenusToRoutes(state.userMenus)
      routes.forEach((route) => {
        router.addRoute('main', route)
      })
    },
    changeUserFactory(state, payload) {
      state.userFactory = payload
    }
  },
  actions: {
    // 在这里执行登录以及登录后的操作，保存数据
    async accountLoginAction({ commit }, paylod) {
      // 登录 拿到token 对token进行保存
      const loginInfo = await accountLoginRequest(paylod)
      const token = loginInfo.data.accessToken
      const refreshToken = loginInfo.data.refreshToken
      const refreshTime = loginInfo.data.expireIn // token过期时间点
      const tokenObj = { token, refreshToken, refreshTime }
      localCache.cacheSet('tokenInfo', tokenObj)
      commit('changeToken', tokenObj)

      // 获取当前用户信息
      const userInfoRes = await getCurrentUserInfo()
      const userInfo = userInfoRes.data
      commit('changeUserInfo', userInfo)
      localCache.cacheSet('userInfo', userInfo)

      // 获取用户菜单
      const userMenusRes = await getUserMenus('Main')
      // console.log(userMenusRes, 'userMenus')
      const userMenus = userMenusRes.data.items
      commit('changeUserMenus', userMenus)
      localCache.cacheSet('userMenus', userMenus)
      if (userMenus.length) {
        localCache.cacheSet('firstMenu', userMenus[0].children[0])
      } else {
        localCache.cacheSet('firstMenu', '')
      }

      // 获取当前用户所在工厂
      const currentFactoryRes = await getCurrentUserFactorys()
      localCache.cacheSet('currentUserFactory', currentFactoryRes.data)
      commit('changeUserFactory', currentFactoryRes.data)

      // 进入主页
      router.push('/main')
    },
    // 初始化vuex数据
    loadLocalLogin({ commit }) {
      const tokenInfo = localCache.cacheGet('tokenInfo')
      if (tokenInfo) {
        commit('changeToken', tokenInfo)
      }
      const userInfo = localCache.cacheGet('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCache.cacheGet('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }

      const userFactory = localCache.cacheGet('currentUserFactory')
      if (userMenus) {
        commit('changeUserFactory', userFactory)
      }
    }
  }
}

export default loginModule
