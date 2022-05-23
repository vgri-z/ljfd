<template>
  <div class="left">
    <div class="search">
      <el-button
        v-if="rights.includes('GlobalDangerSource.Create') || rights.includes('Superuser')"
        size="small"
        type="primary"
        @click="add"
        >添加</el-button
      >
      <el-button
        v-if="rights.includes('GlobalDangerSource.Update') || rights.includes('Superuser')"
        size="small"
        type="primary"
        @click="edit"
        >修改</el-button
      >
      <el-button
        v-if="rights.includes('GlobalDangerSource.Delete') || rights.includes('Superuser')"
        size="small"
        type="danger"
        @click="remove"
        >删除</el-button
      >
    </div>
    <el-tree
      :data="treeList"
      class="content-tree"
      node-key="id"
      :props="defaultProps"
      :expand-on-click-node="false"
      ref="departmentTreeRef"
      @node-click="handleNodeClick"
    />

    <!-- 添加危险区域 -->
    <edit-factory ref="editFactoryRef" />
  </div>
</template>

<script>
import EditFactory from './editFactory.vue'
import { emitter1 } from '../../../../utils/eventbus'
import { deleteDangerAres } from '../../../../service/main/content/content'
import { ElMessage } from 'element-plus'
export default {
  components: { EditFactory },
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      selectedNode: null
    }
  },
  props: {
    treeList: {
      type: Array,
      default: () => []
    },
    rights: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleNodeClick(node) {
      this.selectedNode = node
      emitter1.emit('nodeClick', node)
    },
    add() {
      const nodeData = this.selectedNode
      if (nodeData) {
        const data = { isAdd: true, node: nodeData }
        this.$refs.editFactoryRef.show(data)
      } else {
        const data = { isAdd: true, isAddTop: true, node: nodeData }
        this.$refs.editFactoryRef.show(data)
      }
    },
    edit() {
      this.$refs.editFactoryRef.show({ isAdd: false, node: this.selectedNode })
    },
    async remove() {
      const res = await deleteDangerAres(this.selectedNode.id)
      if (res.code === 0) {
        ElMessage({
          message: '操作成功',
          type: 'success'
        })
        emitter1.emit('updateDangerArea')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.left {
  width: 250px;
  height: 100%;
  border-right: 1px solid #e2e5e9;
  padding-right: 20px;
  box-sizing: border-box;
  overflow: auto;

  // :deep(.el-tree) {
  //   height: calc(100% - 60px);
  //   padding: 10px;
  //   border-radius: 5px;
  //   overflow: auto;
  // }

  :deep(.el-tree-node.is-current.is-focusable) {
    > div {
      > .el-tree-node__label {
        color: #409eff;
      }
    }
  }

  .search {
    margin-bottom: 10px;
    text-align: left;
  }
}
</style>
