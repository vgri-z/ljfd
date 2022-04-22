<template>
  <div class="edit">
    <el-dialog
      v-model="isEditShow"
      center
      title="添加"
      width="25%"
      :close-on-click-modal="false"
      @closed="cancel"
    >
      <el-form ref="editFormRef" :model="editForm" :rules="rules" label-width="90px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="角色名称" prop="name">
              <el-input
                v-model="editForm.name"
                maxlength="256"
                placeholder="请输入角色名称"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="描述">
              <el-input
                v-model="editForm.description"
                maxlength="50"
                placeholder="请输入描述"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="edit">确认</el-button>
          <el-button @click="cancel">取消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { editUserRules } from './config/role.config'
import { addRole, editRole } from '../../../../service/main/role/role'
import { ElMessage } from 'element-plus'
export default {
  data() {
    return {
      isEditShow: false,
      editForm: {
        name: '',
        description: ''
      },
      rules: editUserRules,
      isEdit: true
    }
  },
  emits: ['updateRole'],
  methods: {
    show(data) {
      console.log(data)
      if (data) {
        this.editForm = Object.assign({}, this.editForm, data)
        this.editForm.roleId = this.editForm.id
      }
      this.isEditShow = true
    },
    edit() {
      this.$refs.editFormRef.validate(async (valid) => {
        if (valid) {
          let res = null
          if (this.editForm.id) {
            res = await editRole(this.editForm)
            if (res.code === 0) {
              // 添加成功
              ElMessage({
                message: '操作成功',
                type: 'success'
              })
              this.isEditShow = false
              this.$emit('updateRole')
            }
          } else {
            res = await addRole(this.editForm)
            if (res.code === 0) {
              // 添加成功
              ElMessage({
                message: '操作成功',
                type: 'success'
              })
              this.isEditShow = false
              this.$emit('updateRole')
            }
          }
        }
      })
    },
    cancel() {
      this.editForm = {
        name: '',
        description: ''
      }
      this.isEditShow = false
    }
  }
}
</script>

<style lang="less" scoped></style>
