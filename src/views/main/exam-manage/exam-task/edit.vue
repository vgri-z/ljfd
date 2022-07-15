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
      <el-form ref="editFormRef" :model="editForm" :rules="rules" label-width="90px">
        <div class="title">基本信息</div>
        <el-row>
          <el-col :span="12">
            <el-form-item label="考试名称" prop="name">
              <el-input v-model="editForm.name" maxlength="256" placeholder="请输入考试名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="考试总分" prop="totalScore">
              <el-input
                v-model="editForm.totalScore"
                maxlength="256"
                placeholder="请输入考试总分"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开始时间" prop="startTime">
              <el-date-picker
                v-model="editForm.startTime"
                type="date"
                placeholder="请选择开始时间"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结束时间" prop="endTime">
              <el-date-picker
                v-model="editForm.endTime"
                type="date"
                placeholder="请输入结束时间"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工厂" prop="organizationIds">
              <el-select
                v-model="editForm.organizationIds"
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
            <el-form-item label="总题数" prop="questionCount">
              <el-input-number
                disabled
                v-model="editForm.questionCount"
                :min="0"
                :max="1000"
                controls-position="right"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单选题" prop="singleQuantity">
              <el-input-number
                v-model="editForm.singleQuantity"
                :min="0"
                :max="1000"
                controls-position="right"
                style="width: 100%"
                @change="handleChange"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="多选题" prop="multiQuantity">
              <el-input-number
                v-model="editForm.multiQuantity"
                :min="0"
                :max="1000"
                controls-position="right"
                style="width: 100%"
                @change="handleChange"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="填空题" prop="clozeQuantity">
              <el-input-number
                v-model="editForm.clozeQuantity"
                :min="0"
                :max="1000"
                controls-position="right"
                style="width: 100%"
                @change="handleChange"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="判断题" prop="trueFalseQuantity">
              <el-input-number
                v-model="editForm.trueFalseQuantity"
                :min="0"
                :max="1000"
                controls-position="right"
                style="width: 100%"
                @change="handleChange"
              />
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

<script>
import { ElMessage } from 'element-plus/lib/components'
import {
  addExamTask,
  editExamTask,
  getExamTaskDetail,
  getDepartmentList
} from '../../../../service/main/exam-task/exam-task'
import { editRules } from './config/task.config'
import moment from 'moment'
export default {
  data() {
    return {
      title: '添加',
      isEditShow: false,
      editForm: {
        name: '',
        totalScore: '',
        startTime: '',
        endTime: '',
        singleQuantity: 0,
        multiQuantity: 0,
        clozeQuantity: 0,
        trueFalseQuantity: 0,
        organizationIds: [],
        questionCount: 0
        // subjectiveTopics: [
        //   {
        //     title: '',
        //     score: ''
        //   }
        // ]
      },
      rules: editRules,
      departmentList: null
    }
  },
  created() {
    this.getDepartmentList()
  },
  methods: {
    async show(id) {
      if (id) {
        this.title = '编辑'
        const res = await getExamTaskDetail({ ExamTaskId: id })
        res.data.startTime = moment(res.data.startTime).add(8, 'h').utc().toDate()
        res.data.endTime = moment(res.data.endTime).add(8, 'h').utc().toDate()
        console.log(res.data)
        this.editForm = Object.assign({}, this.editForm, res.data)
        this.editForm.examTaskId = this.editForm.id
      }
      this.isEditShow = true
    },
    async getDepartmentList() {
      const res = await getDepartmentList()
      this.departmentList = res.data
    },
    edit() {
      this.$refs.editFormRef.validate(async (valid) => {
        if (valid) {
          let res
          console.log(this.editForm)
          if (this.editForm.id) {
            res = await editExamTask(this.editForm)
          } else {
            res = await addExamTask(this.editForm)
          }

          if (res.code === 0) {
            ElMessage({
              message: '操作成功',
              type: 'success'
            })
            this.$emit('updateTask')
            this.isEditShow = false
          }
        }
      })
    },
    cancel() {
      this.editForm = {
        name: '',
        totalScore: '',
        startTime: '',
        endTime: '',
        singleQuantity: 0,
        multiQuantity: 0,
        clozeQuantity: 0,
        trueFalseQuantity: 0,
        organizationIds: [],
        questionCount: 0
      }
      this.isEditShow = false
    },
    handleChange() {
      const { singleQuantity, multiQuantity, clozeQuantity, trueFalseQuantity } = this.editForm
      this.editForm.questionCount =
        singleQuantity + multiQuantity + clozeQuantity + trueFalseQuantity
    }
  }
}
</script>

<style lang="less" scoped>
.edit {
  .title {
    margin-bottom: 20px;
  }

  :deep(.el-date-editor--datetime .el-input__wrapper) {
    width: 100%;
    box-sizing: border-box;
  }
}
</style>
