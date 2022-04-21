import router from '@/router'
import { accountLoginRequest, getCurrentUserInfo } from '@/service/login/login'
import { getApplicantTypes } from '../../service/main/main'
import localCache from '@/utils/cache'
import { mapMenusToRoutes } from '../../utils/map-menu'
import { userMenus } from '../../views/main/config/menuList'
// import { ElMessage } from 'element-plus'

const loginModule = {
  namespaced: true,
  state() {
    return {
      tokenInfo: {},
      userInfo: {},
      userMenus: [],
      shipRegCategorys: [],
      identityCards: []
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
    }
  },
  actions: {
    // 在这里执行登录以及登录后的操作，保存数据
    async accountLoginAction({ commit }, paylod) {
      // 登录 拿到token 对token进行保存
      const loginInfo = await accountLoginRequest(paylod)
      const token = loginInfo.data.accessToken
      const refreshToken = loginInfo.data.refreshToken
      // const refreshToken =
      //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJkNjE3OGQ3Ny02NTQzLTRhMDMtODYzMi0zYTAxNWU2MDhkNDgiLCJhdWQiOiJfcmVmcmVzaCIsIm5iZiI6MTY0MTk3ODMzMywiZXhwIjoxNjQyNTgzMTMzLCJpYXQiOjE2NDE5NzgzMzMsImlzcyI6ImxvY2FsZSJ9.s2z6ObXCcUJ6cyyYn4tA4-6jd1IscBNyx5MQodMV4ag'
      const refreshTime = loginInfo.data.expireIn // token过期时间点
      // const refreshTime = 1642554150000 // token过期时间点
      // eslint-disable-next-line no-unused-vars
      const tokenObj = { token, refreshToken, refreshTime }
      localCache.cacheSet('tokenInfo', tokenObj)
      commit('changeToken', tokenObj)

      // 获取当前用户信息
      const userInfoRes = await getCurrentUserInfo()
      const userInfo = userInfoRes.data
      commit('changeUserInfo', userInfo)
      localCache.cacheSet('userInfo', userInfo)

      // 获取用户菜单
      // const userMenusRes = await getUserMenus('Main')
      // // console.log(userMenusRes, 'userMenus')
      // const userMenus = userMenusRes.data.items
      commit('changeUserMenus', userMenus)
      localCache.cacheSet('userMenus', userMenus)
      if (userMenus.length) {
        localCache.cacheSet('firstMenu', userMenus[0].children[0])
      } else {
        localCache.cacheSet('firstMenu', '')
      }

      // 获取所有单据类型
      const shipDictTypesRes = await getApplicantTypes({ Name: 'ShipRegCategory', IsEnabled: true })
      const shipDictTypes = shipDictTypesRes.data
      commit('changeShipRegCategory', shipDictTypes)
      localCache.cacheSet('shipRegCategorys', shipDictTypes)

      // 获取所有证件类型
      const identityDictTypesRes = await getApplicantTypes({
        Name: 'IdentityCard',
        IsEnabled: true
      })
      const identityDictTypes = identityDictTypesRes.data
      commit('changeIdentityDictTypes', identityDictTypes)
      localCache.cacheSet('identityDictTypes', identityDictTypes)

      // 进入主页
      router.push('/main')
    },
    // 初始化vuex数据
    loadLocalLogin({ commit }) {
      const tokenInfo = localCache.cacheGet('tokenInfo')
      if (tokenInfo) {
        commit('changeToken', tokenInfo)
      }
      const shipRegCategorys = localCache.cacheGet('shipRegCategorys')
      if (shipRegCategorys) {
        commit('changeShipRegCategory', shipRegCategorys)
      }
      const identityDictTypes = localCache.cacheGet('identityDictTypes')
      if (identityDictTypes) {
        commit('changeIdentityDictTypes', identityDictTypes)
      }
      const userInfo = localCache.cacheGet('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCache.cacheGet('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  }
}

export default loginModule
