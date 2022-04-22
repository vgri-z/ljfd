<template>
  <div class="role">
    <div class="search">
      <el-form ref="searchFormRef" label-width="100px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="角色名称">
              <el-input v-model="searchOption.Filter" placeholder="请输入角色名称"></el-input>
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
        <el-button type="primary" size="medium" @click="add">添加</el-button>
      </div>
      <el-table :data="roleList" border style="width: 100%">
        <el-table-column prop="name" label="角色名称"></el-table-column>
        <el-table-column prop="description" label="备注"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
            <el-popconfirm title="是否确认删除该角色？" @confirm="remove(scope.row.id)">
              <template #reference>
                <el-button type="text" style="color: #f56c6c" size="small">删除</el-button>
              </template>
            </el-popconfirm>
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

    <!-- 新增/编辑 -->
    <edit ref="editRef" @updateRole="updateRole" />
  </div>
</template>

<script>
import { getRoleList, deleteRole } from '../../../../service/main/role/role'
import Edit from './edit.vue'
import { ElMessage } from 'element-plus'
export default {
  components: {
    Edit
  },
  data() {
    return {
      currentPage: 1,
      total: 0,
      searchOption: {
        Index: 1,
        Size: 10,
        Filter: ''
      },
      roleList: null
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    search() {
      this.getRoleList()
    },
    reset() {
      this.searchOption.Filter = ''
      this.getRoleList()
    },
    async remove(id) {
      const res = await deleteRole(id)
      if (res.code === 0) {
        ElMessage({
          message: '操作成功',
          type: 'success'
        })
        this.getRoleList()
      }
    },
    async getRoleList() {
      const res = await getRoleList(this.searchOption)
      console.log(res)
      this.roleList = res.data.list
      this.total = res.data.total
    },
    add() {
      this.$refs.editRef.show()
    },
    edit(data) {
      this.$refs.editRef.show(data)
    },
    updateRole() {
      this.getRoleList()
    },
    handleSizeChange(event) {
      this.searchOption.Size = event
      this.getRoleList()
    },
    handleCurrentChange(event) {
      this.searchOption.Index = event
      this.getRoleList()
    }
  }
}
</script>

<style lang="less">
.role {
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
