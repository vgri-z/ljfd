import { vgriRequest } from '../../index'

const urlObj = {
  contentTreeChildrenListUrl: '/danger-zone/children',
  contentTreeListUrl: '/danger-zone/tree/list',
  globalDangerListUrl: '/global/danger-source/paged-list',
  addGlobalDangerUrl: '/global/danger-source',
  GlobalDangerDetailUrl: '/global/danger-source/',
  addDangerAresUrl: '/danger-zone',
  branchDangerListUrl: '/danger-source/hybrid/paged-list'
}

// 获取内容管理树子级列表
export function getContentTreeChildren(params) {
  return vgriRequest.get({
    url: urlObj.contentTreeChildrenListUrl,
    params
  })
}

// 获取内容管理树列表
export function getContentTreeList() {
  return vgriRequest.get({
    url: urlObj.contentTreeListUrl
  })
}

// 全局危险源列表
export function getGlobalDangerList(params) {
  return vgriRequest.get({
    url: urlObj.globalDangerListUrl,
    params
  })
}

// 全局危险源创建
export function addGlobalDanger(data) {
  return vgriRequest.post({
    url: urlObj.addGlobalDangerUrl,
    data
  })
}

// 全局危险源编辑
export function editGlobalDanger(data) {
  return vgriRequest.put({
    url: urlObj.addGlobalDangerUrl,
    data
  })
}

// 全局危险源详情
export function getGlobalDangerDetail(id) {
  return vgriRequest.get({
    url: urlObj.GlobalDangerDetailUrl + id
  })
}

// 添加危险区域
export function addDangerAres(data) {
  return vgriRequest.post({
    url: urlObj.addDangerAresUrl,
    data
  })
}

// 编辑危险区域
export function editDangerAres(data) {
  return vgriRequest.put({
    url: urlObj.addDangerAresUrl,
    data
  })
}

// 删除危险区域
export function deleteDangerAres(id) {
  return vgriRequest.put({
    url: urlObj.addDangerAresUrl + '/' + id
  })
}

// 获取分厂危险源列表
export function getBranchDangerList(params) {
  return vgriRequest.get({
    url: urlObj.branchDangerListUrl,
    params
  })
}

// 分厂危险源添加
export function addBranchDanger(data) {
  return vgriRequest.post({
    url: '/danger-source',
    data
  })
}

// 分厂危险源更新
export function editBranchDanger(data) {
  return vgriRequest.put({
    url: '/danger-source',
    data
  })
}

// 创建危险源草稿
export function addDangerDraft(data) {
  return vgriRequest.post({
    url: '/danger-source/draft',
    data
  })
}

// 危险源草稿审核通过
export function approveDraft(data) {
  return vgriRequest.post({
    url: '/danger-source/draft/approve',
    data
  })
}

// 危险源草稿审核拒绝
export function rejectDraft(data) {
  return vgriRequest.post({
    url: '/danger-source/draft/reject',
    data
  })
}

// 获取危险源草稿列表
export function getDraftList(params) {
  return vgriRequest.get({
    url: '/danger-source/draft/paged-list',
    params
  })
}

// 获取危险源草稿详情
export function getDraftDetail(id) {
  return vgriRequest.get({
    url: '/danger-source/draft/' + id
  })
}
