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

  .search {
    margin-bottom: 10px;
    text-align: left;
  }
}
</style>
