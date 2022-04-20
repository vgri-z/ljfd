import { createRouter, createWebHistory } from 'vue-router'
import localCache from '../utils/cache'
// import { firstMenu } from '../utils/map-menu'
const login = () => import(/* webpackChunkName: "login" */ '../views/login/login.vue')
const main = () => import(/* webpackChunkName: 'main' */ '../views/main/main.vue')
const notFound = import(/* webpackChunkName: 'notFound' */ '../views/not-found/not-found.vue')

const routes = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/main',
    name: 'main',
    component: main,
    children: [
      // 船舶修改/详情
      {
        path: 'ship-manage/shipManage/detail/:id',
        name: 'shipManageDetail',
        component: () => import('../views/main/ship-manage/shipManage/detail.vue')
      },
      {
        path: 'ship-manage/shipManage/edit/:id',
        name: 'shipManageEdit',
        component: () => import('../views/main/ship-manage/shipManage/edit.vue')
      },
      // 船员修改/详情
      {
        path: 'sailor-manage/certificateManage/detail/:id',
        name: 'sailorManageDetail',
        component: () => import('../views/main/sailor-manage/certificateManage/detail.vue')
      },
      {
        path: 'sailor-manage/certificateManage/edit/:id',
        name: 'sailorManageEdit',
        component: () => import('../views/main/sailor-manage/certificateManage/edit.vue')
      },
      // 运营修改/详情
      {
        path: 'operation-manage/operateManage/detail/:id',
        name: 'operationManageDetail',
        component: () => import('../views/main/operation-manage/operateManage/detail.vue')
      },
      {
        path: 'operation-manage/operateManage/edit/:id',
        name: 'operationManageEdit',
        component: () => import('../views/main/operation-manage/operateManage/edit.vue')
      },
      // 船检修改/详情
      {
        path: 'inspect-manage/inspectManage/detail/:id',
        name: 'inspectManageDetail',
        component: () => import('../views/main/inspect-manage/inspectManage/detail.vue')
      },
      {
        path: 'inspect-manage/inspectManage/edit/:id',
        name: 'inspectManageEdit',
        component: () => import('../views/main/inspect-manage/inspectManage/edit.vue')
      },
      // 港口企业修改/详情
      {
        path: 'port-manage/consultManage/detail/:id',
        name: 'portManageDetail',
        component: () => import('../views/main/port-manage/consultManage/detail.vue')
      },
      {
        path: 'port-manage/consultManage/edit/:id',
        name: 'portManageEdit',
        component: () => import('../views/main/port-manage/consultManage/edit.vue')
      },
      // 系统日志
      {
        path: 'system-manage/systemLog/detail/:id',
        name: 'systemLogDetail',
        component: () => import('../views/main/system-manage/systemLog/detail.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: notFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to) => {
  // 不是进入登录页面，判断是否有token，没有的话，回到登录页面进行登录
  if (to.path !== '/login') {
    const tokenInfo = localCache.cacheGet('tokenInfo')
    if (!tokenInfo) {
      return '/login'
    }
  }

  // 如果路径是'/main'，重定向到菜单的第一个
  if (to.path === '/main') {
    const firstMenu = localCache.cacheGet('firstMenu')
    // 将menu的defaultActive替换为第一个菜单的id
    if (firstMenu) {
      localCache.cacheSet('activeMenu', firstMenu.id + '')
      return firstMenu.url
    }
  }

  // console.log(router.getRoutes())
})

export default router
