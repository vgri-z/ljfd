<template>
  <div class="content">
    <div class="search">
      <el-form ref="searchFormRef" label-width="100px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="集团名称">
              <el-input placeholder="请选择集团"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="集团名称">
              <el-input placeholder="请选择集团"></el-input>
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
        <el-button type="primary" size="medium" @click="add">添加用户</el-button>
      </div>
      <el-table :data="contentList" border style="width: 100%">
        <el-table-column prop="userName" label="危险源及作业"></el-table-column>
        <el-table-column prop="givenName" label="案例个数"></el-table-column>
        <el-table-column prop="phoneNumber" label="视频个数"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="upload">附件上传</el-button>
          </template>
        </el-table-column>
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
export default {
  data() {
    return {
      currentPage: 1,
      total: 0,
      contentList: null,
      searchOption: {
        Index: 1,
        Size: 10
      }
    }
  },
  methods: {
    search() {},
    reset() {},
    getContentList() {},
    add() {},
    edit() {},
    upload() {},
    handleSizeChange(event) {
      this.searchOption.Size = event
      this.getContentList()
    },
    handleCurrentChange(event) {
      this.searchOption.Index = event
      this.getContentList()
    }
  }
}
</script>

<style lang="less">
.content {
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
