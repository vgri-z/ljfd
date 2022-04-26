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
            <el-form-item label="名称" prop="name">
              <el-input v-model="editForm.name" placeholder="请输入名称" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="排序">
              <el-input-number
                v-model="editForm.order"
                class="mx-4"
                :min="0"
                :max="1000"
                controls-position="right"
                placeholder="请输入排序"
                style="width: 50%"
              />
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
import { addAreaRules } from './config/content.config'
import { addDangerAres, editDangerAres } from '../../../../service/main/content/content'
import { emitter1 } from '../../../../utils/eventbus'
import { ElMessage } from 'element-plus'
export default {
  data() {
    return {
      editForm: {
        name: '',
        order: 0
      },
      rules: addAreaRules,
      isEdit: false,
      isEditShow: false,
      title: '添加'
    }
  },
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
          this.editForm.parentId = null
        }
      } else {
        this.title = '编辑'
        this.isEdit = true
        this.editForm = Object.assign({}, this.editForm, data.node)
        this.editForm.dangerZoneId = data.node.id
        // console.log(this.editForm)
      }
      this.isEditShow = true
    },
    save() {
      this.$refs.editFormRef.validate(async (valid) => {
        if (valid) {
          // console.log(this.editForm)
          this.editForm.hasFactory = this.editForm.isHasFactory === '是' ? true : false
          let res = null
          if (this.editForm.id) {
            res = await editDangerAres(this.editForm)
          } else {
            res = await addDangerAres(this.editForm)
          }
          if (res.code === 0) {
            ElMessage({
              message: '操作成功',
              type: 'success'
            })
            this.isEditShow = false
            emitter1.emit('updateDangerArea')
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
