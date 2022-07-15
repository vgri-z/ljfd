<template>
  <div class="edit">
    <el-dialog
      v-model="isDetailShow"
      center
      title="题目详情"
      width="45%"
      :close-on-click-modal="false"
      @closed="cancel"
    >
      <el-form :model="detail" label-width="90px" v-if="detail">
        <div class="title">题目</div>
        <el-row>
          <el-col :span="24">
            <el-form-item label="题目类型">
              <el-select disabled v-model="detail.type">
                <template v-for="item in types" :key="item.value">
                  <el-option :label="item.name" :value="item.value"></el-option>
                </template>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="题目名称">
              <el-input
                readonly
                type="textarea"
                v-model="detail.title"
                placeholder="请输入题目名称"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <div class="title" v-if="detail.type">答案</div>
        <div class="table">
          <template v-if="detail.type === 1 || detail.type === 2">
            <div class="type">选择题</div>
            <el-table :data="selectOptions" border>
              <el-table-column prop="text" label="答案内容" />
              <el-table-column label="是否是正确答案">
                <template #default="scope">
                  <el-radio-group disabled v-model="scope.row.isCorrect">
                    <el-radio :label="true">对</el-radio>
                    <el-radio :label="false">错</el-radio>
                  </el-radio-group>
                </template>
              </el-table-column>
            </el-table>
          </template>
          <template v-if="detail.type === 3">
            <div class="type">填空题</div>
            <el-table :data="fillOptions" border>
              <el-table-column prop="text" label="答案内容" />
              <el-table-column label="答案必须一致">
                <template #default="scope">
                  <el-radio-group disabled v-model="scope.row.isCorrect">
                    <el-radio :label="true">是</el-radio>
                    <el-radio :label="false">否</el-radio>
                  </el-radio-group>
                </template>
              </el-table-column>
            </el-table>
          </template>
          <template v-if="detail.type === 4">
            <div class="type">判断题</div>
            <el-radio-group v-model="isRight">
              <template v-for="(item, index) in judgeOption" :key="index">
                <el-radio disabled :label="item.isCorrect">{{ item.text }}</el-radio>
              </template>
            </el-radio-group>
          </template>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getQuestionDetail } from '../../../../service/main/question-bank/question-bank'
export default {
  data() {
    return {
      isDetailShow: false,
      title: '添加',
      detail: null,
      isRight: true,
      types: [
        { name: '单选题', value: 1 },
        { name: '多选题', value: 2 },
        { name: '填空题', value: 3 },
        { name: '判断题', value: 4 }
      ],
      judgeOption: null,
      fillOptions: null,
      selectOptions: null
    }
  },
  methods: {
    async show(id) {
      console.log(id)
      const res = await getQuestionDetail({ QuestionId: id })
      this.detail = res.data
      console.log(this.detail)
      if (res.data.type === 4) {
        // 判断题
        this.judgeOption = res.data.options
        this.isRight = true
      } else if (this.detail.type === 3) {
        // 填空题
        this.fillOptions = res.data.options
      } else if (this.detail.type === 1 || this.detail.type === 2) {
        // 选择题
        this.selectOptions = res.data.options
      }
      this.isDetailShow = true
    },
    cancel() {
      this.isDetailShow = false
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
