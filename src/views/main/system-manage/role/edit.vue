<template>
  <div class="edit">
    <el-dialog
      v-model="isEditShow"
      center
      title="添加"
      width="30%"
      :close-on-click-modal="false"
      @closed="cancel"
    >
      <el-form ref="editFormRef" :model="editForm" :rules="rules" label-width="90px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="角色名称" prop="name">
              <el-input
                v-model="editForm.name"
                :disabled="isDisabled"
                maxlength="256"
                placeholder="请输入角色名称"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="描述" prop="description">
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
import { addRules } from './config.js'
import { addUser, editUser } from '../../../../service/main/main'
// import {
//   getDepartmentList,
//   getChildrenDepartment
// } from '../../../../service/main/department/department'
import { ElMessage } from 'element-plus'
export default {
  data() {
    return {
      isEditShow: false,
      editForm: {
        userName: '',
        password: '',
        givenName: '',
        phoneNumber: null,
        organizationIds: '',
        organizationNames: ''
      },
      rules: addRules,
      isEdit: true,
      isDisabled: false,
      userData: null,
      defaultProps: {
        children: 'list',
        label: 'name'
      }
    }
  },
  methods: {
    show(data) {
      this._getDepartmentList()
      if (data) {
        this.userData = data
        const { userName, givenName, phoneNumber, id } = data
        this.editForm = Object.assign({}, { userName, givenName, phoneNumber, userId: id })
        this.isEdit = false
        this.isDisabled = true
      } else {
        this.isEdit = true
        this.isDisabled = false
        // console.log('新建用户')
      }
      this.isEditShow = true
    },
    edit() {
      this.$refs.editFormRef.validate(async (valid) => {
        if (valid) {
          // console.log(this.editForm)
          // if (!this.editForm.phoneNumber) this.editForm.phoneNumber = null
          let res = null
          if (this.editForm.userId) {
            res = await editUser(this.editForm)
            if (res.success) {
              // 添加成功
              ElMessage({
                message: '操作成功',
                type: 'success'
              })
              this.isEditShow = false
              this.$emit('addUser')
            }
          } else {
            res = await addUser(this.editForm)
            if (res.success) {
              // 添加成功
              ElMessage({
                message: '操作成功',
                type: 'success'
              })
              this.isEditShow = false
              this.$emit('addUser')
            }
          }
        }
      })
    },
    cancel() {
      this.editForm = {
        userName: '',
        password: '', // 123456@vV
        givenName: '',
        phoneNumber: null
      }
      this.isEditShow = false
    }
  }
}
</script>

<style lang="less" scoped></style>
