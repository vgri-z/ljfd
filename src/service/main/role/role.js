import { vgriRequest } from '../../index'

const urlObj = {
  roleListUrl: '/api/role/paged-list',
  editRoleUrl: '/api/role',
  deleteRoleUrl: '/api/role/'
}

// 获取角色列表
export function getRoleList(params) {
  return vgriRequest.get({
    url: urlObj.roleListUrl,
    params
  })
}

// 添加角色
export function addRole(params) {
  return vgriRequest.post({
    url: urlObj.editRoleUrl,
    params
  })
}

// 修改角色
export function editRole(params) {
  return vgriRequest.put({
    url: urlObj.editRoleUrl,
    params
  })
}

// 删除角色
export function deleteRole(id) {
  return vgriRequest.delete({
    url: urlObj.deleteRoleUrl + id
  })
}
