import VgriRequest from './request/request'
import { BASE_URL, TIME_OUT } from './request/config'
import localCache from '../utils/cache'
import { getRefreshToken } from './login/login'
import router from '@/router'

const vgriRequest = new VgriRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  // showLoading: true,
  interceptors: {
    async requestInterceptor(config) {
      // console.log('请求成功拦截')
      // 请求token的拦截 将token添加到请求头里面去
      const status = getTokenStatus()
      if (status && config.url !== '/api/authenticate/refresh-token') {
        await _getRefreshToken()
      }

      const tokenInfo = localCache.cacheGet('tokenInfo')
      if (tokenInfo && config.headers) {
        config.headers.Authorization = `Bearer ${tokenInfo.token}`
      }
      return config
    },
    requestInterceptorCatch(err) {
      // console.log('请求失败拦截')
      console.log(err)
    },
    responseInterceptor(config) {
      // console.log('响应成功拦截')
      return config
    },
    responseInterceptorCatch(err) {
      // console.log('响应失败拦截')
      console.log(err)
    }
  }
})

// 判断token是否失效
function getTokenStatus() {
  const tokenInfo = localCache.cacheGet('tokenInfo')
  if (tokenInfo) {
    const refreshTime = tokenInfo.refreshTime
    const nowTime = new Date().getTime()

    if (refreshTime <= nowTime) {
      return true
    } else {
      return false
    }
  }
}

// 刷新token
// eslint-disable-next-line no-unused-vars
async function _getRefreshToken() {
  const tokenInfo = localCache.cacheGet('tokenInfo')
  const accessToken = tokenInfo.token
  const refreshToken = tokenInfo.refreshToken
  const res = await getRefreshToken({ accessToken, refreshToken })
  // console.log(res, 'refresh token ')
  if (!res || res.success === false) {
    router.push('/login')
    return
  }
  // console.log(res, 'get refresh token')
  const tokenObj = {
    token: res.data.accessToken,
    refreshToken: res.data.refreshToken,
    refreshTime: res.data.expireIn
  }
  localCache.cacheSet('tokenInfo', tokenObj)
}

export { vgriRequest }
