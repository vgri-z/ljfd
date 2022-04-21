<template>
  <div class="right">
    <div class="department-info">
      <el-row v-if="!departmentInfo.clazz">
        <el-col :span="8">
          <div>机构名称：</div>
        </el-col>
        <el-col :span="8">
          <div>上级机构名称：</div>
        </el-col>
        <el-col :span="8">
          <div>是否拥有工厂：</div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDisabled: true
    }
  },
  props: {
    departmentInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  watch: {
    departmentInfo(val) {
      if (val.clazz) {
        this.isDisabled = false
      } else {
        this.isDisabled = true
      }
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.right {
  flex: 1;
  padding: 20px;
  font-size: 15px;

  .el-col {
    margin-bottom: 30px;
    text-align: left;
  }
}
</style>
