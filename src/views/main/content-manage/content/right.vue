<template>
  <div class="right">
    <div class="add">
      <el-button type="primary" @click="edit">编辑</el-button>
      <el-button type="primary" @click="fileEdit">附件管理</el-button>
    </div>
    <div class="danger-info">
      <el-row>
        <el-col :span="8">
          <div>作业活动/设备设施：</div>
        </el-col>
        <el-col :span="8">
          <div>危险源或潜在事件：</div>
        </el-col>
        <el-col :span="8">
          <div>视频：</div>
        </el-col>
        <el-col :span="8">
          <div>案例：</div>
        </el-col>
      </el-row>
    </div>

    <!-- 编辑 -->
    <edit ref="editRef" />
  </div>
</template>

<script>
import Edit from './edit.vue'
export default {
  components: { Edit },
  data() {
    return {}
  },
  props: {
    dangerInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    edit() {
      this.$refs.editRef.show()
    },
    fileEdit() {}
  },
  watch: {
    dangerInfo(newVal) {
      console.log(newVal, 'newVal')
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
