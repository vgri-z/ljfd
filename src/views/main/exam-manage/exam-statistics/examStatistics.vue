<template>
  <div class="exam-statistics">
    <div class="search">
      <el-form ref="searchFormRef" label-width="100px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="题目类型">
              <el-input placeholder="请输入题目类型"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="题目名称">
              <el-input placeholder="请输入题目名称"></el-input>
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
        <el-table-column prop="sort" label="排名"></el-table-column>
        <el-table-column prop="factoryName" label="工厂名称"></el-table-column>
        <el-table-column prop="examName" label="考试名称"></el-table-column>
        <el-table-column prop="personCount" label="完成考试人数"></el-table-column>
        <el-table-column prop="personRate" label="完成考试比例"></el-table-column>
        <el-table-column prop="passPersonCount" label="考试合格人数"></el-table-column>
        <el-table-column prop="passRate" label="考试合格比例"></el-table-column>
        <el-table-column prop="averageScore" label="平均分"></el-table-column>
      </el-table>
      <div class="page">
        <el-pagination
          v-model:currentPage="currentPage"
          :page-sizes="[10, 15, 20, 25]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { list } from './config/statistics.config'
export default {
  data() {
    return {
      searchOption: { Index: '1', Size: '10' },
      currentPage: 0,
      questionList: []
    }
  },
  created() {
    this.questionList = list
  },
  methods: {
    search() {},
    reset() {},
    add() {
      this.$refs.editRef.show()
    },
    edit() {},
    remove() {},
    handleSizeChange() {},
    handleCurrentChange() {}
  }
}
</script>

<style lang="less" scoped>
.exam-statistics {
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
