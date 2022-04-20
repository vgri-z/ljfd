// 13个船舶登记页面路由
const shipRegister = () => import('@/views/main/ship-manage/shipRegister/shipRegister.vue')
export default {
  path: '/main/ship-manage/shipRegister',
  name: 'shipRegister',
  component: shipRegister,
  children: []
}
