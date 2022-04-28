<template>
  <div class="branch-content">
    <div class="search">
      <el-form ref="searchFormRef" label-width="50px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="工厂">
              <el-select v-model="organizationId" placeholder="请选择工厂" style="width: 100%">
                <el-option
                  v-for="item in departmentList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item>
              <el-button type="primary" @click="search">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="table">
      <left :treeList="treeList" />
      <right :rights="rights" />
    </div>
  </div>
</template>

<script>
import Left from './left.vue'
import Right from './right.vue'
import { emitter1 } from '../../../../utils/eventbus'
import localCache from '../../../../utils/cache'
import { getContentTreeList } from '../../../../service/main/content/content'
import { getDepartmentList } from '../../../../service/main/department/department'
// import { hasRights } from '@/utils/pageRights'

export default {
  components: { Left, Right },
  data() {
    return {
      treeList: [],
      departmentInfo: {},
      rights: [],
      departmentList: null,
      organizationId: ''
    }
  },
  created() {
    this.rights = localCache.cacheGet('userRights')
    this.organizationId = this.$store.state.login.userFactory?.id
    this.getContentTreeList()
    this.getDepartmentList()
    emitter1.on('updateDangerArea', () => {
      this.getContentTreeList()
    })
    // hasRights().then((res) => {
    //   // console.log(res)
    //   this.rights = res
    // })
  },
  methods: {
    search() {
      emitter1.emit('updateBranchDangerList', this.organizationId)
    },
    async getDepartmentList() {
      const res = await getDepartmentList()
      this.departmentList = res.data
    },
    async getContentTreeList() {
      const res = await getContentTreeList()
      console.log(res)
      this.treeList = res.data
    }
  }
}
</script>

<style lang="less" scoped>
.branch-content {
  width: 100%;
  height: 100%;

  .search {
    background: #fff;
    box-sizing: border-box;
    // border-bottom: 1px solid #e2e5e9;
    // margin-bottom: 15px;
  }

  .table {
    width: 100%;
    height: 100%;
    display: flex;
  }

  padding: 20px;
  box-sizing: border-box;
  border-radius: 5px;
  background: #fff;
  overflow: hidden;
}
</style>
