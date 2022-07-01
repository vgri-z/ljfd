<template>
  <div class="content">
    <content-left :treeList="treeList" :rights="rights" />
    <content-right :rights="rights" />
  </div>
</template>

<script>
import ContentLeft from './contentLeft.vue'
import ContentRight from './contentRight.vue'
import { getContentTreeList } from '../../../../service/main/content/content'
import { emitter1 } from '@/utils/eventbus'
import localCache from '../../../../utils/cache'
// import { hasRights } from '@/utils/pageRights'

export default {
  components: { ContentLeft, ContentRight },
  data() {
    return {
      treeList: [],
      departmentInfo: {},
      rights: []
    }
  },
  created() {
    this.rights = localCache.cacheGet('userRights')
    this.getContentTreeList()
    emitter1.on('updateDangerArea', () => {
      this.getContentTreeList()
    })
    // hasRights().then((res) => {
    //   // console.log(res)
    //   this.rights = res
    // })
  },
  methods: {
    async getContentTreeList() {
      const res = await getContentTreeList()
      // console.log(res)
      this.treeList = res.data
    }
  }
}
</script>

<style lang="less">
.content {
  width: 100%;
  height: 100%;
  display: flex;

  padding: 20px;
  box-sizing: border-box;
  border-radius: 5px;
  background: #fff;
}
</style>
