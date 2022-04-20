<template>
  <div class="reset">
    <el-dialog v-model="isResetShow" center title="重置密码" width="30%" @closed="cancel">
      <el-form ref="resetFormRef" :model="resetForm" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="原密码" prop="currentPassword">
              <el-input
                v-model="resetForm.currentPassword"
                maxlength="50"
                placeholder="请输入原密码"
                show-password
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="新密码" prop="newPassword">
              <el-input
                v-model="resetForm.newPassword"
                maxlength="50"
                placeholder="请输入新密码"
                show-password
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="确认密码" prop="confirmPassword">
              <el-input
                v-model="resetForm.confirmPassword"
                maxlength="50"
                placeholder="请确认密码"
                show-password
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="reset">确认</el-button>
          <el-button @click="cancel">取消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { resetRules } from './config.js'
import { editPassword } from '../../../../service/main/main'
import { ElMessage } from 'element-plus'
export default {
  data() {
    return {
      isResetShow: false,
      resetForm: {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      rules: resetRules
    }
  },
  methods: {
    show() {
      this.isResetShow = true
    },
    reset() {
      this.$refs.resetFormRef.validate(async (valid) => {
        if (valid) {
          console.log(this.resetForm)
          const flag = this.confirmNewOld(
            this.resetForm.newPassword,
            this.resetForm.confirmPassword
          )
          if (flag) return
          const res = await editPassword(this.resetForm)
          console.log(res)
          if (res.success) {
            // 密码修改成功
            ElMessage({
              message: '操作成功',
              type: 'success'
            })
            this.isResetShow = false
            this.$router.push('/login')
          } else {
            // 密码修改出错
            ElMessage({
              message: res.message,
              type: 'error'
            })
          }
        }
      })
    },
    // 判断新密码与确认密码时候相同
    confirmNewOld(newPassword, confirmPassword) {
      if (newPassword !== confirmPassword) {
        ElMessage({
          message: '确认密码不正确',
          type: 'warning'
        })
        return true
      }
    },
    cancel() {
      this.resetForm = {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }
      this.isResetShow = false
    }
  }
}
</script>

<style lang="less" scoped></style>
