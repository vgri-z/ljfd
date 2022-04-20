<template>
  <div class="detail">
    <div class="back">
      <el-button type="primary" @click="backToList">返回列表</el-button>
    </div>
    <el-descriptions class="base-info" title="船舶登记详情" :column="4" border>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">单据类型</div>
        </template>
        船检管理
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">单据号</div>
        </template>
        {{ detail.number }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">代办企业</div>
        </template>
        {{ detail.company }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">事项名称</div>
        </template>
        {{ detail.affairsName }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">创建时间</div>
        </template>
        {{ detail.creationTime }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">操作员</div>
        </template>
        {{ detail.creatorName }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">备注</div>
        </template>
        {{ detail.description }}
      </el-descriptions-item>
    </el-descriptions>

    <template v-for="(item, index) in detail.applicants" :key="item.id">
      <el-descriptions class="persons" :title="`证件人 ${index + 1}`" :column="4" border>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">证件人姓名：</div>
          </template>
          {{ item.identityCard.name }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">证件号</div>
          </template>
          {{ item.identityCard.number }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">证件类型</div>
          </template>
          {{ item.identityCard.typeName }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">证件人地址</div>
          </template>
          {{ item.address }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">证件人手机号码</div>
          </template>
          {{ item.phoneNumber }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">证件图片</div>
          </template>
          <el-image
            style="width: 100px; height: 100px"
            :src="item.identityCard.photoUri"
            :preview-src-list="IDCardSrcs"
            :initial-index="1"
          >
          </el-image>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">拍摄照片</div>
          </template>
          <el-image
            style="width: 100px; height: 100px"
            :src="item.photoUri"
            :preview-src-list="caremaSrcs"
            :initial-index="1"
          >
          </el-image>
        </el-descriptions-item>
      </el-descriptions>
    </template>
  </div>
</template>

<script>
import localCache from '../../../../utils/cache'
export default {
  data() {
    return {
      isShowDetail: false,
      detail: null,
      IDCardSrcs: [],
      caremaSrcs: []
    }
  },
  created() {
    this.detailInit()
  },
  watch: {
    // 监听路由的变化
    $route: {
      handler: function () {
        this.detailInit()
      },
      deep: true
    }
  },
  methods: {
    show(data) {
      this.detail = data
      // console.log(this.detail)
      this.isShowDetail = true
    },
    detailInit() {
      const host = window.location.host
      const detail = localCache.cacheGet('detail')
      this.detail = detail
      this.detail.applicants.map((item) => {
        item.identityCard.photoUri = 'http://' + host + '/' + item.identityCard.photoUri
        item.photoUri = 'http://' + host + '/' + item.photoUri
        this.IDCardSrcs.push(item.identityCard.photoUri)
        this.caremaSrcs.push(item.photoUri)
        return item
      })
      // console.log(this.detail)
    },
    backToList() {
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
.detail {
  width: 100%;
  height: 100%;
  background: #fff;
  padding: 20px;
  box-sizing: border-box;
  overflow: auto;
  position: relative;

  .back {
    position: absolute;
    right: 25px;
    top: 10px;
  }
  .base-info {
    margin-bottom: 20px;
  }

  .persons {
    margin-bottom: 20px;
  }
}
</style>
