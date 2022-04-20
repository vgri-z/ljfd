// 1. 获取菜单与当前的url匹配到一个菜单，将菜单进行保存(当前处于激活态的菜单)(activeMenu就是当前菜单的id)
// 2. 获取当前用户拥有的权限

import { getCurrentUserRights } from '../service/main/main'
import localCache from './cache'

export async function hasRights() {
  // 匹配菜单
  const activeMenuId = localCache.cacheGet('activeMenu')
  const userMenus = localCache.cacheGet('userMenus')
  patchMenu(userMenus, activeMenuId)

  // 请求权限
  const userId = localCache.cacheGet('userInfo').id
  const rightsRes = await getCurrentUserRights(userId)
  // console.log(rightsRes, 'rightRes')

  const activeMenu = localCache.cacheGet('rightMenu')

  const rightsArr = []
  if (rightsRes.data) {
    if (rightsRes.data.includes('Superuser')) {
      // 超管
      rightsArr.push(rightsRes.data[0])
    } else {
      // 普通用户
      rightsRes.data.forEach((item) => {
        if (item.includes(activeMenu.permission.split('.')[0])) {
          // 权限形式为User.Create，所以取出后面的权限名
          rightsArr.push(item.split('.')[1])
        }
      })
    }
  }
  return rightsArr
}

// 匹配当前激活的菜单
function patchMenu(menus, activeMenuId) {
  menus.filter((item) => {
    if (item.children.length === 0) {
      if (item.id === activeMenuId) {
        localCache.cacheSet('rightMenu', item)
      }
    } else {
      patchMenu(item.children, activeMenuId)
    }
  })
}
