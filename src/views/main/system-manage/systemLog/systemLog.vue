<template>
  <div class="system-log">
    <div class="search">
      <el-form ref="searchFormRef" :model="searchForm" label-width="80px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="操作人">
              <el-input v-model="searchForm.UserName" placeholder="请输入操作人"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="操作时间">
              <el-date-picker
                v-model="searchForm.LogTime"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                style="width: 100%"
                @change="timeChange"
              >
              </el-date-picker>
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
      <el-table :data="logList" border style="width: 100%">
        <el-table-column prop="userName" label="操作人" width="120"></el-table-column>
        <el-table-column prop="httpMethod" label="请求方式" width="80"></el-table-column>
        <el-table-column prop="httpStatusCode" label="状态码" width="80"></el-table-column>
        <el-table-column prop="httpStatusCode" label="是否报错" width="80">
          <template v-slot="scope">
            <div>{{ scope.row.hasException ? '是' : '否' }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="comments" label="内容"></el-table-column>
        <el-table-column prop="requestUrl" label="请求url"></el-table-column>
        <el-table-column prop="creationTime" label="操作时间" width="180"></el-table-column>
        <el-table-column label="操作" width="100">
          <template v-slot="scope">
            <el-button type="text" size="small" @click="detail(scope.row)">查看</el-button>
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
3
<script>
import { getLogList } from '../../../../service/main/main'
import localCache from '../../../../utils/cache'
import moment from 'moment'
export default {
  name: 'user',
  data() {
    return {
      currentPage: 1,
      total: 0,
      searchForm: {
        UserName: '',
        StartTime: '',
        EndTime: '',
        LogTime: ''
      },
      searchOption: {
        Index: 1,
        Size: 10
      },
      logList: null
    }
  },
  created() {
    this._getLogList()
  },
  methods: {
    search() {
      this._getLogList()
    },
    reset() {
      this.searchForm = { UserName: '', StartTime: '', EndTime: '', LogTime: '' }
      this.search()
    },
    detail(data) {
      localCache.cacheSet('detail', data)
      this.$router.push('/main/system-manage/systemLog/detail/' + data.id)
    },
    // 获取用户列表
    async _getLogList() {
      const obj = Object.assign({}, this.searchForm, this.searchOption)
      const res = await getLogList(obj)
      // console.log(res)
      this.total = res.data.total
      this.logList = res.data.list.map((item) => {
        item.creationTime = moment(item.creationTime).format('YYYY-MM-DD HH:mm:ss')
        return item
      })
    },
    // 添加用户
    add() {
      this.$refs.editRef.show()
    },
    handleSizeChange(event) {
      this.searchOption.Size = event
      this._getLogList()
    },
    handleCurrentChange(event) {
      this.searchOption.Index = event
      this._getLogList()
    },
    timeChange(event) {
      this.searchForm.StartTime = event[0]
      this.searchForm.EndTime = event[1]
    }
  }
}
</script>

<style lang="less" scoped>
.system-log {
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
