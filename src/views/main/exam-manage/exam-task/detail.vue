<template>
  <div class="detail">
    <el-dialog
      v-model="isDetailShow"
      center
      title="考试任务详情"
      width="40%"
      :close-on-click-modal="false"
      @closed="cancel"
    >
      <el-form :model="detail" label-width="90px" v-if="detail">
        <div class="title">基本信息</div>
        <el-row>
          <el-col :span="12">
            <el-form-item label="考试名称">
              <el-input
                readonly
                v-model="detail.name"
                maxlength="256"
                placeholder="请输入考试名称"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="考试总分">
              <el-input
                readonly
                v-model="detail.totalScore"
                maxlength="256"
                placeholder="请输入考试总分"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开始时间">
              <el-date-picker
                disabled
                v-model="detail.startTime"
                type="date"
                placeholder="请选择开始时间"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结束时间">
              <el-date-picker
                disabled
                v-model="detail.endTime"
                type="date"
                placeholder="请输入结束时间"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工厂">
              <el-select
                disabled
                v-model="detail.organizationIds"
                multiple
                placeholder="请选择机构"
                style="width: 100%"
              >
                <el-option
                  v-for="item in departmentList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="title">组题信息</div>
        <el-row>
          <el-col :span="12">
            <el-form-item label="总题数">
              <el-input readonly v-model="detail.questionCount" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单选题">
              <el-input readonly v-model="detail.singleQuantity" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="多选题">
              <el-input readonly v-model="detail.multiQuantity" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="填空题">
              <el-input readonly v-model="detail.clozeQuantity" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="判断题">
              <el-input readonly v-model="detail.trueFalseQuantity" style="width: 100%" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getExamTaskDetail, getDepartmentList } from '../../../../service/main/exam-task/exam-task'
import moment from 'moment'
export default {
  data() {
    return {
      isDetailShow: false,
      detail: null,
      departmentList: null
    }
  },
  created() {
    this.getDepartmentList()
  },
  methods: {
    show(id) {
      this.getExamTaskDetail(id)
      this.isDetailShow = true
    },
    async getDepartmentList() {
      const res = await getDepartmentList()
      this.departmentList = res.data
    },
    async getExamTaskDetail(id) {
      const res = await getExamTaskDetail({ ExamTaskId: id })
      this.detail = res.data
      this.detail.startTime = moment(this.detail.startTime).add(8, 'h').format('YYYY-MM-DD')
      this.detail.endTime = moment(this.detail.endTime).add(8, 'h').format('YYYY-MM-DD')
      this.detail.questionCount =
        this.detail.singleQuantity +
        this.detail.multiQuantity +
        this.detail.clozeQuantity +
        this.detail.trueFalseQuantity
    },
    cancel() {
      this.isDetailShow = false
    }
  }
}
</script>

<style lang="less" scoped>
.detail {
  .title {
    margin-bottom: 20px;
  }
}
</style>
