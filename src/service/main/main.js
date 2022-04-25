import { vgriRequest } from '../index'

const urlObj = {
  userListUrl: '/user/paged-list',
  addUrl: '/user',
  editPasswordUrl: '/user/current/password',
  resetPasswordUrl: '/user/password/default',
  removeUrl: '/user/',
  rightsUrl: '/permission/list',
  currentRightsUrl: '/user/current/permissions',
  applicantTypesUrl: '/dict-catalog/dict/list',
  lockUrl: '/user/lockout',
  unlockUrl: '/user/unlock'
}

// 获取用户列表
export function getUserList(params) {
  return vgriRequest.get({
    url: urlObj.userListUrl,
    params
  })
}

// 添加用户
export function addUser(data) {
  return vgriRequest.post({
    url: urlObj.addUrl,
    data
  })
}

// 编辑用户
export function editUser(data) {
  return vgriRequest.put({
    url: urlObj.addUrl,
    data
  })
}

// 删除用户
export function removeUser(userId) {
  return vgriRequest.delete({
    url: urlObj.removeUrl + userId
  })
}

// 修改密码
export function editPassword(data) {
  return vgriRequest.post({
    url: urlObj.editPasswordUrl,
    data
  })
}

// 重置密码
export function resetPassword(data) {
  return vgriRequest.put({
    url: urlObj.resetPasswordUrl,
    data
  })
}

// 禁用用户
export function lockUser(data) {
  console.log(data, 'data')
  return vgriRequest.put({
    url: urlObj.lockUrl,
    data
  })
}

// 启用用户
export function unlockUser(data) {
  return vgriRequest.put({
    url: urlObj.unlockUrl,
    data
  })
}

// 获取所有的权限
export function getRightsTree() {
  return vgriRequest.get({
    url: urlObj.rightsUrl
  })
}

// 获取某个用户所拥有的的权限(用于设置权限时的回显)
export function getUserRights(id) {
  return vgriRequest.get({
    url: urlObj.addUrl + '/' + id + '/permission/list'
  })
}

export function getCurrentUserRights() {
  return vgriRequest.get({
    url: urlObj.currentRightsUrl
    // showLoading: false
  })
}

// 设置用户权限
export function setRights(id, data) {
  return vgriRequest.put({
    url: urlObj.addUrl + '/' + id + '/permission',
    data
  })
}
