<template>
  <div class="department">
    <left @updateNode="updateNode" />
    <right :departmentInfo="departmentInfo" />
  </div>
</template>

<script>
import Left from './left.vue'
import Right from './right.vue'
import { getChildrenDepartment } from '../../../../service/main/department/department'
export default {
  components: { Left, Right },
  data() {
    return {
      treeList: [],
      departmentInfo: {}
    }
  },
  created() {
    this._getDepartmentList()
  },
  methods: {
    async _getDepartmentList() {
      const res = await getChildrenDepartment({ ParentId: null })
      this.departmentInfo = res.data[0]
    },
    updateNode(nodeData) {
      this.departmentInfo = nodeData
    }
  }
}
</script>

<style lang="less">
.department {
  width: 100%;
  height: 100%;
  display: flex;

  padding: 20px;
  box-sizing: border-box;
  border-radius: 5px;
  background: #fff;
}
</style>
