<template>
  <div class="right">
    <div class="department-info">
      <el-row>
        <el-col :span="8">
          <div>机构名称：{{ departmentInfo.name }}</div>
        </el-col>
        <!-- <el-col :span="8">
          <div>
            上级机构名称：{{ departmentInfo.parentId === null ? '无' : departmentInfo.parent.name }}
          </div>
        </el-col> -->
        <el-col :span="8">
          <div>是否拥有工厂：{{ departmentInfo.hasFactory ? '是' : '否' }}</div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    departmentInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {},
  watch: {
    departmentInfo(newVal) {
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

  .el-col {
    margin-bottom: 30px;
    text-align: left;
  }
}
</style>
