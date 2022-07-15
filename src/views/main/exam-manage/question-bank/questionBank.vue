<template>
  <div class="question-bank">
    <div class="search">
      <el-form ref="searchFormRef" label-width="100px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="题目类型">
              <el-select v-model="searchOption.TypeValue">
                <template v-for="item in types" :key="item.value">
                  <el-option :label="item.name" :value="item.value"></el-option>
                </template>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="题目名称">
              <el-input v-model="searchOption.Title" placeholder="请输入题目名称"></el-input>
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
      <el-table :data="questionList" border style="width: 100%">
        <el-table-column prop="sort" label="序号" width="60"></el-table-column>
        <el-table-column prop="title" label="题目名称">
          <template #default="scope">
            <el-tooltip
              class="box-item"
              effect="dark"
              :content="scope.row.title"
              placement="top-start"
            >
              <span style="white-space: nowrap">{{ scope.row.title }}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="typeText" label="题目类型" width="100"></el-table-column>
        <el-table-column prop="creator" label="创建人" width="120"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="200"></el-table-column>
        <el-table-column label="操作" width="180">
          <template v-slot="scope">
            <el-button type="text" size="small" @click="detail(scope.row.id)"> 查看 </el-button>
            <el-button type="text" size="small" @click="edit(scope.row.id)"> 编辑 </el-button>
            <el-popconfirm title="是否确认删除该题目？" @confirm="remove(scope.row.id)">
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

    <Edit ref="editRef" @updateEdit="updateEdit" />
    <detail ref="detailRef" />
  </div>
</template>

<script>
import useType from './hooks/useType'
import moment from 'moment'
import {
  getQuestionList,
  deleteQuestion
} from '../../../../service/main/question-bank/question-bank'
import Edit from './edit.vue'
import Detail from './detail.vue'
import { ElMessage } from 'element-plus/lib/components'

export default {
  components: { Edit, Detail },
  data() {
    return {
      searchOption: { Index: '1', Size: '10', TypeValue: '', Title: '' },
      currentPage: 0,
      questionList: [],
      total: 0,
      pageSize: 10,
      types: [
        { name: '单选题', value: 1 },
        { name: '多选题', value: 2 },
        { name: '填空题', value: 3 },
        { name: '判断题', value: 4 }
      ]
    }
  },
  created() {
    this.getQuestionList()
  },
  methods: {
    search() {
      this.getQuestionList()
    },
    reset() {
      this.searchOption = {
        Index: '1',
        Size: '10',
        TypeValue: '',
        Title: ''
      }
      this.getQuestionList()
    },
    async getQuestionList() {
      const res = await getQuestionList(this.searchOption)
      this.questionList = res.data.list.map((item, index) => {
        item.sort = index + 1
        item.typeText = useType(item.type)
        item.createTime = moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')
        return item
      })
      this.total = res.data.total
      console.log(res)
    },
    add() {
      this.$refs.editRef.show()
    },
    edit(id) {
      this.$refs.editRef.show(id)
    },
    detail(id) {
      this.$refs.detailRef.show(id)
    },
    async remove(id) {
      const res = await deleteQuestion(id)
      if (res.code === 0) {
        ElMessage({
          message: '操作成功',
          type: 'success'
        })
        this.getQuestionList()
      }
    },
    handleSizeChange(event) {
      this.searchOption.Size = event
      this.pageSize = event
      this.getQuestionList()
    },
    handleCurrentChange(event) {
      this.searchOption.Index = event
      this.getQuestionList()
    },
    updateEdit() {
      this.getQuestionList()
    }
  }
}
</script>

<style lang="less" scoped>
.question-bank {
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
