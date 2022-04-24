import { vgriRequest } from '../../index'

const urlObj = {
  contentTreeChildrenListUrl: '/danger-zone/children',
  contentTreeListUrl: '/danger-zone/tree/list'
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
