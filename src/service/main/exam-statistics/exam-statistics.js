import { vgriRequest } from '../../index'

const urlObj = {
  treeChildUrl: '/organization/children',
  treeListUrl: '/danger-zone/tree/list'
}

export function getTreeLazy() {
  return vgriRequest.get({
    url: urlObj.treeChildUrl
  })
}

export function getTree() {
  return vgriRequest.get({
    url: urlObj.treeListUrl
  })
}
