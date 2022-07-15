// let firstMenu = null
export function mapMenusToRoutes(userMenus) {
  debugger
  const routes = []
  // 1. 先默认加载所有routes
  const allRoutes = []
  const routerFiles = require.context('../router/main', true, /\.js/)
  routerFiles.keys().forEach((key) => {
    const route = routerFiles(key).default
    allRoutes.push(route)
  })
  console.log(allRoutes, 'allRoutes')
  // 2. 根据userMenus获取所需要添加的routes
  // 递归获取需要添加的路由
  const _recurseGetRoute = (menus) => {
    for (let menu of menus) {
      if (!menu.isLeaf) {
        _recurseGetRoute(menu.children)
      } else if (menu.isLeaf) {
        const route = allRoutes.find((item) => {
          return menu.url.startsWith(item.path)
        })
        // if (!firstMenu) {
        //   firstMenu = menu
        //   console.log(firstMenu)
        // }
        if (route) routes.push(route)
      }
    }
  }

  _recurseGetRoute(userMenus)

  return routes
}

// export { firstMenu }

// require.context(directory,useSubdirectories,regExp)，返回一个webpack的上下文环境
// directory:表示检索的目录
// useSubdirectories：表示是否检索子文件夹
// regExp:匹配文件的正则表达式,一般是文件名
// 例如 require.context("@/views/components",false,/.vue$/)
// 当上下文环境传入某一个键时，就会得到一个标准的esModule
