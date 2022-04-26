<template>
  <div class="role-set">
    <el-dialog
      v-model="isShowRoleSet"
      center
      :close-on-click-modal="false"
      title="角色设置"
      width="30%"
      @closed="cancel"
    >
      <el-select v-model="roles" multiple placeholder="请选择角色" style="width: 100%">
        <el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.name" />
      </el-select>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="setRoles">确认</el-button>
          <el-button @click="cancel">取消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
import { getRoleList, setRoles, getUserRoles } from '../../../../service/main/role/role'
export default {
  data() {
    return {
      isShowRoleSet: false,
      roleList: null,
      searchOption: {
        Index: 1,
        Size: 100
      },
      roles: [],
      userId: null
    }
  },
  methods: {
    show(id) {
      this.roles = []
      this.userId = id
      this.getRoleList()
      this.getUserRoles(this.userId)
      this.isShowRoleSet = true
    },
    async getRoleList() {
      const res = await getRoleList(this.searchOption)
      this.roleList = res.data.list
    },
    async getUserRoles(userId) {
      const res = await getUserRoles(userId)
      res.data.forEach((item) => {
        this.roles.push(item.name)
      })
    },
    async setRoles() {
      const params = {
        userId: this.userId,
        roles: this.roles
      }
      const res = await setRoles(params)
      if (res.code === 0) {
        ElMessage({
          message: '操作成功',
          type: 'success'
        })
      }
      this.isShowRoleSet = false
    },
    cancel() {
      this.isShowRoleSet = false
    }
  }
}
</script>

<style lang="less" scoped>
.role-set {
}
</style>
