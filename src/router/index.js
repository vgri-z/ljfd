import { createRouter, createWebHistory } from 'vue-router'
import localCache from '../utils/cache'
// import { firstMenu } from '../utils/map-menu'
const login = () => import(/* webpackChunkName: "login" */ '../views/login/login.vue')
const main = () => import(/* webpackChunkName: 'main' */ '../views/main/main.vue')
const notFound = () => import(/* webpackChunkName: 'notFound' */ '../views/not-found/not-found.vue')

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
    children: []
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

  console.log(router.getRoutes())
})

export default router
