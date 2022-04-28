<template>
  <div class="right">
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
              v-if="rights.includes('DangerSource.Update') || rights.includes('Superuser')"
              type="text"
              size="small"
              @click="edit(scope.row)"
              >编辑</el-button
            >
            <el-button
              v-if="rights.includes('DangerSource.Update') || rights.includes('Superuser')"
              type="text"
              size="small"
              @click="fileEdit(scope.row)"
              >附件管理</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 编辑 -->
    <edit ref="editRef" @updateGlobalDanger="updateGlobalDanger" />
    <!-- 文件管理 -->
    <!-- <file-edit ref="fileEditRef" @updateGlobalDanger="updateGlobalDanger" /> -->
  </div>
</template>

<script>
import Edit from './edit.vue'
import { emitter1 } from '../../../../utils/eventbus'
import { getBranchDangerList } from '../../../../service/main/content/content'
import { ElMessage } from 'element-plus/lib/components'
export default {
  components: { Edit },
  data() {
    return {
      dangerList: null,
      searchOptions: {
        DangerZoneId: '',
        OrganizationId: '',
        Index: 1,
        Size: 10
      },
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
    this.searchOptions.OrganizationId = this.$store.state.login.userFactory?.id
    emitter1.on('nodeClick', (node) => {
      this.dangerNode = node
      this.searchOptions.DangerZoneId = node.id
      this.getBranchDangerList()
    })
  },
  methods: {
    async getBranchDangerList() {
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
      if (data.id) {
        // 有id 可上传附件
        this.$refs.fileEditRef.show(data)
      } else {
        ElMessage({
          message: '分厂无法修改集团内容，请先编辑危险源',
          type: 'warning'
        })
      }
    },
    updateGlobalDanger() {
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
}
</style>
