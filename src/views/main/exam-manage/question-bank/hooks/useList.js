import { getRoleList } from '../../../../../service/main/role/role'
// eslint-disable-next-line no-unused-vars
import { reactive, ref, watch, toRefs } from 'vue'

export default function () {
  const searchOption = reactive({
    Index: '1',
    Size: '10',
    Filter: ''
  })
  const currentPage = ref(0)
  const total = ref(0)
  const roleList = ref(null)

  // 获取列表
  const _getRoleList = async () => {
    const res = await getRoleList(searchOption)
    roleList.value = res.data.list
    total.value = res.data.total
  }

  _getRoleList()

  watch(
    () => searchOption.Filter,
    (newValue) => {
      // console.log('newValue', newValue)
      searchOption.Filter = newValue
      console.log(searchOption)
    }
  )

  return {
    currentPage,
    total,
    roleList,
    _getRoleList,
    searchOption
  }
}
