<template>
  <div class="edit">
    <el-dialog
      v-model="isFillShow"
      center
      title="添加填空题答案"
      width="25%"
      :close-on-click-modal="false"
      @closed="cancel"
    >
      <el-form ref="fillFormRef" :model="fillForm" :rules="rules" label-width="120px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="答案内容" prop="text">
              <el-input type="text" v-model="fillForm.text" placeholder="请输入答案内容" />
            </el-form-item>
          </el-col>
          <!-- <el-col :span="24">
            <el-form-item label="答案必须一致" prop="isCorrect">
              <el-radio-group v-model="fillForm.isCorrect">
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col> -->
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
      isFillShow: false,
      fillForm: {
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
        this.fillForm = Object.assign({}, data)
      }
      this.isFillShow = true
    },
    save() {
      this.$refs.fillFormRef.validate(async (valid) => {
        if (valid) {
          if (this.optionData) {
            this.$store.commit('question/changeFillOptions', { isAdd: false, data: this.fillForm })
          } else {
            this.$store.commit('question/changeFillOptions', { isAdd: true, data: this.fillForm })
          }
          this.optionData = null
          this.isFillShow = false
        }
      })
    },
    cancel() {
      this.fillForm = {
        text: '',
        index: 0,
        isCorrect: true
      }
      this.optionData = null
      this.isFillShow = false
    }
  }
}
</script>

<style lang="less" scoped></style>
