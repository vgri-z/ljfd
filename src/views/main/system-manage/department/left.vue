<template>
  <div class="left">
    <div class="search">
      <el-button size="small" type="primary" @click="add">添加</el-button>
      <el-button size="small" type="primary" @click="edit">修改</el-button>
      <el-button size="small" type="danger" @click="remove">删除</el-button>
    </div>

    <el-tree
      lazy
      class="class-tree"
      :load="loadNode"
      :props="defaultProps"
      :expand-on-click-node="false"
      ref="departmentTreeRef"
      @node-click="handleNodeClick"
    />
  </div>

  <!-- 新建/编辑部门 -->
  <edit ref="editRef" @updateEdit="updateDepartment" />
</template>

<script>
import Edit from './edit.vue'
import {
  getChildrenDepartment,
  deleteDepartment
} from '../../../../service/main/department/department'
import { ElMessage } from 'element-plus'
export default {
  components: { Edit },
  data() {
    return {
      defaultProps: {
        children: 'list',
        label: 'name'
      },
      selectedNode: null
    }
  },
  props: {
    treeList: {
      type: Array,
      default: () => []
    }
  },
  emits: ['updateDepartment'],
  watch: {},
  methods: {
    async loadNode(node, resolve) {
      console.log(node)

      const res = await getChildrenDepartment({ ParentId: node.data.id })
      // console.log(res)
      resolve(res.data)
    },
    handleNodeClick(data) {
      this.selectedNode = data
    },
    add() {
      const nodeData = this.selectedNode
      if (nodeData) {
        const data = { isAdd: true, node: nodeData }
        this.$refs.editRef.show(data)
      } else {
        const data = { isAdd: true, isAddTop: true, node: nodeData }
        this.$refs.editRef.show(data)
      }
    },
    edit() {
      const nodeData = this.selectedNode
      const data = { isAdd: false, node: nodeData }
      this.$refs.editRef.show(data)
    },
    async remove() {
      const res = await deleteDepartment(this.selectedNode.id)
      console.log(res)
      if (res.code === 0) {
        ElMessage({
          message: '操作成功',
          type: 'success'
        })
        this.updateEdit()
      }
    },
    updateDepartment() {
      this.$emit('updateDepartment')
    }
  }
}
</script>

<style lang="less" scoped>
.left {
  width: 300px;
  height: 100%;
  border-right: 1px solid #e2e5e9;
  padding-right: 20px;
  box-sizing: border-box;

  // :deep(.el-tree) {
  //   height: calc(100% - 60px);
  //   padding: 10px;
  //   border-radius: 5px;
  //   overflow: auto;
  // }

  .search {
    margin-bottom: 10px;
    text-align: left;
  }
}
</style>
