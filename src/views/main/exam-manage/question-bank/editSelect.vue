<template>
  <div class="edit">
    <el-dialog
      v-model="isSelectShow"
      center
      title="添加选择题答案"
      width="25%"
      :close-on-click-modal="false"
      @closed="cancel"
    >
      <el-form ref="selectFormRef" :model="selectForm" :rules="rules" label-width="130px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="答案内容" prop="text">
              <el-input type="text" v-model="selectForm.text" placeholder="请输入答案内容" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="是否是正确答案" prop="isCorrect">
              <el-radio-group v-model="selectForm.isCorrect">
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio>
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
import { fillRules } from './config/question.config'
export default {
  data() {
    return {
      isSelectShow: false,
      selectForm: {
        text: '',
        index: 0,
        isCorrect: true
      },
      rules: fillRules,
      optionData: null
    }
  },
  methods: {
    show(data) {
      if (data) {
        this.optionData = data
        this.selectForm = Object.assign({}, data)
      }
      this.isSelectShow = true
    },
    save() {
      this.$refs.selectFormRef.validate(async (valid) => {
        if (valid) {
          if (this.optionData) {
            this.$store.commit('question/changeSelectOptions', {
              isAdd: false,
              data: this.selectForm
            })
          } else {
            this.$store.commit('question/changeSelectOptions', {
              isAdd: true,
              data: this.selectForm
            })
          }
          this.optionData = null
          this.isSelectShow = false
        }
      })
    },
    cancel() {
      this.selectForm = {
        text: '',
        index: 0,
        isCorrect: true
      }
      this.optionData = null
      this.isSelectShow = false
    }
  }
}
</script>

<style lang="less" scoped></style>
