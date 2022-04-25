import { vgriRequest } from '../../index'

const urlObj = {
  contentTreeChildrenListUrl: '/danger-zone/children',
  contentTreeListUrl: '/danger-zone/tree/list',
  globalDangerListUrl: '/global/danger-source/paged-list',
  addGlobalDangerUrl: '/global/danger-source',
  GlobalDangerDetailUrl: '/global/danger-source/'
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
