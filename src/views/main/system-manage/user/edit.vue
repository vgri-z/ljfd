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
      <el-form ref="editFormRef" :model="editForm" :rules="rules" label-width="70px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户名" prop="userName">
              <el-input
                v-model="editForm.userName"
                :disabled="isDisabled"
                maxlength="256"
                placeholder="请输入用户名"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="isEdit">
            <el-form-item label="密码" prop="password">
              <el-input
                v-model="editForm.password"
                maxlength="50"
                placeholder="请输入密码"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="姓名" prop="givenName">
              <el-input
                v-model="editForm.givenName"
                maxlength="256"
                placeholder="请输入姓名"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号" prop="phoneNumber">
              <el-input
                v-model="editForm.phoneNumber"
                maxlength="20"
                placeholder="请输入手机号"
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
import { ElMessage } from 'element-plus'
export default {
  data() {
    return {
      isEditShow: false,
      editForm: {
        userName: '',
        password: '', // 123456@vV
        givenName: '',
        phoneNumber: null
      },
      rules: addRules,
      isEdit: true,
      isDisabled: false,
      userData: null
    }
  },
  methods: {
    show(data) {
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
