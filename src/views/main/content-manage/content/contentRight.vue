<template>
  <div class="right">
    <div class="add">
      <el-button
        v-if="rights.includes('GlobalDangerSource.Create') || rights.includes('Superuser')"
        type="primary"
        @click="add"
        >添加危险源</el-button
      >
    </div>
    <div class="danger-info">
      <el-table :data="dangerList" border style="width: 100%">
        <el-table-column prop="sort" label="序号"></el-table-column>
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
              v-if="rights.includes('GlobalDangerSource.Update') || rights.includes('Superuser')"
              type="text"
              size="small"
              @click="edit(scope.row)"
              >编辑</el-button
            >
            <el-button
              v-if="rights.includes('GlobalDangerSource.Update') || rights.includes('Superuser')"
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
import { getGlobalDangerList } from '../../../../service/main/content/content'
export default {
  components: { Edit, FileEdit },
  data() {
    return {
      currentPage: 0,
      dangerList: null,
      searchOptions: {
        DangerZoneId: '',
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
    }
  },
  created() {
    console.log('content right')
    emitter1.on('contentNodeClick', (node) => {
      this.dangerNode = node
      this.searchOptions.DangerZoneId = node.id
      this.getGlobalDangerList()
    })
  },
  methods: {
    async getGlobalDangerList() {
      const res = await getGlobalDangerList(this.searchOptions)
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
      }
    },
    add() {
      this.$refs.editRef.show({ isAdd: true, data: this.dangerNode })
    },
    edit(data) {
      this.$refs.editRef.show({ isAdd: false, data })
    },
    // 附件管理
    fileEdit(data) {
      this.$refs.fileEditRef.show(data)
    },
    updateGlobalDanger() {
      this.getGlobalDangerList()
    },
    handleSizeChange(event) {
      this.searchOptions.Size = event
      this.pageSize = event
      this.getGlobalDangerList()
    },
    handleCurrentChange(event) {
      this.searchOptions.Index = event
      this.getGlobalDangerList()
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
