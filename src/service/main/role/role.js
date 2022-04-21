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
