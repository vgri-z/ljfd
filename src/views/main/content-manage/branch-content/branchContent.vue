<template>
  <div class="branch-content">
    <left :treeList="treeList" />
    <right />
  </div>
</template>

<script>
import Left from './left.vue'
import Right from './right.vue'
import { emitter1 } from '../../../../utils/eventbus'
import { getContentTreeList } from '../../../../service/main/content/content'
export default {
  components: { Left, Right },
  data() {
    return {
      treeList: [],
      departmentInfo: {}
    }
  },
  created() {
    this.getContentTreeList()
    emitter1.on('updateDangerArea', () => {
      this.getContentTreeList()
    })
  },
  methods: {
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
  display: flex;

  padding: 20px;
  box-sizing: border-box;
  border-radius: 5px;
  background: #fff;
}
</style>
