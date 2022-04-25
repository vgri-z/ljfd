// 1. 获取菜单与当前的url匹配到一个菜单，将菜单进行保存(当前处于激活态的菜单)(activeMenu就是当前菜单的id)
// 2. 获取当前用户拥有的权限

import { getCurrentUserRights } from '../service/main/main'
import localCache from './cache'

export async function hasRights() {
  // 匹配菜单
  const activeMenuId = localCache.cacheGet('activeMenu') // 当前菜单的id
  const userMenus = localCache.cacheGet('userMenus') // 用户菜单
  patchMenu(userMenus, activeMenuId)

  // 请求权限
  const userId = localCache.cacheGet('userInfo').id // 当前用户的id
  const rightsRes = await getCurrentUserRights(userId) // 获取当前用户的权限
  // console.log(rightsRes, 'rightRes')

  const activeMenu = localCache.cacheGet('rightMenu') // 取出当前的权限菜单

  const rightsArr = []
  if (rightsRes.data) {
    if (rightsRes.data.includes('Superuser')) {
      // 超管
      rightsArr.push('Superuser')
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
  // console.log(rightsArr, 'rightsArr')
  return rightsArr
}

// 匹配当前激活的菜单
function patchMenu(menus, activeMenuId) {
  menus.filter((item) => {
    if (item.children.length === 0) {
      if (item.id === activeMenuId) {
        // 保存当前活跃的需要进行权限分配的菜单
        localCache.cacheSet('rightMenu', item)
      }
    } else {
      patchMenu(item.children, activeMenuId)
    }
  })
}
