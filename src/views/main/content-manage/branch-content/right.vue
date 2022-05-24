<template>
  <div class="right">
    <div class="danger-info">
      <el-table :data="dangerList" border style="width: 100%">
        <el-table-column prop="sort" label="序号">
          <template #default="scope">
            <span :style="{ fontWeight: scope.row.id ? '600' : '' }">{{ scope.row.sort }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="危险源或潜在事件"></el-table-column>
        <el-table-column label="图片">
          <template #default="scope">
            {{ scope.row.imagesFiles.length }}
          </template>
        </el-table-column>
        <el-table-column label="视频">
          <template #default="scope">
            {{ scope.row.videos.length }}
          </template>
        </el-table-column>
        <el-table-column prop="phoneNumber" label="案例">
          <template #default="scope">
            {{ scope.row.caseFiles.length }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              v-if="
                rights.includes('DangerSource.Create') ||
                rights.includes('DangerSource.Update') ||
                rights.includes('DangerSourceDraft.Update') ||
                rights.includes('Superuser')
              "
              type="text"
              size="small"
              @click="edit(scope.row)"
              >编辑</el-button
            >
            <el-button
              v-if="
                rights.includes('DangerSource.Create') ||
                rights.includes('DangerSource.Update') ||
                rights.includes('DangerSourceDraft.Update') ||
                rights.includes('Superuser')
              "
              type="text"
              size="small"
              @click="fileEdit(scope.row)"
              >附件管理</el-button
            >
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

    <!-- 编辑 -->
    <edit ref="editRef" @updateGlobalDanger="updateGlobalDanger" />
    <!-- 文件管理 -->
    <file-edit ref="fileEditRef" @updateGlobalDanger="updateGlobalDanger" />
  </div>
</template>

<script>
import Edit from './edit.vue'
import FileEdit from './fileEdit.vue'
import { emitter1 } from '../../../../utils/eventbus'
import { getBranchDangerList } from '../../../../service/main/content/content'
import { ElMessage } from 'element-plus/lib/components'
export default {
  components: { Edit, FileEdit },
  data() {
    return {
      dangerList: null,
      searchOptions: {
        DangerZoneId: '',
        OrganizationId: '',
        Index: 1,
        Size: 10
      },
      pageSize: 10,
      total: 0,
      dangerNode: null
    }
  },
  props: {
    rights: {
      type: Array,
      default: () => []
    },
    OrganizationId: {
      type: String,
      default: ''
    }
  },
  created() {
    this.searchOptions.OrganizationId = this.$store.state.login.userFactory?.id
    emitter1.on('nodeClick', (node) => {
      this.dangerNode = node
      this.searchOptions.DangerZoneId = node.id
      this.getBranchDangerList()
    })
    // 监听工厂的修改，请求列表
    emitter1.on('updateBranchDangerList', (id) => {
      this.searchOptions.OrganizationId = id
      this.getBranchDangerList()
    })
  },
  methods: {
    async getBranchDangerList() {
      // 当前用户无工厂
      if (!this.searchOptions.OrganizationId) {
        ElMessage({
          message: '当前用户不属于任何工厂',
          type: 'warning'
        })
        return false
      }
      const res = await getBranchDangerList(this.searchOptions)
      if (res.data) {
        res.data.list.forEach((item, index) => {
          item.sort = index + 1
          item.videos = []
          item.caseFiles = []
          item.imagesFiles = []
          // 分离视频、图片和案例文件
          item.files.forEach((file) => {
            if (file.mime.indexOf('video/') !== -1) {
              item.videos.push(file)
            } else if (file.mime.indexOf('image/') !== -1) {
              item.imagesFiles.push(file)
            } else {
              item.caseFiles.push(file)
            }
          })
        })
        this.dangerList = res.data.list
        this.total = res.data.total
        // console.log(this.dangerList)
      }
    },
    edit(data) {
      // 分厂没有添加危险源，只能修改集团的危险源，分厂提交修改后，如果审核通过，就会有id，未提交修改或者审核不通过就没有id
      this.$refs.editRef.show(data)
    },
    // 附件管理
    fileEdit(data) {
      this.$refs.fileEditRef.show(data)
    },
    updateGlobalDanger() {
      this.getBranchDangerList()
    },
    handleSizeChange(event) {
      this.searchOptions.Size = event
      this.pageSize = event
      this.getBranchDangerList()
    },
    handleCurrentChange(event) {
      this.searchOptions.Index = event
      this.getBranchDangerList()
    }
  }
}
</script>

<style lang="less" scoped>
.right {
  flex: 1;
  padding: 20px;
  font-size: 15px;

  .add {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 10px;
  }

  .el-col {
    margin-bottom: 30px;
    text-align: left;
  }

  .page {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
}
</style>
