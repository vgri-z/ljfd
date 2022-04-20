<template>
  <div class="detail">
    <div class="back">
      <el-button type="primary" @click="backToList">返回列表</el-button>
    </div>
    <el-descriptions class="base-info" title="系统日志详情" :column="1" border>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">操作人</div>
        </template>
        <div class="content-item" :title="detail.userName">{{ detail.userName }}</div>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">请求地址</div>
        </template>
        <div class="content-item" :title="detail.requestUrl">{{ detail.requestUrl }}</div>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">浏览器</div>
        </template>
        <div class="content-item" :title="detail.userAgent">{{ detail.userAgent }}</div>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">方法名</div>
        </template>
        <div class="content-item" :title="detail.actions[0].methodName">
          {{ detail.actions[0].methodName }}
        </div>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">请求参数</div>
        </template>
        <div class="content-item" :title="detail.actions[0].parameters">
          {{ detail.actions[0].parameters }}
        </div>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">服务名称</div>
        </template>
        <div class="content-item" :title="detail.actions[0].serviceName">
          {{ detail.actions[0].serviceName }}
        </div>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">请求说明</div>
        </template>
        <div class="content-item" :title="detail.comments">{{ detail.comments }}</div>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">请求方法</div>
        </template>
        <div class="content-item" :title="detail.httpMethod">{{ detail.httpMethod }}</div>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">状态码</div>
        </template>
        <div class="content-item" :title="detail.httpStatusCode">{{ detail.httpStatusCode }}</div>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">ip地址</div>
        </template>
        <div class="content-item" :title="detail.ipAddress">{{ detail.ipAddress }}</div>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">创建时间</div>
        </template>
        <div class="content-item" :title="detail.creationTime">{{ detail.creationTime }}</div>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">执行时间</div>
        </template>
        <div class="content-item" :title="detail.executionTime">{{ detail.executionTime }}</div>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">执行时间段</div>
        </template>
        <div class="content-item" :title="detail.duration">{{ detail.duration }} ms</div>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">是否报错</div>
        </template>
        <div class="content-item">{{ detail.hasException ? '是' : '否' }}</div>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">错误信息</div>
        </template>
        <div class="content-item">{{ detail.exceptions }}</div>
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
import moment from 'moment'
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
      const detail = localCache.cacheGet('detail')
      console.log(detail, 'detail')
      this.detail = detail
      this.detail.actions.forEach((iten) => {
        // iten.parameters = JSON.parse(item.parameters)
        iten.executionTime = moment(iten.executionTime).format('YYYY-MM-DD HH:mm:ss')
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
    width: 100%;
    height: 100%;

    :deep(.el-descriptions__body) {
      width: 100%;
    }

    .content-item {
      width: 800px;
      // white-space: nowrap;
      // overflow: hidden;
      // text-overflow: ellipsis;
    }
  }
}
</style>
