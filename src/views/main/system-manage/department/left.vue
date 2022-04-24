<template>
  <div class="left">
    <div class="search">
      <el-button size="small" type="primary" @click="add">添加</el-button>
      <el-button size="small" type="primary" @click="edit">修改</el-button>
      <el-button size="small" type="danger" @click="remove">删除</el-button>
    </div>

    <el-tree
      lazy
      class="department-tree"
      node-key="id"
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
  emits: ['updateDepartment', 'updateNode'],
  watch: {},
  methods: {
    async loadNode(node, resolve) {
      // console.log(node)
      const res = await getChildrenDepartment({ ParentId: node.data.id })
      resolve(res.data)
    },
    handleNodeClick(data) {
      this.selectedNode = data
      this.$emit('updateNode', this.selectedNode)
    },
    // 添加节点
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
    // 修改节点
    edit() {
      const nodeData = this.selectedNode
      const data = { isAdd: false, node: nodeData }
      this.$refs.editRef.show(data)
    },
    async remove() {
      const res = await deleteDepartment(this.selectedNode.id)
      if (res.code === 0) {
        ElMessage({
          message: '操作成功',
          type: 'success'
        })
        this.updateEdit()
      }
    },
    // 更新tree中某个结点
    updateTree1(id) {
      // 通过ID利用DOM找到该结点
      const node = this.$refs.departmentTreeRef.getNode(id)
      console.log(node, 'node')
      // 更改属性
      node.loaded = false
      // 手动调用数据加载方法
      node.loadData()
      // node.expand()
    },
    // 更新tree中某个结点的父节点
    updateTree2() {
      // 通过ID利用DOM先找到该结点
      const node = this.$refs.departmentTreeRef.getNode(this.selectedNode.id)
      console.log(node, 'node')
      // 更改该结点父级属性
      node.parent.loaded = false
      // 手动调用该结点父级数据加载方法
      node.parent.loadData()
    },
    // 操作节点后，找到节点的父级节点，重新加载父级节点
    updateDepartment() {
      this.updateTree2(this.selectedNode.id)
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
