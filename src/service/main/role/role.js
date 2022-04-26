import { vgriRequest } from '../../index'

const urlObj = {
  roleListUrl: '/role/paged-list',
  editRoleUrl: '/role',
  deleteRoleUrl: '/role/',
  currentUserRolesUrl: '/user/current/roles'
}

// 获取角色列表
export function getRoleList(params) {
  return vgriRequest.get({
    url: urlObj.roleListUrl,
    params
  })
}

// 添加角色
export function addRole(data) {
  return vgriRequest.post({
    url: urlObj.editRoleUrl,
    data
  })
}

// 修改角色
export function editRole(data) {
  return vgriRequest.put({
    url: urlObj.editRoleUrl,
    data
  })
}

// 删除角色
export function deleteRole(id) {
  return vgriRequest.delete({
    url: urlObj.deleteRoleUrl + id
  })
}

// 设置角色权限
export function setRights(id, data) {
  return vgriRequest.put({
    url: '/role/' + id + '/permission',
    data
  })
}

// 获取某个用户所拥有的的权限(用于设置权限时的回显)
export function getRoleRights(id) {
  return vgriRequest.get({
    url: '/role/' + id + '/permission/list'
  })
}

// 为用户设置角色
export function setRoles(data) {
  return vgriRequest.put({
    url: '/user/roles',
    data
  })
}

// 获取当前用户拥有的角色
export function getCurrentUserRoles() {
  return vgriRequest.get({
    url: urlObj.currentUserRolesUrl
  })
}

// 获取用户拥有的角色
export function getUserRoles(id) {
  return vgriRequest.get({
    url: '/user/' + id + '/roles'
  })
}
