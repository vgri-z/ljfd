<template>
  <div class="content-verify">
    <div class="search">
      <el-form ref="searchFormRef" label-width="100px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="工厂">
              <el-select
                v-model="searchOption.organizationId"
                placeholder="请选择工厂"
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
          <el-col :span="6">
            <el-form-item label="审核状态">
              <el-select v-model="status" placeholder="请选择审核态" style="width: 100%">
                <el-option
                  v-for="item in approveStatus"
                  :key="item.name"
                  :label="item.name"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item>
              <el-button type="primary" @click="search">查询</el-button>
              <el-button type="primary" @click="reset">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="table">
      <el-table :data="draftList" border style="width: 100%">
        <el-table-column label="序号" prop="sort"></el-table-column>
        <el-table-column label="所在系统" prop="rootDangerZoneName"></el-table-column>
        <el-table-column label="修改原因" prop="description"></el-table-column>
        <el-table-column label="修改内容" prop="comment">
          <template #default="scope">
            {{ scope.row.changeContent.join(',') }}
          </template>
        </el-table-column>
        <el-table-column label="修改工厂" prop="organizationName"></el-table-column>
        <el-table-column label="修改人" prop="processorName"></el-table-column>
        <el-table-column label="修改时间" prop="createTime"></el-table-column>
        <el-table-column label="审核状态" prop="status">
          <template #default="scope">
            <el-button v-if="scope.row.status === 1" plain type="primary">
              {{ scope.row.statusText }}
            </el-button>
            <el-button v-if="scope.row.status === 2" plain type="success">
              {{ scope.row.statusText }}
            </el-button>
            <el-button v-if="scope.row.status === 3" plain type="danger">
              {{ scope.row.statusText }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button
              v-if="
                (rights.includes('DangerSourceDraft.Update') || rights.includes('Superuser')) &&
                scope.row.status === 1
              "
              type="text"
              size="small"
              @click="approve(scope.row)"
            >
              审核
            </el-button>
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
    <edit ref="editRef" @updateDraft="updateDraft" />
  </div>
</template>

<script>
import moment from 'moment'
import useApproveStatus from './hooks/useApproveStatus'
import useSectionType from './hooks/useSectionType'
import localCache from '../../../../utils/cache'
import { getDraftList } from '../../../../service/main/content/content'
import { getDepartmentList } from '../../../../service/main/department/department'
import Edit from './edit.vue'
import { ElMessage } from 'element-plus'
export default {
  components: { Edit },
  data() {
    return {
      currentPage: 1,
      total: 0,
      searchOption: {
        Index: 1,
        Size: 10,
        Status: null,
        organizationId: ''
      },
      status: '',
      isPlain: false,
      departmentList: [],
      draftList: [],
      rights: [],
      approveStatus: [
        { name: '待审核', value: 1 },
        { name: '已审核', value: 2 }
      ]
    }
  },
  created() {
    this.rights = localCache.cacheGet('userRights')
    this.getDepartmentList()
    this.getDraftList()
  },
  methods: {
    async search() {
      if (this.status === 1) {
        // 未审核
        this.searchOption.Status = 1
        this.getDraftList()
      } else if (this.status === 2) {
        //已审核
        this.draftList = []
        this.getHasVerify(2)
        this.getHasVerify(99)
      } else {
        this.getDraftList()
      }
    },
    // 获取已审核列表合集
    async getHasVerify(status) {
      this.searchOption.Status = status
      const res = await getDraftList(this.searchOption)
      res.data.list?.forEach((item, index) => {
        item.sort = index + 1
        item.createTime = moment(item.creationTime).format('YYYY-MM-DD HH:mm:ss')
        item.statusText = useApproveStatus(item.status)
        item.changeContent = []
        item.changedSections.forEach((o) => {
          const str = useSectionType(o.sectionType)
          item.changeContent.push(str)
        })
      })
      this.draftList.push(...res.data.list)
    },
    reset() {
      this.searchOption = {
        Index: 1,
        Size: 10,
        Status: null,
        organizationId: ''
      }
      this.getDraftList()
    },
    async getDraftList() {
      const res = await getDraftList(this.searchOption)
      this.draftList = res.data.list?.map((item, index) => {
        item.sort = index + 1
        item.createTime = moment(item.creationTime).format('YYYY-MM-DD HH:mm:ss')
        item.statusText = useApproveStatus(item.status)
        item.changeContent = []
        item.changedSections.forEach((o) => {
          const str = useSectionType(o.sectionType)
          item.changeContent.push(str)
        })
        return item
      })
      this.total = res.data.total
    },
    // 获取机构
    async getDepartmentList() {
      const res = await getDepartmentList()
      this.departmentList = res.data
      const userFactory = localCache.cacheGet('currentUserFactory')
      // 机构限制
      if (this.rights.includes('DangerSourceDraft.ManageOrganization')) {
        if (userFactory) {
          this.departmentList = [this.departmentList.find((item) => item.id === userFactory.id)]
        } else {
          ElMessage({
            message: '当前用户没有工厂',
            type: 'warning'
          })
        }
      } else {
        //
      }
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
    },
    updateDraft() {
      this.getDraftList()
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
