<template>
  <div class="edit">
    <el-dialog
      v-model="isEditShow"
      center
      :title="title"
      width="45%"
      :close-on-click-modal="false"
      @closed="cancel"
    >
      <el-form ref="editFormRef" :model="editForm" :rules="rules" label-width="90px">
        <div class="title">题目</div>
        <el-row>
          <el-col :span="24">
            <el-form-item label="题目类型" prop="type">
              <el-select v-model="editForm.type" :disabled="isForbidType">
                <template v-for="item in types" :key="item.value">
                  <el-option :label="item.name" :value="item.value"></el-option>
                </template>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="题目名称" prop="title">
              <el-input type="textarea" v-model="editForm.title" placeholder="请输入题目名称" />
            </el-form-item>
          </el-col>
        </el-row>
        <div class="title" v-if="editForm.type">答案</div>
        <div class="table">
          <template v-if="editForm.type === 1 || editForm.type === 2">
            <div class="type">选择题</div>
            <select-answer ref="selectAnswerRef" />
          </template>
          <template v-if="editForm.type === 3">
            <div class="type">填空题</div>
            <fill-answer ref="fillAnswerRef" />
          </template>
          <template v-if="editForm.type === 4">
            <div class="type">判断题</div>
            <judge-answer
              ref="judgeAnswerRef"
              :isRight="isRight"
              @changeJudgeOption="changeJudgeOption"
            />
          </template>
        </div>
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
import { rules } from './config/question.config'
import JudgeAnswer from './judgeAnswer.vue'
import FillAnswer from './fillAnswer.vue'
import SelectAnswer from './selectAnswer.vue'
import {
  addQuestion,
  editQuestion,
  getQuestionDetail
} from '../../../../service/main/question-bank/question-bank'
import { ElMessage } from 'element-plus/lib/components'
import _ from 'lodash'
export default {
  components: { JudgeAnswer, FillAnswer, SelectAnswer },
  data() {
    return {
      isEditShow: false,
      title: '添加',
      editForm: {
        title: '',
        type: '',
        options: []
      },
      rules,
      isRight: true,
      isForbidType: false, // 是否禁止修改题型
      types: [
        { name: '单选题', value: 1 },
        { name: '多选题', value: 2 },
        { name: '填空题', value: 3 },
        { name: '判断题', value: 4 }
      ],
      judgeOption: [
        {
          text: '对',
          isCorrect: true,
          index: 0
        },
        {
          text: '错',
          isCorrect: false,
          index: 1
        }
      ]
    }
  },
  methods: {
    async show(id) {
      if (id) {
        this.title = '编辑'
        this.isForbidType = true
        const res = await getQuestionDetail({ QuestionId: id })
        this.editForm = Object.assign({}, this.editForm, res.data)
        this.editForm.questionId = this.editForm.id
        if (res.data.type === 4) {
          // 判断题
          // this.$store.commit('question/changeJudgeOptions', _.cloneDeep(res.data.options))
          this.judgeOption = _.cloneDeep(res.data.options)
          if (this.judgeOption[0].isCorrect) {
            // 正确答案是 对
            this.isRight = true
          } else {
            this.isRight = false
          }
        } else if (this.editForm.type === 3) {
          // 填空题
          res.data.options.forEach((item) => {
            this.$store.commit('question/changeFillOptions', { isAdd: true, data: item })
          })
        } else if (this.editForm.type === 1 || this.editForm.type === 2) {
          // 选择题
          res.data.options.forEach((item) => {
            this.$store.commit('question/changeSelectOptions', { isAdd: true, data: item })
          })
        }
      } else {
        this.isForbidType = false
      }
      this.isEditShow = true
    },
    changeJudgeOption(judgeAnswer) {
      this.isRight = judgeAnswer
      if (judgeAnswer) {
        // 正确答案是 对
        this.judgeOption[0].isCorrect = true
        this.judgeOption[1].isCorrect = false
      } else {
        // 正确答案是 错
        this.judgeOption[0].isCorrect = false
        this.judgeOption[1].isCorrect = true
      }
    },
    save() {
      this.$refs.editFormRef.validate(async (valid) => {
        if (valid) {
          let res
          if (this.editForm.type === 4) {
            // 判断题
            this.editForm.options = this.judgeOption
          } else if (this.editForm.type === 3) {
            // 填空题
            this.editForm.options = this.$store.state.question.fillOptions
          } else if (this.editForm.type === 1 || this.editForm.type === 2) {
            // 选择题
            this.editForm.options = this.$store.state.question.selectOptions
          }
          if (this.editForm.id) {
            res = await editQuestion(this.editForm)
          } else {
            res = await addQuestion(this.editForm)
          }
          if (res.code === 0) {
            ElMessage({
              message: '操作成功',
              type: 'success'
            })
          }
          this.$emit('updateEdit')
          this.$store.commit('question/resetFillOptions')
          this.$store.commit('question/resetSelectOptions')
          this.isEditShow = false
        }
      })
    },
    cancel() {
      this.editForm = {
        title: '',
        type: '',
        options: []
      }
      this.$store.commit('question/resetFillOptions')
      this.$store.commit('question/resetSelectOptions')
      this.isEditShow = false
    }
  }
}
</script>

<style lang="less" scoped>
.title {
  font-weight: 600;
  margin-bottom: 20px;
}

.table {
  width: 100%;

  .type {
    margin-bottom: 10px;
    text-align: center;
  }
}
</style>
