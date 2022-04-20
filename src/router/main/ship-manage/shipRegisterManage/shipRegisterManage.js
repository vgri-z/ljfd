// 船舶登记管理
const shipManage = () => import('@/views/main/ship-manage/shipManage/shipManage.vue')
export default {
  path: '/main/ship-manage/shipManage',
  name: 'shipManage',
  component: shipManage,
  children: []
}
