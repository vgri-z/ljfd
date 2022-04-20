<template>
  <div class="nav-header">
    <div class="collapse" @click="changeFold">
      <el-icon v-if="isFold" size="24"><fold /></el-icon>
      <el-icon v-else size="24"><expand /></el-icon>
    </div>
    <div class="operations">
      <nav-breadcrumb :breadcrumbs="breadcrumbs" />
      <user-info />
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { Fold, Expand } from '@element-plus/icons'
import UserInfo from './user-info.vue'
import NavBreadcrumb from './nav-breadcrumb.vue'
import { useBreadcrumb } from '../hooks/index'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

export default {
  components: {
    Fold,
    Expand,
    UserInfo,
    NavBreadcrumb
  },
  emits: ['foldChange'],
  setup(prop, { emit }) {
    // 是否展开
    const isFold = ref(true)

    const changeFold = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }

    // 获取面包屑数组
    const store = useStore()
    const breadcrumbs = computed(() => {
      const route = useRoute()
      const userMenus = store.state.login.userMenus
      let currentPath = route.path
      const query = route.query
      // 路径携带参数，将参数拼接在url后面
      if (query.type) {
        currentPath += `?type=${query.type}`
      }
      return useBreadcrumb(userMenus, currentPath)
    })

    return {
      isFold,
      changeFold,
      breadcrumbs
    }
  }
}
</script>

<style lang="less" scoped>
.nav-header {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;

  .collapse {
    width: 24px;
    text-align: left;
    padding-top: 10px;
    cursor: pointer;
  }

  .operations {
    flex: 1;
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    padding-top: 10px;
  }
}
</style>
