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
