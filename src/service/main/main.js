import { vgriRequest } from '../index'

const urlObj = {
  userListUrl: '/api/user/paged-list',
  addUrl: '/api/user',
  editPasswordUrl: '/api/user/current/password',
  resetPasswordUrl: '/api/user/password/default',
  removeUrl: '/api/user/',
  rightsUrl: '/api/permission/list',
  currentRightsUrl: '/api/user/current/permissions',
  applicantTypesUrl: '/api/dict-catalog/dict/list',
  lockUrl: '/api/user/lockout',
  unlockUrl: '/api/user/unlock',
  // 船舶登记
  registerListUrl: '/api/shipregistration/paged-list',
  shipRegisterUrl: '/api/shipregistration',
  shipRegisterUpdateUrl: '/api/shipregistration',
  deleteShipUrl: '/api/shipregistration/',
  // 船员登记
  sailorListUrl: '/api/sailorregistration/paged-list',
  sailorRegisterUrl: '/api/sailorregistration',
  sailorRegisterUpdateUrl: '/api/sailorregistration',
  deleteSailorUrl: '/api/sailorregistration/',
  // 运营登记
  operationListUrl: '/api/shipoperationregistration/paged-list',
  operationRegisterUrl: '/api/shipoperationregistration',
  operationRegisterUpdateUrl: '/api/shipoperationregistration',
  deleteOperationUrl: '/api/shipoperationregistration/',
  // 船检登记
  inspectListUrl: '/api/shipinspectionregistration/paged-list',
  inspectRegisterUrl: '/api/shipinspectionregistration',
  inspectRegisterUpdateUrl: '/api/shipinspectionregistration',
  deleteInspectUrl: '/api/shipinspectionregistration/',
  // 港口企业
  consultListUrl: '/api/companyconsultingregistration/paged-list',
  consultRegisterUrl: '/api/companyconsultingregistration',
  consultRegisterUpdateUrl: '/api/companyconsultingregistration',
  deleteConsultUrl: '/api/companyconsultingregistration/',
  // 系统日志
  logListUrl: '/api/audit-log/paged-list'
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

// 设置权限
export function setRights(id, data) {
  return vgriRequest.put({
    url: urlObj.addUrl + '/' + id + '/permission',
    data
  })
}

// 系统日志
export function getLogList(params) {
  return vgriRequest.get({
    url: urlObj.logListUrl,
    params
  })
}

// 获取证件类型
export function getApplicantTypes(params) {
  return vgriRequest.get({
    url: urlObj.applicantTypesUrl,
    params
  })
}

// ---------------船舶登记---------------

// 获取船舶登记列表
export function getShipRegisterList(params) {
  return vgriRequest.get({
    url: urlObj.registerListUrl,
    params
  })
}

// 船舶登记
export function shipRegister(data) {
  return vgriRequest.post({
    url: urlObj.shipRegisterUrl,
    data
  })
}

// 船舶登记更新
export function shipRegisterUpdate(data) {
  return vgriRequest.put({
    url: urlObj.shipRegisterUpdateUrl,
    data
  })
}

// 船舶登记删除
export function deleteShipRegister(id) {
  return vgriRequest.delete({
    url: urlObj.deleteShipUrl + id
  })
}

// --------------------船舶登记--------------------

// -----------------船员---------------------

// 获取船员列表
export function getSaliorList(params) {
  return vgriRequest.get({
    url: urlObj.sailorListUrl,
    params
  })
}

// 船员登记
export function sailorRegister(data) {
  return vgriRequest.post({
    url: urlObj.sailorRegisterUrl,
    data
  })
}

// 船员登记更新
export function sailorRegisterUpdate(data) {
  return vgriRequest.put({
    url: urlObj.sailorRegisterUpdateUrl,
    data
  })
}

// 船员登记删除
export function deleteSailorRegister(id) {
  return vgriRequest.delete({
    url: urlObj.deleteSailorUrl + id
  })
}
// -----------------船员---------------------

// -----------------船舶运营证---------------------

// 获取运营证列表
export function getOperationList(params) {
  return vgriRequest.get({
    url: urlObj.operationListUrl,
    params
  })
}

// 运营证登记
export function operationRegister(data) {
  return vgriRequest.post({
    url: urlObj.operationRegisterUrl,
    data
  })
}

// 运营证登记更新
export function operationRegisterUpdate(data) {
  return vgriRequest.put({
    url: urlObj.operationRegisterUpdateUrl,
    data
  })
}

// 运营证登记删除
export function deleteOperationRegister(id) {
  return vgriRequest.delete({
    url: urlObj.deleteOperationUrl + id
  })
}

// -----------------船舶运营证---------------------

// -----------------船检---------------------

// 获取船检列表
export function getInspectList(params) {
  return vgriRequest.get({
    url: urlObj.inspectListUrl,
    params
  })
}

// 船检登记
export function inspectRegister(data) {
  return vgriRequest.post({
    url: urlObj.inspectRegisterUrl,
    data
  })
}

// 船检登记更新
export function inspectRegisterUpdate(data) {
  return vgriRequest.put({
    url: urlObj.inspectRegisterUpdateUrl,
    data
  })
}

// 船检登记删除
export function deleteInspectRegister(id) {
  return vgriRequest.delete({
    url: urlObj.deleteInspectUrl + id
  })
}

// -----------------企业咨询---------------------

// 获取企业咨询列表
export function getConsultList(params) {
  return vgriRequest.get({
    url: urlObj.consultListUrl,
    params
  })
}

// 企业咨询登记
export function consultRegister(data) {
  return vgriRequest.post({
    url: urlObj.consultRegisterUrl,
    data
  })
}

// 企业咨询登记更新
export function consultRegisterUpdate(data) {
  return vgriRequest.put({
    url: urlObj.consultRegisterUpdateUrl,
    data
  })
}

// 企业咨询登记删除
export function deleteConsultRegister(id) {
  return vgriRequest.delete({
    url: urlObj.deleteConsultUrl + id
  })
}

// -----------------企业咨询---------------------
