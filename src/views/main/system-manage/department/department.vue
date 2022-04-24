<template>
  <div class="department">
    <left :treeList="treeList" @updateDepartment="updateDepartment" />
    <right />
  </div>
</template>

<script>
import Left from './left.vue'
import Right from './right.vue'
import { getDepartmentList } from '../../../../service/main/department/department'
export default {
  components: { Left, Right },
  data() {
    return {
      treeList: [],
      departmentInfo: null
    }
  },
  created() {
    this._getDepartmentList()
  },
  methods: {
    async _getDepartmentList() {
      const res = await getDepartmentList()
      this.treeList = res.data
      console.log(res)
    },
    updateDepartment() {
      this._getDepartmentList()
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
