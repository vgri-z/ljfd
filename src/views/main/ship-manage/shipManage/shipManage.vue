<template>
  <div class="ship-manage">
    <div class="search">
      <el-form ref="searchFormRef" :model="searchForm" label-width="120px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="船舶名称/船舶号">
              <el-input v-model="searchForm.ShipName" placeholder="请输入船舶名称/船舶号" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="单据号">
              <div style="display: flex; justify-content: space-between">
                <el-input
                  style="width: 48%"
                  v-model="searchForm.StartNumber"
                  placeholder="请输入单据号起"
                ></el-input>
                <el-input
                  style="width: 48%"
                  v-model="searchForm.EndNumber"
                  placeholder="请输入单据号止"
                ></el-input>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="申请时间">
              <el-date-picker
                v-model="searchForm.ApplyTime"
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
          <el-col :span="8">
            <el-form-item label="证件人姓名">
              <el-input v-model="searchForm.ApplicantIdCardName" placeholder="请输入申请人姓名" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="操作员">
              <el-input v-model="searchForm.CreatorName" placeholder="请输入操作员"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系电话">
              <el-input v-model="searchForm.ApplicantPhoneNumber" placeholder="请输入联系电话" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系地址">
              <el-input v-model="searchForm.ApplicantAddress" placeholder="请输入联系地址" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="身份证号">
              <el-input v-model="searchForm.ApplicantIdCardNumber" placeholder="请输入身份证号" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="单据类型">
              <el-select
                v-model="searchForm.CategoryId"
                style="width: 100%"
                placeholder="请选择单据类型"
              >
                <template v-for="item in $store.state.login.shipRegCategorys" :key="item.id">
                  <el-option :label="item.displayName" :value="item.id"></el-option>
                </template>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item>
              <div style="display: flex; justify-content: flex-end">
                <el-button type="primary" @click="search">查询</el-button>
                <el-button @click="reset">重置</el-button>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="table">
      <el-table :data="registerList" border style="width: 100%">
        <el-table-column prop="sort" label="" width="50"></el-table-column>
        <el-table-column prop="docketType" label="单据类型"></el-table-column>
        <el-table-column prop="shipName" label="船舶名称/船舶号"></el-table-column>
        <el-table-column prop="number" label="编号"></el-table-column>
        <el-table-column prop="shipOwner" label="所有人名称"></el-table-column>
        <el-table-column prop="creationTime" label="创建时间"></el-table-column>
        <el-table-column prop="applicants" label="证件号码">
          <template v-slot="scope">
            <div
              v-for="item in scope.row.applicants"
              :key="item.id"
              style="display: flex; align-items: center"
            >
              <span style="margin-left: 10px">{{ item.identityCard.number }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="creatorName" label="操作员"></el-table-column>
        <el-table-column label="操作" width="180">
          <template v-slot="scope">
            <el-button
              v-if="rights.includes('Update') || rights.includes('Superuser')"
              type="text"
              size="small"
              @click="edit(scope.row)"
              >编辑</el-button
            >
            <el-button type="text" size="small" @click="detail(scope.row)">查看</el-button>
            <el-popconfirm
              v-if="rights.includes('Delete') || rights.includes('Superuser')"
              title="是否确认删除？"
              @confirm="remove(scope.row.id)"
            >
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
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
import moment from 'moment'
import { getShipRegisterList, deleteShipRegister } from '../../../../service/main/main'
import localCache from '../../../../utils/cache.js'
import { hasRights } from '../../../../utils/pageRights'
export default {
  data() {
    return {
      currentPage: 1,
      total: 0,
      searchForm: {
        ShipName: '', // 船舶名称
        StartNumber: '', // 单据号起
        EndNumber: '', // 单据号止
        StartTime: '', // 开始时间
        EndTime: '', // 结束时间
        ApplicantIdCardName: '', // 申请人姓名
        CreatorName: '', // 操作员
        ApplicantPhoneNumber: '', // 联系电话
        ApplicantAddress: '', // 联系地址
        ApplicantIdCardNumber: '', // 证件号码
        CategoryId: '', // 单据类型
        ApplyTime: '' // 申请时间(自定义)
      },
      searchOption: {
        Index: 1,
        Size: 10
      },
      userList: null,
      registerList: null,
      rights: []
    }
  },
  created() {
    this._getShipRegisterList()
    hasRights().then((res) => {
      this.rights = res
    })
  },
  methods: {
    search() {
      this._getShipRegisterList()
    },
    reset() {
      this.searchForm = {
        ShipName: '',
        StartNumber: '',
        EndNumber: '',
        StartTime: '',
        EndTime: '',
        ApplicantIdCardName: '',
        CreatorName: '',
        ApplicantPhoneNumber: '',
        ApplicantAddress: '',
        ApplicantIdCardNumber: '',
        CategoryId: '',
        ApplyTime: ''
      }
      this.search()
    },
    async _getShipRegisterList() {
      const obj = Object.assign({}, this.searchForm, this.searchOption)
      const res = await getShipRegisterList(obj)
      this.total = res.data.total
      this.registerList = res.data.list.map((item, index) => {
        item.sort = index + 1
        item.creationTime = moment(item.creationTime).format('YYYY-MM-DD HH:mm')
        item.docketType = this.$store.state.login.shipRegCategorys.find(
          (iten) => iten.id === item.categoryId.value
        ).displayName
        return item
      })
    },
    detail(data) {
      localCache.cacheSet('detail', data)
      this.$router.push('/main/ship-manage/shipManage/detail/' + data.id)
    },
    edit(data) {
      localCache.cacheSet('detail', data)
      this.$router.push('/main/ship-manage/shipManage/edit/' + data.id)
    },
    handleSizeChange(event) {
      this.searchOption.Size = event
      this._getShipRegisterList()
    },
    handleCurrentChange(event) {
      this.searchOption.Index = event
      this._getShipRegisterList()
    },
    timeChange(event) {
      this.searchForm.StartTime = event[0]
      this.searchForm.EndTime = event[1]
    },
    // 删除
    async remove(id) {
      const res = await deleteShipRegister(id)
      if (res.success) {
        ElMessage({
          message: '操作成功',
          type: 'success'
        })
        this._getShipRegisterList()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.ship-manage {
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
    height: calc(100% - 370px);
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
