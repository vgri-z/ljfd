<template>
  <div class="rights">
    <el-dialog
      v-model="isRightsShow"
      center
      :close-on-click-modal="false"
      title="权限设置"
      width="40%"
      @closed="cancel"
    >
      <el-tree
        ref="treeRef"
        :data="rightsTree"
        show-checkbox
        default-expand-all
        node-key="name"
        highlight-current
        :props="defaultProps"
        :default-checked-keys="defaultCheckedKeys"
      />
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="setRights">确认</el-button>
          <el-button @click="cancel">取消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { getRightsTree, setRights, getUserRights } from '../../../../service/main/main'
import { ElMessage } from 'element-plus'
export default {
  data() {
    return {
      isRightsShow: false,
      rightsTree: [],
      defaultProps: {
        children: 'children',
        label: 'displayName'
      },
      userId: null,
      defaultCheckedKeys: [] //默认选中的权限集合
    }
  },
  methods: {
    show(id) {
      this.userId = id
      this.getRights()
      this._getUserRights()
      this.isRightsShow = true
    },
    async _getUserRights() {
      const res = await getUserRights(this.userId)
      this.defaultCheckedKeys = res.data
    },
    async setRights() {
      const checkNodes = this.$refs.treeRef.getCheckedNodes()
      const childNodes = []
      checkNodes.forEach((node) => {
        if (!node.children.length) {
          childNodes.push(node)
        }
      })
      const nodeNames = []
      childNodes.forEach((node) => {
        nodeNames.push(node.name)
      })
      const res = await setRights(this.userId, nodeNames)
      if (res.success) {
        ElMessage({
          message: '操作成功',
          type: 'success'
        })
      }
      this.isRightsShow = false
      console.log(res)
    },
    cancel() {
      this.isRightsShow = false
    },
    async getRights() {
      const res = await getRightsTree()
      this.rightsTree = this.addStatusForNode(res.data[0].permissions)
    },
    addStatusForNode(tree) {
      for (let node of tree) {
        if (node.children) {
          for (let childNode of node.children) {
            childNode.status = false
          }
        }
      }
      return tree
    }
  }
}
</script>

<style lang="less" scoped></style>
