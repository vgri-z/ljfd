<template>
  <div class="content-verify">
    <div class="search">
      <el-button>未审核(3)</el-button>
      <el-button>已审核(3)</el-button>
    </div>
    <div class="table">
      <el-table :data="draftList" border style="width: 100%">
        <el-table-column label="序号" prop="sort"></el-table-column>
        <el-table-column label="所在系统" prop="RootDangerZoneName"></el-table-column>
        <el-table-column label="修改原因" prop="description"></el-table-column>
        <el-table-column label="修改内容" prop="comment"></el-table-column>
        <el-table-column label="修改工厂" prop="organizationName"></el-table-column>
        <el-table-column label="修改人" prop="processorName"></el-table-column>
        <el-table-column label="修改时间" prop="createTime"></el-table-column>
        <el-table-column label="审核状态" prop="status">
          <template #default="scope">
            <el-button v-if="scope.row.status === 1" type="primary">
              {{ scope.row.statusText }}
            </el-button>
            <el-button v-if="scope.row.status === 2" type="success">
              {{ scope.row.statusText }}
            </el-button>
            <el-button v-if="scope.row.status === 3" type="danger">
              {{ scope.row.statusText }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button type="text" size="small" @click="approve(scope.row)"> 审核 </el-button>
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

    <!-- 审核 -->
    <edit ref="editRef" />
  </div>
</template>

<script>
import moment from 'moment'
import useApproveStatus from './hooks/useApproveStatus'
import { getDraftList } from '../../../../service/main/content/content'
import Edit from './edit.vue'
export default {
  components: { Edit },
  data() {
    return {
      currentPage: 1,
      total: 0,
      searchOption: {
        Index: 1,
        Size: 10
      },
      draftList: []
    }
  },
  created() {
    this.getDraftList()
  },
  methods: {
    async getDraftList() {
      const res = await getDraftList(this.searchOption)
      this.draftList = res.data.list.map((item, index) => {
        item.sort = index + 1
        item.createTime = moment(item.creationTime).format('YYYY-MM-DD HH:mm:ss')
        item.statusText = useApproveStatus(item.status)
        return item
      })
      this.total = res.data.total
    },
    // 审核
    approve(data) {
      this.$refs.editRef.show(data)
    },
    handleSizeChange(event) {
      this.searchOption.Size = event
      this._getUserList()
    },
    handleCurrentChange(event) {
      this.searchOption.Index = event
      this._getUserList()
    }
  }
}
</script>

<style lang="less" scoped>
.content-verify {
  width: 100%;
  height: 100%;
  .search {
    background: #fff;
    padding: 10px 20px;
    box-sizing: border-box;
    margin-bottom: 10px;
    border-radius: 4px;
    display: flex;
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
