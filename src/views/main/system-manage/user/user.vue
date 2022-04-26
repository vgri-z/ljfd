<template>
  <div class="user">
    <div class="search">
      <el-form ref="searchFormRef" label-width="100px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="关键字搜索">
              <el-input v-model="Filter" placeholder="请输入关键字"></el-input>
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
        <el-button
          v-if="rights.includes('Create') || rights.includes('Superuser')"
          type="primary"
          @click="add"
          >添加用户</el-button
        >
      </div>
      <el-table :data="userList" border style="width: 100%">
        <el-table-column prop="userName" label="用户名"></el-table-column>
        <el-table-column prop="givenName" label="姓名"></el-table-column>
        <el-table-column prop="phoneNumber" label="手机号"></el-table-column>
        <el-table-column label="所属机构">
          <template v-slot="scope">
            {{ scope.row.organizationStrs.join(',') }}
          </template>
        </el-table-column>
        <el-table-column label="是否禁用">
          <template v-slot="scope">
            <el-switch v-model="scope.row.isLockedOut" @change="lockChange($event, scope.row.id)" />
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="150px">
          <template v-slot="scope">
            <el-tooltip
              v-if="rights.includes('Update') || rights.includes('Superuser')"
              class="box-item"
              effect="dark"
              content="默认密码为 Pwd@123"
              placement="top-start"
            >
              <el-button type="text" size="small" @click="resetPassword(scope.row.id)">
                重置密码
              </el-button>
            </el-tooltip>
            <el-button
              v-if="rights.includes('Update') || rights.includes('Superuser')"
              type="text"
              size="small"
              @click="edit(scope.row)"
              >编辑</el-button
            >
            <el-popconfirm
              v-if="rights.includes('Delete') || rights.includes('Superuser')"
              title="是否确认删除该用户？"
              @confirm="remove(scope.row.id)"
            >
              <template #reference>
                <el-button type="text" style="color: #f56c6c" size="small">删除</el-button>
              </template>
            </el-popconfirm>
            <el-button
              v-if="rights.includes('Update') || rights.includes('Superuser')"
              type="text"
              size="small"
              @click="setRights(scope.row.id)"
              >权限管理</el-button
            >
            <el-button
              v-if="rights.includes('Update') || rights.includes('Superuser')"
              type="text"
              size="small"
              @click="setRoles(scope.row.id)"
              >角色管理</el-button
            >
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

    <!-- 新建/编辑 -->
    <edit ref="editRef" @addUser="addUser"></edit>
    <!-- 权限设置 -->
    <rights ref="rightsRef" />
    <!-- 角色设置 -->
    <role-set ref="roleSetRef" />
  </div>
</template>
3
<script>
import Edit from './edit.vue'
import Rights from './rights.vue'
import RoleSet from './roleSet.vue'
import { ElMessage } from 'element-plus'
import { getUserList, resetPassword, removeUser, lockUser, unlockUser } from '@/service/main/main'
import { hasRights } from '../../../../utils/pageRights'
import moment from 'moment'

export default {
  name: 'user',
  components: { Edit, Rights, RoleSet },
  data() {
    return {
      currentPage: 1,
      total: 0,
      Filter: '',
      searchOption: {
        Index: 1,
        Size: 10
      },
      userList: null,
      rights: []
    }
  },
  created() {
    this._getUserList()
    hasRights().then((res) => {
      // console.log(res)
      this.rights = res
    })
  },
  methods: {
    search() {
      this._getUserList()
    },
    reset() {
      this.Filter = ''
      this.search()
    },
    // 获取用户列表
    async _getUserList() {
      const obj = Object.assign({}, { Filter: this.Filter }, this.searchOption)
      const res = await getUserList(obj)
      // console.log(res)
      this.total = res.data.total
      this.userList = res.data.list.map((item) => {
        item.creationTime = moment(item.creationTime).format('YYYY-MM-DD')
        item.organizationStrs = []
        item.organizations.forEach((m) => {
          item.organizationStrs.push(m.name)
        })
        return item
      })
    },
    // 添加用户
    add() {
      this.$refs.editRef.show()
    },
    // 添加用户成功
    addUser() {
      this._getUserList()
    },
    // 重置密码
    async resetPassword(id) {
      const res = await resetPassword({ userId: id })
      console.log(res)
    },
    // 编辑
    edit(data) {
      this.$refs.editRef.show(data)
    },
    // 删除
    async remove(id) {
      const res = await removeUser(id)
      // console.log(res)
      if (res.success) {
        ElMessage({
          message: '操作成功',
          type: 'success'
        })
      }
      this._getUserList()
    },
    // 权限管理
    setRights(id) {
      this.$refs.rightsRef.show(id)
    },
    // 设置角色
    setRoles(id) {
      this.$refs.roleSetRef.show(id)
    },
    // 禁用/启用用户
    async lockChange(event, id) {
      if (event) {
        // 禁用
        const res = await lockUser({ userId: id })
        if (res.success) {
          ElMessage({
            message: '禁用成功',
            type: 'success'
          })
        }
      } else {
        // 解禁
        const res = await unlockUser({ userId: id })
        if (res.success) {
          ElMessage({
            message: '解禁成功',
            type: 'success'
          })
        }
      }
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
.user {
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
