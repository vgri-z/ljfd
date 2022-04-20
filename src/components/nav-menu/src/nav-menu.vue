<template>
  <div class="nav-menu">
    <!-- logo -->
    <div class="logo">
      <img class="img" src="~@/assets/img/ship.png" alt="" />
      <span v-if="isCollapse" class="title">船检系统</span>
    </div>
    <!-- 菜单 -->
    <el-menu
      :default-active="defaultActive"
      class="el-menu-vertical"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
      :collapse="!isCollapse"
      unique-opened
      @select="menuSelect"
    >
      <template v-for="item in menus" :key="item.id">
        <!-- 有二级菜单 -->
        <template v-if="!item.isLeaf">
          <el-sub-menu :index="item.id + ''">
            <!-- 一级菜单 -->
            <template #title>
              <component :class="item.icon" :is="item.icon"></component>
              <span>{{ item.displayName }}</span>
            </template>
            <!-- 二级菜单 -->
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item :index="subitem.id + ''" @click="menuClick(subitem)">
                <i v-if="subitem.icon" :class="subitem.icon"></i>
                <span>{{ subitem.displayName }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!-- 没有二级菜单 -->
        <template v-if="item.isLeaf">
          <el-menu-item :index="item.id + ''" @click="menuClick(item)">
            <!-- <el-icon><icon-menu /></el-icon> -->
            <span>{{ item.displayName }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import localCache from '@/utils/cache'
import { Location } from '@element-plus/icons'
export default {
  components: { Location },
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const router = useRouter()
    const store = useStore()

    const defaultActive = ref('1')
    const activeIndex = localCache.cacheGet('activeMenu')
    if (activeIndex) {
      defaultActive.value = activeIndex
    }

    const menus = computed(() => {
      return store.state.login.userMenus
    })

    const menuClick = (menu) => {
      // menu.url包含type(type用于船舶登记)
      if (menu.url.includes('type')) {
        // 取出menu.url中的type的值
        const type = menu.url.split('?')[1].split('=')[1]
        router.push({
          path: menu.url || '/not-found',
          query: {
            type
          }
        })
      } else {
        // 没有type的url，正常跳转
        router.push(menu.url || '/not-found')
      }
    }

    // 保存menu的defaultActive
    const menuSelect = (event) => {
      localCache.cacheSet('activeMenu', event)
    }

    return {
      menus,
      menuClick,
      menuSelect,
      defaultActive
    }
  }
}
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #002040;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu {
    border-right: none;
    background: #001429;
  }

  // 目录
  .el-submenu {
    background-color: #001429 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #001429 !important;
    }
  }

  :deep(.el-sub-menu__title) {
    background-color: #001429 !important;

    .el-icon.el-sub-menu__icon-arrow {
      position: absolute;
    }

    // 修改菜单图标大小
    svg {
      width: 15px;
      height: 15px;
      margin-right: 5px;
    }
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  // 选中之后菜单高亮颜色
  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #3396fb !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
