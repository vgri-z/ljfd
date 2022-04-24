import { vgriRequest } from '../../index'

const urlObj = {
  departmentListUrl: '/organization/list',
  addDepartmentUrl: '/organization',
  deleteDepartmentUrl: '/organization/',
  departmentChildrenUrl: '/organization/children'
}

// 获取有工厂的部门列表
export function getDepartmentList(params) {
  return vgriRequest.get({
    url: urlObj.departmentListUrl,
    params
  })
}

// 获取子级部门(传null为获取顶级部门)
export function getChildrenDepartment(params) {
  return vgriRequest.get({
    url: urlObj.departmentChildrenUrl,
    params
  })
}

// 新建部门
export function addDepartment(data) {
  return vgriRequest.post({
    url: urlObj.addDepartmentUrl,
    data
  })
}

// 编辑部门
export function editDepartment(data) {
  return vgriRequest.put({
    url: urlObj.addDepartmentUrl,
    data
  })
}

// 删除部门
export function deleteDepartment(id) {
  return vgriRequest.delete({
    url: urlObj.deleteDepartmentUrl + id
  })
}

// 获取部门详情
export function getDepartmentDetail(id) {
  return vgriRequest.get({
    url: urlObj.deleteDepartmentUrl + id
  })
}
