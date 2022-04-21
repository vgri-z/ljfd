import { vgriRequest } from '../index'

const urlObj = {
  userListUrl: '/api/user/paged-list',
  addUrl: '/api/user'
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
