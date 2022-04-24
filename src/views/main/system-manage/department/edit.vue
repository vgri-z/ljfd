<template>
  <div class="edit">
    <el-dialog
      v-model="isEditShow"
      center
      :title="title"
      width="30%"
      :close-on-click-modal="false"
      @closed="cancel"
    >
      <el-form ref="editFormRef" :model="editForm" :rules="rules" label-width="120px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="机构名称" prop="name">
              <el-input v-model="editForm.name" placeholder="请输入机构名称" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="是否拥有工厂" prop="isHasFactory">
              <el-radio-group v-model="editForm.isHasFactory">
                <el-radio label="是"></el-radio>
                <el-radio label="否"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="save">确认</el-button>
          <el-button @click="cancel">取消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { editUserRules } from './config/department.config'
import { addDepartment, editDepartment } from '../../../../service/main/department/department'
import { ElMessage } from 'element-plus'
export default {
  data() {
    return {
      editForm: {
        name: '',
        hasFactory: '',
        isHasFactory: '是'
      },
      rules: editUserRules,
      isEdit: false,
      isEditShow: false,
      title: '添加'
    }
  },
  emits: ['updateEdit'],
  methods: {
    show(data) {
      if (data.isAdd) {
        this.title = '添加'
        this.isEdit = false
        if (!data.isAddTop) {
          // 添加子级
          this.editForm.parentId = data.node.id
        } else {
          // 添加顶级
        }
        // console.log(data)
      } else {
        this.title = '编辑'
        this.isEdit = true
        this.editForm = Object.assign({}, this.editForm, data.node)
        this.editForm.organizationId = data.node.id
      }
      this.isEditShow = true
    },
    save() {
      this.$refs.editFormRef.validate(async (valid) => {
        if (valid) {
          // console.log(this.editForm)
          this.editForm.hasFactory = this.editForm.isHasFactory === '是' ? true : false
          if (this.editForm.id) {
            const res = await editDepartment(this.editForm)
            if (res.code === 0) {
              ElMessage({
                message: '操作成功',
                type: 'success'
              })
              this.isEditShow = false
              this.$emit('updateEdit')
            }
          } else {
            const res = await addDepartment(this.editForm)
            if (res.code === 0) {
              ElMessage({
                message: '操作成功',
                type: 'success'
              })
              this.isEditShow = false
              this.$emit('updateEdit', res.data)
            }
          }
        }
      })
    },
    cancel() {
      this.editForm = {
        name: '',
        hasFactory: '',
        isHasFactory: '是'
      }
      this.isEditShow = false
    }
  }
}
</script>

<style lang="less" scoped>
.edit {
}
</style>
