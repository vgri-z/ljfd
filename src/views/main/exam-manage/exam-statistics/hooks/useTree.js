import { getTree } from '../../../../../service/main/exam-statistics/exam-statistics'

import { ref } from 'vue'

export default function () {
  const value = ref()

  const data = ref(null)

  const defaultProps = {
    children: 'children',
    label: 'name'
  }

  // 获取树
  const _getTree = async () => {
    const res = await getTree()
    data.value = setTree(res.data)
    console.log(data.value)
  }
  _getTree()

  // 给树的每一级添加value属性
  const setTree = (tree) => {
    tree.forEach((item) => {
      item.value = item.id
      if (item.children?.length) {
        setTree(item.children)
      }
    })
    return tree
  }

  const submit = () => {
    // console.log(treeRef.value)
    console.log(value.value)
  }

  return {
    defaultProps,
    submit,
    data,
    value
  }
}
