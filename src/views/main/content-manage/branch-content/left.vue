<template>
  <div class="left">
    <el-tree
      :data="treeList"
      class="content-tree"
      default-expand-all
      node-key="id"
      :props="defaultProps"
      :expand-on-click-node="false"
      ref="departmentTreeRef"
      @node-click="handleNodeClick"
    />
  </div>
</template>

<script>
import { emitter1 } from '../../../../utils/eventbus'
import { deleteDangerAres } from '../../../../service/main/content/content'
import { ElMessage } from 'element-plus'
export default {
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
    }
  },
  methods: {
    handleNodeClick(node) {
      this.selectedNode = node
      emitter1.emit('nodeClick', node)
    },
    add() {
      this.$refs.editFactoryRef.show({ isAdd: true, node: this.selectedNode })
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
