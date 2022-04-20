import { vgriRequest } from '../index'

// 单独储存某个模块所有请求的url
const urlObj = {
  loginUrl: '/api/authenticate',
  refreshUrl: '/api/authenticate/refresh-token',
  userUrl: '/api/user/current',
  userMenuUrl: '/api/menu/'
}

// 登录请求
export function accountLoginRequest(account) {
  return vgriRequest.post({
    url: urlObj.loginUrl,
    data: account
  })
}

// 刷新token
export function getRefreshToken(data) {
  return vgriRequest.post({
    url: urlObj.refreshUrl,
    data
  })
}

// 获取当前用户信息
export function getCurrentUserInfo() {
  return vgriRequest.get({
    url: urlObj.userUrl
  })
}

// 获取用户菜单信息
export function getUserMenus(name) {
  return vgriRequest.get({
    url: urlObj.userMenuUrl + name
  })
}
