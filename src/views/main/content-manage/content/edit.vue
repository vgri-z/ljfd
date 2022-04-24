<template>
  <div class="edit">
    <el-dialog
      v-model="isEditShow"
      center
      :title="title"
      width="40%"
      :close-on-click-modal="false"
      @closed="cancel"
    >
      <el-form ref="editFormRef" :model="editForm" :rules="rules" label-width="200px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="作业活动/设备设施">
              <el-input placeholder="请输入作业活动/设备设施" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="危险源或潜在事件">
              <el-input placeholder="请输入危险源或潜在事件" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="可能发生的事故类型及后果">
              <el-input placeholder="请输入可能发生的事故类型及后果" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="工程控制措施">
              <el-input placeholder="请输入工程控制措施" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="管理措施">
              <el-input placeholder="请输入管理措施" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="培训教育措施">
              <el-input placeholder="请输入培训教育措施" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="个体防护">
              <el-input placeholder="请输入个体防护" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="风险分级">
              <el-input placeholder="请输入风险分级" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="建议新增(改进)措施">
              <el-input placeholder="请输入建议新增(改进)措施" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="危险源或潜在事件">
              <el-input placeholder="请输入危险源或潜在事件" />
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
export default {
  data() {
    return {
      isEditShow: false,
      editForm: {},
      title: '编辑',
      rules: []
    }
  },
  methods: {
    show() {
      this.isEditShow = true
    },
    save() {},
    cancel() {
      this.isEditShow = false
    }
  }
}
</script>

<style lang="less" scoped></style>
