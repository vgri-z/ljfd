<template>
  <div class="user-info">
    <el-dropdown>
      <span class="el-dropdown-link"
        ><el-avatar
          size="small"
          src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        ></el-avatar
        >{{ username }}
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="editPassword">修改密码</el-dropdown-item>
          <el-dropdown-item @click="logoff">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

    <!-- 修改密码 -->
    <reset ref="resetRef" />
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import localCache from '../../../utils/cache'
import Reset from '../../../views/main/system-manage/user/reset.vue'
export default {
  components: { Reset },
  setup() {
    const store = useStore()
    const router = useRouter()
    const username = store.state.login.userInfo.userName
    const resetRef = ref(null)

    const logoff = () => {
      localCache.clearCache()
      router.push('/login')
    }

    const editPassword = () => {
      resetRef.value.show()
    }

    return {
      username,
      logoff,
      editPassword,
      resetRef
    }
  }
}
</script>

<style lang="less" scoped>
.user-info {
  .el-dropdown-link {
    display: flex;
    align-items: center;
    cursor: pointer;

    .el-avatar {
      margin-right: 3px;
    }
  }
}
</style>
