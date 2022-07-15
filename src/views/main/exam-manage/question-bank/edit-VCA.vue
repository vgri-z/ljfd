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
              <el-input v-model="editForm.name" maxlength="256" placeholder="请输入角色名称" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="描述">
              <el-input v-model="editForm.description" maxlength="50" placeholder="请输入描述" />
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

<script setup>
import { reactive, ref } from 'vue'
const rules = []
const isEditShow = ref(false)
const editForm = reactive({
  name: '',
  description: ''
})
// eslint-disable-next-line no-unused-vars
const show = () => {
  isEditShow.value = true
}
const cancel = () => {}
const edit = () => {}
</script>

<style lang="less" scoped></style>
