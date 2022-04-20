// 获取面包屑数组
export function useBreadcrumb(userMenus, currentPath) {
  const breadcrumbs = []
  userMenus.forEach((menu) => {
    if (!menu.isLeaf) {
      const findMenu = menu.children.find((submenu) => submenu.url === currentPath)
      if (findMenu) {
        // console.log(findMenu)
        breadcrumbs?.push({ name: menu.displayName })
        breadcrumbs?.push({ name: findMenu.displayName })
      }
    } else if (menu.isLeaf && menu.url === currentPath) {
      breadcrumbs.push({ name: menu.displayName })
    }
  })
  return breadcrumbs
}
