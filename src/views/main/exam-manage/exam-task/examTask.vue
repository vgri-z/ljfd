<template>
  <div class="exam-task">
    <div class="search">
      <el-form ref="searchFormRef" label-width="100px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="创建日期">
              <el-date-picker
                v-model="searchOption.CreateDate"
                type="date"
                placeholder="请选择创建日期"
                style="width: 100%"
                @change="dateChange"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="考试名称">
              <el-input
                v-model="searchOption.TestName"
                placeholder="请输入考试名称"
                style="width: 100%"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item>
              <el-button type="primary" @click="search">查询</el-button>
              <el-button @click="reset">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="table">
      <div class="add">
        <el-button type="primary" @click="add">新增</el-button>
      </div>
      <el-table :data="taskList" border style="width: 100%">
        <el-table-column prop="sort" label="序号"></el-table-column>
        <el-table-column prop="name" label="考试名称"></el-table-column>
        <el-table-column prop="startTime" label="开始时间"></el-table-column>
        <el-table-column prop="endTime" label="结束时间"></el-table-column>
        <el-table-column prop="creator" label="创建人"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column label="操作" min-width="150px">
          <template #default="scope">
            <el-button type="text" size="small" @click="detail(scope.row.id)">查看</el-button>
            <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
            <el-popconfirm title="是否确认删除该考试任务？" @confirm="remove(scope.row.id)">
              <template #reference>
                <el-button type="text" style="color: #f56c6c" size="small"> 删除 </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination
          v-model:currentPage="currentPage"
          :page-sizes="[10, 15, 20, 25]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </div>

    <edit ref="editRef" @updateTask="updateTask" />
    <detail ref="detailRef" />
  </div>
</template>

<script>
import moment from 'moment'
import { getExamTaskList, deleteExamTask } from '../../../../service/main/exam-task/exam-task'
import Edit from './edit.vue'
import Detail from './detail.vue'
import { ElMessage } from 'element-plus/lib/components'
export default {
  components: { Edit, Detail },
  data() {
    return {
      searchOption: {
        Index: 1,
        Size: 10,
        CreateDate: '',
        TestName: ''
      },
      pageSize: 10,
      currentPage: 0,
      total: 0,
      taskList: []
    }
  },
  created() {
    this.getExamTaskList()
  },
  methods: {
    search() {
      this.getExamTaskList()
    },
    reset() {
      this.searchOption = {
        Index: 1,
        Size: 10,
        CreateDate: '',
        TestName: ''
      }
      this.getExamTaskList()
    },
    async getExamTaskList() {
      const res = await getExamTaskList(this.searchOption)
      this.taskList = res.data.list.map((item, index) => {
        item.sort = index + 1
        item.startTime = moment(item.startTime).add(8, 'h').format('YYYY-MM-DD')
        item.endTime = moment(item.endTime).add(8, 'h').format('YYYY-MM-DD')
        item.createTime = moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')
        return item
      })
      this.total = res.data.total
    },
    add() {
      this.$refs.editRef.show()
    },
    edit(data) {
      this.$refs.editRef.show(data.id)
    },
    detail(id) {
      this.$refs.detailRef.show(id)
    },
    async remove(id) {
      const res = await deleteExamTask(id)
      if (res.code === 0) {
        ElMessage({
          message: '操作成功',
          type: 'success'
        })
        this.getExamTaskList()
      }
    },
    dateChange(event) {
      this.searchOption.CreateDate = moment(event).add(8, 'h').utc().toDate()
    },
    handleSizeChange(event) {
      this.pageSize = event
      this.searchOption.Size = event
      this.getExamTaskList()
    },
    handleCurrentChange(event) {
      this.searchOption.Index = event
      this.getExamTaskList()
    },
    updateTask() {
      this.getExamTaskList()
    }
  }
}
</script>

<style lang="less" scoped>
.exam-task {
  width: 100%;
  height: 100%;
  .search {
    background: #fff;
    padding: 20px;
    padding-bottom: 0;
    box-sizing: border-box;
    margin-bottom: 10px;
    border-radius: 4px;
  }

  .table {
    height: calc(100% - 160px);
    background: #fff;
    padding: 20px;
    border-radius: 4px;
    overflow: auto;

    .add {
      display: flex;
      justify-content: flex-start;
      margin-bottom: 10px;
    }

    .page {
      display: flex;
      justify-content: flex-end;
      margin-top: 10px;
    }
  }
}
</style>
